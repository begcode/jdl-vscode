import { log } from 'console';
import { upperFirst } from 'lodash';

let jdl: any;

async function getJdl() {
  if (!jdl) {
	jdl = await import('generator-begcode/jdl');
  }
}

getJdl();

export function parseJdl(text: string) {
	const lexResult = jdl.getLexResult(text);
	let jdlObject: any = null;
	const errors: any[] = [];
	const cstTokens: any[] = [];
	try {
		if (!lexResult.errors || lexResult.errors?.length === 0) {
			const parseResult = jdl.grammarParse(text);
			if (parseResult) {
				jdlObject = parseResult;
			}	
		} else {
			errors.push(...lexResult.errors || []);
		}
	} catch (error) {
		log('error:', error);
	}
	if (lexResult.children) {
		cstTokens.length = 0;
		Object.keys(lexResult.children).forEach((key: string) => {
			if (key === 'binaryOptionDeclaration') {
				const binaryOptions = lexResult.children.binaryOptionDeclaration;
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
				const entities = lexResult.children.entityDeclaration;
				log('entities::', entities);
				entities.forEach((entity: any) => {
					const keywordLabel = 'keyword:entity=>' + 'entity:' + entity.children.NAME[0].image;
					const keywordData = {...entity.children.ENTITY[0], label: keywordLabel};
					cstTokens.push(keywordData);
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
				const enums = lexResult.children.enumDeclaration;
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
				const relationships = lexResult.children.relationDeclaration;
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
				const unaryOptions = lexResult.children.unaryOptionDeclaration;
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
	return {
		jdlObject,
		errors,
		cstTokens,
		jdlCst: lexResult,
	};
}