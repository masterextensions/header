/* 
 *   Copyright (c) 2020 Baio Authors
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */


import { HeaderData } from './base/header_data';
import { VaribleKeys } from './varible_keys';
//import { Configuration } from '../configuration';

export class NewHeaderDate extends HeaderData {

  public createdShortdate: string = ''; 
  public createdTime: string = '';
  public createdAuthor: string = '';
 
    constructor() {
      super();
      
      //let configuration = new Configuration();
      
      this.isUpdated = false;
      this.year = new Date().getFullYear().toString();

      this.createdShortdate = '<createdShortdate>';
      this.createdTime = '<createdTime>';
      this.createdAuthor = super.author;
    
    }

    protected setVaribles(input: string): string {
      return super.setVaribles(input) 
        .replace(VaribleKeys.created, this.createdShortdate)
        .replace(VaribleKeys.createdShortdate, this.createdShortdate)
        .replace(VaribleKeys.createdTime, this.description)
        .replace(VaribleKeys.createdAuthor, this.createdAuthor);
    }

}