import { Component, OnInit, Input } from '@angular/core';
import { SudokuService } from '../../../sudoku.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Input('cell') cell?: string | number;
  @Input('x') x: number = -1;
  @Input('y') y: number = -1;

  constructor(private sudokuService: SudokuService) {}

  ngOnInit(): void {}

  isFilled() {
    return this.sudokuService.isFilled(this.x, this.y);
  }

  isSelected() {
    const selectedCell = this.sudokuService.selectedCell;
    const selectedCellValue = this.sudokuService.selectedCellValue();
    return (
      (this.x === selectedCell.x && this.y === selectedCell.y) ||
      (this.cell && this.cell === selectedCellValue)
    );
  }

  isActive() {
    const selectedCell = this.sudokuService.selectedCell;

    const inRow = selectedCell.y === this.y;
    const inColumn = selectedCell.x === this.x;

    const squareDims = <Array<number>>this.sudokuService.level?.squareDims;

    const inSquare =
      Math.floor(this.x / squareDims[0]) ===
        Math.floor(selectedCell.x / squareDims[0]) &&
      Math.floor(this.y / squareDims[1]) ===
        Math.floor(selectedCell.y / squareDims[1]);

    return inRow || inColumn || inSquare;
  }

  isMistake() {
    return this.sudokuService.isMistake(this.x, this.y);
  }

  onSelect() {
    this.sudokuService.select(this.x, this.y);
  }

  squareRight(): boolean {
    return (
      (this.x + 1) % (this.sudokuService.level?.squareDims[0] || 3) === 0 &&
      this.x + 1 !== this.sudokuService.level?.rows
    );
  }

  squareBottom(): boolean {
    return (
      (this.y + 1) % (this.sudokuService.level?.squareDims[1] || 3) === 0 &&
      this.y + 1 !== this.sudokuService.level?.columns
    );
  }
}
