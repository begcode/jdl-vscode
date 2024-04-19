import { log } from 'console';
import * as vscode from 'vscode';

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
	annotationOnDestination: {
		editInList: {
			'detail': '',
			'description': '在列表中编辑'
		},
		editBySelectModal: {
			'detail': '',
			'description': '在弹窗中编辑'
		},
	},
	fieldConfig: {
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
	skipRestApi: {
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
	}
};

const annotationData: Record<string, string[]> = Object.keys(annotationValueDetail).reduce((acc, key) => {
	acc[key] = Object.keys(annotationValueDetail[key]);
	return acc;
}, {} as Record<string, string[]>);

const annotation = vscode.languages.registerCompletionItemProvider(
	{language: 'jdl'},
	{
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

			// get all text until the `position` and check if it reads `console.`
			// and if so then complete if `log`, `warn`, and `error`
			log('annotation: ');
			const linePrefix = document.lineAt(position).text.slice(0, position.character);
			const regex = new RegExp('@(?<annotationName>[a-z|A-Z]+)(\\((?<annotationValue>[a-z|A-Z|\\-]*)?\\)?)?');
			if (regex.test(linePrefix)) {
				const match = linePrefix.match(regex);
				const annotationName = match?.groups?.annotationName;
				const annotationValueData = match?.groups?.annotationValue;
				log('annotationName: ', annotationName);
				log('match?.groups: ', match);
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

export const completeItems = [annotation];