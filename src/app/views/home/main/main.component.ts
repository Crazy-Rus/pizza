import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, map, Observable, Subject, Subscription } from 'rxjs';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  // private observable: Observable<number>;
  private subject: Subject<number>;
  private subscription: Subscription | null = null;

  constructor(public cartService: CartService) {
    this.subject = new Subject<number>();
    let count = 0;
    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000);
    const timeout1 = setTimeout(() => {
      this.subject.complete();
    }, 4000);

    // this.observable = from([1, 2, 3, 4, 5]);
    // this.observable = new Observable((observer) => {
    //   let count = 0;
    //   const interval = setInterval(() => {
    //     observer.next(count++);
    //   }, 1000);
    //   const timeout1 = setTimeout(() => {
    //     observer.complete();
    //   }, 4000);
    //   const timeout2 = setTimeout(() => {
    //     observer.error('World');
    //   }, 5000);

    //   return {
    //     unsubscribe() {
    //       clearInterval(interval);
    //       clearTimeout(timeout1);
    //       clearTimeout(timeout2);
    //     },
    //   };
    // });
  }

  ngOnInit() {
    console.log(environment.production);
    // const myModalAlternative = new bootstrap.Modal('#myModal', {});
    // myModalAlternative.show();
    // this.subscription = this.subject.subscribe({
    //   next: (param: number) => {
    //     console.log('subscriber 1: ', param);
    //   },
    //   error: (error: string) => {
    //     console.log('ERROR!!! ' + error);
    //   },
    //   complete: () => {
    //     console.log('Finish!');
    //   },
    // });
  }

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit(): void {
    this.popupComponent.open();
    // const modalRef = this.modalService.open(PopupComponent);
    // modalRef.componentInstance.data = 'Main component';
    // this.modalService.open(this.popup, {});
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  test() {
    this.subject
      .pipe(
        map((number: number) => {
          return 'Число: ' + number;
        }),
      )
      .subscribe((param: string) => {
        console.log('subscriber 2: ', param);
      });
  }
}
