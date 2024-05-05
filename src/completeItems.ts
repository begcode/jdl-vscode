import * as vscode from 'vscode';
import { cstTokens } from './extension';
import { hoverData, tokenLableComplete } from './hoverHelper';
import { parseJdl } from './parseJdl';
import { get } from 'lodash';
import { log } from 'console';

const annotationValueDetail: Record<string, Record<string, Record<string, string>>> = {
	AddCustomMethod: {
		repository: {
			'detail': '',
			'description': '在DAO层增加方法'
		},
		service: {
			'detail': '',
			'description': '在Service层增加方法'
		},
		rest: {
			'detail': '',
			'description': '在REST层增加方法'
		},
		clientService: {
			'detail': '',
			'description': '在前端API层增加方法'
		},
		queryService: {
			'detail': '',
			'description': '在QueryService层增加方法'
		},
		updateComponent: {
			'detail': '',
			'description': '在前端Update组件增加代码'
		},
		listComponent: {
			'detail': '',
			'description': '在前端List组件增加代码'
		},
		clientRoute: {
			'detail': '',
			'description': '在前端Router增加代码'
		},
		editComponent: {
			'detail': '',
			'description': '在前端Edit组件增加代码'
		},
		dto: {
			'detail': '',
			'description': '在DTO层增加代码'
		},
		listRelation: {
			'detail': '',
			'description': '在前端RelationList中增加代码'
		},
		detailTemplate: {
			'detail': '',
			'description': '在前端Detail组件中增加代码'
		},
	},
	SkipWebButton: {
		listAdd: {
			'detail': '',
			'description': '在List中取消Add按钮'
		},
		listModalEdit: {
			'detail': '',
			'description': '在List中取消Edit按钮'
		},
		listEdit: {
			'detail': '',
			'description': '在List中取消Edit按钮'
		},
		listDelete: {
			'detail': '',
			'description': '在List中取消Delete按钮'
		},
		listDetail: {
			'detail': '',
			'description': '在List中取消Detail按钮'
		},
	},
	AnnotationOnSource: {
		Unidirectional: {
			'detail': '',
			'description': '单向关系'
		},
		editBySelect: {
			'detail': '',
			'description': '通过选择器编辑'
		},
		editByFormList: {
			'detail': '',
			'description': '通过表单列表编辑'
		},
		editByList: {
			'detail': '',
			'description': '通过列表编辑'
		},
		editByDescList: {
			'detail': '',
			'description': '通过详情列表编辑'
		},
		editByTable: {
			'detail': '',
			'description': '通过表格编辑'
		},
		countByPrimaryKey: {
			'detail': '',
			'description': '按主键进行统计'
		},
		relateByIdEntity: {
			'detail': '',
			'description': '使用实体名称和ID进行关联'
		},
		editBySelectModal: {
			'detail': '',
			'description': '通过弹窗选择编辑'
		},
		editBySelectDrawer: {
			'detail': '',
			'description': '通过抽屉组件编辑'
		},
		editByTableModal: {
			'detail': '',
			'description': '通过弹窗表格编辑'
		},
		editByTableDrawer: {
			'detail': '',
			'description': '通过抽屉表格编辑'
		},
		importData: {
			'detail': '',
			'description': '导入关系数据'
		},
		editInForm: {
			'detail': '',
			'description': '在表单中编辑'
		},
		editInList: {
			'detail': '',
			'description': '在列表中编辑'
		},
		hideInList: {
			'detail': '',
			'description': '在列表中不显示'
		},
		detailInList: {
			'detail': '',
			'description': '在列表中显示详情'
		},
	},
	AnnotationOnDestination: {
		editInList: {
			'detail': '',
			'description': '在列表中编辑'
		},
		editBySelectModal: {
			'detail': '',
			'description': '在弹窗中编辑'
		},
	},
	FieldConfig: {
		editInList: {
			'detail': '',
			'description': '在表格中编辑'
		},
		hideInList: {
			'detail': '',
			'description': '在表格中不显示'
		},
		hideInForm: {
			'detail': '',
			'description': '在表单中不显示'
		},
		searchForm: {
			'detail': '',
			'description': '在搜索表单中显示'
		},
		filter: {
			'detail': '',
			'description': '支持列表中过滤'
		},
	},
	SkipRestApi: {
		dataExport: {
			'detail': '',
			'description': '取消导出API接口'
		},
		dataImport: {
			'detail': '',
			'description': '取消导入API接口'
		},
		create: {
			'detail': '',
			'description': '取消新建API接口'
		}
	},
	SkipComponent: {
		listPage: {
			'detail': '',
			'description': '忽略前端列表页面'
		},
		editPage: {
			'detail': '',
			'description': '忽略前端编辑页面'
		},
		detailPage: {
			'detail': '',
			'description': '忽略前端详情页面'
		},
		clientService: {
			'detail': '',
			'description': '忽略前端API接口'
		},
		clientRoute: {
			'detail': '',
			'description': '忽略前端路由'
		},
		domain: {
			'detail': '',
			'description': '忽略后端Domain文件'
		},
		mapper: {
			'detail': '',
			'description': '忽略后端DtoMapper文件'
		},
		controllerTest: {
			'detail': '',
			'description': '忽略后端ResourceIT测试文件'
		},
		serviceClass: {
			'detail': '',
			'description': '忽略后端Service文件'
		},
		restController: {
			'detail': '',
			'description': '忽略后端RestApi文件'
		},
		repository: {
			'detail': '',
			'description': '忽略后端DAO文件'
		},
		queryService: {
			'detail': '',
			'description': '忽略后端QueryService文件'
		}
	}
};

