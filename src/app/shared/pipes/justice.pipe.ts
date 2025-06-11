import { Pipe, PipeTransform } from '@angular/core';

const justiceCodes = {
  '1': 'Supremo Tribunal Federal',
  '2': 'Superior Tribunal de Justiça',
  '3': 'Justiça Federal',
  '4': 'Justiça do Trabalho',
  '5': 'Justiça Eleitoral',
  '6': 'Justiça Militar da União',
  '7': 'Justiça Militar Estadual',
  '8': 'Justiça Estadual',
  '9': 'Tribunais ou Conselhos Superiores',
};

@Pipe({
  name: 'justice',
  standalone: false
})
export class JusticePipe implements PipeTransform {
  /**
   * Transforms the process number into a string representing the court responsible for the process.
   * @param processNumber - The process number.
   * @returns The court responsible for the process or null if the court cannot be determined.
   */
  transform(processNumber: string): string | null {
    const [, , , , justiceCode, , ] = processNumber.match(/^(\d{7})(\d{2})(\d{4})(\d)(\d{2})(\d{4})$/) || [];
    if (justiceCode) {
      return justiceCodes[justiceCode as keyof typeof justiceCodes];
    }
    return null;
  }

}
