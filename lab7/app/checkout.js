import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { clearCart } from '../store/cart/cartSlice';
import { addOrder } from '../store/orders/ordersSlice';
import { saveUser } from '../store/users/usersSlice';

export default function CheckoutScreen() {
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [error, setError] = useState('');

  const changeField = (name, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const submitOrder = () => {
    const isEmpty = !form.fullName.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

    if (items.length === 0) {
      setError('Кошик порожній.');
      return;
    }

    if (isEmpty) {
      setError('Заповніть усі поля.');
      return;
    }

    if (!emailIsValid) {
      setError('Введіть правильний email.');
      return;
    }

    const userData = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
    };

    dispatch(saveUser(userData));
    dispatch(
      addOrder({
        id: String(Date.now()),
        user: userData,
        date: new Date().toLocaleString('uk-UA'),
        items,
        total,
      })
    );
    dispatch(clearCart());
    setError('');
    Alert.alert('Замовлення оформлено', 'Ваше замовлення успішно створено.', [
      {
        text: 'OK',
        onPress: () => router.replace('/history'),
      },
    ]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Ваше замовлення</Text>
        {items.map((item) => (
          <Text key={item.id} style={styles.summaryText}>
            {item.name} - {item.quantity} шт.
          </Text>
        ))}
        <Text style={styles.total}>Разом: {total} грн</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="ПІБ"
        value={form.fullName}
        onChangeText={(value) => changeField('fullName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(value) => changeField('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Телефон"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(value) => changeField('phone', value)}
      />
      <TextInput
        style={[styles.input, styles.addressInput]}
        placeholder="Адреса"
        multiline
        value={form.address}
        onChangeText={(value) => changeField('address', value)}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={submitOrder}>
        <Text style={styles.buttonText}>Підтвердити замовлення</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f6fb',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  summary: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 6,
    marginBottom: 6,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  summaryText: {
    color: '#4b5563',
    lineHeight: 20,
  },
  total: {
    marginTop: 6,
    fontSize: 17,
    fontWeight: '800',
    color: '#166534',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  addressInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  error: {
    color: '#b91c1c',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#1f6feb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