const fieldTypeDetail: any[] = [
	{
		label: {
			label: 'String',
			detail: '',
			description: '字符串'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'Integer',
			'detail': '',
			'description': '整数'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'Long',
			detail: '',
			description: '长整'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'BigDecimal',
			'detail': '',
			'description': '大浮点数'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'Float',
			'detail': '',
			'description': '单精度'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'Double',
			'detail': '',
			'description': '双精度'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'Boolean',
			'detail': '',
			'description': '布尔'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'LocalDate',
			'detail': '',
			'description': '本地化日期'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'ZonedDateTime',
			'detail': '',
			'description': '带时区和时间'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'Instant',
			'detail': '',
			'description': '时间戳类型'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'Duration',
			'detail': '',
			'description': '持续时间'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'UUID',
			'detail': '',
			'description': 'UUID'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'Blob',
			'detail': '',
			'description': '二进制'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'AnyBlob',
			'detail': '',
			'description': '任意二进制'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'ImageBlob',
			'detail': '',
			'description': '图片二进制'
		},
		kind: vscode.CompletionItemKind.Class
	},
	{
		label: {
			label: 'TextBlob',
			'detail': '',
			'description': '长文本'
		},
		kind: vscode.CompletionItemKind.Class
	}
];



const annotationData: Record<string, string[]> = Object.keys(annotationValueDetail).reduce((acc, key) => {
	acc[key] = Object.keys(annotationValueDetail[key]);
	return acc;
}, {} as Record<string, string[]>);

