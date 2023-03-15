import { Injectable } from '@angular/core'
import { TitleStrategy } from '@angular/router'
import { Subject } from 'rxjs'
import { Level, levels, Sudoku } from './sudoku.model'

type coords = { x: number; y: number }

export type fullTable = Array<Array<number | string>>
export type Table = Array<Array<number | string | undefined>>

@Injectable()
export class SudokuService {
  private sudoku?: Sudoku

  private table?: Table

  level?: Level

  selectedCell: coords = { x: 0, y: 0 }
  selectedCellChanged: Subject<coords> = new Subject<{
    x: number
    y: number
  }>()

  tableChanged: Subject<Table | undefined> = new Subject<Table | undefined>()
  gameEnded: Subject<void> = new Subject<void>()

  pause: boolean = false
  pauseChanged: Subject<boolean> = new Subject<boolean>()

  timer: any
  time: number = 0

  mistakes: number = 0
  mistakesChanged: Subject<number> = new Subject<number>()

  constructor() {
    this.pauseChanged.subscribe((pause) => {
      clearInterval(this.timer)

      if (!pause) {
        this.timer = setInterval(() => {
          this.time++
        }, 1000)
      }
    })
  }

  initGame(levelName: string) {
    this.level = <Level>levels.find((level: Level) => level.name === levelName)
    this.sudoku = new Sudoku(this.level)
    this.table = this.sudoku.table
    this.selectedCell = { x: 0, y: 0 }
    this.pause = false
    this.time = 0
    this.mistakes = 0

    this.tableChanged.next(this.table)
    this.selectedCellChanged.next(this.selectedCell)
    this.pauseChanged.next(this.pause)
    this.mistakesChanged.next(this.mistakes)
  }

  select(x: number, y: number) {
    this.selectedCell = { x, y }
    this.selectedCellChanged.next(this.selectedCell)
  }

  fill(value: number | string) {
    if (!this.selectedCell || !this.sudoku || !this.table) return
    const correct = this.sudoku.check(
      value,
      this.selectedCell.x,
      this.selectedCell.y,
    )

    if (correct !== null) {
      const previousValue = this.table[this.selectedCell.y][this.selectedCell.x]

      if (previousValue == value) {
        this.table[this.selectedCell.y][this.selectedCell.x] = undefined
      } else {
        this.table[this.selectedCell.y][this.selectedCell.x] = value

        if (!correct) {
          this.mistakes++
          this.mistakesChanged.next(this.mistakes)
        }
      }

      this.tableChanged.next(this.getTable())

      if (this.remaining() === 0) {
        clearInterval(this.timer)
        this.gameEnded.next()
      }
    }
  }

  isMistake(x: number, y: number): boolean {
    if (!this.table) return false
    const value = this.table[y][x]
    if (!value) return false

    const check = this.sudoku?.check(value, x, y)

    return check === false
  }

  getTable(): Table | undefined {
    return this.table
  }

  isFilled(x: number, y: number): boolean {
    return !this.sudoku?.table[y][x]
  }

  selectedCellValue(): string | number | undefined {
    if (!this.table || !this.selectedCell) return undefined
    return this.table[this.selectedCell.y][this.selectedCell.x]
  }

  remaining(element?: number | string) {
    let remaining = 0
    this.table?.forEach((row: Array<string | number | undefined>) => {
      const rowFiltered = row.filter((element) => element !== undefined)
      if (element && !rowFiltered.includes(element)) remaining++
      else if (!element)
        remaining += (this.level?.columns || 9) - rowFiltered.length
    })
    return remaining
  }
}
