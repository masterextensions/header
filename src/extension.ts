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
	Handler.instance.runAddHeaderCommand(vscode.window.activeTextEditor);



	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	const addHeader = new Command('addHeader', () => {
		const resulte = Handler.instance.runAddHeaderCommand(vscode.window.activeTextEditor);
	});

	const updateHeader = new Command('updateHeader', () => {
		const resulte = Handler.instance.runUpdateHeaderCommand(vscode.window.activeTextEditor);
	});

	const extension = new Extension('masterheader', new Set([addHeader, updateHeader]));

	extension.registerCommands(context);



	// Create listener for automatically handling copyright checks
	vscode.window.onDidChangeActiveTextEditor((e) => applyheader(e));



	// Update status bar item based on events for configuration
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration('masterheader')) {
			Handler.instance.reloadConfiguration();
		 }
	}));

}



function applyheader(editor: vscode.TextEditor | undefined) {
	Handler.instance.runAddHeaderCommand(editor);
}

// this method is called when your extension is deactivated
export function deactivate() {
	//
}


export interface Stringifyable {
	/** Returns a string representation of an object. */
	toString(): string;
}



// tslint:disable-next-line: max-classes-per-file
export class Command implements Stringifyable {

	/** The name of your command. Note that the name must match the command field in package.json */
	public readonly name: string;

	/** The callback you set here will be executed every time your command is executed */
	public readonly callback: (...args: any[]) => any;

	constructor(name: string, callback: (...args: any[]) => any) {
		this.name = name;
		this.callback = callback;
	}

	toString(): string {
		return `${this.name}`;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class Extension implements Stringifyable {

	public readonly name: string;
	public readonly commands: Set<Command>;

	constructor(name: string, commands?: Set<Command>) {
		this.name = name;
		this.commands = commands || new Set<Command>();
	}

	public registerCommands(context: vscode.ExtensionContext): boolean {
		if (this.commands && this.commands.size > 0) {

			this.commands.forEach((command, value2, set) => {
				context.subscriptions.push(
					vscode.commands.registerCommand(`${this.name}.${command.name}`,
				 	command.callback));
			});
			return true;
		}
		return false;
	}

	toString(): string {
		return `${this.name}`;
	}
}



