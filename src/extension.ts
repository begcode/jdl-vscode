/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { log } from 'console';
import * as vscode from 'vscode';
import { getCompleteItems } from './completeItems';
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

export { cstTokens };

export function activate(context: vscode.ExtensionContext) {
	let jdlObject: any = {};
	let jdlCst: any = {};
	const errors: any[] = [];

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
						contents: tokenLableHover(cstToken.label, jdlObject)
					};
				}
				log('hover.cstToken', cstToken);
				log('hover.word', word);
				log('cstTokens', cstTokens);
				return {
					contents: []
				};
			},
		}),
	);
	function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
		if (document) {
			try {
				errors.length = 0;
				const lexResult = jdl.getLexResult(document.getText());
				jdlCst = lexResult;
				try {
					if (!lexResult.errors || lexResult.errors?.length === 0) {
						const parseResult = jdl.grammarParse(document.getText());
						if (parseResult) {
							jdlObject = parseResult;
							log('parseResult:', parseResult);
						}	
					} else {
						errors.push(...lexResult.errors || []);
					}
				} catch (error) {
					log('error:', error);
				}
				if (jdlCst.children) {
					cstTokens.length = 0;
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
							log('entities::', entities);
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
											if (validation.children?.UNIQUE) {
												const validationLabel = fieldLabel + '=>' + 'validation:' + validation.children?.UNIQUE[0].image;
												const validationData: any = {...validation.children?.UNIQUE[0], label: validationLabel};
												cstTokens.push(validationData);
											}
											if (validation.children?.pattern) {
												const validationLabel = fieldLabel + '=>' + 'validation:' + validation.children?.pattern[0].children.PATTERN[0].image;
												const validationData: any = {...validation.children?.pattern[0].children.PATTERN[0], label: validationLabel};
												cstTokens.push(validationData);
												const validationValueLabel = validationLabel + '=>' + 'value:' + validation.children?.pattern[0].children?.REGEX[0].image;
												const validationValueData = { ...validation.children?.pattern[0].children?.REGEX[0], label: validationValueLabel};
												cstTokens.push(validationValueData);
											}
											// minMaxValidation
											if (validation.children?.minMaxValidation) {
												const validationLabel = fieldLabel + '=>' + 'validation:' + validation.children?.minMaxValidation[0].children?.MIN_MAX_KEYWORD[0].image;
												const validationData = { ...validation.children?.minMaxValidation[0].children?.MIN_MAX_KEYWORD[0], label: validationLabel};
												cstTokens.push(validationData);
												const validationValueLabel = validationLabel + '=>' + 'value:' + validation.children?.minMaxValidation[0].children?.INTEGER[0].image;
												const validationValueData = { ...validation.children?.minMaxValidation[0].children?.INTEGER[0], label: validationValueLabel};
												cstTokens.push(validationValueData);
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
										if (relationshipBody.children && relationshipBody.children.from[0]?.children?.NAME && relationshipBody.children.to[0]?.children?.NAME) {
											const fromLabelOnly = 'from:' + relationshipBody.children.from[0].children.NAME[0].image;
											const fromLabel = relationshipLabel + '=>' + fromLabelOnly;
											const fromData: any = {...relationshipBody.children.from[0].children.NAME[0], label: fromLabel};
											cstTokens.push(fromData);
											const toLabelOnly = 'to:' + relationshipBody.children.to[0].children.NAME[0].image;
											const toLabel = relationshipLabel + '=>' + toLabelOnly;
											const toData: any = {...relationshipBody.children.to[0].children.NAME[0], label: toLabel};
											cstTokens.push(toData);
											if (relationshipBody.children.from[0]?.children?.injectedField) {
												const fromInjectedFieldLabel = fromLabel + '=>' + toLabelOnly + '=>' + 'injectedField:' + relationshipBody.children.from[0].children.injectedField[0].image;
												const fromInjectedFieldData: any = {...relationshipBody.children.from[0].children.injectedField[0], label: fromInjectedFieldLabel};
												cstTokens.push(fromInjectedFieldData);
											}
											if (relationshipBody.children.from[0]?.children?.injectedFieldParam) {
												const fromInjectedFieldParamLabel = fromLabel + '=>' + toLabelOnly + '=>' + 'injectedFieldParam:' + relationshipBody.children.from[0].children.injectedFieldParam[0].image;
												const fromInjectedFieldParamData: any = {...relationshipBody.children.from[0].children.injectedFieldParam[0], label: fromInjectedFieldParamLabel};
												cstTokens.push(fromInjectedFieldParamData);
											}
											if (relationshipBody.children.to[0]?.children?.injectedField) {
												const toInjectedFieldLabel = toLabel + '=>' + fromLabelOnly + '=>' + 'injectedField:' + relationshipBody.children.to[0].children.injectedField[0].image;
												const toInjectedFieldData: any = {...relationshipBody.children.to[0].children.injectedField[0], label: toInjectedFieldLabel};
												cstTokens.push(toInjectedFieldData);
											}
											if (relationshipBody.children.to[0]?.children?.injectedFieldParam) {
												const toInjectedFieldParamLabel = toLabel + '=>' + fromLabelOnly +  '=>' + 'injectedFieldParam:' + relationshipBody.children.to[0].children.injectedFieldParam[0].image;
												const toInjectedFieldParamData: any = {...relationshipBody.children.to[0].children.injectedFieldParam[0], label: toInjectedFieldParamLabel};
												cstTokens.push(toInjectedFieldParamData);
											}
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
				}
				log('lexResult:', lexResult);
				if (lexResult.errors?.length > 0) {
					const errors = lexResult.errors.map((error: any) => {
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
					collection.set(document.uri, errors);
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
	context.subscriptions.push(...getCompleteItems(errors, jdlObject));
}