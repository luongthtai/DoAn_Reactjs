import axios from "axios";

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
            // const data = action.payload

            // axios.post(`/carts/create`, data)
            // .then(res => res.data)
            // .catch(err => console.log(err))

            console.log(action.payload)
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
export const { addToCart } = actions
export default reducer