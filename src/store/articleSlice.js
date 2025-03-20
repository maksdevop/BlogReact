import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid'; // Для создания уникальных ID

const initialState = {
  title: '',
  shortDescription: '',
  text: '',
  tags: [{ id: nanoid(), value: '' }],
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
});

export default articleSlice.reducer;
