import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../heros/heros.component';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  
  hero:Hero;
  constructor(private route:ActivatedRoute,
            private heroService:HeroService,
            private location:Location
    ) { }
  ngOnInit() {
    this.getHero();
  }

  getHero():void{
    const id= +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(e=> this.hero=e);
  }
  goBack(){
    this.location.back();
  }

}