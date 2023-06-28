import { configureStore } from "@reduxjs/toolkit"
import betSlice from "./betSlice/betSlice"

const store = configureStore({
    reducer: {
        fixture: betSlice
    }
})
export default store