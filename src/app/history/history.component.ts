import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


declare var require: any;


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
 
})
export class HistoryComponent implements OnInit {

  language;
  ngOnInit(){

    this.route.paramMap.subscribe(params=>{
     
         this.language = params.get('language');
         
         if(this.language == "ar") {
          require('style-loader!./history.component2.css');
        } else{
          require('style-loader!./history.component.css');
        }
      });
  }


  constructor(public translate:TranslateService, private route:ActivatedRoute){
    // this.route.paramMap.subscribe(params=>{
    //   this.language = params.get('language');
    //   alert(this.language);
    
    // });

}

}
