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
import { Configuration } from './configuration';
import { NewHeaderDate } from './logic/new_header_data';
import { supportedLanguages } from './logic/general/supported_languages';
import { MessageType, ResultMessage, Result } from './logic/general/result_message';
import { Notifications } from './logic/general/notifications';
import * as MessageHelper from './vscode_helpers/result_message_helper';



/**
 * Instantiating this Class via the new operator in NOT allowed,
 * So you need to call `HeaderHandler.instance` static prop Instead.
 */
export class Handler {

    private static _instance: Handler; 
    public static instance: Handler = !Handler._instance 
        ? new Handler() : Handler._instance;

    private _configuration: Configuration;


    private constructor() {
      // console.log('HeaderHandler is just created'); 
      this._configuration = new Configuration();
    }


    private _showMessage(message: ResultMessage) {
	
        if (this._configuration.notifications == Notifications.autoAddOrUpodateHeader || 
            this._configuration.notifications == Notifications.autoAddHeaderOnly || 
            this._configuration.notifications == Notifications.autoUpdateHeaderOnly) {
                // Display a message box to the user
                MessageHelper.showMessage(message);

        }
    }
    

    /** @type {vscode.TextEditor | Result<undefined>}
     * @,,param uriComponent A value representing an encoded URI component.
     *  */ 
    private _resolveEditor(editor: vscode.TextEditor | undefined) 
        : vscode.TextEditor {
            if (editor === undefined) {
               this._showMessage({
                        messageText: 'Master > Header Extension Error: VS-Code editor is undefined.',
                        type: MessageType.error
                  }
                );
                throw new Error("******* message.messageText"); 
            } else {
                return editor;
            }
    }

    public reloadConfiguration(): void {
        this._configuration = new Configuration();
    }

    public runHeaderCommand(mayEeditor: vscode.TextEditor | undefined) {

        const editor = this._resolveEditor(mayEeditor);
        const isSupportedLanguage = this.isSupportedLanguage(editor.document.languageId);
        const hasHaeder = this.hasHaeder(editor.document);
        // const isEmptyDocument = this.isEmptyDocument(this._editor.document);
        // const getOnlyNewFiles = false; //configuration.getOnlyNewFiles();

        if (!hasHaeder && isSupportedLanguage) {
            this.insertHeader(editor);
            this._showMessage({ 
                messageText: 'Master > Header: Header Added.',
                 type: MessageType.information
            });
        }

    }

    public insertHeader(editor: vscode.TextEditor | undefined) {
        if (editor !== undefined) {
            const documentStartPosition = new vscode.Position(0, 0);
            // TODO: add update support here
            const header = new NewHeaderDate(false).toString();

            editor.edit(document => {
                document.insert(documentStartPosition, header);
            });

        }
     }

    public hasHaeder(document: vscode.TextDocument): boolean {

        if (this.isEmptyDocument(document)) {
            return false;
        }

        const headerLine = document.lineAt(1);
        return (
            !headerLine.isEmptyOrWhitespace &&
            headerLine.text.includes('Copyright')
        );

    } 

    public isEmptyDocument(document: vscode.TextDocument): boolean {
        return document.lineCount <= 1;
    }

    public isUpdatedDocument(document: vscode.TextDocument): boolean {
        return this.hasHaeder(document) && document.isDirty;
    }

    public isSupportedLanguage(languageId: string): boolean {
        return supportedLanguages.has(languageId);
    }

}