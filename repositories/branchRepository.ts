import { Branch } from "../entities/Branch";
import { IBranchRepository } from "../interfaces/IBranchRepository";
import { ResponseData } from "../entities/ResponseData";import { StatusCode } from "../enums/statusCodeEnum";
import { StatusMessage } from "../enums/statusMessage";

const  mongoBranch = require("../models/Branch.model");

export class BranchRepository implements IBranchRepository {

    create(data: Branch): Promise<ResponseData> {
        throw new Error("Method not implemented.");
    }
    update(data: Branch): Promise<ResponseData> {
        throw new Error("Method not implemented.");
    }
    find(limit: number, offset: number): Promise<ResponseData> {
        return mongoBranch.find().skip(offset).limit(limit)
            .then((data: any) => {
                const resData = new ResponseData(StatusCode.Successful, StatusMessage.Successful, data);
                return resData;
            })
            .catch((err: Error) => {
                const resData = new ResponseData(StatusCode.Error, StatusMessage.Unsuccessful, err.message);
                return resData;
            });
    }
    findOne(branchCode: string): Promise<ResponseData> {
        throw new Error("Method not implemented.");
    }

}