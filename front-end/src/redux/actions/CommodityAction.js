import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchCommodity = createAsyncThunk(
    'commodity/fetchCommodity',

    async () => {
        const response = await axios.get('/commoditys').then(res => res.data)

        return response
    }
)
