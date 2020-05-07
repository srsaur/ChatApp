import { Component, OnInit, AfterContentChecked, ViewChild, ElementRef } from '@angular/core';
import { MockHeros } from '../mock_heros';
import { HeroService } from '../hero-service.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  @ViewChild("video")
  public video: ElementRef;
  
  selectedHero:Hero;
  heros:Hero[]=[];
  
  constructor(private hero:HeroService,private msg:MessageService) { }

  ngOnInit() {
    this.GetHeros();
  }

  


  private GetHeros():void {
    let self=this;
    this.hero.getHeroes()
      .subscribe(function (data) {
        self.heros = data;
      });
  }

  onSelectHero(hero:Hero){
      this.selectedHero=hero;
      this.msg.addMessage(`HeroService: Selected hero id=${hero.id} name=${hero.name}`);
  }


}

export interface Hero{
  id:number,
  name:string
}