import {Component,OnInit, Inject, TemplateRef,HostListener,Input} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { PeopleDatabase } from './people-database';
import { trigger,style,transition,animate,keyframes,query,stagger, state } from '@angular/animations';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-list-prophylactic',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('toggle', [
      state('true', style({ opacity: 1, color: 'red' })),
      state('void', style({ opacity: 1, color: 'blue' })),
      //transition(':enter', animate('500ms ease-in-out')),
      //transition(':leave', animate('500ms ease-in-out'))
      transition(':enter', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('2s ease-in')
            ]),
            transition(':leave', [
                animate('0s 0s ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
    ])
  ]
})
export class DialogComponent{
 
 
 title:string = environment.title;
 tab1: string = environment.tab1;
 data_not_found: string = environment.data_not_found; 
 tab2: string = environment.tab2;
 tab3: string = environment.tab3;
 surname: string = environment.surname;
 firstname : string = environment.firstname;
 lastname : string = environment.lastname;
 bithday : string = environment.bithday;
 telefon : string = environment.telefon;
 t_years : string = environment.t_years;
 start_date_etap1 : string = environment.start_date_etap1;
 end_date_etap1 : string = environment.end_date_etap1 ;
 start_date_etap2 : string = environment.start_date_etap2;
 end_date_etap2 : string = environment.end_date_etap2;
 ref_id_person : string = environment.ref_id_person;
 pm_god : string = environment.pm_god;
 pm_kvartal : string = environment.pm_kvartal;
 PM_HOSPITAL_RESULT : string = environment.PM_HOSPITAL_RESULT;
 adress : string = environment.adress ;
 tel : string = environment.tel;
 pm_result : string = environment.pm_result;
 close_card : string = environment.close_card;
 nstage : string = environment.nstage;
 dinfo : string = environment.dinfo ;
 tinfo : string = environment.tinfo;
 linksmo : string = environment.linksmo;
 _survey: string = environment.survey;
_linksmo_2: string = environment.linksmo_2;
_linksmo_1: string = environment.linksmo_1;
_linksmo_4: string = environment.linksmo_4;
_statsurvey1: string = environment.statsurvey1;
_statsurvey2: string = environment.statsurvey2;
_statsurvey3: string = environment.statsurvey3;
_statsurvey4: string = environment.statsurvey4;
_statsurvey5: string = environment.statsurvey5;
_statsurvey6: string = environment.statsurvey6;
_statsurvey7: string = environment.statsurvey7;
_statsurvey8: string = environment.statsurvey8;
_statsurvey9: string = environment.statsurvey9;
_statsurvey10: string = environment.statsurvey10;
_statsurvey_result: string = environment.statsurvey_result;
_statsurvey_date: string = environment.statsurvey_date;

 
 
 
 
 private data_survey = [];
 private data_ger = [];
 private data_plan_informir;
 data_informir = [];
 
  @Input() show:boolean = true;
  flag:boolean = true;
  flag_informed:boolean = true;
  flag_survey:boolean = true;
  /*@HostListener('document:click')
  onClick(){
    this.show=!this.show;
  }*/

  animationStarted($event) {
    console.log('Start');
  }

  animationDone($event) {
    //console.log('End');
  }
 
 constructor(public dialogRef: MdDialogRef<DialogComponent>,@Inject(MD_DIALOG_DATA) public data: any,private personSearchIsurService: PeopleDatabase) {
 //console.log('ddddd '+JSON.stringify(data));
 }
 
 check($event : any): void {
 	//console.log($event, null, 0);
 	console.log('show '+this.show);
 	if($event.index === 3){
 	
	 	let data_cust ={
	 	  surname: this.data.personSurname,
	 	  firstname:this.data.personKindfirstname,
	 	  lastname:this.data.personKindlastname,
	 	  bithday:this.data.personBirthday
	 	}
	 	
	 	this.personSearchIsurService.searchPersonSurveyr(data_cust)
	 	.then(result =>{
	 	  this.flag_survey = false;
	 	  this.data_survey=result;
	 	});
 	}
 	// tab '������ ���' have the index equal 1
 	if($event.index === 1){
 	
 	
 	    
	 	let data_cust ={
	 	  surname: this.data.personSurname,
	 	  firstname:this.data.personKindfirstname,
	 	  lastname:this.data.personKindlastname,
	 	  bithday:this.data.personBirthday
	 	}
	 	this.personSearchIsurService.searchPersonGer(data_cust)
	 	.then(result =>{
	 	 this.show= false;
	 	  this.data_ger=result;
	 	});
 	}
 	
 	if($event.index === 2){
 	
	 	let data_cust ={
		 	  surname: this.data.personSurname,
		 	  firstname:this.data.personKindfirstname,
		 	  lastname:this.data.personKindlastname,
		 	  bithday:this.data.personBirthday
		 	}
		 	
		this.personSearchIsurService.searchPersonInformir(data_cust)
	 	.then(result =>{
	 	
	 		this.personSearchIsurService.searchPlanPersonInformir('623375')
	 		.then(result_2 =>{ 
	 			this.data_plan_informir = result_2;
	 			
	 			this.data_informir = result;
	 			this.flag_informed = false;
	 			
	 			for (var index in this.data_informir) {
	 				   this.data_informir[index].nStage=== 0 ?  this.data_informir[index].nStage = environment.no_inform :
	 				   this.data_informir[index].nStage === 1 ?  this.data_informir[index].nStage = environment.one_part_inform :
	 				   this.data_informir[index].nStage === 2 ?  this.data_informir[index].nStage= environment.second_part_inform :
	 				   this.data_informir[index].nStage === 3 ?  this.data_informir[index].nStage = environment.secondory_inform : '';
	 				   
	 				   this.data_informir[index].tInfo === 1 ?  this.data_informir[index].tInfo = environment.tinfo_1 :
	 				   this.data_informir[index].tInfo=== 2 ?  this.data_informir[index].tInfo= environment.tinfo_2 :
	 				   this.data_informir[index].tInfo === 3 ?  this.data_informir[index].tInfo = environment.tinfo_3 :
	 				   this.data_informir[index].tInfo === 4 ?  this.data_informir[index].tInfo = environment.tinfo_4 :
	 				   this.data_informir[index].tInfo === 5 ?  this.data_informir[index].tInfo = environment.tinfo_5 :
	 				   this.data_informir[index].tInfo === 6 ?  this.data_informir[index].tInfo = environment.tinfo_6 :
	 				   this.data_informir[index].tinfo === 7 ?  this.data_informir[index].tInfo = environment.tinfo_7 : '';
  					
				}
	 			
	 			
	 		});
	 		
	 		
	 	}); 	
 	}
 	
 }
  
   
}
