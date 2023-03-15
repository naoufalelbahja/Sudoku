import {
  Component,
  OnInit,
  Input,
  Output,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { SudokuService, Table } from '../sudoku.service';

@Component({
  selector: '[app-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input('container') container?: HTMLElement;
  table?: Table;
  height?: number;
  width?: number;

  constructor(private sudokuService: SudokuService) {}

  ngOnInit(): void {
    this.table = this.sudokuService.getTable();
    this.sudokuService.tableChanged.subscribe((table?: Table) => {
      this.table = table;
    });
  }

  ngAfterContentInit() {
    this.height = this.container?.offsetHeight;
    this.height = this.height ? this.height - 50 : this.height;
    this.width = this.container?.offsetWidth;

    window.addEventListener('resize', () => {
      this.height = this.container?.offsetHeight;
      this.height = this.height ? this.height - 50 : this.height;
      this.width = this.container?.offsetWidth;
    });
  }

  get dimention(): number {
    if (this.height && this.width)
      return this.height >= this.width ? this.width : this.height;

    return 200;
  }
}
