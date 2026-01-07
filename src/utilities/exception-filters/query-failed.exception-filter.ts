import { ArgumentsHost, Catch, RpcExceptionFilter } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { Observable, throwError } from "rxjs";
import { RpcException } from "@nestjs/microservices";

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements RpcExceptionFilter<QueryFailedError> {

    catch(exception: QueryFailedError, host: ArgumentsHost): Observable<any> {
        console.log(exception);
        return throwError(new RpcException(this.parseMessage(exception.message)));
    }

    parseMessage(message: string): string {
        if (message.indexOf('Duplicate') >= 0) {
            return message;
        } else 
            return 'An unexpected error occured in the application.';
    }

}