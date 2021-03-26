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

 // TODO: Create master_dart_essentials extension


import * as vscode from 'vscode';
import { Configuration } from './configuration';
import { NewHeaderDate } from './logic/new_header_data';
import { supportedLanguages } from './logic/general/supported_languages';
import { MessageType, ResultMessage, Result } from './logic/general/result_message';
import { Notifications } from './logic/general/notifications';
import * as MessageHelper from './helpers/result_message_helper';


/**
 * Instantiating this Class via the new operator is NOT availabe,
 * So you need to call `HeaderHandler.instance` static property Instead.
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

    private _getDocumentHeaderState(document: vscode.TextDocument) : DocumentHeaderState {

        if (DocumentHelper.isEmptyDocument(document)) {
            return DocumentHeaderState.notFoundEmpty;
        }

        if (DocumentHelper.isDocumentStartWithCommentBlock(document)) {
            return DocumentHeaderState.semiFound;
        }

        // const headerLine = document.lineAt(1);
        // return (
        //     !headerLine.isEmptyOrWhitespace &&
        //     headerLine.text.includes('Copyright')
        // );

        return DocumentHeaderState.notFound;
    }


    private _showMessage(message: ResultMessage) {

        if (this._configuration.notifications === Notifications.autoAddOrUpodateHeader ||
            this._configuration.notifications === Notifications.autoAddHeaderOnly ||
            this._configuration.notifications === Notifications.autoUpdateHeaderOnly) {
                // Display a message box to the user
                MessageHelper.showMessage(message);

        }
    }


    // private _resolveEditor(editor: vscode.TextEditor | undefined)
    //     : vscode.TextEditor {
    //         if (editor === undefined) {
    //            this._showMessage({
    //                     messageText: 'Master > Header Extension Error: VS-Code editor is undefined.',
    //                     type: MessageType.error
    //               }
    //             );
    //             throw new Error("******* message.messageText");
    //         } else {
    //             return editor;
    //         }
    // }


    // TODO: ghange modifires to private when there is such a possiblity ...
    //#region  Public Methods

    public reloadConfiguration(): void {
        this._configuration = new Configuration();
    }

    public runAddHeaderCommand(editor: vscode.TextEditor | undefined) {
        if (!editor) return;

        // const editor = this._resolveEditor(mayEeditor);
        const isSupportedLanguage = this.isSupportedLanguage(editor.document.languageId);
        const hasHaeder = this.hasHaeder(editor.document);
        // const isEmptyDocument = this.isEmptyDocument(this._editor.document);
        // const getOnlyNewFiles = false; //configuration.getOnlyNewFiles();

        if (!hasHaeder && isSupportedLanguage) {
            this._insertHeader(editor);
            this._showMessage({
                text: 'Master > Header: Header Added.',
                type: MessageType.information
            });
        }

    }

    public runUpdateHeaderCommand(editor: vscode.TextEditor | undefined) {
        if (!editor) return;
        const msg = '\\\\n';
        // DocumentHeaderState[this._getDocumentHeaderState(editor.document)];
        MessageHelper.showMessage({text: `value: '${msg}'`, type: MessageType.information});
    }

    private _insertHeader(editor: vscode.TextEditor) {

        const documentStartPosition = new vscode.Position(0, 0);
        // TODO: add update support here
        const header = new NewHeaderDate(false).toString();

        editor.edit(document => {
            document.insert(documentStartPosition, header);
        });
     }

    public hasHaeder(document: vscode.TextDocument): boolean {

        if (DocumentHelper.isEmptyDocument(document)) {
            return false;
        }

        const headerLine = document.lineAt(1);
        return (
            !headerLine.isEmptyOrWhitespace &&
            headerLine.text.includes('Copyright')
        );

    }

    public isUpdatedDocument(document: vscode.TextDocument): boolean {
        return this.hasHaeder(document) && document.isDirty;
    }

    public isSupportedLanguage(languageId: string): boolean {
        return supportedLanguages.has(languageId);
    }

    //#endregion

}

// TODO: handlereadonly documents


// tslint:disable-next-line: max-classes-per-file
abstract class DocumentHelper {

    private constructor(){}

    public static isEmptyDocument(document: vscode.TextDocument): boolean {
        return document.lineCount === 1 &&
            document.lineAt(new vscode.Position(0, 0)).isEmptyOrWhitespace;
    }

    public static isDocumentStartWithCommentBlock(document: vscode.TextDocument): boolean {
        return document.lineCount >= 1 &&
            document.getText(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 3))) === '/*';
    }


}


enum DocumentHeaderState {
    /** When document is empty and so it hasn't any header block too. */
    notFoundEmpty,
    /** When document has not any header in it. */
    notFound,
    /** When document has a header comment block and its contents is match to current template. */
    matchFound,
    /** When document has a header comment block but its contents is NOT match to current template. */
    unMatchedFound,
    /** When document has a some header comment block but its not include any information or key of template or default template. */
    semiFound
}

