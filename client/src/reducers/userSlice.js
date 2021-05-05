import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: null,
    userEmail: null,
    userProfile: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser: (state, action) => {
            state.userName = action.payload.userName
            state.userEmail = action.payload.userEmail
            state.userProfilePic = action.payload.userProfilePic
        },
        setUserLogOut: (state) => {
            state.userName = null
            state.userEmail = null
            state.userProfilePic = null
        }
    }
});

export const { setActiveUser, setUserLogOut } = userSlice.actions

export const selectUserName = state => state.user.userName
export const selectUserEmail = state => state.user.userEmail
export const selectUserProfilePic = state => state.user.userProfilePic

export default userSlice.reducer