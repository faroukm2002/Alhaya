import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationStart, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { Globals } from './servicesApi/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private globals: Globals,
    private facebookService: FacebookService,
    private router: Router
  ) {
    // Show spinner on navigation start
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      this.spinner.show();
    });

    // Hide spinner on navigation end
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    });
  }

  ngOnInit(): void {
    this.initFacebookService();
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml: true, version: 'v3.2' };
    this.facebookService.init(initParams);
  }

  onActivate() {
    window.scroll(0, 0);
  }
}