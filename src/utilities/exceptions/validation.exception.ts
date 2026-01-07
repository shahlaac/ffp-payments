import { RpcException } from "@nestjs/microservices";
import { ValidationError } from "class-validator";

export class ValidationException extends RpcException {

    constructor(errors: ValidationError[]) {
        const errorMessages = [];
        errors.forEach(err => {
            for(const prop in err.constraints)
            errorMessages.push(err.constraints[prop]);
        })
        super(JSON.stringify({ statusCode: 400, message: [errorMessages.join(', ')], "error": "Bad Request"}));
    }
}