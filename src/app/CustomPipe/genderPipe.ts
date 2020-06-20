import{Pipe, PipeTransform} from '@angular/core'
@Pipe({
name:'Gender',
pure:false
})

export class CustomPipe implements PipeTransform{

    transform(value:number) {
        if(value==0){
           return "Male";
        }
        else if(value==1){
          return "Female";
        }

        else if(value==2){
         return "Others";
        }


    }

}
