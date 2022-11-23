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
    // 1 - VERIFICA SE USUÁRIO DE ORIGEM TEM DINHEIRO SUFICIENTE PRA MANDAR
    const { balance } = await transactionRepository.checkBalance(creditedAccount.accountId);
    creditedAccount.balance = balance;
    throwError(transferData.amount > balance, "Not Acceptable", `The amount you are trying to send (${transferData.amount}) is greater than your actual balance (${balance}), try a valid value`);

    // 2* = VERIFICA SE O USUÁRIO DE DESTINO É IGUAL AO DE ORIGEM
    throwError(creditedAccount.username === transferData.username, "Conflict", `The user you are trying to transfer cash is yourself, try a valid recipient user`);

    // 2 - SE TEM, VERIFICA SE USUÁRIO DESTINATÁRIO EXISTE E O ARMAZENA EM VARÍAVEL
    const debitedAccount = await transactionRepository.findUserByUsername(transferData.username);
    throwError(!!!debitedAccount, "Not Found", `The username "${transferData.username}" doens't exist, try a valid one`);

    // 3 - SE EXISTE, EM $TRANSACTION TIRAR AMOUNT DO BALANCE DA ORIGEM, ADICIONAR AMOUNT NO DESTINO E GERAR TRANSACTION
    await transactionRepository.cashTransfer(creditedAccount.accountId, creditedAccount.balance, debitedAccount.accounts.id, debitedAccount.accounts.balance, transferData.amount);
}

const transactionService = {
    checkBalance,
    cashTransfer,
};

export default transactionService;