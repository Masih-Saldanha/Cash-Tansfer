import { Request, Response } from "express";

async function test(req: Request, res: Response) {
    const data = req.body;
    
    console.log(data);
    res.status(200).send(data);
}

const testController = {
    test,
}

export default testController;