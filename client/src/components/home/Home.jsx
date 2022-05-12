import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes, clear } from '../../redux/actions';
import Cards from './Cards';
import NavBar from './NavBar';

export default function Home(){  
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getRecipes())

        return () => {
            dispatch(clear())
        }  
    }, [dispatch]);

    return (
        <>
            <NavBar />
            <Cards />
        </>
    )
};