import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SudokuService } from './sudoku.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [SudokuService],
})
export class GameComponent implements OnInit {
  constructor(
    private sudokuService: SudokuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sudokuService.gameEnded.subscribe(() => {
      this.router.navigate(['end-game'], {
        relativeTo: this.route,
        queryParams: this.route.snapshot.queryParams,
      });
    });

    this.sudokuService.initGame(this.route.snapshot.queryParams['level']);
    this.route.queryParams.subscribe((queryParams: any) => {
      this.sudokuService.initGame(queryParams['level']);
    });
  }
}
