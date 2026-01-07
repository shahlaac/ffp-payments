import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class DateTimeService {
    
    momentFromDateString(dateString: string): moment.Moment {
        return moment(dateString);
    }

    currentDate():string {
        return moment().utc().format()
    }

    currentTimestamp():number {
        return moment().utc().valueOf()
    }

    currentTimestampString():string {
        return (moment().utc().valueOf()).toString();
    }
}