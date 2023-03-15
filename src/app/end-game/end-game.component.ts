import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SudokuService } from '../game/sudoku.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css'],
})
export class EndGameComponent {
  @ViewChild('endGameModal') endGameModal?: ModalComponent;
  level?: string;
  mistakes: number = 0;
  time: number = 0;

  constructor(private router: Router, private sudokuService: SudokuService) {}

  ngOnInit(): void {
    this.level = this.sudokuService.level?.name;
    this.mistakes = this.sudokuService.mistakes;
    this.time = this.sudokuService.time;
  }

  ngAfterViewInit() {
    this.endGameModal?.open();
  }

  onExit() {
    this.router.navigate(['/']);
    this.endGameModal?.close();
  }

  onReplay() {
    this.endGameModal?.close();
    if (!this.sudokuService.level) return;
    this.sudokuService.initGame(this.sudokuService.level?.name);
    this.router.navigate(['play'], {
      queryParams: {
        level: this.sudokuService.level.name,
      },
    });
  }
}
