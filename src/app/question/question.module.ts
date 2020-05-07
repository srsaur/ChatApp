import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { MaterialModule } from '../material/material.module';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuestionComponent, AskQuestionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ]
})
export class QuestionModule { }
