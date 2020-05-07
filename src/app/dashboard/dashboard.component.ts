import { Component, OnInit } from '@angular/core';
import { Hero } from '../heros/heros.component';
import { HeroService } from '../hero-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes:Hero[];

  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes():void{
    let self=this;
    this.heroService.getHeroes().subscribe(e=> self.heroes=e.slice(1,5));
  }

}
