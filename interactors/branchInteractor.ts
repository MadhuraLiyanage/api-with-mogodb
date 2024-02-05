import { Branch } from "../entities/Branch";
import { ResponseData} from "../entities/ResponseData";
import { IBranchInteractor } from "../interfaces/IBranchInteractor";
import { IBranchRepository } from "../interfaces/IBranchRepository";

export class BranchInteractor implements IBranchInteractor{
    private repository: IBranchRepository;

    constructor(repository: IBranchRepository){
        this.repository = repository;
    }

    createBranch(branch: Branch, userId: string): Promise<ResponseData> {
        return this.repository.create(branch, userId);
    }
    updateBranch(branch: Branch, userId: string): Promise<ResponseData> {
        return this.repository.update(branch, userId);
    }
    getBranches(limit: number, offset: number, showAudit: number): Promise<ResponseData>{
        return this.repository.find(limit, offset, showAudit);
    }
    getBranch(branchCode: string): Promise<ResponseData> {
        return this.repository.findOne(branchCode);
    }
}