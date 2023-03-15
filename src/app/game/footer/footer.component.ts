import { Component, OnInit } from '@angular/core';
import { SudokuService } from '../sudoku.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  elements?: Array<number | string>;

  constructor(private sudokuService: SudokuService) {}

  ngOnInit(): void {
    this.elements = this.sudokuService.level?.elements;
  }

  onFill(element: string | number) {
    this.sudokuService.fill(element);
  }

  remaining(element: number | string): number {
    return this.sudokuService.remaining(element);
  }
}
