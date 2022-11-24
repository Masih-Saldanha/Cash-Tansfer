import axios from "axios";
import jwt_decode from "jwt-decode";

function signUp(signUpData) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, signUpData);
};

function signIn(signInData) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signin`, signInData);
};

function returnDecodedToken(token) {
    if (!token) {
        return null;
    };
    return jwt_decode(token);
};

const authService = {
    signUp,
    signIn,
    returnDecodedToken,
};

export default authService;