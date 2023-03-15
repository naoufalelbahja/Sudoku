import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: number): unknown {
    const mins = Math.floor(value / 60).toString()
    const secs = (value % 60).toString()

    return `${mins.length === 1 ? '0' + mins : mins}:${
      secs.length === 1 ? '0' + secs : secs
    }`
  }
}
