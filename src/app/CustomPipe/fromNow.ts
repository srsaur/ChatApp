import {Pipe,PipeTransform} from '@angular/core'
import * as moment from 'moment'

@Pipe({
 name:'fromNow',
 pure:false
})

export class fromNowPipe implements PipeTransform{
  transform(value: Date) {
     return moment(value).fromNow();
  }

}
