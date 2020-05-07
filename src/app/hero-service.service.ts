import { Injectable } from '@angular/core';
import { Hero } from './heros/heros.component';
import { MockHeros } from './mock_heros';
import{observable,of, Observable} from 'rxjs'
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private msg:MessageService) { }

  getHeroes(): Observable<Hero[]>{
    this.msg.addMessage('HeroService: FetchService');
    return of(MockHeros);
  }
  getHero(id):Observable<Hero>{
    this.msg.addMessage(`HeroService: fetched hero id=${id}`);
    return of(MockHeros.find(e=>e.id==id));
  }
}
