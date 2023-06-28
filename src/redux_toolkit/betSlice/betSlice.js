import { createSlice } from "@reduxjs/toolkit"
import { fetchBetsAction, fetchFixtureDataAction, fetchLegsDataAction, fetchMarketDataAction } from "../betActions/betAction"


const betSlice = createSlice({
    name: 'bets',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFixtureDataAction.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(fetchFixtureDataAction.fulfilled, (state, { payload }) => {
                state.loading = false

                state.allFixtureData = payload
            })
            .addCase(fetchFixtureDataAction.rejected, (state, { payload }) => {
                state.loading = false
                state.allFixtureDataeeror = payload

            })

            .addCase(fetchMarketDataAction.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(fetchMarketDataAction.fulfilled, (state, { payload }) => {
                state.loading = false
                state.marketLists = payload
            })
            .addCase(fetchMarketDataAction.rejected, (state, { payload }) => {
                state.loading = false
            })
            .addCase(fetchLegsDataAction.pending, (state, { payload }) => {

                state.loading = true

            })
            .addCase(fetchLegsDataAction.fulfilled, (state, { payload }) => {
                state.loading = false
                state.legLists = payload
            })
            .addCase(fetchLegsDataAction.rejected, (state, { payload }) => {
                state.loading = false
            })


            .addCase(fetchBetsAction.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(fetchBetsAction.fulfilled, (state, { payload }) => {
                state.loading = false
                console.log("asasads");
                state.betList = payload
            })
            .addCase(fetchBetsAction.rejected, (state, { payload }) => {
                state.loading = false
                console.log("asasadsError", payload);
                state.betListerror = payload
            })
    }
})

export default betSlice.reducer