import { setAppStatusAC } from "@/app/app-slice"
import { clearDataAC } from "@/common/actions"
import { AUTH_TOKEN } from "@/common/constants"
import { ResultCode } from "@/common/enums"
import { createAppSlice, handleServerAppError, handleServerNetworkError } from "@/common/utils"
import { _authApi } from "@/features/auth/api/authApi"
import type { LoginArgs } from "@/features/auth/api/authApi.types"

// todo теперь нам auth-slice вообще больше не нужен, т.к. мы переписали на rtk query
export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    // isInitialized: false, // переписали чисто на useState в App
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (data: LoginArgs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await _authApi.login(data)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            return { isLoggedIn: true }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error: any) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }))
          const res = await _authApi.logout()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: "succeeded" }))
            dispatch(clearDataAC())
            localStorage.removeItem(AUTH_TOKEN)
            return { isLoggedIn: false }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error: any) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    // переписали чисто на useState в App
    // initializeAppTC: create.asyncThunk(
    //   async (_, { dispatch, rejectWithValue }) => {
    //     try {
    //       dispatch(setAppStatusAC({ status: "loading" }))
    //       const res = await _authApi.me()
    //       if (res.data.resultCode === ResultCode.Success) {
    //         dispatch(setAppStatusAC({ status: "succeeded" }))
    //         return { isLoggedIn: true }
    //       } else {
    //         handleServerAppError(res.data, dispatch)
    //         return rejectWithValue(null)
    //       }
    //     } catch (error: any) {
    //       handleServerNetworkError(error, dispatch)
    //       return rejectWithValue(null)
    //     }
    //   },
    //   {
    //     fulfilled: (state, action) => {
    //       state.isLoggedIn = action.payload.isLoggedIn
    //     },
    //     settled: (state) => {
    //       state.isInitialized = true
    //     },
    //   },
    // ),
  }),
})

export const {
  // selectIsLoggedIn,
  // selectIsInitialized
} = authSlice.selectors
export const {
  loginTC,
  logoutTC,
  // initializeAppTC,
  // setIsLoggedIn,
} = authSlice.actions
export const authReducer = authSlice.reducer
