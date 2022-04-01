import React from 'react';
import { CircularProgress } from '@mui/material';
import './style.css'

export const Loader = () => {
    return (
        <div className='loaderWrapper'>
            <CircularProgress className='loader' />
        </div>
    )
}