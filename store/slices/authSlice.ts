import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { API_ENDPOINTS } from '@/lib/api'

type RegisterPayload = {
  name: string
  email: string
  password: string
}

type User = {
  unlockKeyExpire: string
  id?: string
  name?: string
  email?: string
  phone?: string
  token?: string
  unlockeKey?: string
}

type AuthState = {
  user: User | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
}

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const res = await fetch(API_ENDPOINTS.auth.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        return rejectWithValue(data?.message || 'Registration failed')
      }

      try {
        if (typeof window !== 'undefined' && data?.token) {
          const maxAge = 60 * 60 * 24 * 30
          document.cookie = `token=${data.token}; path=/; max-age=${maxAge}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
        }
      } catch (e) {
      }

      return data
    } catch (err) {
      return rejectWithValue((err as Error).message || 'Network error')
    }
  }
)

type LoginPayload = {
  email: string
  password: string
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        return rejectWithValue(data?.message || 'Login failed')
      }

      try {
        if (typeof window !== 'undefined' && data?.token) {
          const maxAge = 60 * 60 * 24 * 30
          document.cookie = `token=${data.token}; path=/; max-age=${maxAge}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
        }
      } catch (e) {
      }

      return data
    } catch (err) {
      return rejectWithValue((err as Error).message || 'Network error')
    }
  }
)

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_payload: void, { rejectWithValue }) => {
    try {
      const res = await fetch(API_ENDPOINTS.auth.me, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        return rejectWithValue(data?.message || 'Failed to load user')
      }

      return data
    } catch (err) {
      return rejectWithValue((err as Error).message || 'Network error')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.status = 'idle'
      state.error = null
      try {
        if (typeof window !== 'undefined') {
          document.cookie = 'token=; path=/; max-age=0'
        }
      } catch (e) {
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded'
        state.user = action.payload?.user ?? action.payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) || action.error.message || 'Registration failed'
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded'
        state.user = action.payload?.user ?? action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) || action.error.message || 'Login failed'
      })
      .addCase(loadUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded'
        state.user = action.payload?.user ?? action.payload
        state.error = null
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = (action.payload as string) || action.error.message || 'Failed to load user'
        state.user = null
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
