import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css'],
})
export class RowComponent implements OnInit {
  @Input('y') y: number = -1;
  @Input('row') row?: Array<string | number | undefined>;

  constructor() {}

  ngOnInit(): void {}
}
