import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'ru',
};

const languageSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions; // этот экшн мы подключим в компонент
export default languageSlice.reducer; // этот редюсер мы подключим в стор
