"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const console_1 = require("console");
const vscode = __importStar(require("vscode"));
const completeItems_1 = require("./completeItems");
const hoverHelper_1 = require("./hoverHelper");
const lodash_1 = require("lodash");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
let jdl;
const jdlKeywordTokenTypes = {
    ENTITY: 'JDL定义实体关键字',
    ENUM: 'JDL定义枚举关键字',
    RELATIONSHIP: 'JDL定义关联关系关键字',
    APPLICATION: 'JDL定义应用关键字',
    DEPLOYMENT: 'JDL定义部署关键字',
    WITH: 'JDL关键字',
    SERVICE: 'JDL定义Service关键字',
};
const cstTokens = [];
function activate(context) {
    let jdlObject = {};
    let jdlCst = {};
    context.subscriptions.push(vscode.languages.registerHoverProvider('jdl', {
        provideHover(document, position, token) {
            const line = position.line + 1;
            const character = position.character + 1;
            if (Object.keys(jdlCst).length >= 0) {
                const token = jdlCst.tokens.find((token) => {
                    return token.startLine <= line + 1 && token.endLine >= line && token.startColumn <= character && token.endColumn >= character;
                });
                if (token?.tokenType && Object.keys(jdlKeywordTokenTypes).includes(token.tokenType.name)) {
                    return {
                        contents: [jdlKeywordTokenTypes[token.tokenType.name]]
                    };
                }
            }
            const word = document.getText(document.getWordRangeAtPosition(position));
            const cstToken = cstTokens.find((cstToken) => {
                return cstToken.image === word && cstToken.startLine <= line && cstToken.endLine >= line && cstToken.startColumn <= character && cstToken.endColumn >= character;
            });
            if (cstToken) {
                (0, console_1.log)('find cstToken:', cstToken);
                (0, console_1.log)('find tokenLableHover:', (0, hoverHelper_1.tokenLableHover)(cstToken.label));
                return {
                    contents: (0, hoverHelper_1.tokenLableHover)(cstToken.label)
                };
            }
            else {
                (0, console_1.log)('word:', word);
                (0, console_1.log)('line:', line);
                (0, console_1.log)('character:', character);
                (0, console_1.log)('cstTokens:', cstTokens);
            }
            (0, console_1.log)('token: ', token);
            (0, console_1.log)('position: ', position);
            (0, console_1.log)('jdlobject: ', jdlObject);
            (0, console_1.log)('jdlCst: ', jdlCst);
            return {
                contents: []
            };
        },
    }));
    function updateDiagnostics(document, collection) {
        if (document) {
            try {
                const lexResult = jdl.getLexResult(document.getText());
                if (lexResult.errors?.length > 0) {
                    const errors = lexResult.errors.map((error) => {
                        const diagnostic = {
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
                }
                else {
                    (0, console_1.log)('lexResult:', lexResult);
                    try {
                        const parseResult = jdl.parse(document.getText());
                        if (parseResult) {
                            jdlObject = parseResult;
                        }
                    }
                    catch (error) {
                        (0, console_1.log)('error:', error);
                    }
                    jdlCst = lexResult;
                    Object.keys(jdlCst.children).forEach((key) => {
                        if (key === 'binaryOptionDeclaration') {
                            const binaryOptions = jdlCst.children.binaryOptionDeclaration;
                            binaryOptions.forEach((binaryOption) => {
                                if (binaryOption.children?.BINARY_OPTION) {
                                    const binaryOptionLabel = 'binaryOption:' + binaryOption.children.BINARY_OPTION[0].image;
                                    const binaryOptionData = { ...binaryOption.children.BINARY_OPTION[0], label: binaryOptionLabel };
                                    cstTokens.push(binaryOptionData);
                                    binaryOption.children?.entityList?.forEach((entity) => {
                                        if (entity.children) {
                                            if (entity.children.WITH?.length > 0) {
                                                const binaryOptionWithLabel = '=>' + 'with:' + entity.children.WITH[0].image;
                                                const binaryOptionWithData = { ...entity.children.WITH[0], label: binaryOptionWithLabel };
                                                cstTokens.push(binaryOptionWithData);
                                            }
                                            entity.children?.NAME?.forEach((name) => {
                                                const binaryOptionEntityNameLabel = binaryOptionLabel + '=>' + 'entity:' + name.image;
                                                const binaryOptionEntityNameData = { ...name, label: binaryOptionEntityNameLabel };
                                                cstTokens.push(binaryOptionEntityNameData);
                                            });
                                            if (entity.children?.method[0]) {
                                                const binaryOptionMethodLabel = binaryOptionLabel + '=>' + 'method:' + entity.children.method[0].image;
                                                const binaryOptionMethodData = { ...entity.children.method[0], label: binaryOptionMethodLabel };
                                                cstTokens.push(binaryOptionMethodData);
                                            }
                                        }
                                    });
                                }
                            });
                        }
                        if (key === 'entityDeclaration') {
                            const entities = jdlCst.children.entityDeclaration;
                            entities.forEach((entity) => {
                                const label = 'entity:' + entity.children.NAME[0].image;
                                entity.children?.annotationDeclaration?.forEach((annotation) => {
                                    const annoLabel = label + '=>' + 'anno:' + (0, lodash_1.upperFirst)(annotation.children.option[0].image);
                                    const data = { ...annotation.children.option[0], label: annoLabel };
                                    cstTokens.push(data);
                                    if (annotation.children.value) {
                                        const valueLabel = annoLabel + '=>' + 'value:' + annotation.children.value[0].image;
                                        const valueData = { ...annotation.children.value[0], label: valueLabel };
                                        cstTokens.push(valueData);
                                    }
                                });
                                entity.children?.entityBody?.forEach((entityBody) => {
                                    entityBody?.children?.fieldDeclaration?.forEach((field) => {
                                        const fieldLabel = label + '=>' + 'field:' + field.children.NAME[0].image;
                                        const fieldData = { ...field.children.NAME[0], label: fieldLabel };
                                        cstTokens.push(fieldData);
                                        const fieldTypeLabel = fieldLabel + '=>' + 'type:' + field.children.type[0].children.NAME[0].image;
                                        const fieldTypeData = { ...field.children.type[0].children.NAME[0], label: fieldTypeLabel };
                                        cstTokens.push(fieldTypeData);
                                        field.children?.annotationDeclaration?.forEach((annotation) => {
                                            const annoLabel = fieldLabel + '=>' + 'anno:' + (0, lodash_1.upperFirst)(annotation.children.option[0].image);
                                            const data = { ...annotation.children.option[0], label: annoLabel };
                                            cstTokens.push(data);
                                            if (annotation.children.value) {
                                                const valueLabel = annoLabel + '=>' + 'value:' + annotation.children.value[0].image;
                                                const valueData = { ...annotation.children.value[0], label: valueLabel };
                                                cstTokens.push(valueData);
                                            }
                                        });
                                        field.children?.validation?.forEach((validation) => {
                                            if (validation.children?.REQUIRED) {
                                                const validationLabel = fieldLabel + '=>' + 'validation:' + validation.children?.REQUIRED[0].image;
                                                const validationData = { ...validation.children?.REQUIRED[0], label: validationLabel };
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
                            enums?.forEach((enumItem) => {
                                if (enumItem.children) {
                                    const enumName = enumItem.children.NAME[0].image;
                                    const enumLabel = 'enum:' + enumName;
                                    const enumData = { ...enumItem.children.NAME[0], label: enumLabel };
                                    enumItem.children.enumPropList?.forEach((enumProp) => {
                                        enumProp.children?.enumProp?.forEach((prop) => {
                                            const propLabel = enumLabel + '=>' + 'prop:' + prop.children.enumPropKey[0].image;
                                            const propData = { ...prop.children.enumPropKey[0], label: propLabel };
                                            cstTokens.push(propData);
                                            if (prop.children?.enumPropValue) {
                                                const propValueLabel = propLabel + '=>' + 'value:' + prop.children.enumPropValue[0].image;
                                                const propValueData = { ...prop.children.enumPropValue[0], label: propValueLabel };
                                                cstTokens.push(propValueData);
                                            }
                                            if (prop.children?.enumPropValueWithQuotes) {
                                                const propValueLabel = propLabel + '=>' + 'value:' + prop.children.enumPropValueWithQuotes[0].image;
                                                const propValueData = { ...prop.children.enumPropValueWithQuotes[0], label: propValueLabel };
                                                cstTokens.push(propValueData);
                                            }
                                        });
                                    });
                                }
                            });
                        }
                        if (key === 'relationDeclaration') {
                            const relationships = jdlCst.children.relationDeclaration;
                            relationships.forEach((relationship) => {
                                if (relationship.children?.relationshipType && relationship.children?.relationshipType[0]?.children?.RELATIONSHIP_TYPE) {
                                    const relationshipLabel = 'relationship:' + relationship.children.relationshipType[0].children.RELATIONSHIP_TYPE[0].image;
                                    const relationshipData = { ...relationship.children.relationshipType[0].children.RELATIONSHIP_TYPE[0], label: relationshipLabel };
                                    cstTokens.push(relationshipData);
                                    relationship.children?.relationshipBody?.forEach((relationshipBody) => {
                                        if (relationshipBody.from && relationshipBody.from[0]?.children?.NAME) {
                                            const fromLabel = relationshipLabel + '=>' + 'from:' + relationshipBody.from[0].children.NAME[0].image;
                                            const fromData = { ...relationshipBody.from[0].children.NAME[0], label: fromLabel };
                                            cstTokens.push(fromData);
                                        }
                                        if (relationshipBody.to && relationshipBody.to[0]?.children?.NAME) {
                                            const fromLabel = relationshipLabel + '=>' + 'to:' + relationshipBody.to[0].children.NAME[0].image;
                                            const fromData = { ...relationshipBody.to[0].children.NAME[0], label: fromLabel };
                                            cstTokens.push(fromData);
                                        }
                                    });
                                }
                            });
                        }
                        if (key === 'unaryOptionDeclaration') {
                            const unaryOptions = jdlCst.children.unaryOptionDeclaration;
                            unaryOptions.forEach((unaryOption) => {
                                if (unaryOption.children?.UNARY_OPTION) {
                                    const unaryOptionLabel = 'unaryOption:' + unaryOption.children.UNARY_OPTION[0].image;
                                    const unaryOptionData = { ...unaryOption.children.UNARY_OPTION[0], label: unaryOptionLabel };
                                    cstTokens.push(unaryOptionData);
                                    const defName = unaryOption.children.UNARY_OPTION[0].image + 'Def';
                                    if (unaryOption.children[defName]) {
                                        const unaryOptionDef = unaryOption.children[defName][0];
                                        unaryOptionDef?.NAME?.forEach((name) => {
                                            const unaryOptionNameLabel = unaryOptionLabel + '=>' + 'name:' + name.image;
                                            const unaryOptionNameData = { ...name, label: unaryOptionNameLabel };
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
                (0, console_1.log)('error:', error);
            }
        }
        else {
            collection.clear();
        }
    }
    const collection = vscode.languages.createDiagnosticCollection('jdl');
    import('generator-begcode/jdl').then(res => {
        jdl = res;
        if (vscode.window.activeTextEditor) {
            updateDiagnostics(vscode.window.activeTextEditor.document, collection);
        }
        context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
            (0, console_1.log)('DidChange');
            if (editor) {
                (0, console_1.log)('DidChange-editor');
                updateDiagnostics(editor.document, collection);
            }
        }));
    });
    context.subscriptions.push(...completeItems_1.completeItems);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map