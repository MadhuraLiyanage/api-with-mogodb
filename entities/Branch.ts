//import Audit from './Audit';
export class Branch  {
    constructor(
        public readonly branchCode: string ="",
        public readonly branchName: string ="",
        public readonly isActive: boolean = true
    ){}
    //implement all the validations inside this class 
    //clean architecture
}
