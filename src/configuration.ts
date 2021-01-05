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


/*
 *  Copyright (c) @year @author
 *  All rights reserved.
 *
 *  @description
 *
 *  @license
 *
 *  Created: @created:shortdate @created:time by @created:author
#if (UPDATED)
 *  Updated: @updated:shortdate @updated:time by @updated:author
#endif
 */


import * as vscode from 'vscode';

import { MessageLevel } from './logic/general/result_message';
import { Notifications } from './logic/general/notifications';

import { APACHE2 } from './data/licenses/apache2';
import { BOOSTREF } from './data/licenses/boost_ref1';
import { BOOST1 } from './data/licenses/boost1';
import { BSD2 } from './data/licenses/bsd2';
import { BSD3 } from './data/licenses/bsd3';
import { CDDL } from './data/licenses/cddl';
import { ECLIPSE2 } from './data/licenses/eclipse2';
import { GPL3 } from './data/licenses/gpl3';
import { LGPL3 } from './data/licenses/lgpl3';
import { MIT } from './data/licenses/mit';
import { MOZILLA2 } from './data/licenses/mozilla2';


export class Configuration {

  public template: string[];
  public author: string;
  public description: string;
  public license: string;
  public includeFileUpdateAuthor: boolean;
  public formatTimeAsFourHours: boolean;
  public onlyNewFiles: boolean;
  public notifications: Notifications; 
  public notificationsLevel: MessageLevel; 


  constructor() {
    const config = vscode.workspace.getConfiguration('masterheader');
    // this.template = config.get('template') || '';

    this.template = config.get('template') || [''];

    this.author = config.get('author') || '';
    this.description = config.get('description') || '';
    this.license = this._LoadLicense(config);

    this.includeFileUpdateAuthor = config.get('includeFileUpdateAuthor') || false;
    this.formatTimeAsFourHours = config.get('formatTimeAsFourHours') || false;
    this.onlyNewFiles = config.get('onlyNewFiles') || false;

    this.notifications = this._getNotificationsSettings(config);
    this.notificationsLevel = this._getNotificationsLevelSettings(config);


  }

  private _LoadLicense(config: vscode.WorkspaceConfiguration): string {

    const selectedLicense = config.get('license');

    switch(selectedLicense) {
      case 'Apache 2':
        return APACHE2;
      case 'BSD 3-Clause':
        return BSD3;
      case 'BSD 2-ClauseIT':
        return BSD2;
      case 'GPL 3':
        return GPL3;
      case 'LGPL 3':
        return LGPL3;
      case 'MIT':
        return MIT;
      case 'Mozilla 2':
        return MOZILLA2;
      case 'CDDL':
        return CDDL;
      case 'Eclipse 2':
        return ECLIPSE2;
      case 'Boost 1':
        return BOOST1;
      case 'Boost 1 (REF)':
        return BOOSTREF;
      case 'Custom':
        return '<Custom>';
      case 'none':
      default:
        return '';
    }
  }

  private _getNotificationsSettings(config: vscode.WorkspaceConfiguration): Notifications {

    const selectedItem = config.get('notifications');

    switch(selectedItem) {
      case 'never':
        return Notifications.never;
      case 'header commands':
        return Notifications.headerCommands;
      case 'add header command only':
        return Notifications.addHeaderCommandOnly;
      case 'update header command only':
        return Notifications.updateHeaderCommandOnly;
      case 'auto add or upodate header':
        return Notifications.autoAddOrUpodateHeader;
      case 'auto add header only':
        return Notifications.autoAddHeaderOnly;
      case 'auto update header only':
        return Notifications.autoUpdateHeaderOnly;
      case 'always':
        return Notifications.always;
      default:
        return Notifications.headerCommands;
    }
  }

  private _getNotificationsLevelSettings(config: vscode.WorkspaceConfiguration): MessageLevel {

    const selectedItem = config.get('notificationsLevel');

    switch(selectedItem) {
      case 'normal':
        return MessageLevel.normal;
      case 'verbose':
        return MessageLevel.verbose;
      default:
        return MessageLevel.normal;
    }
  }
  


}
