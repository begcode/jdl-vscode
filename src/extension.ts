/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { log } from 'console';
import * as vscode from 'vscode';
import * as path from 'path';
import { fieldTypes, getCompleteItems } from './completeItems';
import { tokenLableHover } from './hoverHelper';
import { parseJdl, getErData } from './parseJdl';
import { ErViewPanel } from './panels/erview';
let jdl: any;

async function getJdl() {
  if (!jdl) {
	jdl = await import('generator-begcode/jdl');
  }
}

getJdl();

const jdlKeywordTokenTypes: Record<string, string> = {
	ENTITY: 'JDL定义实体关键字',
	ENUM: 'JDL定义枚举关键字',
	RELATIONSHIP: 'JDL定义关联关系关键字',
	APPLICATION: 'JDL定义应用关键字',
	DEPLOYMENT: 'JDL定义部署关键字',
	WITH: 'JDL关键字',
	SERVICE: 'JDL定义Service关键字',
};

const cstTokens: any[] = [];

export { cstTokens };
let jdlObject: any = {};
let jdlCst: any = {};
const errors: any[] = [];
const lastParseJdl: any = {};
const toPngFile = (file: string): string => {
	let pos = file.lastIndexOf('.jdl');
    const filename = file.substring(0, pos) + '.png';
	pos = filename.lastIndexOf('/');
	if (pos === -1) {
		return filename;
	} else {
		return filename.substring(pos + 1);
	} 
};

