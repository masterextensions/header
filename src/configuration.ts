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
import { CommentStartCharacter, getCommentStartStringValue } from './logic/comment_start_character';


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
  public team: string;
  public author: string;
  public description: string;
  public license: string;
  public startOfLineCharacter: CommentStartCharacter;
  public useSpaceAndTabOnStart: boolean;
  public startOfLineCharacterString: string;
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
    this.team = config.get('team') || '';
    this.description = config.get('description') || '';
    this.license = this._loadLicense(config);
    this.useSpaceAndTabOnStart = config.get('useSpaceBeforeAndTabAfterStartOfLineCharacter') || true;
    this.startOfLineCharacter = config.get('startOfLineCharacter') || CommentStartCharacter.asterisk;
    this.startOfLineCharacterString =  this.useSpaceAndTabOnStart === true
      ? ` ${getCommentStartStringValue(this.startOfLineCharacter)}\t`
      : getCommentStartStringValue(this.startOfLineCharacter);

    this.includeFileUpdateAuthor = config.get('includeFileUpdateAuthor') || false;
    this.formatTimeAsFourHours = config.get('formatTimeAsFourHours') || false;
    this.onlyNewFiles = config.get('onlyNewFiles') || false;

    this.notifications = config.get('notifications') || Notifications.headerCommands;
    this.notificationsLevel = config.get('notificationsLevel') || MessageLevel.basic;
  }

  private _loadLicense(config: vscode.WorkspaceConfiguration): string {

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

}


/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
/*

  import { ExtensionContext, StatusBarAlignment, window, StatusBarItem, Selection, workspace, TextEditor, commands } from 'vscode';
  import { basename } from 'path';
  export function activate(context: ExtensionContext) {
  // Create a status bar item
  const status = window.createStatusBarItem(StatusBarAlignment.Left, 1000000);
  context.subscriptions.push(status);
  // Update status bar item based on events for multi root folder changes
  context.subscriptions.push(workspace.onDidChangeWorkspaceFolders(e => updateStatus(status)));
  // Update status bar item based on events for configuration
  context.subscriptions.push(workspace.onDidChangeConfiguration(e => updateStatus(status)));
  // Update status bar item based on events around the active editor
  context.subscriptions.push(window.onDidChangeActiveTextEditor(e => updateStatus(status)));
  context.subscriptions.push(window.onDidChangeTextEditorViewColumn(e => updateStatus(status)));
  context.subscriptions.push(workspace.onDidOpenTextDocument(e => updateStatus(status)));
  context.subscriptions.push(workspace.onDidCloseTextDocument(e => updateStatus(status)));
  updateStatus(status);
  }
  function updateStatus(status: StatusBarItem): void {
  const info = getEditorInfo();
  status.text = info ? info.text || '' : '';
  status.tooltip = info ? info.tooltip : undefined;
  status.color = info ? info.color : undefined;
  if (info) {
  status.show();
  } else {
  status.hide();
  }
  }
  function getEditorInfo(): { text?: string; tooltip?: string; color?: string; } | null {
  const editor = window.activeTextEditor;
  // If no workspace is opened or just a single folder, we return without any status label
  // because our extension only works when more than one folder is opened in a workspace.
  if (!editor || !workspace.workspaceFolders || workspace.workspaceFolders.length < 2) {
  return null;
  }
  let text: string | undefined;
  let tooltip: string | undefined;
  let color: string | undefined;
  // If we have a file:// resource we resolve the WorkspaceFolder this file is from and update
  // the status accordingly.
  const resource = editor.document.uri;
  if (resource.scheme === 'file') {
  const folder = workspace.getWorkspaceFolder(resource);
  if (!folder) {
  text = `$(alert) <outside workspace> → ${basename(resource.fsPath)}`;
  } else {
  text = `$(file-submodule) ${basename(folder.uri.fsPath)} (${folder.index + 1} of ${workspace.workspaceFolders.length}) → $(file-code) ${basename(resource.fsPath)}`;
  tooltip = resource.fsPath;
  const multiRootConfigForResource = workspace.getConfiguration('multiRootSample', resource);
  color = multiRootConfigForResource.get('statusColor');
  }
  }
  return { text, tooltip, color };
  }
 */

// Conditional operators#
// For conditional expressions, you can use the following conditional operators:

// Operator	Symbol	Example
// Equality	==	"editorLangId == typescript"
// Inequality	!=	"resourceExtname != .js"
// Or	||	"isLinux || isWindows"
// And	&&	"textInputFocus && !editorReadonly"
// Matches	=~	"resourceScheme =~ /^untitled$|^file$/"
// Greater than	> >=	"gitOpenRepositoryCount >= 1"
// Less than	< <=	"workspaceFolderCount < 2"

// stage(...resourceStates: SourceControlResourceState[]): Promise<void>;