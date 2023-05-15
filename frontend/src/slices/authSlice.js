import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

//Register user and sign in
export const register = createAsyncThunk( 
  //nome para a função segue essa convenção, 2º argumento é a função assíncrona do service
  "auth/register",
  async (user, thunkAPI) => { //thunkAPI permite parar a execução e identificar um erro da api
    const data = await authService.register(user);

    //check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]); //rejeita a requisição em caso de erro e exibe o primeiro erro
    }

    return data; //retorna o usuário cadastrado
  }
);

//Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout()
})

export const authSlice = createSlice({ //recebe um nome que permite extrair valores a partir dele
  name: "auth",
  initialState, //estados iniciais
  reducers: { 
    reset: (state) => {
      //resseta todos os estados
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => { //vai trabalhar com os estados atuais de cada requisição
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = null; //limpar o usuário após logout
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
