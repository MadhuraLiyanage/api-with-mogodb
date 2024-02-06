import { Branch } from "../entities/Branch";
import { IBranchRepository } from "../interfaces/IBranchRepository";
import { ResponseData } from "../entities/ResponseData";import { StatusCode } from '../enums/statusCodeEnum';
import { StatusMessage } from "../enums/statusMessage";

const mongoose = require('mongoose');
const  mongoBranch = require("../models/Branch.model");

export class BranchRepository implements IBranchRepository {

    async create(data: Branch, userId: string): Promise<ResponseData> {
        //check for existing branches with the same branch code        
        const findData = await this.findOne(data.branchCode);        
        if (findData.statusCode==="100" && findData.data.length>0 ){
            const resData = new ResponseData(StatusCode.AlreadyExists, StatusMessage.Unsuccessful, `Branch code '${data.branchCode}' already exists.`)
            return resData;    
        } else {
            //if branch code does not exists, create a branch document
            const newBranch = new mongoBranch({
                branchCode: data.branchCode,
                branchName: data.branchName,
                isActive: data.isActive,
                audit: [
                    {
                        userId: userId,
                        auditedOn: Date.now()
                    }
                ] 
            })

            return await newBranch.save()
                .then((savedBranch: any) => {
                    const resData = new ResponseData(StatusCode.Successful, StatusMessage.Successful, savedBranch);
                    return resData;                    
                })
                .catch((err: Error) => {
                    const resData = new ResponseData(StatusCode.Error, StatusMessage.Unsuccessful, err.message);
                    return resData;    
            });
        }
    }
    
    async update(data: Branch, userId: string): Promise<ResponseData> {
        let findData = await this.findOne(data.branchCode);

        if (findData.statusCode !=="100" || findData.data.length===0 ){
            const resData = new ResponseData(StatusCode.NotFound, StatusMessage.Unsuccessful, `Branch code '${data.branchCode}' does not exists.`)
            return resData;    
        } else {
            //get object Id to be updated
            const id: string = findData.data[0]._id;
            
            // audit element
            const newAudit = {
                userId: userId,
                auditedOn: Date.now()
            }

            //if branch code exists,update the branch document
            return await mongoBranch.findOneAndUpdate({_id: id}, {$set: data, $push: {audit:newAudit}}, { new: true })
                .then((updatedBranch: any) => {
                    const resData = new ResponseData(StatusCode.Successful, StatusMessage.Successful, updatedBranch);
                    return resData;
                })
                .catch((err: Error) => {
                    const resData = new ResponseData(StatusCode.Error, StatusMessage.Unsuccessful, err.message);
                    return resData;                       
            });
        }
    }

    async find(limit: number, offset: number, showAudit: number): Promise<ResponseData> {

        const hideAudit = showAudit !==1? {audit:0, __v:0} : {}

        return await mongoBranch.find({}, hideAudit).skip(offset).limit(limit)
            .then((data: any) => {
                const resData = new ResponseData(data.length > 0? StatusCode.Successful: StatusCode.NoRecordsFound, StatusMessage.Successful, data);
                return resData;
            })
            .catch((err: Error) => {
                const resData = new ResponseData(StatusCode.Error, StatusMessage.Unsuccessful, err.message);
                return resData;
            });
    }

    async findOne(branchCode: string): Promise<ResponseData> {
        return await mongoBranch.find({branchCode: branchCode})
        .then((data: any) => {
            const resData = new ResponseData(data.length > 0? StatusCode.Successful: StatusCode.NoRecordsFound, StatusMessage.Successful, data);
            return resData;
        })
        .catch((err: Error) => {
            const resData = new ResponseData(StatusCode.Error, StatusMessage.Unsuccessful, err.message);
            return resData;
        });    
    }
}