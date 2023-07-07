import { createSlice } from "@reduxjs/toolkit"

const initialState = { user: false, selectedUserId: null, }

const userData = createSlice({
    name: "user",
    initialState,

    reducers: {
        loginUser: {
            reducer: (state, action) => {
                try {
                    // console.log(action.payload)
                    return state = { ...action.payload, user: true }
                }
                catch (err) {
                    console.log(err)
                }
            }
        },
        logoutUser: {
            reducer: (state, action) => {
                try {
                    // console.log(action.payload)
                    return state = initialState
                }
                catch (err) {
                    console.log(err)
                }
            }
        },
        changeSelectedUser: {
            reducer: (state, action) => {
                try {
                    // console.log(action.payload)
                    return state = { ...state, selectedUserId: action.payload }
                }
                catch (err) {
                    console.log(err)
                }
            }
        },

        // logoutUser(state) {
        //     return state = initialState
        // }

    },


})

export const { loginUser, logoutUser, changeSelectedUser } = userData.actions

export default userData.reducer