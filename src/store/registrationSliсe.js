import { createSlice } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('user') || '{}') || {
  email: '',
  userName: '',
  urlImage: 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
  password: '',
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    user: storedUser,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logout } = registrationSlice.actions;
export default registrationSlice.reducer;
