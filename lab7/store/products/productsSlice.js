import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: '1',
      name: 'Ноутбук Lenovo IdeaPad',
      description: 'Легкий ноутбук для навчання, роботи з документами та перегляду відео.',
      price: 23999,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
    },
    {
      id: '2',
      name: 'Смартфон Samsung Galaxy',
      description: 'Смартфон з яскравим екраном, гарною камерою та швидкою зарядкою.',
      price: 15999,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
    },
    {
      id: '3',
      name: 'Навушники Sony',
      description: 'Бездротові навушники з чистим звуком і зручними амбушурами.',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    },
    {
      id: '4',
      name: 'Мишка Logitech',
      description: 'Зручна бездротова мишка для навчання, роботи та ігор.',
      price: 899,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600',
    },
    {
      id: '5',
      name: 'Рюкзак для ноутбука',
      description: 'Місткий рюкзак з відділенням для ноутбука і кишенями для дрібниць.',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
