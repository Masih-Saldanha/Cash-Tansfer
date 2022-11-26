import axios from "axios";
import jwt_decode from "jwt-decode";

const site = "http://ec2-52-90-242-30.compute-1.amazonaws.com/api";

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