import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipes, clear } from '../../redux/actions';
import Cards from './Cards';
import NavBar from './NavBar';

export default function Home(){  
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        dispatch(getRecipes())

        return () => {
            dispatch(clear())
        }  
    }, [dispatch]);

    return (
        <>
            <NavBar setCurrentPage={setCurrentPage} currentPage={currentPage}/>
            <Cards setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </>
    )
};