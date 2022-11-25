import axios from "axios";

function getBalance(config) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/transaction/balance`, config);
};

function transferCash(transferData, config) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/transaction/balance`, transferData, config);
};

function getHistory(config, onlyCredited, onlyDebited, dateOrdered) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/transaction/history?onlyCredited=${onlyCredited}&onlyDebited=${onlyDebited}&dateOrdered=${dateOrdered}`, config);
};

const mainService = {
    getBalance,
    transferCash,
    getHistory,
};

export default mainService;