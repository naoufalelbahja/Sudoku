import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input('name') name: string = 'app-modal';
  @Input('size') size: string = 'md';
  @Input('scrollable') scrollable: boolean = false;
  @Input('fullWidth') fullWidth: boolean = false;
  @Input('status') status?: string;

  @ViewChild('modal') modalRef?: ElementRef;
  @ViewChild('closeButton') closeButton?: ElementRef;
  @ViewChild('openButton') openButton?: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setAttribute(
      this.openButton?.nativeElement,
      'data-bs-target',
      '#' + this.name
    );
  }

  close() {
    this.closeButton?.nativeElement.click();
  }

  open() {
    this.openButton?.nativeElement.click();
  }
}
