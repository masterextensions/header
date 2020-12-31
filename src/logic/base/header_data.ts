/*
 *   Copyright (c) 2020 Baio Authors
 *   All rights reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */



import { Configuration } from '../../configuration';
import { VaribleKeys } from '../varible_keys';


export abstract class HeaderData {

  public templateLines: string[];
  public author: string = '';
  public description: string = '';
  public license: string = '';
  public includeFileUpdateAuthor: boolean = false;
  public formaTimeAsFourHours: boolean = false;
  public onlyNewFiles: boolean = false;
  public isUpdated: boolean = false;
  public year: string = '';



  constructor() {
    const configuration = new Configuration();
    this.templateLines = configuration.templateLines;
    this.author = configuration.author;
    this.description = configuration.description;
    this.author = configuration.author;
    this.license = configuration.license;
    this.includeFileUpdateAuthor = configuration.includeFileUpdateAuthor;
    this.formaTimeAsFourHours = configuration.formaTimeAsFourHours;
    this.onlyNewFiles = configuration.onlyNewFiles;
  }


  protected setVaribles(input: string): string {
    return input
      .replace(VaribleKeys.year, this.year)
      .replace(VaribleKeys.author, this.author)
      .replace(VaribleKeys.description, this.description)
      .replace(VaribleKeys.license, this.license);
  }

  /**
   *     toString method
   */
  public toString() {
    const body = this.setVaribles(this.templateLines.join('\n *\t'));
    return '/*\n *\t' + body + '\n*/\n';
  }


}


//   public updatedShortdate: string = '';
//  public updatedTime: string = '';
//  public updatedAuthor: string = '';
//
//




// export class FileHeaderOld {
//   protected year: string;
//   protected author: string;
//   protected description: string;

//   constructor() {
//     this.author = configuration.getAuthor();
//     this.year = new Date().getFullYear().toString();
//     this.description = configuration.getDescription();
//   }



//   private _blockComment(): string {

//     return '';
//   }



//   public header(): string {





//     let license2 = configuration.getLicense();

//     let lic = '/*';
//     lic += license2.split('\n').join('\n *\t');


//     lic += '\n\n';
//     lic += this.description;
//     lic += '\n\n';

//     lic += '\n*/';

//     return this._setVaribles(lic);


// //     let template = `/*
// //  *   Copyright (c) ${this.year} ${this.author}
// //  *   All rights reserved.\n`;

// //     if (this.description) {
// //       template += ` *   ${this.description}\n`;
// //     }

// //     template += ` */\n`;

// //     return template;
//   }
// }
