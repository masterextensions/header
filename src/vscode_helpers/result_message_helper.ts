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

import * as vscode from 'vscode';
import { MessageType, ResultMessage }  from '../logic/general/result_message';



export function showMessage(message: ResultMessage) {

  if (!message) {
    //console.error('masterheader: message is undefined !');
    return;
  }

  switch(message.type) {
    case MessageType.information:
      vscode.window.showInformationMessage(message.messageText);
      break;
    case MessageType.warning:
      vscode.window.showWarningMessage(message.messageText);
      break;
    case MessageType.error:
      vscode.window.showErrorMessage(message.messageText);
      break;
  }


}