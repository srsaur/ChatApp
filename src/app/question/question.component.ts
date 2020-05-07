import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  dataSource: any[] = [];
  displayedColumns = ['Id', 'Mark', 'Remain'];
  extraColumns=[];
  question: question[] = data;
  selectedQuestion: question;

  constructor() { }

  ngOnInit() {
  }

  onQuestionSelect(data: question) {
    this.selectedQuestion = data;
  }

  removeColumn(data: any) {
    let self = this;
    for (let index = self.dataSource.length - 1; index >= 0; index--) {
     if(self.checkRowIsDeleteable(index, data)){
      self.dataSource.splice(index,1);       
     }
    }
    self.displayedColumns.splice(self.displayedColumns.indexOf(data), 1);
    self.extraColumns.splice(self.extraColumns.indexOf(data), 1);
  }

  private checkRowIsDeleteable(index: number, data: string): boolean {
    let self = this;
    for (const key in self.dataSource[0]) {
      if (self.extraColumns.some(e => e == key && e != data)) {
        if (!!self.dataSource[index][key]) {
           return false;
        }
      }
    }
    return true;
  }

  checkColumnDeleteButton(data: string): boolean {
    return this.question.some(e => e.id == data);
  }

  addColumn() {
    let self = this;

    if (self.extraColumns.some(e => e == self.selectedQuestion.id)) {
      alert("You already choose this question");
    }
    else {
      self.displayedColumns.splice(1,0,self.selectedQuestion.id);
      self.extraColumns.push(self.selectedQuestion.id);
      for (let index = 0; index < self.selectedQuestion.answers.length; index++) {
        if (self.dataSource.length < (index + 1)) {
          let data: any = {};
          data.Id = index + 1;
          data.Mark = 100;
          data.Remain = 100;
          data[self.selectedQuestion.id] = self.selectedQuestion.answers[index].id
          self.dataSource.push(data);
        }
        else {
          self.dataSource[index][self.selectedQuestion.id] = self.selectedQuestion.answers[index].id
        }
      }

    }
  }

}

export const data: question[] =
  [
    {
      id: 'q1',
      question: 'where are u from?',
      answers: [
        { id: 'a1', answer: 'Nowhere' },
        { id: 'a2', answer: 'nothing' },
        { id: 'a3', answer: 'everyThing' },
      ]
    },

    {
      id: 'q2',
      question: 'What is your Name?',
      answers: [
        { id: 'a1', answer: 'Nowhere' },
        { id: 'a2', answer: 'nothing' },
        { id: 'a3', answer: 'everyThing' },
        { id: 'a4', answer: 'Nowhere' },
        { id: 'a5', answer: 'nothing' },
        { id: 'a6', answer: 'everyThing' }
      ]
    },

    {
      id: 'q3',
      question: 'What is you want?',
      answers: [{ id: 'a1', answer: 'Nowhere' },
      { id: 'a2', answer: 'nothing' },
      { id: 'a3', answer: 'everyThing' },
      { id: 'a4', answer: 'nothing' },
      { id: 'a5', answer: 'everyThing' }]
    },

    {
      id: 'q4',
      question: 'What are u missing?',
      answers: [
        { id: 'a1', answer: 'Nowhere' },
        { id: 'a2', answer: 'nothing' },
        { id: 'a3', answer: 'everyThing' },
        { id: 'a4', answer: 'Nowhere' },
        { id: 'a5', answer: 'nothing' },
        { id: 'a6', answer: 'everyThing' },
        { id: 'a7', answer: 'Nowhere' },
        { id: 'a8', answer: 'nothing' },
        { id: 'a9', answer: 'everyThing' },]
    },

    {
      id: 'q5',
      question: 'What do u want',
      answers: [{ id: 'a1', answer: 'Nowhere' },
      { id: 'a2', answer: 'nothing' },
      { id: 'a3', answer: 'everyThing' }
        , { id: 'a4', answer: 'Nowhere' },
      { id: 'a5', answer: 'nothing' },
      { id: 'a6', answer: 'everyThing' }
        , { id: 'a7', answer: 'Nowhere' },
      ]
    }

  ]

export interface question {
  id: string,
  question: string,
  answers: Answer[]
}

export interface Answer {
  id: string,
  answer: string
}
