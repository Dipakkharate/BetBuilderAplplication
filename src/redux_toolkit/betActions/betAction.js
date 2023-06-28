import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchFixtureDataAction = createAsyncThunk("get/fixture", async (e, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_API_URL)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const fetchMarketDataAction = createAsyncThunk("get/market", async (e, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_API_URL_GETMARKETS)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})
export const fetchLegsDataAction = createAsyncThunk("get/legs", async (e, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_API_URL_LEGS)
        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const fetchBetsAction = createAsyncThunk("get/bets", async (credential, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL_GETBUILDERBETS}?sports=1&matchId=${credential.Match}&marketId=${credential.selectedMarket}&legs=${credential.selectedLeg}&language=en`)
        return data.BetBuilderSelections
    } catch (error) {
        return rejectWithValue(error.message)
    }
})