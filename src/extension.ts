// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { format } from 'path';
import * as vscode from 'vscode';
import { Handler } from './handler';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	Handler.instance.runHeaderCommand(vscode.window.activeTextEditor);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('masterheader.addHeader', () => {

		// The code you place here will be executed every time your command is executed

		const resulte = Handler.instance.runHeaderCommand(vscode.window.activeTextEditor);

	});


	// Create listener for automatically handling copyright checks
	vscode.window.onDidChangeActiveTextEditor((e) => applyheader(e));

	context.subscriptions.push(disposable);


	// Update status bar item based on events for configuration
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		
		if (e.affectsConfiguration('masterheader')) {
			// TODO comment all consoles --> AND check specified configrution changes
			console.log('request new Configuration();');
			Handler.instance.reloadConfiguration();
			console.warn('DONE: new Configuration();');
		}
		
	}));

}


function applyheader(editor: vscode.TextEditor | undefined) {
	Handler.instance.runHeaderCommand(editor);
}

// this method is called when your extension is deactivated
export function deactivate() {}
