import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AuthSlide = createSlice({
    name: 'authentication',
    initialState: {
        isLogin: false,
        user: [],
        role: ''
    },
    reducers: {
        login: (state, action) => {
            return {
                user: action.payload,
                isLogin: true,
                role: action.payload[0].role
            }
        },
        logout: (state, action) => {
            if (state.user) {
                const id = state.user[0].id

                if (id) {
                    axios.get(`/users/logout/${id}`)
                        .then(res => console.log(res.data))
                        .catch(err => console.log(err))
                }
            }

            return {
                isLogin: false,
                user: [0],
                role: ''
            }
        },
        updateUser: (state, action) => {
            return state.user = action.payload
        }
    }
})

const { actions, reducer } = AuthSlide;
export const { login, logout, updateUser } = actions
export default reducer