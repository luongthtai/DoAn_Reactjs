import { createSlice } from "@reduxjs/toolkit";
import { fetchCommodity } from "../actions/CommodityAction";

const commoditySlide = createSlice({
    name: 'commodity',
    initialState: {
        data: [],
        isLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCommodity.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(fetchCommodity.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

const { actions, reducer } = commoditySlide;
export const { getAll } = actions
export default reducer