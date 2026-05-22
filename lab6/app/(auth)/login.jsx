import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Помилка', 'Введіть email і пароль.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Помилка входу', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вхід</Text>

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

      <Button title={loading ? 'Зачекайте...' : 'Увійти'} onPress={handleLogin} disabled={loading} />

      <View style={styles.links}>
        <Link href="/(auth)/register" style={styles.link}>Створити акаунт</Link>
        <Link href="/(auth)/reset-password" style={styles.link}>Забули пароль?</Link>
      </View>
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
  links: {
    marginTop: 20,
    gap: 12,
  },
  link: {
    color: '#2563eb',
    fontSize: 16,
  },
});
