import { NextFunction, Request, Response } from "express";
import { IBranchInteractor } from "../interfaces/IBranchInteractor";
import { HttpStatus } from "../enums/httpStatusEnum";

export class BranchController {
    private interactor: IBranchInteractor;

    constructor(interactor: IBranchInteractor) {
        this.interactor = interactor;
    }

    async onCreateBranch(req: Request, res: Response, next: NextFunction){}
    async onUpdateBranch(req: Request, res: Response, next: NextFunction){}
    async onGetBranches(req: Request, res: Response, next: NextFunction){
        try{
            const offset = parseInt(`${req.query.offset}`) || 0
            const limit = parseInt(`${req.query.limit}`) || 0
            const data = await this.interactor.getBranches(limit, offset);
            res.status(HttpStatus.OK).send(data);   
        } catch (error) {
            next(error);
        }
    }
    async onGetBranch(req: Request, res: Response, next: NextFunction){}
}