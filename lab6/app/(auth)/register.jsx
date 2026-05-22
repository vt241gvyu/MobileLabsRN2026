import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || password.length < 6) {
      Alert.alert('Помилка', 'Введіть email і пароль мінімум 6 символів.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
    } catch (error) {
      Alert.alert('Помилка реєстрації', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={loading ? 'Зачекайте...' : 'Зареєструватися'}
        onPress={handleRegister}
        disabled={loading}
      />

      <Link href="/(auth)/login" style={styles.link}>У мене вже є акаунт</Link>
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
    marginBottom: 24,
    fontSize: 28,
    fontWeight: '700',
    color: '#17202a',
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
