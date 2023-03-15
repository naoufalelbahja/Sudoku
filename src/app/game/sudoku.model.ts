export type Table = Array<Array<string | number | undefined>>;
type FullTable = Array<Array<string | number>>;

export class Level {
  constructor(
    public name: string,
    public filled: number,
    public elements: Array<number | string> = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    public sudokuDims: number[] = [3, 3],
    public squareDims: number[] = [3, 3]
  ) {}

  get rows() {
    return this.sudokuDims[1] * this.squareDims[1];
  }

  get columns() {
    return this.sudokuDims[0] * this.squareDims[0];
  }

  get area() {
    return this.columns * this.rows;
  }

  get empty() {
    return Math.floor((1 - this.filled) * this.area);
  }
}

export const levels: Array<Level> = [
  new Level('fast', 0.9, [1, 2, 3, 4, 5, 6], [2, 3], [3, 2]),
  new Level('easy', 0.75),
  new Level('medium', 0.5),
  new Level('hard', 0.4),
  new Level('expert', 0.3),
  new Level('exterm', 0.25),
  new Level(
    'giant',
    0.5,
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g'],
    [4, 4],
    [4, 4]
  ),
];

export class Sudoku {
  private _fullTable: FullTable;
  private _table: Table;
  private level: Level;

  constructor(level: Level) {
    this._fullTable = [];
    this._table = [];
    this.level = level;
    this.generateFullTable();
    this.generateTable();
  }

  private generateFullTable() {
    this._fullTable = [];
    for (let r = 0; r < this.level.rows; r++) {
      const row = this.generateRow(r);
      if (row === null) {
        this.generateFullTable();
        break;
      }

      this._fullTable.push(row);
    }
  }

  private generateTable() {
    this._table = this._fullTable.slice().map((r) => r.slice());

    let i = 0;
    while (i < this.level.empty) {
      const rRow = Math.floor(Math.random() * this.level.rows);
      const rCol = Math.floor(Math.random() * this.level.columns);

      if (this._table[rRow][rCol] !== undefined) {
        this._table[rRow][rCol] = undefined;
        i++;
      }
    }
  }

  private generateRow(
    rowNumber: number,
    round: number = 1
  ): Array<string | number> | null {
    const row: Array<number | string> = [];
    for (let cell = 0; cell < this.level.columns; cell++) {
      let chooseFrom = [...this.level.elements];

      chooseFrom = chooseFrom.filter((item: string | number) => {
        const column = this._fullTable?.map((r) => r[cell]);

        const dims = this.level.squareDims;
        const x = Math.floor(cell / dims[0]);
        const y = Math.floor(rowNumber / dims[1]);

        const square: Array<string | number> = [];
        this._fullTable?.slice(y * dims[1], (y + 1) * dims[1]).forEach((r) => {
          square.push(...r.slice(x * dims[0], (x + 1) * dims[0]));
        });

        return !(
          row.includes(item) ||
          column?.includes(item) ||
          square.includes(item)
        );
      });

      if (chooseFrom.length === 0) {
        if (round >= 100) return null;
        return this.generateRow(rowNumber, round + 1);
      }

      row.push(chooseFrom[Math.floor(Math.random() * chooseFrom.length)]);
    }
    return row;
  }

  check(value: string | number, x: number, y: number): boolean | null {
    if (this._table[y][x] !== undefined) return null;
    const correctValue = this._fullTable[y][x];
    return correctValue === value;
  }

  getFullTable(): FullTable {
    return this._fullTable.slice().map((r) => r.slice());
  }

  get table(): Table {
    return this._table.slice().map((r) => r.slice());
  }
}
