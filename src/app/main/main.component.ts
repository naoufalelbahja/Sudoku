import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Level, levels } from '../game/sudoku.model';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  @ViewChild('difficultyModal') difficultyModal?: ModalComponent;
  levelModal: boolean = false;
  levels: Level[] = levels;

  selectedLevel: string = 'hard';

  constructor(private router: Router) {}

  toggleLevelModal() {
    this.levelModal = !this.levelModal;
  }

  onPlay() {
    if (!this.selectedLevel) return;

    this.difficultyModal?.close();

    this.router.navigate(['play'], {
      queryParams: {
        level: this.selectedLevel,
      },
    });
  }
}
