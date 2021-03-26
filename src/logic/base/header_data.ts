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
import { VariableKeys } from '../variable_keys';
import * as Const from '../../helpers/const';


export abstract class HeaderData {

  public template: string[];

  public team: string = '';
  public author: string = '';
  public description: string = '';
  public license: string = '';
  public year: string = '';

  public createdDatetime: string;
  public createdDate: string ;
  public createdFullDate: string;
  public createdFullDatetime: string;
  public createdTime: string;
  public createdFulltime: string;
  public createdAuthor: string;

  public includeFileUpdateAuthor: boolean = false;
  public formatTimeAsFourHours: boolean = false;
  public onlyNewFiles: boolean = false;
  public isUpdated: boolean;

  protected today: Date;
  protected startOfLine: string;


  constructor(isUpdated: boolean) {

    this.isUpdated = isUpdated || false;

    if (!this.isUpdated) {
      this.today = new Date();
      this.year = this.today.getFullYear().toString();
      this.createdDatetime = this.today.toLocaleString();
      this.createdDate = this.today.toLocaleDateString();
      this.createdFullDate = this.today.toDateString();
      this.createdFullDatetime = this.today.toString();
      this.createdTime = this.today.toLocaleTimeString();
      this.createdFulltime = this.today.toTimeString();
    } else {
      this.today = new Date();
      this.year = 'this.today.getFullYear().toString()';
      this.createdDatetime = 'this.today.toLocaleString()';
      this.createdDate = 'this.today.toLocaleDateString()';
      this.createdFullDate = 'this.today.toDateString()';
      this.createdFullDatetime = 'this.today.toString()';
      this.createdTime = 'this.today.toLocaleTimeString()';
      this.createdFulltime = 'this.today.toTimeString()';
    }

    const configuration = new Configuration();
    this.template = configuration.template;
    this.team = configuration.team;
    this.author = configuration.author;
    this.description = configuration.description;
    this.license = configuration.license;
    this.includeFileUpdateAuthor = configuration.includeFileUpdateAuthor;
    this.formatTimeAsFourHours = configuration.formatTimeAsFourHours;
    this.onlyNewFiles = configuration.onlyNewFiles;

    this.createdAuthor = this.author;

    this.startOfLine = `\n${configuration.startOfLineCharacterString}`;

  }

// TODO: get vscode user or git user for default author...
//  in package.json add it like this as default value -> ${vscode.username} or etc

  protected parseVaribles(): string {
    return this.template.join('\n')
      .replace(VariableKeys.year, this.year)
      .replace(VariableKeys.team, this.team)
      .replace(VariableKeys.author, this.author)
      .replace(VariableKeys.license, this.license)
      .replace(VariableKeys.description, this.description)
      .replace(VariableKeys.createdDatetime, this.createdDatetime)
      .replace(VariableKeys.createdDate, this.createdDate)
      .replace(VariableKeys.createdFullDate, this.createdFullDate)
      .replace(VariableKeys.createdFullDatetime, this.createdFullDatetime)
      .replace(VariableKeys.createdTime, this.createdTime)
      .replace(VariableKeys.createdFulltime, this.createdFulltime)
      .replace(VariableKeys.createdAuthor, this.createdAuthor);
  }

  protected parseTemplate(): string {
    return this.parseVaribles()
      .replace(Const.literalEscapedCarriageReturn, Const.carriageReturnUniqueKey)
      .replace(Const.literalEscapedNewLine, Const.newLineUniqueKey)
      .replace(Const.escapedCarriageReturn, Const.carriageReturn)
      .replace(Const.escapedNewLine, Const.newLine)
      .replace(Const.carriageReturnUniqueKey, Const.escapedCarriageReturn)
      .replace(Const.newLineUniqueKey, Const.escapedNewLine);
  }

  protected addBlockCommentStart(input: string): string {
    const regexp = /\n/gi;
     return input.replace(regexp, this.startOfLine);
  }

  /**
   *   toString method
   */
  public toString() {
    // TODO: support other languages like php, yaml, phyton...
    return `/*${this.startOfLine}${
        this.addBlockCommentStart(
            this.parseTemplate()
            )
          }\n */`;
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
