import { createSlice } from "@reduxjs/toolkit";

const ShopSlide = createSlice({
    name: 'authentication',
    initialState: {
        idShop: undefined,
    },
    reducers: {
        getIdShop: (state, action) => {
            const data = action.payload

            state.idShop = data[0].id
        },
        logoutShop: (state, action) => {
            state.idShop = undefined
        }
    }
})

const { actions, reducer } = ShopSlide;
export const { getIdShop, logoutShop } = actions
export default reducer