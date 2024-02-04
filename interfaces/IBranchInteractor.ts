import { Branch } from '../entities/Branch';
import { ResponseData } from '../entities/ResponseData';

export interface IBranchInteractor {
    createBranch(branch: Branch): Promise<ResponseData>;
    updateBranch(branch: Branch): Promise<ResponseData>;
    getBranches(limit: number, offset: number): Promise<ResponseData>;
    getBranch(branchCode: string): Promise<ResponseData>;
}