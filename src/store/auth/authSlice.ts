import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginThunk, refreshThunk, registerThunk } from './authThunks'
import { AuthState, User } from './types'

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  loading: false,
  user: {
    id: '',
    createdAt: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    logout(state) {
      state.accessToken = ''
      state.refreshToken = ''
      state.user = initialState.user
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.user = action.payload.user
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loading = false
      })

      .addCase(registerThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.user = action.payload.user
      })
      .addCase(registerThunk.rejected, (state) => {
        state.loading = false
      })

      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })
  },
})

export const { setTokens, setUser, logout } = authSlice.actions
export default authSlice.reducer
