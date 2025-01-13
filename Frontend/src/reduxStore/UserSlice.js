import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem('user')) || {};

const userSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        add(state, action) {
            return state = action.payload
        },
        remove() {
            return {}
        }
    }
})

export const { add, remove } = userSlice.actions
export default userSlice.reducer