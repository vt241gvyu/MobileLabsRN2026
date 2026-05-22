import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ResetPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Помилка', 'Введіть email.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert('Готово', 'Лист для відновлення паролю надіслано.');
    } catch (error) {
      Alert.alert('Помилка', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Відновлення паролю</Text>
      <Text style={styles.text}>Введіть email, і Firebase надішле лист для зміни паролю.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Button
        title={loading ? 'Зачекайте...' : 'Надіслати лист'}
        onPress={handleReset}
        disabled={loading}
      />

      <Link href="/(auth)/login" style={styles.link}>Повернутися до входу</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f7f8fb',
  },
  title: {
    marginBottom: 12,
    fontSize: 28,
    fontWeight: '700',
    color: '#17202a',
  },
  text: {
    marginBottom: 18,
    fontSize: 16,
    color: '#4b5563',
  },
  input: {
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccd3dd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  link: {
    marginTop: 20,
    color: '#2563eb',
    fontSize: 16,
  },
});
