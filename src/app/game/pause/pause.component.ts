import { Component, ViewChild } from '@angular/core';
import { SudokuService } from '../sudoku.service';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.css'],
})
export class PauseComponent {
  @ViewChild('pauseModal') pauseModal?: ModalComponent;

  constructor(private sudokuService: SudokuService, private router: Router) {}

  ngOnInit(): void {
    this.sudokuService.pauseChanged.subscribe((pause: boolean) => {
      if (pause) this.pauseModal?.open();
      else this.pauseModal?.close();
    });
  }

  onResume() {
    this.sudokuService.pauseChanged.next(false);
    this.pauseModal?.close();
  }

  onExit() {
    this.router.navigate(['/']);
    this.pauseModal?.close();
  }
}
