import { NextFunction, Request, Response } from "express";
import { IBranchInteractor } from "../interfaces/IBranchInteractor";
import { HttpStatus } from "../enums/httpStatusEnum";
import { Branch } from "../entities/Branch";

export class BranchController {
    userID: string = "madhura"; //this needs to be taken from the JWT token
    private interactor: IBranchInteractor;

    constructor(interactor: IBranchInteractor) {
        this.interactor = interactor;
    }

    async onCreateBranch(req: Request, res: Response, next: NextFunction){
        try{
            const branch: Branch = req.body;
            const data = await this.interactor.createBranch(branch, this.userID);
            res.status(HttpStatus.OK).send(data);   
        } catch (error) {
            next(error);
        }
    }
    async onUpdateBranch(req: Request, res: Response, next: NextFunction){
        try{
            const branch: Branch = req.body;
            const data = await this.interactor.updateBranch(branch, this.userID);
            res.status(HttpStatus.OK).send(data);   
        } catch (error) {
            next(error);
        }
    }
    async onGetBranches(req: Request, res: Response, next: NextFunction){
        try{
            const offset = parseInt(`${req.query.offset}`) || 0;
            const limit = parseInt(`${req.query.limit}`) || 50;
            const showAudit = parseInt(`${req.query.showAudit}`) || 0
            const data = await this.interactor.getBranches(limit, offset, showAudit);
            res.status(HttpStatus.OK).send(data);   
        } catch (error) {
            next(error);
        }
    }
    async onGetBranch(req: Request, res: Response, next: NextFunction){
        try{
            const branchCode = req.params.branchCode?.toString() || "";
            const data = await this.interactor.getBranch(branchCode);
            res.status(HttpStatus.OK).send(data);   
        } catch (error) {
            next(error);
        }
    }
}