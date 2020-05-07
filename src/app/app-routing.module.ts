import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HerosComponent } from './heros/heros.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { QuestionComponent } from './question/question.component';
import { AskQuestionComponent } from './question/components/ask-question/ask-question.component';

const routes: Routes = [
  {path:'',loadChildren:'./layout-module/layout-module.module#LayoutModuleModule'},
  {path:'account',loadChildren:'./login-area/login-area.module#LoginAreaModule'},
  {path:'question',component:QuestionComponent}
,{path:'askQuestion',component:AskQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
