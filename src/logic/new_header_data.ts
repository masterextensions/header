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
import { VariableKeys } from './variable_keys';

export class NewHeaderDate extends HeaderData {

  public updatedDatetime: string = '';
  public updatedDate: string = '';
  public updatedFullDate: string = '';
  public updatedFullDatetime: string = '';
  public updatedTime: string = '';
  public updatedFulltime: string = '';
  public updatedAuthor: string = '';


  constructor(isUpdated: boolean) {

    super(isUpdated);


    if (this.isUpdated) {
      // read from
      // this.createdDatetime = this.today.toLocaleString();
      // this.createdDate = this.today.toLocaleDateString();
      // this.createdFullDate = this.today.toDateString();
      // this.createdFullDatetime = this.today.toString();
      // this.createdTime = this.today.toLocaleTimeString();
      // this.createdFulltime = this.today.toTimeString();


      this.updatedDatetime = this.today.toLocaleString();
      this.updatedDate = this.today.toLocaleDateString();
      this.updatedFullDate = this.today.toDateString();
      this.updatedFullDatetime = this.today.toString();
      this.updatedTime = this.today.toLocaleTimeString();
      this.updatedFulltime = this.today.toTimeString();
    }

  }

    protected parseVaribles(): string {
      return super.parseVaribles()
        .replace(VariableKeys.updatedDatetime, this.updatedDatetime)
        .replace(VariableKeys.updatedDate, this.updatedDate)
        .replace(VariableKeys.updatedFullDate, this.updatedFullDate)
        .replace(VariableKeys.updatedFullDatetime, this.updatedFullDatetime)
        .replace(VariableKeys.updatedTime, this.updatedTime)
        .replace(VariableKeys.updatedFulltime, this.updatedFulltime)
        .replace(VariableKeys.updatedAuthor, this.updatedAuthor);
    }


}