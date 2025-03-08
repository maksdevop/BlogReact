import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  title: '',
  shortDescription: '',
  text: '',
  tags: [{ value: '' }],
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    updateArticle: (state, action) => {
      return { ...state, ...action.payload };
    },
    addTag: (state) => {
      state.tags.push({ value: '' });
    },
    removeTag: (state, action) => {
      state.tags.splice(action.payload, 1);
    },
    updateTag: (state, action) => {
      const { index, value } = action.payload;
      state.tags[index].value = value;
    },
  },
});

export const { updateArticle, addTag, removeTag, updateTag } =
  articleSlice.actions;

export default articleSlice.reducer;
