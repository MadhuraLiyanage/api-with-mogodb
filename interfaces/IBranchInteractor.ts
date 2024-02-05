import { Branch } from '../entities/Branch';
import { ResponseData } from '../entities/ResponseData';

export interface IBranchInteractor {
    createBranch(branch: Branch, userId: string): Promise<ResponseData>;
    updateBranch(branch: Branch, userId: string): Promise<ResponseData>;
    getBranches(limit: number, offset: number, showAudit: number): Promise<ResponseData>;
    getBranch(branchCode: string): Promise<ResponseData>;
}