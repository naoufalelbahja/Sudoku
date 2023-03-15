import { Component, OnInit, Input } from '@angular/core';
import { SudokuService } from '../sudoku.service';

@Component({
  selector: '[app-timer]',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit {
  constructor(private sudokuService: SudokuService) {}

  ngOnInit(): void {}

  time(): number {
    return this.sudokuService.time;
  }
}
