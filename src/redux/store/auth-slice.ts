import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuth: boolean;
    isLoggedIn: boolean;
    isRememberMe: boolean;
}

const initialState: AuthState = {
    isAuth: false,
    isLoggedIn: false,
    isRememberMe: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.isAuth = true;
        },
        logout(state) {
            state.isAuth = false;
        },
        setIsRememberMe(state, action: PayloadAction<boolean>) {
            state.isRememberMe = action.payload;
        },
    },
});

export const { login,  logout, setIsRememberMe } = authSlice.actions;

export default authSlice.reducer;