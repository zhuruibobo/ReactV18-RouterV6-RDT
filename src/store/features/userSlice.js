import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userName: '',
  accessList: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doLogin: (state, action) => {
      state.userName = action.payload.userName
      state.accessList = action.payload.accessList
    },
    logOut: (state) => {
      const initialStateCopy = JSON.parse(JSON.stringify(initialState))
      Object.keys(initialStateCopy).forEach(key => {
        state[key] = initialStateCopy[key]
      })
    },
    setUserName: (state, action) => {
      state.userName = action.payload
    }
  }
})

export const { doLogin, logOut, setUserName } = userSlice.actions

export default userSlice.reducer