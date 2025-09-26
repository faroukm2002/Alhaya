import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import Swiper from 'swiper';
import {Globals} from '../servicesApi/globals';
import {Title} from '@angular/platform-browser';
import {ISubscription} from 'rxjs-compat/Subscription';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiCalledService} from '../servicesApi/api-called.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css'],
})

export class SolutionComponent implements OnInit, AfterViewInit, OnDestroy {
  solutionForm: FormGroup;
  catSwiper;
  lang = 'en';
  check = false;
  rtl: string;
  phase = 1;
  noOfRooms = 0;
  currentRoomNumber = 1;
  qoutationId = 0;
  roomFeatures = [];
  receptionFeatures = [];
  kitchenFeatures = [];
  landscapeFeatures = [];
  solutions = [];
  langSubscription: ISubscription;
  brands: any [];
  brandSwiper: Swiper;

  constructor(public translate: TranslateService, private route: ActivatedRoute, private globals: Globals,
              private apiCalledService: ApiCalledService, private spinner: NgxSpinnerService,
              private titleService: Title, public formBuilder: FormBuilder) {

  }

  get getSolutionForm() {
    return this.solutionForm.controls;
  }

  ngOnInit() {
    this.langSubscription = this.globals.getLang().subscribe(lang => {
      this.lang = lang;
      if (this.lang === 'ar') {
        this.rtl = 'rtl';
        this.titleService.setTitle('الحياة سمارت | البيت الذكي');
      } else {
        this.rtl = '';
        this.titleService.setTitle('Alhayat Smart | Smart Home');
      }
    });

    this.solutionForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      num_rooms: [0],

      kitchen: [false],
      landScape: [false],
      reception: [false]
    });
    // @ts-ignore
    this.apiCalledService.getBrands(this.lang).subscribe(
      data => {
        this.spinner.hide();
        this.brands = data;
      }
    );

  }


  ngAfterViewInit() {
    this.brandSwiper = new Swiper ('.swiper-con', {
      observer: true,
      observeParents: true,
      loop: true,
      slidesPerView: 4,
      spaceBetween: 30,
      slidesPerGroup: 1,
      autoplay: {
        delay: 2000,
        disableOnInteraction: true,
        reverseDirection: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
      },
    });
  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }

  increaseRooms() {
    this.noOfRooms++;
    this.solutionForm.patchValue({num_rooms: this.noOfRooms});
  }

  decreaseRooms() {
    if (this.noOfRooms !== 0) {
      this.noOfRooms--;
      this.solutionForm.patchValue({num_rooms: this.noOfRooms});
    }
  }

  submitFirstPhase() {
    this.check = true;
    if (!this.solutionForm.invalid) {
      this.spinner.show();
      const firstPhaseData = {
        name: this.getSolutionForm.name.value,
        lang: this.lang,
        email: this.getSolutionForm.email.value,
        phone: this.getSolutionForm.phone.value,
        num_rooms: this.getSolutionForm.num_rooms.value,
        reception: this.getSolutionForm.reception.value,
        landscape: this.getSolutionForm.landScape.value,
        kitchen: this.getSolutionForm.kitchen.value,
      };
      this.apiCalledService.startQoutation(firstPhaseData)
        .subscribe(
          res => {
            this.qoutationId = res.id;
            if (res.rooms) {
  for (let i = 0; i < this.noOfRooms; i++) {
    const newArray = [...res.rooms];
    this.roomFeatures.push(newArray.map(x => Object.assign({}, x)));
  }
}
            if (res.landscape) {
              this.landscapeFeatures = res.landscape;
            }
            if (res.reception) {
              this.receptionFeatures = res.reception;
            }
            if (res.kitchen) {
              this.kitchenFeatures = res.kitchen;
            }
            if (this.noOfRooms) {
              this.phase = 2;
            } else if (this.getSolutionForm.reception.value) {
              this.phase = 3;
            } else if (this.getSolutionForm.kitchen.value) {
              this.phase = 4;
            } else if (this.getSolutionForm.landScape.value) {
              this.phase = 5;
            } else {
              this.submitFeatures();
            }
            this.spinner.hide();
          }
        );
    }

  }

  submitSecondPhase() {
    if (this.currentRoomNumber < this.noOfRooms) {
      this.currentRoomNumber++;
    } else if (this.getSolutionForm.reception.value) {
      this.phase = 3;
    } else if (this.getSolutionForm.kitchen.value) {
      this.phase = 4;
    } else if (this.getSolutionForm.landScape.value) {
      this.phase = 5;
    } else {
      this.submitFeatures();
    }
  }

  submitThirdPhase() {
    if (this.getSolutionForm.kitchen.value) {
      this.phase = 4;
    } else if (this.getSolutionForm.landScape.value) {
      this.phase = 5;
    } else {
      this.submitFeatures();
    }
  }

  submitFourthPhase() {
    if (this.getSolutionForm.landScape.value) {
      this.phase = 5;
    } else {
      this.submitFeatures();
    }
  }

  backPhase() {
    if (this.phase === 5) {
      if (this.getSolutionForm.kitchen.value) {
        this.phase = 4;
      } else if (this.getSolutionForm.reception.value) {
        this.phase = 3;
      } else if (this.noOfRooms) {
        this.phase = 2;
      } else {
        this.phase = 1;
      }
    } else if (this.phase === 4) {
      if (this.getSolutionForm.reception.value) {
        this.phase = 3;
      } else if (this.noOfRooms) {
        this.phase = 2;
      } else {
        this.phase = 1;
      }
    } else if (this.phase === 3) {
      if (this.noOfRooms) {
        this.phase = 2;
      } else {
        this.phase = 1;
      }
    } else if (this.phase === 2) {
      if (this.currentRoomNumber !== 1) {
        this.currentRoomNumber--;
      } else {
        this.phase = 1;
      }
    }
  }

  calculateAgain() {
    this.phase = 1;
    this.noOfRooms = 0;
    this.qoutationId = 0;
    this.currentRoomNumber = 1;
    this.solutionForm.patchValue({num_rooms: this.noOfRooms, kitchen: false, landScape: false, reception: false });
  }

  submitFeatures() {
    this.spinner.show();
    const features = [];
    for (let i = 0; i < this.roomFeatures.length; i++) {
      for (let j = 0; j < this.roomFeatures[i].length; j++) {
        if (this.roomFeatures[i][j].value) {
          features.push(this.roomFeatures[i][j].id);
        }
      }
    }
    for (let i = 0; i < this.receptionFeatures.length; i++) {
      if (this.receptionFeatures[i].value) {
        features.push(this.receptionFeatures[i].id);
      }
    }
    for (let i = 0; i < this.kitchenFeatures.length; i++) {
      if (this.kitchenFeatures[i].value) {
        features.push(this.kitchenFeatures[i].id);
      }
    }
    for (let i = 0; i < this.landscapeFeatures.length; i++) {
      if (this.landscapeFeatures[i].value) {
        features.push(this.landscapeFeatures[i].id);
      }
    }
    const featuresData = {
      qoutationId: this.qoutationId,
      lang: this.lang,
      selectedFeatures: features
    };
    this.apiCalledService.qoutationFinalStep(featuresData)
      .subscribe(
        res => {
          this.solutions = res.solutions;
          this.phase = 6;
          this.spinner.hide();
        }
      );
  }
  knowMore() {

  }
}
