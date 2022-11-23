import { Transactions } from "@prisma/client";

import { prisma } from "../config/database.js";

export type TransactionData = Omit<Transactions, "id">;

async function checkBalance(id: number) {
    return await prisma.accounts.findUnique({ where: { id } });
};

const transactionRepository = {
    checkBalance,
};

export default transactionRepository;