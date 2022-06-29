import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from '@/api/user.js'

const initialState = {
  token: localStorage.getItem('token') || '',
  userName: '',
  accessList: []
}

export const doLogin = createAsyncThunk(
  'user/doLogin',
  //thunkAPI使用方法见https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
  async (data, thunkAPI) => {
    const { userName, password } = data
    try {
      const response = await userApi.doLogin(userName, password)
      return response
    } catch (error) {
      console.log('error', error)
      return thunkAPI.rejectWithValue(error)
    }
    
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // doLogin: (state, action) => {
    //   state.userName = action.payload.userName
    //   state.accessList = action.payload.accessList
    // },
    logOut: (state) => {
      const initialStateCopy = JSON.parse(JSON.stringify(initialState))
      Object.keys(initialStateCopy).forEach(key => {
        state[key] = initialStateCopy[key]
      })
    },
    setUserInfo: (state, action) => {
      state.userName = action.payload.userName
      state.accessList = action.payload.accessList
    }
  },
  extraReducers(builder) {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      const { userName, accessList, token } = action.payload
      state.userName = userName
      state.accessList = accessList
      localStorage.setItem('token', token)
    })//若state无需根据reject修改可以不加rejected情况
    // .addCase(doLogin.rejected, (state, action) => {
    //   console.log('rejected', action)
    // })
  }
})

export const { logOut, setUserInfo } = userSlice.actions

export default userSlice.reducer