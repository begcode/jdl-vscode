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
						if (binaryOption.children.annotationDeclaration) {
							binaryOption.children.annotationDeclaration.forEach((annotation: any) => {
								const annoLabel = binaryOptionLabel + '=>' + 'anno:' + upperFirst(annotation.children.option[0].image);
								const data: any = {...annotation.children.option[0], label: annoLabel};
								cstTokens.push(data);
								if (annotation.children.value) {
									const valueLabel = binaryOptionLabel + '=>' + 'value:' + annotation.children.value[0].image;
									const valueData: any = {...annotation.children.value[0], label: valueLabel};
									cstTokens.push(valueData);
								}
							});
						}
					}
				});
			}
			if (key === 'entityDeclaration') {
				const entities = lexResult.children.entityDeclaration;
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
								const toKeywordOnly = 'keyword:' + relationshipBody.children.TO[0].image;
								const toKeywordLabel = relationshipLabel + '=>' + toKeywordOnly;
								const toKeywordData: any = {...relationshipBody.children.TO[0], label: toKeywordLabel};
								cstTokens.push(toKeywordData);
								if (relationshipBody.children.relationshipOptions) {
									const relationshipOption = relationshipBody.children.relationshipOptions[0];
									relationshipOption.children?.relationshipOption?.forEach((option: any) => {
										const optionLabel = "relationship:relationshipOption" + '=>' + option.children.BUILT_IN_ENTITY[0].image;
										const optionData: any = {...option.children.BUILT_IN_ENTITY[0], label: optionLabel};
										cstTokens.push(optionData);
									});
								}
								if (relationshipBody.children.annotationOnSourceSide) {
									const annotationOnSourceSide = relationshipBody.children.annotationOnSourceSide[0];
									const annoLabel = relationshipLabel + '=>' + 'anno:' + upperFirst(annotationOnSourceSide.children.option[0].image);
										const data: any = {...annotationOnSourceSide.children.option[0], label: annoLabel};
										cstTokens.push(data);
										if (annotationOnSourceSide.children.value) {
											const valueLabel = annoLabel + '=>' + 'value:' + annotationOnSourceSide.children.value[0].image;
											const valueData: any = {...annotationOnSourceSide.children.value[0], label: valueLabel};
											cstTokens.push(valueData);
										}
								}
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

export function getErData(jdlObject: any) {
	const erList: any[] = [];
	let addX = 20;
	let addY = 20;
	let maxFieldCommentLength = 0;
	let maxFiledsCount = 0;
	let erWidth = 160;
	jdlObject?.entities.forEach((entity: any, index: number) => {
		
		if (index % 4 === 0) {
			
			addX = 20;
			addY += (maxFiledsCount + 2) * 24;
			maxFiledsCount = 0;
		} else {
			addX += 200 + (erWidth > 160 ? erWidth - 160 : 0);
		}
		erWidth = 160;
		maxFieldCommentLength = 0;
		let erLabel = '';
		const documentation = (entity.documentation || '').replace(/[\r\n]/g, '').replace(/^[ ]*\*[ ]*/, '');
		if (documentation) {
			erLabel = `${entity.name}[${documentation}]`;
		} else {
			erLabel = entity.name;
		}
		const erObject = {
			"id": entity.name,
			"shape": "er-rect",
			"label": erLabel,
			"width": erWidth,
			"height": 24,
			"ports": [] as any[],
			"position": {
				"x": addX,
				"y": addY
			},
		};
		entity?.body.forEach((field: any) => {
			const fieldComment = (field.documentation || '').replace(/^[ ]*\*[ ]*/, '').replace(/[\r\n]/g, '');
			if (fieldComment.length > maxFieldCommentLength) {
				maxFieldCommentLength = fieldComment.length;
			}
			const port: any = {
				id: entity.name + '-' + field.name,
				group: "column",
				attrs: {
					columnCode: {
						text: field.name,
					},
					dataType: {
						text: field.type
					},
				}
			};
			const idField =  field.annotations.find((annotation: any) => annotation.optionName.toLowerCase() === 'id');
			if (idField) {
				port.attrs.primaryKey = {
					"xlink:href": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAUJJREFUOE+tkj1LA0EQht/JeYJyZ2HnPxCxsRIkKjbZsxByiUnhD0htCrWNnSDEP2EVSXKFQj6aIKSKhdhYamMp6GVTKGRHtthD/MqFuOXOzDPvOzOECR9NWI//BbwF20vvw2GeErQJ4p6Tbh2OUhgpGFTFAltoE+iFmW8ALAK4d/xm8S9IBOhXUyWyaNdJN5d1wWtFzFs2nhm05fqNzm+QCCDrqStW6LnZVskkD+rigabs5OzO5VMMgNgHcKaUSs5l210ZeEUwlwG14vjt25EAnSBr3jlIZQCaAeGOFR6JsMFMBTfTuJA178DJNE4/w76tkSu5aWn314xvGYgjME5Y8TElaI9BBQ0w8Vh3EAZiPcG4Np01zMwqFkAXciVnDeywC2CVmfLakv6PDTDdZc0rM6twbAWxtjDqbH+Kj23hK+QDeLV1EUm2vVIAAAAASUVORK5CYII="
				};
			}
			if (fieldComment) {
				port.attrs.comment = {
					text: fieldComment,
				};
			}
			erObject.ports.push(port);
		});
		if (entity.body?.length > maxFiledsCount) {
			maxFiledsCount = entity.body.length;
		}
		erWidth = maxFieldCommentLength > 2 ? 160 + (maxFieldCommentLength - 2) * 8 : 160;
		erObject.width = erWidth;
		erObject.ports.forEach(port => {
			port.attrs.portBody = {
				width: erWidth,
			};
		});
		erList.push(erObject);
	});
	jdlObject.enums?.forEach((enumItem: any, index: number) => {
		/**
		 * {
			name: "TestEnum",
			values: [
				{
				comment: "测试A"
				key: "A",
				},
				{
				key: "B",
				},
				{
				key: "C",
				},
			],
			documentation: null,
			}
		 */
		if (index % 4 === 0) {
		
			addX = 20;
			addY += (maxFiledsCount + 2) * 24;
			maxFiledsCount = 0;
		} else {
			addX += 200 + (erWidth > 160 ? erWidth - 160 : 0);
		}
		erWidth = 160;
		maxFieldCommentLength = 0;
		let erLabel = '';
		const documentation = (enumItem.documentation || '').replace(/^[ ]*\*[ ]*/, '').replace(/[\r\n]/g, '');
		if (documentation) {
			erLabel = `${enumItem.name}[${documentation}]`;
		} else {
			erLabel = enumItem.name;
		}
		const erObject = {
			"id": enumItem.name,
			"shape": "er-rect",
			"label": erLabel,
			"width": erWidth,
			"height": 24,
			"ports": [] as any[],
			"position": {
				"x": addX,
				"y": addY
			},
		};
		enumItem.values?.forEach((value: any) => {
			const enumComment = (value.comment || '').replace(/^[ ]*\*[ ]*/, '').replace(/[\r\n]/g, '');
			if (enumComment.length > maxFieldCommentLength) {
				maxFieldCommentLength = enumComment.length;
			}
			const port: any = {
				id: enumItem.name + '-' + value.key,
				group: "column",
				attrs: {
					columnCode: {
						text: value.key,
					},
				}
			};
			if (enumComment) {
				port.attrs.comment = {
					text: enumComment,
				};
			}
			erObject.ports.push(port);
		});
		if (enumItem.values?.length > maxFiledsCount) {
			maxFiledsCount = enumItem.values.length;
		}
		erWidth = maxFieldCommentLength > 2 ? 160 + (maxFieldCommentLength - 2) * 8 : 160;
		erObject.width = erWidth;
		erObject.ports.forEach(port => {
			port.attrs.portBody = {
				width: erWidth,
			};
		});
		erList.push(erObject);
	});
	jdlObject.relationships?.forEach((relationship: any) => {
		// ManyToOne
		// relationship.cardinality
		/** from
		 * {
			name: "TestEntity",
			injectedField: "te(age)",
			documentation: null,
			required: false,
			}
		 * to
			{
			name: "TestEntity2",
			injectedField: "te1(name)",
			documentation: null,
			required: false,
			}
		 */
		const edgeId = `${relationship.from.name}-${relationship.from.injectedField || ''}-${relationship.to.name}-${relationship.to.injectedField || ''}`
		const edge = {
			"id": edgeId,
			"shape": "edge",
			"source": relationship.from.name,
			"target": relationship.to.name,
			"attrs": {
				"line": {
					"stroke": "#A2B1C3",
					"strokeWidth": 2
				}
			},
			"zIndex": 0
		};
		erList.push(edge);
	});
	return erList;
}