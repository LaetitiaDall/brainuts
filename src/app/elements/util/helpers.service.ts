import {Injectable} from '@angular/core';


@Injectable()
export class HelperService {

  constructor() {

  }

  public convertWeirdCharsToSpaces(str): string {
    return str.replace(/[^a-z0-9]/gi, ' '); // final clean up
  }

  public replaceAccents(str): string {
    str = str.replace(/[ÀÁÂÃÄÅ]/g, 'A');
    str = str.replace(/[àáâãäå]/g, 'a');
    str = str.replace(/[ÈÉÊË]/g, 'E');
    str = str.replace(/[èéêë]/g, 'e');
    return str;
  }

  public splitTextForTags(str) {
    const separators = ' .,?"\')(';
    let splitted = [];
    let start = 0;
    let end = 0;
    let char;
    for (let i = 0; i < str.length; i++) {
      char = str[i];

      if (separators.indexOf(char) >= 0 || (i === str.length - 1)) {
        if (i === str.length - 1) {
          end += 1;
          char = '';
        }

        splitted.push(str.slice(start, end));
        splitted.push(char);
        start = end + 1;
      }
      end += 1;

    }

    return splitted;
  }
}
