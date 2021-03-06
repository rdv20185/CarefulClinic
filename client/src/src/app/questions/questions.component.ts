import { Component } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger, state } from '@angular/animations';
import { QuestionsService } from './questions.service';
import { OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {MdSelectModule,MdInputModule} from '@angular/material';


import { Question } from '../model/question.interface';
//import { EntityQuestions } from '../model/entity_question.model';


@Component({
  selector: 'questions-component',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [QuestionsService],
  animations: [

    trigger('questionsAnim', [
      transition('* => *', [
        query('.full-width,.test', style({ opacity: 0 }), {optional: true}),

        query('.full-width,.test', stagger('1400ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),
        
      ])
      
    ]),
    
    trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.6s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 0.1s ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])

  ]
  
})
export class QuestionsComponent  implements OnInit{
   
      
   questions_rest: Question[];
   //entityquestions = new EntityQuestions();
	
   items = [];
   public myForm: FormGroup;
   tessss = { id: '2017-06-30T17:00:00.000Z',  ques: [{id:'Zero',question:'dsdsdsdsdsdsds'}] };
      

  constructor(private questionsService: QuestionsService,private _fb: FormBuilder) {
    this.items = ['Hey this is an item', 'Here is another one','This is awesome'];
  }
  
  pushItem() {
    this.items.push('Oh yeah that is awesome');
  }
  removeItem() {
    this.items.pop();
  }
  
   getQuestions(): Promise<Question[]> {
	    return this.questionsService.getAllQuestions();
   }
   
   
  
  ngOnInit(): void {
  
  	this.myForm = this._fb.group({
  			date_response:['',Validators.required], 
       		questions_list: this._fb.array([])
    });
    
    this.getQuestions().then(result =>{
    	this.questions_rest = result;
    	for(let i = 0; i < this.questions_rest.length; i++){
     		this.addQuestion(this.questions_rest[i]);
  		}
    		
    })
  }
  
  
  save(form: any):void {
  console.log(JSON.stringify(form.value));
  this.questionsService.createResponse(form.value);
  }
  
  resetForm() {
  	  this.myForm.reset(); 
  	  
  }
  
  
  addQuestion(obj : Question) {
  
        let control = <FormArray>this.myForm.controls['questions_list'];
        let addrCtrl = this.initQuestion(obj);
        control.push(addrCtrl);
        
  }
    
	initQuestion(object : Question) {
	
	    return this._fb.group({
	        id: [object.id],
	        question: [object.question,[Validators.required, Validators.pattern('^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$')]]
	        
	    });
	    
	}
	
	// task related functions
  	getTasks(jobForm){
    	return jobForm.get('questions_list').controls;
  	}
}
