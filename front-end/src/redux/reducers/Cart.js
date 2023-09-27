// import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");
const { fetchCart } = require("redux/actions/CartAction");

const cartSlide = createSlice({
    name: 'catSlide',
    initialState: {
        cart: [],
        isLoading: false
    },
    reducers: {
        addToCart: (state, action) => {
            const data = action.payload

            if (state.cart.length !== 0) {
                state.cart.map(item => {
                    if (item.idProduct === data.idProduct) {
                        return item.quantity = data.quantity + 1
                    } else {
                        return state.cart.push(data)
                    }
                })
            } else {
                state.cart.push(data)
            }
        },
        removeToCart: (state, action) => {
            const data = action.payload

        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.cart = action.payload
        })
    }
})

const { actions, reducer } = cartSlide
export const { addToCart, removeToCart } = actions
export default reducer