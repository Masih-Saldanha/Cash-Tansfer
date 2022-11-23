import { TokenData } from "../middlewares/tokenMiddleware.js";
import transactionRepository from "../repositories/transactionRepository.js";

async function checkBalance(tokenData: TokenData) {
    const id = tokenData.accountId;

    const { balance } = await transactionRepository.checkBalance(id);

    return balance;
};

const transactionService = {
    checkBalance,
};

export default transactionService;