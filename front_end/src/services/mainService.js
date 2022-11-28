import axios from "axios";

// const site = "http://ec2-52-90-242-30.compute-1.amazonaws.com/api";
const site = process.env.REACT_APP_BASE_URL;

function getBalance(config) {
    return axios.get(`${site}/transaction/balance`, config);
};

function transferCash(transferData, config) {
    return axios.post(`${site}/transaction/transfer`, transferData, config);
};

function getHistory(config, onlyCredited, onlyDebited, dateOrdered) {
    return axios.get(`${site}/transaction/history?onlyCredited=${onlyCredited}&onlyDebited=${onlyDebited}&dateOrdered=${dateOrdered}`, config);
};

const mainService = {
    getBalance,
    transferCash,
    getHistory,
};

export default mainService;