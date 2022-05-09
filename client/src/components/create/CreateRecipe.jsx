import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createRecipe, getDiets } from '../../redux/actions';
import validate from './validate';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './CreateRecipe.module.css';


let equals = function (a1, a2) {
    if (a1.length !== a2.length) return false;

    for (var i = 0; i < a2.length; i++) {
        if (a1[i] instanceof Array && a2[i] instanceof Array) {
            if (!a1[i].equals(a2[i])) return false;
        } else if (a1[i] !== a2[i]) {
            return false;
        }
    }
    return true;
};
let initialInput = ['', '', '', 0, 0, '', ''];

export default function CreateRecipe() {
    const dispatch = useDispatch();
    const history = useHistory();


    const [input, setInput] = useState({
        name: '',
        image: '',
        summary: '',
        spoonacularScore: 0,
        healthScore: 0,
        instructions: '',
        dishTypes: '',
        diets: []
    });
    const [error, setError] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [diets, setDiets] = useState([]);
    const [check, setCheck] = useState(false);

    //  para checkbox
    useEffect(() => {
        getDiets().then(response => setDiets(response));
    }, []);


    useEffect(() => {
        if (!equals(initialInput, Object.values(input)) && !Object.keys(error).length && check === true) {
            setDisabled(false);
        }

    }, [input, error, check]);


    let handleChange = (e) => {
        setInput(prevState => {
            const newState = {
                ...prevState,
                [e.target.name]: e.target.value
            };

            setError(validate(newState));
            return newState;
        });
    };

    let handleSubmit = (e) => {
        e.preventDefault();

        if (!equals(initialInput, Object.values(input)) && !Object.keys(error).length) {
            dispatch(createRecipe(input));
            history.push('/home')
            alert('Your recipe was created!');
        } else {
            alert('all fields must be completed');
        };

        setInput({
            name: '',
            image: '',
            summary: '',
            spoonacularScore: 0,
            healthScore: 0,
            instructions: '',
            dishTypes: '',
            diets: []
        });
    };

    let handleDietChange = (e) => {
        e.preventDefault();

        if (check === false) {
            setCheck(true);
        } else {
            setCheck(false);
        };
    };

    let handleDietSubmit = (e) => {
        e.preventDefault();

        if (!input.diets.includes(e.target.value)) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            });
        };
    };

    return (
        <>
            <div>
                <div>
                    <div className={styles.containerForm}>
                        <NavLink to='/home'>
                            <button className={styles.buttonHome1}>x</button>
                        </NavLink>
                        <h2>New Recipe</h2>
                        <p>The best recipes are those that are cooked in every house in the world! Share yours and be part of someone else's table!</p>
                        <form onSubmit={handleSubmit} className={styles.info}>

                            <label>Name: </label>
                            <input type="text" name="name" value={input.name} onChange={handleChange} required placeholder={`Recipe title`} />
                            <output>{error?.name || ''}</output>


                            <label>image's URL: </label>
                            <input type="url" name="image" value={input.image} onChange={handleChange} required placeholder={`image URL`} />
                            <output>{error?.image || ''}</output>

                            <label>Summary: </label>
                            <input type="text" name="summary" value={input.summary} onChange={handleChange} required placeholder={`Recipe summary`} />
                            <output>{error?.summary || ''}</output>

                            <label>Score: </label>
                            <input type="number" name="spoonacularScore" value={input.spoonacularScore} onChange={handleChange} required placeholder={`Recipe puntuation`} />
                            <output>{error?.spoonacularScore || ''}</output>

                            <label>Healthy score: </label>
                            <input type="number" name="healthScore" value={input.healthScore} onChange={handleChange} required placeholder={`Recipe healthy puntuation`} />
                            <output>{error?.healthScore || ''}</output>

                            <label>Steps: </label>
                            <input type="text" name="instructions" value={input.instructions} onChange={handleChange} required placeholder={`Step by step recipe`} />
                            <output>{error?.instructions || ''}</output>

                            <label>Dish Type: </label>
                            <input type="text" name="dishTypes" value={input.dishTypes} onChange={handleChange} required placeholder={`What dish type is this?`} />
                            <output>{error?.dishTypes || ''}</output>

                            <div className={styles.checks}>
                                <label>Diet Types: </label>
                                <ul>
                                    {diets.map(({ name }, index) => {
                                        return (
                                            <li key={index}>

                                                <input
                                                    type="checkbox"
                                                    id={index}
                                                    name={name}
                                                    value={name}
                                                    onClick={handleDietSubmit}
                                                    onChange={handleDietChange}
                                                />
                                                <span>{name}</span>

                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <input type="submit" value="CREATE" disabled={disabled} className={styles.buttonCreate} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};
