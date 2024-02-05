import { Branch } from "../entities/Branch";
import { ResponseData } from "../entities/ResponseData";

export interface IBranchRepository {
    create(data: Branch, userId: string): Promise<ResponseData>;
    update(data: Branch, userId: string): Promise<ResponseData>;
    find(limit: number, offset: number, showAudit: number): Promise<ResponseData>;
    findOne(branchCode: string): Promise<ResponseData>;
}