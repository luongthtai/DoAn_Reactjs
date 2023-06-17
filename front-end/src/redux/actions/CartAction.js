import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',

    async (idUser) => {
        const response = await axios.get(`/carts/${idUser}`).then(res => res.data)

        return response
    }
)