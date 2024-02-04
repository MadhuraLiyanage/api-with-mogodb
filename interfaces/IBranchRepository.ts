import { Branch } from "../entities/Branch";
import { ResponseData } from "../entities/ResponseData";

export interface IBranchRepository {
    create(data: Branch): Promise<ResponseData>;
    update(data: Branch): Promise<ResponseData>;
    find(limit: number, offset: number): Promise<ResponseData>;
    findOne(branchCode: string): Promise<ResponseData>;
}