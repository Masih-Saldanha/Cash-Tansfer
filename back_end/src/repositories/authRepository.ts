import { Accounts, Users } from "@prisma/client";

import { prisma } from "../config/database.js";

export type UserData = Omit<Users, "id" | "accountId">;
export type AccountData = Omit<Accounts, "id">;

async function findUserByUsername(username: string) {
    return await prisma.users.findUnique({ where: { username } });
};

// async function registerAccount() {
//     return await prisma.accounts.create({ data: {} });
// };

async function registerUser(username: string, password: string) {
    await prisma.$transaction([
        prisma.users.create({ data: { username, password, accountId: (await prisma.accounts.create({ data: {} })).id } }),
    ]);

    // await prisma.users.create({ data: { username, password, accountId } });
};

const authRepository = {
    findUserByUsername,
    // registerAccount,
    registerUser,
};

export default authRepository;