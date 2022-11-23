import { Transactions } from "@prisma/client";

import { prisma } from "../config/database.js";

export type TransactionData = Omit<Transactions, "id">;

async function checkBalance(id: number) {
    return await prisma.accounts.findUnique({ where: { id } });
};

async function findUserByUsername(username: string) {
    return await prisma.users.findUnique({
        where: { username },
        select: { id: true, username: true, password: false, accountId: false, accounts: true },
    });
};

async function cashTransfer(creditedAccountId: number, creditedOriginalBalance: number, debitedAccountId: number, debitedOriginalBalance: number, value: number) {
    // 1 - TIRA DINHEIRO DA ORIGEM
    // 2 - PÔE DINHEIRO NO DESTINO
    // 3 - REGISTRA
    await prisma.$transaction([
        prisma.accounts.update({ where: { id: creditedAccountId }, data: { balance: creditedOriginalBalance - value } }),
        prisma.accounts.update({ where: { id: debitedAccountId }, data: { balance: debitedOriginalBalance + value } }),
        prisma.transactions.create({ data: { creditedAccountId, debitedAccountId, value } }),
    ]);
};

const transactionRepository = {
    checkBalance,
    findUserByUsername,
    cashTransfer,
};

export default transactionRepository;