/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { log } from 'console';
import * as vscode from 'vscode';
import { completeItems } from './completeItems';
import { tokenLableHover } from './hoverHelper';
import { upperFirst } from 'lodash';
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

export function activate(context: vscode.ExtensionContext) {
	let jdlObject: any = {};
	let jdlCst: any = {};

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
				const word = document.getText(document.getWordRangeAtPosition(position));
				const cstToken = cstTokens.find((cstToken: any) => {
					return cstToken.image === word && cstToken.startLine <= line && cstToken.endLine >= line && cstToken.startColumn <= character && cstToken.endColumn >= character;
				});
				if (cstToken) {
					return {
						contents: tokenLableHover(cstToken.label)
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
				const lexResult = jdl.getLexResult(document.getText());
				if (lexResult.errors?.length > 0) {
					const errors = lexResult.errors.map((error: any) => {
						const diagnostic: any = {
							code: '',
							message: error.message,
							range: new vscode.Range(new vscode.Position(error.token.startLine, error.token.startColumn), new vscode.Position(error.token.endLine, error.token.endColumn)),
							severity: vscode.DiagnosticSeverity.Error,
							source: '',
						};
						if (error.previousToken) {
							diagnostic.relatedInformation = [
								new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, new vscode.Range(new vscode.Position(error.previousToken.startLine, error.previousToken.startColumn), new vscode.Position(error.previousToken.endLine, error.previousToken.endColumn))), '相关信息')
							];
						}
						return diagnostic;
					});
					collection.set(document.uri, errors);
				} else {
					try {
						const parseResult = jdl.parse(document.getText());
						if (parseResult) {
							jdlObject = parseResult;
						}	
					} catch (error) {
						log('error:', error);
					}
					jdlCst = lexResult;
					Object.keys(jdlCst.children).forEach((key: string) => {
						if (key === 'binaryOptionDeclaration') {
							const binaryOptions = jdlCst.children.binaryOptionDeclaration;
							binaryOptions.forEach((binaryOption: any) => {
								if (binaryOption.children?.BINARY_OPTION) {
									const binaryOptionLabel = 'binaryOption:' + binaryOption.children.BINARY_OPTION[0].image;
									const binaryOptionData: any = {...binaryOption.children.BINARY_OPTION[0], label: binaryOptionLabel};
									cstTokens.push(binaryOptionData);
									binaryOption.children?.entityList?.forEach((entity: any) => {
										if (entity.children) {
											if (entity.children.WITH?.length > 0) {
												const binaryOptionWithLabel = '=>' + 'with:' + entity.children.WITH[0].image;
												const binaryOptionWithData: any = {...entity.children.WITH[0], label: binaryOptionWithLabel};
												cstTokens.push(binaryOptionWithData);
											}
											entity.children?.NAME?.forEach((name: any) => {
												const binaryOptionEntityNameLabel = binaryOptionLabel + '=>' + 'entity:' + name.image;
												const binaryOptionEntityNameData: any = {...name, label: binaryOptionEntityNameLabel};
												cstTokens.push(binaryOptionEntityNameData);
											});
											if (entity.children?.method[0]) {
												const binaryOptionMethodLabel = binaryOptionLabel + '=>' + 'method:' + entity.children.method[0].image;
												const binaryOptionMethodData: any = {...entity.children.method[0], label: binaryOptionMethodLabel};
												cstTokens.push(binaryOptionMethodData);
											}
										}
									});
								}
							});
						}
						if (key === 'entityDeclaration') {
							const entities = jdlCst.children.entityDeclaration;
							entities.forEach((entity: any) => {
								const label = 'entity:' + entity.children.NAME[0].image;
								entity.children?.annotationDeclaration?.forEach((annotation: any) => {
									const annoLabel =label + '=>' + 'anno:' + upperFirst(annotation.children.option[0].image);
									const data: any = {...annotation.children.option[0], label: annoLabel};
									cstTokens.push(data);
									if (annotation.children.value) {
										const valueLabel = annoLabel + '=>' + 'value:' + annotation.children.value[0].image;
										const valueData: any = {...annotation.children.value[0], label: valueLabel};
										cstTokens.push(valueData);
									}
								});
								entity.children?.entityBody?.forEach((entityBody: any) => {
									entityBody?.children?.fieldDeclaration?.forEach((field: any) => {
										const fieldLabel =label + '=>' + 'field:' + field.children.NAME[0].image;
										const fieldData: any = {...field.children.NAME[0], label: fieldLabel};
										cstTokens.push(fieldData);
										const fieldTypeLabel =fieldLabel + '=>' + 'type:' + field.children.type[0].children.NAME[0].image;
										const fieldTypeData: any = {...field.children.type[0].children.NAME[0], label: fieldTypeLabel};
										cstTokens.push(fieldTypeData);
										field.children?.annotationDeclaration?.forEach((annotation: any) => {
											const annoLabel = fieldLabel + '=>' + 'anno:' + upperFirst(annotation.children.option[0].image);
											const data: any = {...annotation.children.option[0], label: annoLabel};
											cstTokens.push(data);
											if (annotation.children.value) {
												const valueLabel = annoLabel + '=>' + 'value:' + annotation.children.value[0].image;
												const valueData: any = {...annotation.children.value[0], label: valueLabel};
												cstTokens.push(valueData);
											}
										});
										field.children?.validation?.forEach((validation: any) => {
											if (validation.children?.REQUIRED) {
												const validationLabel = fieldLabel + '=>' + 'validation:' + validation.children?.REQUIRED[0].image;
												const validationData: any = {...validation.children?.REQUIRED[0], label: validationLabel};
												cstTokens.push(validationData);
											}
											// todo: 其他验证规则
										});
										
									});
								});
							});
						}
						if (key === 'enumDeclaration') {
							const enums = jdlCst.children.enumDeclaration;
							enums?.forEach((enumItem: any) => {
								if (enumItem.children) {
									const enumName = enumItem.children.NAME[0].image;
									const enumLabel = 'enum:' + enumName;
									const enumData: any = {...enumItem.children.NAME[0], label: enumLabel};
									cstTokens.push(enumData);
									enumItem.children.enumPropList?.forEach((enumProp: any) => {
										enumProp.children?.enumProp?.forEach((prop: any) => {
											const propLabel = enumLabel + '=>' + 'prop:' + prop.children.enumPropKey[0].image;
											const propData: any = {...prop.children.enumPropKey[0], label: propLabel};
											cstTokens.push(propData);
											if (prop.children?.enumPropValue) {
												const propValueLabel = propLabel + '=>' + 'value:' + prop.children.enumPropValue[0].image;
												const propValueData: any = {...prop.children.enumPropValue[0], label: propValueLabel};
												cstTokens.push(propValueData);
											}
											if (prop.children?.enumPropValueWithQuotes) {
												const propValueLabel = propLabel + '=>' + 'value:' + prop.children.enumPropValueWithQuotes[0].image;
												const propValueData: any = {...prop.children.enumPropValueWithQuotes[0], label: propValueLabel};
												cstTokens.push(propValueData);
											}
										});
									});
								}
							});
						}
						if (key === 'relationDeclaration') {
							const relationships = jdlCst.children.relationDeclaration;
							relationships.forEach((relationship: any) => {
								if (relationship.children?.relationshipType && relationship.children?.relationshipType[0]?.children?.RELATIONSHIP_TYPE) {
									const relationshipLabel = 'relationship:' + relationship.children.relationshipType[0].children.RELATIONSHIP_TYPE[0].image;
									const relationshipData: any = {...relationship.children.relationshipType[0].children.RELATIONSHIP_TYPE[0], label: relationshipLabel};
									cstTokens.push(relationshipData);
									relationship.children?.relationshipBody?.forEach((relationshipBody: any) => {
										if (relationshipBody.from && relationshipBody.from[0]?.children?.NAME) {
											const fromLabel = relationshipLabel + '=>' + 'from:' + relationshipBody.from[0].children.NAME[0].image;
											const fromData: any = {...relationshipBody.from[0].children.NAME[0], label: fromLabel};
											cstTokens.push(fromData);
										}
										if (relationshipBody.to && relationshipBody.to[0]?.children?.NAME) {
											const fromLabel = relationshipLabel + '=>' + 'to:' + relationshipBody.to[0].children.NAME[0].image;
											const fromData: any = {...relationshipBody.to[0].children.NAME[0], label: fromLabel};
											cstTokens.push(fromData);
										}
									});
								}
							});
						}
						if (key === 'unaryOptionDeclaration') {
							const unaryOptions = jdlCst.children.unaryOptionDeclaration;
							unaryOptions.forEach((unaryOption: any) => {
								if (unaryOption.children?.UNARY_OPTION) {
									const unaryOptionLabel = 'unaryOption:' + unaryOption.children.UNARY_OPTION[0].image;
									const unaryOptionData: any = {...unaryOption.children.UNARY_OPTION[0], label: unaryOptionLabel};
									cstTokens.push(unaryOptionData);
									const defName = unaryOption.children.UNARY_OPTION[0].image + 'Def';
									if (unaryOption.children[defName]) {
										const unaryOptionDef = unaryOption.children[defName][0];
										unaryOptionDef?.NAME?.forEach((name: any) => {
											const unaryOptionNameLabel = unaryOptionLabel + '=>' + 'name:' + name.image;
											const unaryOptionNameData: any = {...name, label: unaryOptionNameLabel};
											cstTokens.push(unaryOptionNameData);
										});
									}
								}
							});
						}
					});
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
	context.subscriptions.push(...completeItems);
}