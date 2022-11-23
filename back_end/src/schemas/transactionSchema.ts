import Joi from "joi";

export type TransferData = {
    username: string;
    amount: number;
};

const transaction = Joi.object<TransferData>({
    username: Joi.string().min(3).required(),
    amount: Joi.number().min(1).required(),
});

const transactionSchema = {
    transaction,
};

export default transactionSchema;