const initialState = {
    verificationMobile:'',
    otp:'',
    mobile: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileImage: '',
    aboutMe: '',
    bannerImage: '',
    aadharNumber: '',
    aadharDoc: '',
    panNumber: '',
    panDoc: '',
    preferredLanguages: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DETAILS':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
