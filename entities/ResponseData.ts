import { StatusCode } from '../enums/statusCodeEnum';
import { StatusMessage } from '../enums/statusMessage';
export class ResponseData {
    constructor(
        public readonly statusCode: StatusCode,
        public readonly statusMessage: StatusMessage,
        public readonly data?: any
    ){}

    //implement all the validations inside this class 
    //clean architecture
}
