import { Branch } from "../entities/Branch";
import { ResponseData} from "../entities/ResponseData";
import { IBranchInteractor } from "../interfaces/IBranchInteractor";
import { IBranchRepository } from "../interfaces/IBranchRepository";

export class BranchInteractor implements IBranchInteractor{
    private repository: IBranchRepository;

    constructor(repository: IBranchRepository){
        this.repository = repository;
    }

    createBranch(branch: Branch): Promise<ResponseData> {
        throw new Error("Method not implemented.");
    }
    updateBranch(branch: Branch): Promise<ResponseData> {
        throw new Error("Method not implemented.");
    }
    getBranches(limit: number, offset: number): Promise<ResponseData>{
        return this.repository.find(limit, offset);
    }
    getBranch(branchCode: string): Promise<ResponseData> {
        throw new Error("Method not implemented.");
    }
    
}