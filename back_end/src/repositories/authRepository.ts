import { Accounts, Users } from "@prisma/client";

import { prisma } from "../config/database.js";

export type UserData = Omit<Users, "id" | "accountId">;
export type AccountData = Omit<Accounts, "id">;

async function findUserByUsername(username: string) {
    return await prisma.users.findUnique({
        where: { username },
        select: { id: true, username: true, password: true, accountId: false, accounts: true }
    });
};

async function registerUser(username: string, password: string) {
    await prisma.$transaction([
        prisma.users.create({ data: { username, password, accountId: (await prisma.accounts.create({ data: {} })).id } }),
    ]);
};

const authRepository = {
    findUserByUsername,
    registerUser,
};

export default authRepository;