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
    await prisma.$transaction([
        prisma.accounts.update({ where: { id: creditedAccountId }, data: { balance: creditedOriginalBalance - value } }),
        prisma.accounts.update({ where: { id: debitedAccountId }, data: { balance: debitedOriginalBalance + value } }),
        prisma.transactions.create({ data: { creditedAccountId, debitedAccountId, value } }),
    ]);
};

async function checkHistory(accountId: number, onlyCredited?: string, onlyDebited?: string, dateOrdered?: string) {
    let orderBy = {};
    if (dateOrdered) orderBy = { createdAt: "desc" };

    let where = {};
    if (!onlyCredited && !onlyDebited) {
        where = {
            OR: [
                { creditedAccountId: accountId },
                { debitedAccountId: accountId },
            ],
        };
    } else if (onlyCredited && !onlyDebited) {
        where = {
            creditedAccountId: accountId,
        };
    } else if (!onlyCredited && onlyDebited) {
        where = {
            debitedAccountId: accountId,
        };
    };

    return await prisma.transactions.findMany({
        orderBy,
        where,
        select: {
            id: true,
            debitedAccountId: true,
            creditedAccountId: true,
            value: true,
            createdAt: true,
            creditedAccounts: {
                select: {
                    id: false,
                    balance: false,
                    users: {
                        select: {
                            id: false,
                            username: true,
                            password: false,
                            accountId: false,
                        },
                    },
                },
            },
            debitedAccounts: {
                select: {
                    id: false,
                    balance: false,
                    users: {
                        select: {
                            id: false,
                            username: true,
                            password: false,
                            accountId: false,
                        },
                    },
                },
            },
        },
    });
};

const transactionRepository = {
    checkBalance,
    findUserByUsername,
    cashTransfer,
    checkHistory,
};

export default transactionRepository;