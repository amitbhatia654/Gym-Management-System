import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './UserSlice'

const store = configureStore({
    reducer: {
        cart: loginReducer
    }
})

export default store