import { TokenData } from "../middlewares/tokenMiddleware.js";
import transactionRepository from "../repositories/transactionRepository.js";
import { TransferData } from "../schemas/transactionSchema.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function checkBalance(tokenData: TokenData) {
    const id = tokenData.accountId;

    const { balance } = await transactionRepository.checkBalance(id);

    return balance;
};

async function cashTransfer(creditedAccount: TokenData, transferData: TransferData) {
    const { balance } = await transactionRepository.checkBalance(creditedAccount.accountId);
    creditedAccount.balance = balance;
    throwError(transferData.amount > balance, "Not Acceptable", `The amount you are trying to send (${transferData.amount}) is greater than your actual balance (${balance}), try a valid value`);

    throwError(creditedAccount.username === transferData.username, "Conflict", `The user you are trying to transfer cash is yourself, try a valid recipient user`);

    const debitedAccount = await transactionRepository.findUserByUsername(transferData.username);
    throwError(!!!debitedAccount, "Not Found", `The username "${transferData.username}" doens't exist, try a valid one`);

    await transactionRepository.cashTransfer(creditedAccount.accountId, creditedAccount.balance, debitedAccount.accounts.id, debitedAccount.accounts.balance, transferData.amount);
};

async function checkHistory(accountId: number) {
    return await transactionRepository.checkHistory(accountId);
};

const transactionService = {
    checkBalance,
    cashTransfer,
    checkHistory,
};

export default transactionService;