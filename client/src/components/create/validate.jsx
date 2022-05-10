export default function validate(state){
    const errors = {};

    if(!state.name){
        errors.name= 'name is required';
    }else if(!/^[a-zA-Z\s]/.test(state.name)){
        errors.name= 'name is invalid: it must not contain numbers or special characters '
    }

    if(!state.image){
        errors.image= 'image is required';
    }else if(!/^(?:([^:/?#]+):)?(?:([^/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?$/gm.test(state.image)){
        errors.image= 'image is invalid: it has to be the URL of an image';
    };

    if(!state.summary){
        errors.summary= 'summary is required: write a little description';
    };

    if(!state.spoonacularScore){
        errors.spoonacularScore= 'score is required';
    }else if(!Number(state.spoonacularScore) || state.spoonacularScore < 0 || state.spoonacularScore > 100){
        errors.spoonacularScore='score is invalid: score from 0 to 100';
    };

    if(!state.healthScore){
        errors.healthScore= 'healthy score is required';
    }else if(!Number(state.healthScore) || state.healthScore < 0 || state.healthScore > 100){
        errors.healthScore='healthy score is invalid: score from 0 to 100';
    };

    if(!state.instructions){
        errors.instructions= 'steps are required: tell us how to do it';
    };

    if(!state.dishTypes){
        errors.dishTypes = 'Should write unless one type of dish for this recipe'
    }

    return errors;
};

