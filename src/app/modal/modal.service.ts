import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(content: Type<ModalInstance>) {
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);

    const componentFactory = this.resolver.resolveComponentFactory(
      <Type<ModalInstance>>content
    );
    const componentRef = componentFactory.create(this.injector);

    componentRef.hostView.detectChanges();

    const ngContent = [[componentRef.location.nativeElement]];
    const modalRef = modalFactory.create(this.injector, ngContent);

    componentRef.hostView.detectChanges();
    modalRef.hostView.detectChanges();

    const { nativeElement } = modalRef.location;
    this.document.body.appendChild(nativeElement);

    modalRef.instance.open();

    modalRef.hostView.markForCheck();

    componentRef.instance.initModal(modalRef.instance);

    modalRef.hostView.detectChanges();

    modalRef.hostView.markForCheck();

    return modalRef.instance;
  }
}

export interface ModalInstance {
  modal?: ModalComponent;

  initModal(modal: ModalComponent): void;
}
