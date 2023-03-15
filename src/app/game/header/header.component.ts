import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Level } from '../sudoku.model';
import { SudokuService } from '../sudoku.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  mistakes: number = 0;
  pause: boolean = false;
  level?: Level;

  constructor(private sudokuService: SudokuService, private router: Router) {}

  ngOnInit(): void {
    this.level = this.sudokuService.level;

    this.pause = this.sudokuService.pause;
    this.sudokuService.pauseChanged.subscribe(
      (pause: boolean) => (this.pause = pause)
    );

    this.mistakes = this.sudokuService.mistakes;
    this.sudokuService.mistakesChanged.subscribe((mistakes: number) => {
      this.mistakes = mistakes;
    });
  }

  goBack() {
    this.router.navigate(['..']);
  }

  onPause() {
    this.sudokuService.pauseChanged.next(true);
  }
}
