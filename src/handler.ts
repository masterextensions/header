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
import { NewHeaderDate } from './logic/new_header_data';
import { supportedLanguages } from './logic/supported_languages';


/**
 * Instantiating this Class via the new operator in NOT allowed,
 * So you need to call `HeaderHandler.instance` static prop Instead.
 */
export class Handler {


    private constructor() {
      // console.log('HeaderHandler is just created'); 
    }

    private static _instance: Handler; 
    public static instance: Handler = !Handler._instance 
        ? new Handler() : Handler._instance;


    public runHeaderCommand(editor: vscode.TextEditor | undefined) {

        if (editor === undefined) {
            return;
        }

        const isSupportedLanguage = this.isSupportedLanguage(editor.document.languageId);
        const hasHaeder = this.hasHaeder(editor.document);
        // const isEmptyDocument = this.isEmptyDocument(this._editor.document);
        // const getOnlyNewFiles = false; //configuration.getOnlyNewFiles();

        if (!hasHaeder && isSupportedLanguage) {
            this.insertHeader(editor);
        }
    }

    public insertHeader(editor: vscode.TextEditor | undefined) {
        if (editor !== undefined) {
            const documentStartPosition = new vscode.Position(0, 0);
            const header = new NewHeaderDate().toString();

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