export function getCompleteItems(errors: any[], jdlObject: any = null, lastParseJdl?: any) {
	const annotation = vscode.languages.registerCompletionItemProvider(
		{language: 'jdl'},
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
	
				// get all text until the `position` and check if it reads `console.`
				// and if so then complete if `log`, `warn`, and `error`
				const linePrefix = document.lineAt(position).text.slice(0, position.character);
				// 获得当前注解信息的Regex
				const annotationRegex = new RegExp('@(?<annotationName>[a-z|A-Z]+)(\\((?<annotationValue>[a-z|A-Z|\\-]*)?\\)?)?');
				// 获得后
				if (annotationRegex.test(linePrefix)) {
					const match = linePrefix.match(annotationRegex);
					const annotationName = match?.groups?.annotationName;
					const annotationValueData = match?.groups?.annotationValue;
					const annotationValues = !annotationValueData ? [] : annotationValueData?.split('-');
					if (annotationName && annotationData[annotationName]) {
						return annotationData[annotationName].filter(value => !annotationValues?.includes(value)).map((item) => {
							const completionItem = new vscode.CompletionItem({label: item, ...annotationValueDetail[annotationName][item]});
							completionItem.kind = vscode.CompletionItemKind.Text;
							return completionItem;
						});
					}
				}
				return undefined;
			}
		},
		'-',
		'('
	);
	const fieldType = vscode.languages.registerCompletionItemProvider(
		{language: 'jdl'},
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
	
				// get all text until the `position` and check if it reads `console.`
				// and if so then complete if `log`, `warn`, and `error`
				const linePrefix = document.lineAt(position).text.slice(0, position.character);
				const cutNumber = linePrefix.length - linePrefix.trimEnd().length;
				const beforePosition = new vscode.Position(position.line, position.character - cutNumber - 1);
				const range = document.getWordRangeAtPosition(beforePosition);
				const word = document.getText(range);
				const cstToken = cstTokens.find((cstToken: any) => {
					return cstToken.image === word && cstToken.startLine <= range!.start.line + 1 && cstToken.endLine >= range!.end.line + 1 && cstToken.startColumn <= range!.start.character + 1 && cstToken.endColumn === range!.end.character;
				});
				if (cstToken) {
					// entity:TestEntity=>field:abc=>type:String
					const labels: string[] = cstToken.label.split('=>');
					const typeChain = labels.map(label => label.split(':')[0]).join('.');
					if (typeChain === 'entity.field') {
						return fieldTypeDetail;
					}
					return tokenLableComplete(cstToken.label, document.getText());
				} else {
					if (errors && errors.length) {
						const error = errors.find(error => {
							return error.name === 'MismatchedTokenException' && error.previousToken?.startLine === beforePosition.line + 1 && error.previousToken?.endColumn <= beforePosition.character + 1;
						});
						if (error) {
							if (error.context?.ruleStack) {
								const ruleStackStr = error.context?.ruleStack.join('->');
								if (ruleStackStr === ['prog', 'entityDeclaration', 'entityBody', 'fieldDeclaration', 'type'].join('->')) {
									log('lastParseJdlObject', lastParseJdl.jdlObject);
									const enumTypes = lastParseJdl.jdlObject?.enums?.map((enumItem: any) => {
										return {
											label: {
												label: enumItem.name,
												'detail': '',
												'description': enumItem.documentation || enumItem.name,
											},
											kind: vscode.CompletionItemKind.Enum
										};
									});
									return [...fieldTypeDetail].concat(enumTypes);
								}
							}
						}
					}
				}
				return undefined;
			}
		},
		' ',
	);
	const annotationType = vscode.languages.registerCompletionItemProvider(
		{language: 'jdl'},
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				// 单独分析
				// 找到前一个token
				let beforeLineToken: any = null;
				let afterLineToken: any = null;
				let entity = null;
				let entityName = '';
				let fieldName = '';
				let entities: any[] = jdlObject.entities || [];
				if (errors?.length > 0) {
					const lineText = document.lineAt(position).text;
					if (lineText.trim() === '@') {
						const offset = document.offsetAt(position);
						const allText = document.getText();
						const replaceByIndex = (str: string, start: number, newContent: string) => {
							// 使用substring方法从字符串中提取开始到替换点的部分
							const part1 = str.substring(0, start);
							// 提取替换点之后的部分
							const part2 = str.substring(start + newContent.length);
							// 返回拼接后的新字符串
							return part1 + newContent + part2;
						};
						const okText = replaceByIndex(allText,offset - 1,' ');
						const parseResult = parseJdl(okText);
						entities = parseResult.jdlObject?.entities || [];
						if (position.line > 0) {
							beforeLineToken = parseResult.cstTokens.find(token => token.startLine === position.line);
						}
						if (position.line < document.lineCount - 1) {
							afterLineToken = parseResult.cstTokens.find(token => token.startLine === position.line + 2);
						}
					}
				} else {
					if (position.line > 0) {
						beforeLineToken = cstTokens.find(token => token.startLine === position.line);
					}
					if (position.line < document.lineCount - 1) {
						afterLineToken = cstTokens.find(token => token.startLine === position.line + 2);
					}
				}
				let annotationTypeChain = '';
				let existAnnotations: any[] = [];
				if (beforeLineToken) {
					// entity:TestEntity=>anno:EntityPackage
					// entity:TestEntity=>field:name=>anno:FieldConfig
					// keyword:entity=>entity:TestEntity
					const beforeLabels: string[] = beforeLineToken.label.split('=>');
					const beforeTypeChain = beforeLabels.map(label => label.split(':')[0]).join('.');
					if (beforeTypeChain === 'entity.anno') {
						entityName = beforeLabels[0].split(':')[1];
						entity = entities.find((entity: any) => entity.name === entityName);
						existAnnotations = entity.annotations?.map((annotation: any) => annotation.optionName) || [];
						annotationTypeChain = 'entity.anno';
					}
					if (beforeTypeChain === 'entity.field.anno') {
						entityName = beforeLabels[0].split(':')[1];
						fieldName = beforeLabels[1].split(':')[1];
						entity = entities.find((entity: any) => entity.name === entityName);
						const field = entity.body.find((field: any) => field.name === fieldName);
						existAnnotations = field?.annotations?.map((annotation: any) => annotation.optionName) || [];
						annotationTypeChain = 'entity.field.anno';
					}
					if (beforeTypeChain === 'keyword.entity') {
						entityName = beforeLabels[1].split(':')[1];
						entity = entities.find((entity: any) => entity.name === entityName);
						annotationTypeChain = 'entity.field.anno';
					}
					if (beforeTypeChain === 'relationship') {
						annotationTypeChain = 'relationship.from.anno';
					}
					if (beforeTypeChain === 'relationship.keyword') {
						annotationTypeChain = 'relationship.to.anno';
					}
					if (afterLineToken) {
						// keyword:entity
						// entity:TestEntity=>field:name
						const afterLineLabels: string[] = afterLineToken.label.split('=>');
						const afterLineTypeChain = afterLineLabels.map(label => label.split(':')[0]).join('.');
						if (beforeTypeChain === 'entity.anno') {
							annotationTypeChain = 'entity.anno';
							if (['keyword.entity', 'entity.anno'].includes(afterLineTypeChain)) {
								annotationTypeChain = 'entity.anno';
								if (afterLineTypeChain === 'keyword.entity') {
									entityName = afterLineLabels[1].split(':')[1];
									entity = entities.find((entity: any) => entity.name === entityName);
									existAnnotations = entity.annotations?.map((annotation: any) => annotation.optionName) || [];
								}
								if (afterLineTypeChain === 'entity.anno') {
									entityName = afterLineLabels[0].split(':')[1];
									entity = entities.find((entity: any) => entity.name === entityName);
									existAnnotations = entity.annotations?.map((annotation: any) => annotation.optionName) || [];
								}
							}
						}
						if (['entity.field.anno', 'entity.field'].includes(beforeTypeChain)) {
							if (['entity.field.anno', 'entity.field'].includes(afterLineTypeChain)) {
								entityName = afterLineLabels[0].split(':')[1];
								fieldName = afterLineLabels[1].split(':')[1];
								entity = entities.find((entity: any) => entity.name === entityName);
								const field = entity.body.find((field: any) => field.name === fieldName);
								existAnnotations = field?.annotations?.map((annotation: any) => annotation.optionName) || [];
								annotationTypeChain = 'entity.field.anno';
							}
						}
						if (['keyword.entity'].includes(beforeTypeChain)) {
							if (['entity.field.anno', 'entity.field'].includes(afterLineTypeChain)) {
								entityName = afterLineLabels[0].split(':')[1];
								fieldName = afterLineLabels[1].split(':')[1];
								entity = entities.find((entity: any) => entity.name === entityName);
								const field = entity.body.find((field: any) => field.name === fieldName);
								existAnnotations = field?.annotations?.map((annotation: any) => annotation.optionName) || [];
								annotationTypeChain = 'entity.field.anno';
							}
						}
						if (beforeTypeChain === 'relationship') {
							if (afterLineTypeChain === 'relationship.from') {
								annotationTypeChain = 'relationship.from.anno';
							}
						}
						if (beforeTypeChain === 'relationship.keyword') {
							// relationship:ManyToOne=>to:TestEntity2
							if (afterLineTypeChain === 'relationship.to') {
								annotationTypeChain = 'relationship.to.anno';
							}
						}
					}
					if (annotationTypeChain) {
						const annotationObject = get(hoverData, annotationTypeChain, {});
						const completeItems: any[] = [];
						Object.keys(annotationObject)
							.filter(key => !existAnnotations.includes(key))
							.forEach(key => {
								completeItems.push(annotationObject[key].completeItem);
							});
						return completeItems;
					}
				} else if (afterLineToken) {
					const afterLineLabels: string[] = afterLineToken.label.split('=>');
					const afterLineTypeChain = afterLineLabels.map(label => label.split(':')[0]).join('.');
					if (['keyword.entity', 'entity.anno'].includes(afterLineTypeChain)) {
						annotationTypeChain = 'entity.anno';
						if (afterLineTypeChain === 'keyword.entity') {
							entityName = afterLineLabels[1].split(':')[1];
							entity = entities.find((entity: any) => entity.name === entityName);
							existAnnotations = entity.annotations?.map((annotation: any) => annotation.optionName) || [];
						}
						if (afterLineTypeChain === 'entity.anno') {
							entityName = afterLineLabels[0].split(':')[1];
							entity = entities.find((entity: any) => entity.name === entityName);
							existAnnotations = entity.annotations?.map((annotation: any) => annotation.optionName) || [];
						}
						if (annotationTypeChain) {
							const annotationObject = get(hoverData, annotationTypeChain, {});
							const completeItems: any[] = [];
							Object.keys(annotationObject)
								.filter(key => !existAnnotations.includes(key))
								.forEach(key => {
									completeItems.push(annotationObject[key].completeItem);
								});
							return completeItems;
						}
					}
					if (['entity.field.anno', 'entity.field'].includes(afterLineTypeChain)) {
						entityName = afterLineLabels[0].split(':')[1];
						fieldName = afterLineLabels[1].split(':')[1];
						entity = entities.find((entity: any) => entity.name === entityName);
						const field = entity.body.find((field: any) => field.name === fieldName);
						existAnnotations = field?.annotations?.map((annotation: any) => annotation.optionName) || [];
						annotationTypeChain = 'entity.field.anno';
						if (annotationTypeChain) {
							const annotationObject = get(hoverData, annotationTypeChain, {});
							const completeItems: any[] = [];
							Object.keys(annotationObject)
								.filter(key => !existAnnotations.includes(key))
								.forEach(key => {
									completeItems.push(annotationObject[key].completeItem);
								});
							return completeItems;
						}
					}
				}
				return undefined;
			}
		},
		'@',
	);
	return [annotation, fieldType, annotationType];
}