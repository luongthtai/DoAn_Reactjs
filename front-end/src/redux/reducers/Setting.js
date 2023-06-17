import { createSlice } from "@reduxjs/toolkit";

const settingSlide = createSlice({
    name: 'setting',
    initialState: {
        siteTitle: '',
        siteSubtitle: '',
        logo: '',
        currency: '',
        facebook: '',
        twitter: '',
        instagram: ''
    },
    reducers: {
        
    }
})

const { actions, reducer } = settingSlide
export const { login } = actions
export default reducer