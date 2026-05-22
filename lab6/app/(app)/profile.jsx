import { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.uid) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || '');
          setAge(data.age ? String(data.age) : '');
          setCity(data.city || '');
        }
      } catch (error) {
        Alert.alert('Помилка', error.message);
      }
    };

    loadProfile();
  }, [user?.uid]);

  const saveProfile = async () => {
    if (!user?.uid) {
      Alert.alert('Помилка', 'Користувач не авторизований.');
      return;
    }

    const ageNumber = Number(age);
    if (!name || !city || !age || Number.isNaN(ageNumber) || ageNumber <= 0) {
      Alert.alert('Помилка', 'Заповніть ім’я, вік і місто. Вік має бути числом.');
      return;
    }

    setLoading(true);
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,
          email: user.email,
          name,
          age: ageNumber,
          city,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      Alert.alert('Готово', 'Профіль збережено.');
    } catch (error) {
      Alert.alert('Помилка', error.message);
    } finally {
      setLoading(false);
    }
  };

  const askDeleteConfirmation = () => {
    Alert.alert(
      'Видалити акаунт?',
      'Після підтвердження потрібно буде ввести пароль. Документ профілю також буде видалено.',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Продовжити', style: 'destructive', onPress: () => setShowDeleteForm(true) },
      ]
    );
  };

  const deleteAccount = async () => {
    if (!user?.uid || !user.email) {
      Alert.alert('Помилка', 'Користувач не авторизований.');
      return;
    }

    if (!deletePassword) {
      Alert.alert('Помилка', 'Введіть пароль для повторної автентифікації.');
      return;
    }

    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, deletePassword);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, 'users', user.uid));
      await deleteUser(user);
    } catch (error) {
      Alert.alert('Помилка видалення', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Профіль</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Ім’я"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Вік"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Місто"
        value={city}
        onChangeText={setCity}
      />

      <Button title={loading ? 'Зачекайте...' : 'Зберегти профіль'} onPress={saveProfile} disabled={loading} />

      <View style={styles.section}>
        <Button title="Вийти" onPress={logout} />
      </View>

      <View style={styles.danger}>
        <Text style={styles.dangerTitle}>Видалення акаунта</Text>
        <Button title="Видалити акаунт" color="#dc2626" onPress={askDeleteConfirmation} />

        {showDeleteForm && (
          <View style={styles.deleteForm}>
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              secureTextEntry
              value={deletePassword}
              onChangeText={setDeletePassword}
            />
            <Button
              title={loading ? 'Зачекайте...' : 'Підтвердити видалення'}
              color="#dc2626"
              onPress={deleteAccount}
              disabled={loading}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 64,
    backgroundColor: '#f7f8fb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#17202a',
  },
  email: {
    marginTop: 6,
    marginBottom: 24,
    color: '#4b5563',
    fontSize: 16,
  },
  input: {
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccd3dd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  section: {
    marginTop: 18,
  },
  danger: {
    marginTop: 34,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  dangerTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#991b1b',
  },
  deleteForm: {
    marginTop: 16,
  },
});