let debounceTimeout: any;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerHoverProvider('jdl', {
			provideHover(document, position, token) {
				const line = position.line + 1;
				const character = position.character + 1;
				if (Object.keys(jdlCst).length >= 0) {
					const tokenFind = jdlCst.tokens.find((jdlToken: any) => {
						return jdlToken.startLine <= line + 1 && jdlToken.endLine >= line && jdlToken.startColumn <= character && jdlToken.endColumn >= character;
					});
					if (tokenFind?.tokenType && Object.keys(jdlKeywordTokenTypes).includes(tokenFind.tokenType.name)) {
						return {
							contents: [jdlKeywordTokenTypes[tokenFind.tokenType.name]]
						};
					}
				}
				if (document.getText(new vscode.Range(new vscode.Position(line, character - 1), new vscode.Position(line, character))) === ' ') {
					return {
						contents: []
					};
				}
				const word = document.getText(document.getWordRangeAtPosition(position));
				const cstTokenFind = cstTokens.find((cstToken: any) => {
					console.log('cstToken:', cstToken);
					return cstToken.image?.includes(word) && cstToken.startLine <= line && cstToken.endLine >= line && cstToken.startColumn <= character && cstToken.endColumn >= character;
				});
				if (cstTokenFind) {
					return {
						contents: tokenLableHover(cstTokenFind.label, document.getText(), word)
					};
				}
				return {
					contents: []
				};
			},
		}),
	);
	function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
		if (document && ['.jdl', '.jh'].includes(path.extname(document.uri.fsPath).toLowerCase())) {
			try {
				const parseResult = parseJdl(document.getText());
				errors.length = 0;
				jdlCst = parseResult.jdlCst;
				jdlObject = parseResult.jdlObject;
				if (parseResult.errors.length === 0) {
					lastParseJdl.jdlObject = parseResult.jdlObject;
					cstTokens.length = 0;
					cstTokens.push(...parseResult.cstTokens || []);
				}
				errors.push(...parseResult.errors || []);
				if (errors?.length > 0) {
					log('errors:', errors);
					const diagnostics = errors.map((error: any) => {
						if (error.token) {
							const diagnostic: any = {
								code: '',
								message: error.message,
								range: new vscode.Range(new vscode.Position(error.token.startLine - 1, error.token.startColumn - 1), new vscode.Position(error.token.endLine - 1, error.token.endColumn - 1)),
								severity: vscode.DiagnosticSeverity.Error,
								source: '',
							};
							return diagnostic;
						} else {
							const diagnostic: any = {
								code: '',
								message: error.message,
								range: new vscode.Range(new vscode.Position(error.startLine - 1, error.startColumn - 1), new vscode.Position(error.endLine - 1, error.endColumn - 1)),
								severity: vscode.DiagnosticSeverity.Error,
								source: '',
							};
							return diagnostic;
						}
						
						// if (error.previousToken) {
						// 	diagnostic.relatedInformation = [
						// 		new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, new vscode.Range(new vscode.Position(error.previousToken.startLine, error.previousToken.startColumn), new vscode.Position(error.previousToken.endLine, error.previousToken.endColumn))), '相关信息')
						// 	];
						// }
						
					});
					collection.set(document.uri, diagnostics);
				} else {
					collection.clear();
				}
			}
			catch (error) {
				log('error:', error);
			}
		}
	}
	const diagnosticCollection = vscode.languages.createDiagnosticCollection('jdl');
	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(event => {
			clearTimeout(debounceTimeout); // 清除之前的触发
			debounceTimeout = setTimeout(() => {
				const editor = vscode.window.activeTextEditor;
				if (!editor) return;
		
				const changes = event.contentChanges;
				if (changes.length === 0) return;
				const linePrefix = editor.document.lineAt(editor.selection.active).text.substring(0, editor.selection.active.character);
				// const text = changes[0].text;
				// if (text === '.' || text === ':') {
				// 	vscode.commands.executeCommand('editor.action.triggerSuggest');
				// }
				updateDiagnostics(event.document, diagnosticCollection);
			}, 200); // 延迟 200ms
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument(doc => diagnosticCollection.delete(doc.uri))
	);
	if (vscode.window.activeTextEditor) {
		updateDiagnostics(vscode.window.activeTextEditor.document, diagnosticCollection);
	}
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			updateDiagnostics(editor.document, diagnosticCollection);
		}
	}));
	function provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.Location | undefined{
		const line = position.line + 1;
		const character = position.character + 1;
		const word = document.getText(document.getWordRangeAtPosition(position));
		const cstToken = cstTokens.find((cstToken: any) => {
			return cstToken.image === word && cstToken.startLine <= line && cstToken.endLine >= line && cstToken.startColumn <= character && cstToken.endColumn >= character;
		});
		if (cstToken) {
			const labels: string[] = cstToken.label.split('=>');
			const typeChain = labels.map(label => label.split(':')[0]).join('.');
			if (['relationship.from','relationship.to'].includes(typeChain)) {
				log('typeChain:::', typeChain);
				const entityName = labels[1].split(':')[1];
				const findLabel = 'keyword:entity=>entity:' + entityName;
				const entityToken = cstTokens.find((cstToken: any) => {
					return cstToken.label === findLabel;
				});
				if (entityToken) {
					return new vscode.Location(document.uri, new vscode.Position(entityToken.startLine - 1, entityToken.startColumn - 1));
				}
			}
			if (['relationship.from.to.injectedFieldParam','relationship.to.from.injectedFieldParam'].includes(typeChain)) {
				const entityName = labels[2].split(':')[1];
				const fieldName = labels[3].split(':')[1];
				const findLabel = `entity:${entityName}=>field:${fieldName}`;
				const entityToken = cstTokens.find((cstToken: any) => {
					return cstToken.label === findLabel;
				});
				if (entityToken) {
					return new vscode.Location(document.uri, new vscode.Position(entityToken.startLine - 1, entityToken.startColumn - 1));
				}
			
			}
			if (typeChain === 'entity.field.type') {
				const typeName = labels[2].split(':')[1];
				if (!fieldTypes.includes(typeName)) {
					const findLabel = 'enum:' + typeName;
					const entityToken = cstTokens.find((cstToken: any) => {
						return cstToken.label === findLabel;
					});
					if (entityToken) {
						return new vscode.Location(document.uri, new vscode.Position(entityToken.startLine - 1, entityToken.startColumn - 1));
					}
				}
			}
			if (typeChain === 'binaryOption.entity') {
				const entityName = labels[1].split(':')[1];
				const findLabel = 'keyword:entity=>entity:' + entityName;
				const entityToken = cstTokens.find((cstToken: any) => {
					return cstToken.label === findLabel;
				});
				if (entityToken) {
					return new vscode.Location(document.uri, new vscode.Position(entityToken.startLine - 1, entityToken.startColumn - 1));
				}
			}
			return undefined;
		}
	}
	context.subscriptions.push(vscode.languages.registerDefinitionProvider('jdl', {provideDefinition}));
	context.subscriptions.push(...getCompleteItems(errors, jdlObject, lastParseJdl));
	// Create the show ErView command
	const showErViewCommand = vscode.commands.registerCommand("jdl.erview", () => {
		const erList = getErData(lastParseJdl.jdlObject || {});
		ErViewPanel.render(context.extensionUri, erList, vscode.window.activeTextEditor?.document.fileName || '');
	});
	context.subscriptions.push(showErViewCommand);

	const base64ImgtoFile = (dataurl: string): Uint8Array => {
		const arr = dataurl.split(',');
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return u8arr;
	};

	const writePngFile = vscode.commands.registerCommand('jdl.jdl2png', async function(text: any, fileName: string) {
		if (!vscode.workspace.workspaceFolders) {
			return vscode.window.showInformationMessage('No folder or workspace opened');
		}
		const writeData = Buffer.from(base64ImgtoFile(text));

		const folderUri = vscode.workspace.workspaceFolders[0].uri;
		const fileUri = folderUri.with({ path: path.posix.join(folderUri.path, toPngFile(fileName)) });

		await vscode.workspace.fs.writeFile(fileUri, writeData);

		vscode.window.showInformationMessage('PNG file created successfully');
	});
	context.subscriptions.push(writePngFile);
}