import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Alert, Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/loader/Loader";
import { RootState } from "../../store";
import { getCurrencies } from "../../store/features/currencies";
import "./CurrencyConverter.css";

const CurrencyConverter = () => {
    const dispatch = useDispatch()

    const { currencies, loading, error } = useSelector((state: RootState) => state.currencies);
    const [currenciesList, setCurrenciesList] = useState<string[]>([]);
    const [firstCurrency, setFirstCurrency] = useState<number>(1);
    const [secondCurrency, setSecondCurrency] = useState<number>(1);
    const [firstCurrencyName, setFirstCurrencyName] = useState<string>();
    const [secondCurrencyName, setSecondCurrencyName] = useState<string>();

    useEffect(() => {
        dispatch(getCurrencies());
    }, [dispatch])

    useEffect(() => {
        currencies.rates && setCurrenciesList(Object.keys(currencies.rates));
    }, [currencies])

    const onChangeFirstSelectedCurrency = (value: SyntheticEvent<HTMLDivElement, Event>) => {
        const currencyName = (value.target as HTMLInputElement).value;
        setFirstCurrencyName(currencyName);
        if (secondCurrencyName && firstCurrency && currencies.rates[currencyName]) {
            setSecondCurrency(firstCurrency * currencies.rates[secondCurrencyName] / currencies.rates[currencyName]);
        }
    }

    const onChangeSecondSelectedCurrency = (value: SyntheticEvent<HTMLDivElement, Event>) => {
        const currencyName = (value.target as HTMLInputElement).value;
        setSecondCurrencyName(currencyName);
        if (firstCurrencyName && firstCurrency && currencies.rates[currencyName]) {
            setSecondCurrency(firstCurrency * currencies.rates[currencyName] / currencies.rates[firstCurrencyName]);
        }
    }

    const onChangeFirstCurrency = (value: ChangeEvent<HTMLInputElement>) => {
        const currency = Number(value.target.value);
        currency ? setFirstCurrency(currency) : setFirstCurrency(0);
        if (firstCurrencyName && secondCurrencyName && currency) {
            setSecondCurrency(currency * currencies.rates[secondCurrencyName] / currencies.rates[firstCurrencyName]);
        }
    }

    const onChangeSecondCurrency = (value: ChangeEvent<HTMLInputElement>) => {
        const currency = Number(value.target.value);
        currency ? setSecondCurrency(currency) : setSecondCurrency(0);
        if (firstCurrencyName && secondCurrencyName && currency) {
            setFirstCurrency(currency * currencies.rates[firstCurrencyName] / currencies.rates[secondCurrencyName]);
        }
    }

    const isSelectedCurrencies = () => {
        return !firstCurrencyName || !secondCurrencyName || !currencies.rates[firstCurrencyName] || !currencies.rates[secondCurrencyName];
    }

    return (
        <div className="currency-converter-container">
            <div className="currency-row">
                <TextField value={firstCurrency}
                    type='number'
                    disabled={isSelectedCurrencies()}
                    onChange={onChangeFirstCurrency} />
                <Autocomplete
                    disablePortal
                    id="first-currencies"
                    options={currenciesList}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Search currency" />}
                    onSelect={(value) => onChangeFirstSelectedCurrency(value)}
                />
            </div>
            <div className="currency-row">
                <TextField value={secondCurrency}
                    type='number'
                    disabled={isSelectedCurrencies()}
                    onChange={onChangeSecondCurrency} />
                <Autocomplete
                    disablePortal
                    id="second-currencies"
                    options={currenciesList}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Search currency" />}
                    onSelect={(value) => onChangeSecondSelectedCurrency(value)}
                />
            </div>
            {loading && <Loader />}
            {error && <Alert severity="success" color="info">
                Error: {error}
            </Alert>}
        </div>
    );
};

export default CurrencyConverter;
