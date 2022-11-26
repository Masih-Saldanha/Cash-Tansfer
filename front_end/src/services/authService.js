import axios from "axios";
import jwt_decode from "jwt-decode";

const site = "http://node_cash_transfer_app/api";

function signUp(signUpData) {
    return axios.post(`${site}/auth/signup`, signUpData);
};

function signIn(signInData) {
    return axios.post(`${site}/auth/signin`, signInData);
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