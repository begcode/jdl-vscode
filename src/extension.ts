/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { log } from 'console';
import * as vscode from 'vscode';
import { getCompleteItems } from './completeItems';
import { tokenLableHover } from './hoverHelper';
import { parseJdl } from './parseJdl';
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

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.languages.registerHoverProvider('jdl', {
			provideHover(document, position, token) {
				const line = position.line + 1;
				const character = position.character + 1;
				if (Object.keys(jdlCst).length >= 0) {
					const token = jdlCst.tokens.find((token: any) => {
						return token.startLine <= line + 1 && token.endLine >= line && token.startColumn <= character && token.endColumn >= character;
					});
					if (token?.tokenType && Object.keys(jdlKeywordTokenTypes).includes(token.tokenType.name)) {
						return {
							contents: [jdlKeywordTokenTypes[token.tokenType.name]]
						};
					}
				}
				if (document.getText(new vscode.Range(new vscode.Position(line, character - 1), new vscode.Position(line, character))) === ' ') {
					return {
						contents: []
					};
				}
				const word = document.getText(document.getWordRangeAtPosition(position));
				const cstToken = cstTokens.find((cstToken: any) => {
					return cstToken.image === word && cstToken.startLine <= line && cstToken.endLine >= line && cstToken.startColumn <= character && cstToken.endColumn >= character;
				});
				if (cstToken) {
					return {
						contents: tokenLableHover(cstToken.label, document.getText())
					};
				}
				return {
					contents: []
				};
			},
		}),
	);
	function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
		if (document) {
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
					const diagnostics = errors.map((error: any) => {
						const diagnostic: any = {
							code: '',
							message: error.message,
							range: new vscode.Range(new vscode.Position(error.token.startLine - 1, error.token.startColumn - 1), new vscode.Position(error.token.endLine - 1, error.token.endColumn - 1)),
							severity: vscode.DiagnosticSeverity.Error,
							source: '',
						};
						// if (error.previousToken) {
						// 	diagnostic.relatedInformation = [
						// 		new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, new vscode.Range(new vscode.Position(error.previousToken.startLine, error.previousToken.startColumn), new vscode.Position(error.previousToken.endLine, error.previousToken.endColumn))), '相关信息')
						// 	];
						// }
						return diagnostic;
					});
					collection.set(document.uri, diagnostics);
				} else {
					collection.clear();
				}
			}
			catch (error) {
				log('error:', error);
			}
		} else {
			collection.clear();
		}
	}
	const diagnosticCollection = vscode.languages.createDiagnosticCollection('jdl');
	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => updateDiagnostics(e.document, diagnosticCollection))
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
	context.subscriptions.push(...getCompleteItems(errors, jdlObject, lastParseJdl));
}