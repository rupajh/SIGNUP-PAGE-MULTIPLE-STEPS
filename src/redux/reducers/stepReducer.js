const initialState = parseInt(localStorage.getItem('currentStep'), 10) || 0;

const stepReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_STEP':
            return action.payload; 
        default:
            return state;
    }
};

export default stepReducer;
