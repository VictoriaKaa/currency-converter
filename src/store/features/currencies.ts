import { Action, createSlice, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface CurrencyRates {
    [key: string]: number;
}

export interface Currency {
    base: string;
    date: string;
    rates: CurrencyRates;
    success: boolean;
    timestamp: number;
}

export interface CurrenciesState {
    currencies: Currency;
    loading: boolean;
    error: string;
}

export type CurrenciesThunk<ReturnType = void> = ThunkAction<ReturnType,
    CurrenciesState,
    unknown,
    Action<string>>;

const initialRole: CurrenciesState = {
    currencies: {} as Currency,
    loading: false,
    error: ''
}

const rolesSlice = createSlice({
    initialState: initialRole,
    name: "currencies",
    reducers: {
        setCurrencies: (state: CurrenciesState, action) => {
            state.currencies = { ...action.payload };
        },
        setLoading: (state: CurrenciesState, action) => {
            state.loading = action.payload;
        },
        setError: (state: CurrenciesState, action) => {
            state.error = action.payload;
        },
    }
});

export const { setCurrencies, setLoading, setError } = rolesSlice.actions;

const API_URL = "http://data.fixer.io/api/latest";

const API_Key = 'c17cc8b0435479cf8c32c6c2f533c9fc';

const getApiURL = (apiKey: string) => {
    return `${API_URL}?access_key=${apiKey}`;
}

export const getCurrencies = (): CurrenciesThunk => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const url = getApiURL(API_Key);
            const response = await axios.get(url);
            dispatch(setCurrencies(response.data));
        } catch (err: any) {
            dispatch(setError(err.message));
            console.log(err.message);
        } finally {
            dispatch(setLoading(false))
        }
    };
};

export default rolesSlice.reducer;
