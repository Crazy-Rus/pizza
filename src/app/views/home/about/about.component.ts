import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, AfterViewInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit(): void {
    this.popupComponent.open();
    // const modalRef = this.modalService.open(PopupComponent);
    // modalRef.componentInstance.data = 'Main component';
    // this.modalService.open(this.popup, {});
  }
}
