import { get, method } from 'lodash';
import * as vscode from 'vscode';
import { parseJdl } from './parseJdl';
import { log } from 'console';

const hoverData: any = {
	entity: {
		anno: {
			ExtendAbstractAuditingEntity: {
				completeItem: {
					label: {
						label: 'ExtendAbstractAuditingEntity',
						detail: '',
						description: '实体继承基础审计类'
					},
					kind: vscode.CompletionItemKind.Class,
				},
				contents: [
					'实体继承基础审计类注解',
					[
						'#### 使用方法:',
						'```java',
						' @extendAbstractAuditingEntity',
						'```'
					].join('\n'),
					[
						'#### 包含字段：',
						'- createdBy // 创建用户ID',
						'- CreatedDate // 创建时间',
						'- lastModifiedBy // 更新用户ID',
						'- lastModifiedDate // 更新时间'
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			EntityPackage: {
				completeItem: {
					label: {
						label: 'EntityPackage',
						detail: '',
						description: '实体指定包名'
					},
					insertText: new vscode.SnippetString('EntityPackage(${1})${0}'),
					kind: vscode.CompletionItemKind.Module,
				},
				contents: [
					'实体指定包名注解',
					[
						'#### 使用方法:',
						'```java',
						' @entityPackage(xxx)',
						'```'
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			SkipFakeData: {
				completeItem: {
					label: {
						label: 'SkipFakeData',
						detail: '',
						description: '取消生成假数据'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'取消生成假数据',
					[
						'#### 使用方法:',
						'```java',
						' @SkipFakeData(xxx)',
						'```'
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			ImportData: {
				completeItem: {
					label: {
						label: 'ImportData',
						detail: '',
						description: '导入实体数据'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'导入实体数据',
					[
						'#### 使用方法:',
						'```java',
						' @ImportData',
						'```',
						'**注意:** 需要存在相应的csv文件',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			SkipComponent: {
				completeItem: {
					label: {
						label: 'SkipComponent',
						detail: '',
						description: '忽略部分文件生成'
					},
					insertText: new vscode.SnippetString('SkipComponent(${1|listPage,editPage,detailPage,clientService,clientRoute,domain,mapper,controllerTest,serviceClass,restController,repository,queryService|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'忽略部分文件生成',
					[
						'#### 使用方法:',
						'```java',
						' @SkipComponent(listPage)',
						'```',
						'**注意:** 多个文件时使用-分隔',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			FilterByTree: {
				completeItem: {
					label: {
						label: 'FilterByTree',
						detail: '',
						description: '列表左侧增加过滤树'
					},
					insertText: new vscode.SnippetString('FilterByTree(${1})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'列表左侧增加过滤树',
					[
						'#### 使用方法:',
						'```java',
						' @FilterByTree(department)',
						'```',
						'**注意:** 多个文件时使用-分隔',
						'**可选值:** Enum类型字段或者关联关系',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			SkipMultiTenant: {
				completeItem: {
					label: {
						label: 'SkipMultiTenant',
						detail: '',
						description: '忽略多租户'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'忽略多租户',
					[
						'#### 使用方法:',
						'```java',
						' @SkipMultiTenant',
						' entity SysConfig {}',
						'```',
						'**注意:** 仅在设置多租户模式时有效',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			SkipWebsite: {
				completeItem: {
					label: {
						label: 'SkipWebsite',
						detail: '',
						description: '忽略Web网站生成'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'忽略Web网站生成',
					[
						'#### 使用方法:',
						'```java',
						' @SkipWebsite',
						' entity SysConfig {}',
						'```',
						'**注意:** 仅在使用Website便携插件时有效',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			SkipMobile: {
				completeItem: {
					label: {
						label: 'SkipMobile',
						detail: '',
						description: '忽略移动端生成'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'忽略移动端生成',
					[
						'#### 使用方法:',
						'```java',
						' @SkipMobile',
						' entity SysConfig {}',
						'```',
						'**注意:** 仅在使用移动端便携插件时有效',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			SkipRestApi: {
				completeItem: {
					label: {
						label: 'SkipRestApi',
						detail: '',
						description: '忽略指定API接口'
					},
					insertText: new vscode.SnippetString('SkipRestApi(${1|dataExport,dataImport,create|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'忽略指定API接口生成',
					[
						'#### 使用方法:',
						'```java',
						' @SkipRestApi(dataExport)',
						' entity SysConfig {}',
						'```',
						'**注意:** 多个接口时使用-分隔',
					].join('\n'),
					[
						'#### 可选值：',
						'- dataExport',
						'- dataImport',
						'- create',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			SkipWebButton: {
				completeItem: {
					label: {
						label: 'SkipWebButton',
						detail: '',
						description: '忽略前端部分按钮'
					},
					insertText: new vscode.SnippetString('SkipWebButton(${1|listAdd,listEdit,listDelete,listDetail|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'忽略前端部分按钮生成',
					[
						'#### 使用方法:',
						'```java',
						' @SkipWebButton(listAdd)',
						' entity SysConfig {}',
						'```',
						'**注意:** 多个时使用-分隔',
					].join('\n'),
					[
						'#### 可选值：',
						'- listAdd',
						'- listEdit',
						'- listDelete',
						'- listDetail',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			ListBy: {
				completeItem: {
					label: {
						label: 'ListBy',
						detail: '',
						description: '指定列表样式'
					},
					insertText: new vscode.SnippetString('ListBy(${1|table,list,tableEdit|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'指定列表样式',
					[
						'#### 使用方法:',
						'```java',
						' @ListBy(table)',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 可选值：',
						'- table // 表格',
						'- list // 列表',
						'- tableEdit // 左表格右编辑',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			WebDetailTemplate: {
				completeItem: {
					label: {
						label: 'WebDetailTemplate',
						detail: '',
						description: '配置 Web 详情页模板'
					},
					insertText: new vscode.SnippetString('WebDetailTemplate("${1|slide-tabs-detail.vue,blog-detail.vue,many-item-detail.vue,data-detail.vue|}")${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'配置 Web 详情页模板',
					[
						'#### 使用方法:',
						'```java',
						' @WebDetailTemplate("slide-tabs-detail.vue")',
						' entity Article {}',
						'```',
					].join('\n'),
					[
						'#### 可选值：',
						'- slide-tabs-detail.vue // 有图片滑动切换',
						'- blog-detail.vue // 博客详情页',
						'- many-item-detail.vue // 多条目详情页',
						'- data-detail.vue // 数据详情页',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			WebRelationTemplate: {
				completeItem: {
					label: {
						label: 'WebRelationTemplate',
						detail: '',
						description: '配置 Web 关联关系模板'
					},
					insertText: new vscode.SnippetString('WebRelationTemplate("${1|relation-common-handle.vue,relation-single-column-handle.vue,relation-common-button-handle.vue|}")${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'配置 Web 关联关系模板',
					[
						'#### 使用方法:',
						'```java',
						' @WebRelationTemplate("relation-common-handle.vue")',
						' entity Article {}',
						'```',
					].join('\n'),
					[
						'#### 可选值：',
						'- relation-common-handle.vue // 通用关联关系',
						'- relation-single-column-handle.vue // 单列关联关系',
						'- relation-common-button-handle.vue // 带操作按钮关联关系',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			WebListTemplate: {
				completeItem: {
					label: {
						label: 'WebListTemplate',
						detail: '',
						description: '配置 Web 关联关系模板'
					},
					insertText: new vscode.SnippetString('WebListTemplate("${1|single-column-list.vue,data-list.vue,common-list.vue,common-list-button.vue|}")${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'配置 Web 关联关系模板',
					[
						'#### 使用方法:',
						'```java',
						' @WebListTemplate("common-list.vue")',
						' entity Article {}',
						'```',
					].join('\n'),
					[
						'#### 可选值：',
						'- single-column-list.vue // 单列列表',
						'- data-list.vue // 数据列表',
						'- common-list.vue // 普通列表',
						'- common-list-button.vue // 带操作按钮列表',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			WebRecommendTemplate: {
				completeItem: {
					label: {
						label: 'WebListTemplate',
						detail: '',
						description: '配置 Web 关联关系模板'
					},
					insertText: new vscode.SnippetString('WebRecommendTemplate("${1|recommend-card-hover,recommend-card-lastest,recommend-card,recommend-text|}")${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'配置 Web 关联关系模板',
					[
						'#### 使用方法:',
						'```java',
						' @WebRecommendTemplate("recommend-card-hover")',
						' entity Article {}',
						'```',
					].join('\n'),
					[
						'#### 可选值：',
						'- recommend-card-hover // 卡片悬停',
						'- recommend-card-lastest // 最新卡片',
						'- recommend-card // 卡片推荐',
						'- recommend-text // 文本推荐',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			WebRankTemplate: {
				completeItem: {
					label: {
						label: 'WebListTemplate',
						detail: '',
						description: '配置 Web 关联关系模板'
					},
					insertText: new vscode.SnippetString('WebRankTemplate("${1|rank-hot.vue,rank.vue,rank-new.vue|}")${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'配置 Web 关联关系模板',
					[
						'#### 使用方法:',
						'```java',
						' @WebRankTemplate("rank-hot.vue")',
						' entity Article {}',
						'```',
					].join('\n'),
					[
						'#### 可选值：',
						'- rank.vue // 排行榜',
						'- rank-hot.vue // 热门排行榜',
						'- rank-new.vue // 最新排行榜',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			Features: {
				completeItem: {
					label: {
						label: 'Features',
						detail: '',
						description: '配置实体部分功能'
					},
					insertText: new vscode.SnippetString('Features(${1|copy,createBySelf|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'配置实体部分功能',
					[
						'#### 使用方法:',
						'```java',
						' @Features(copy)',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 可选值：',
						'- copy // 支持复制功能',
						'- createBySelf // 不能通过关联关系创建',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			Readonly: {
				completeItem: {
					label: {
						label: 'Readonly',
						detail: '',
						description: '只读实体'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'只读实体',
					[
						'#### 使用方法:',
						'```java',
						' @Readonly',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			Dto: {
				completeItem: {
					label: {
						label: 'Dto',
						detail: '',
						description: '设置DTO'
					},
					insertText: new vscode.SnippetString('Dto(${1|mapstruct,no|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'设置DTO',
					[
						'#### 使用方法:',
						'```java',
						' @Dto(mapstruct)',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 可选值：',
						'- mapstruct // 使用MapStruct',
						'- no // 不使用MapStruct',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			SkipClient: {
				completeItem: {
					label: {
						label: 'SkipClient',
						detail: '',
						description: '取消前端生成'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'取消前端生成',
					[
						'#### 使用方法:',
						'```java',
						' @SkipClient',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			SkipServer: {
				completeItem: {
					label: {
						label: 'SkipServer',
						detail: '',
						description: '取消后端生成'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'取消后端生成',
					[
						'#### 使用方法:',
						'```java',
						' @SkipServer',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			Filter: {
				completeItem: {
					label: {
						label: 'Filter',
						detail: '',
						description: '使用过滤器'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'使用过滤器',
					[
						'#### 使用方法:',
						'```java',
						' @Filter',
						' entity SysConfig {}',
						'```',
						'**注意:** 此功能强烈建议开启',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			Service: {
				completeItem: {
					label: {
						label: 'Service',
						detail: '',
						description: 'Service实现方式'
					},
					insertText: new vscode.SnippetString('Service(${1|serviceClass,serviceImpl|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'设置Service类实现方式',
					[
						'#### 使用方法:',
						'```java',
						' @Service(serviceClass)',
						' entity SysConfig {}',
						'```',
						'**注意:** 建议使用serviceClass',
					].join('\n'),
					[
						'#### 可选值：',
						'- serviceClass // 不使用Service接口',
						'- serviceImpl // 使用Service接口',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			Paginate: {
				completeItem: {
					label: {
						label: 'Paginate',
						detail: '',
						description: '设置分页方式'
					},
					insertText: new vscode.SnippetString('Paginate(${1|pagination,infinite-scroll,no|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'设置分页方式',
					[
						'#### 使用方法:',
						'```java',
						' @Paginate(pagination)',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 可选值：',
						'- pagination // 分页',
						'- infinite-scroll // 无限滚动',
						'- no // 不分页',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			Search: {
				completeItem: {
					label: {
						label: 'Search',
						detail: '',
						description: '使用全文检索'
					},
					insertText: new vscode.SnippetString('Search(${1|elasticsearch,no|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'使用全文检索',
					[
						'#### 使用方法:',
						'```java',
						' @Search(elasticsearch)',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 可选值：',
						'- elasticsearch // 使用Elasticsearch',
						'- no // 不使用全文检索',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			Microservice: {
				completeItem: {
					label: {
						label: 'Microservice',
						detail: '',
						description: '所属微服务名称'
					},
					insertText: new vscode.SnippetString('Microservice(${1})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'所属微服务名称',
					[
						'#### 使用方法:',
						'```java',
						' @Microservice(system)',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			PublicApiBy: {
				completeItem: {
					label: {
						label: 'PublicApiBy',
						detail: '',
						description: '公开访问API及条件'
					},
					insertText: new vscode.SnippetString('PublicApiBy(${1})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'公开访问API及条件',
					[
						'#### 使用方法:',
						'```java',
						' @PublicApiBy(open==true)',
						' entity SysConfig {}',
						'```',
						'**注意:** 仅支持简单的条件表达式',
						`'!=', '>=', '<=', '==', '<>', '>', '<'`,
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			SkipDbChangelog: {
				completeItem: {
					label: {
						label: 'SkipDbChangelog',
						detail: '',
						description: '忽略Liquidbase的Changlog'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'忽略Liquidbase的Changlog文件',
					[
						'#### 使用方法:',
						'```java',
						' @SkipDbChangelog',
						' entity SysConfig {}',
						'```',
						'**注意:** 已经具有表结构情况下使用',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			HasImageField: {
				completeItem: {
					label: {
						label: 'HasImageField',
						detail: '',
						description: '实体中有图片字段'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'实体中有图片字段',
					[
						'#### 使用方法:',
						'```java',
						' @HasImageField',
						' entity SysConfig {}',
						'```',
						'**注意:** 仅用在User实体',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			SkipSoftDelete: {
				completeItem: {
					label: {
						label: 'SkipSoftDelete',
						detail: '',
						description: '忽略逻辑删除'
					},
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'忽略逻辑删除',
					[
						'#### 使用方法:',
						'```java',
						' @SkipSoftDelete',
						' entity SysConfig {}',
						'```',
						'**注意:** 仅在系统启用逻辑删除时有效',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			ImportDataFile: {
				completeItem: {
					label: {
						label: 'ImportDataFile',
						detail: '',
						description: '导入数据的文件'
					},
					insertText: new vscode.SnippetString('ImportDataFile(${1})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				'contents': [
					'导入数据的文件',
					[
						'#### 使用方法:',
						'```java',
						' @ImportDataFile(jhi_authority-rel_jhi_authority__view_permissions)',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			AddCustomMethod: {
				completeItem: {
					label: {
						label: 'AddCustomMethod',
						detail: '',
						description: '在指定代码中增加自定义方法'
					},
					insertText: new vscode.SnippetString('AddCustomMethod(${1|repository,service,rest,clientService,queryService,updateComponent,listComponent,clientRoute,editComponent,dto,listRelation,detailTemplate|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'在指定代码中增加自定义方法',
					[
						'#### 使用方法:',
						'```java',
						' @AddCustomMethod(repository-service)',
						' entity SysConfig {}',
						'```',
						'**注意:** 蓝图中使用, -分隔',
					].join('\n'),
					[
						'#### 可选值：',
						'- repository // Repository',
						'- service // Service',
						'- rest // Rest',
						'- no ',
						'- clientService // clientService',
						'- queryService // queryService',
						'- updateComponent // updateComponent',
						'- listComponent // listComponent',
						'- clientRoute // clientRoute',
						'- 更多请参考文档',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			UpdateById: {
				completeItem: {
					label: {
						label: 'UpdateById',
						detail: '',
						description: '增加updateXXXById方法'
					},
					insertText: new vscode.SnippetString('@Update${1}ById(${2})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'增加updateXXXById方法',
					[
						'#### 使用方法:',
						'```java',
						' @UpdateAgeById(age)',
						' entity SysConfig {}',
						'```',
						'**注意:** 内容为更新的字段列表，使用-分隔',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			UpdateBy: {
				completeItem: {
					label: {
						label: 'UpdateBy',
						detail: '',
						description: '增加updateXXXByYYY方法'
					},
					insertText: new vscode.SnippetString('@Update${1}By${2}("${3},${4}")${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'增加updateByXXX方法',
					[
						'#### 使用方法:',
						'```java',
						' @UpdateAgeByName("name, age")',
						' entity SysConfig {}',
						'```',
						'**注意:** 前部分参数为更新条件，后部分参数为更新字段，多个字段使用-分隔',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			RemoveBy: {
				completeItem: {
					label: {
						label: 'RemoveBy',
						detail: '',
						description: '增加removeByXXX方法'
					},
					insertText: new vscode.SnippetString('@RemoveBy${1}(${2})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'增加removeByXXX方法',
					[
						'#### 使用方法:',
						'```java',
						' @RemoveByName(name-disabled)',
						' entity SysConfig {}',
						'```',
						'**注意:** 多个字段使用-分隔',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			SaveWith: {
				completeItem: {
					label: {
						label: 'SaveWith',
						detail: '',
						description: '增加saveWithXXX方法'
					},
					insertText: new vscode.SnippetString('@SaveWith${1}(${2})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'增加saveWithXXX方法',
					[
						'#### 使用方法:',
						'```java',
						' @SaveWithName(name-disabled-label)',
						' entity SysConfig {}',
						'```',
						'**注意:** 多个字段使用-分隔',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			EntityDomainLayer: {
				completeItem: {
					label: {
						label: 'EntityDomainLayer',
						detail: '',
						description: '生成Demain层文件'
					},
					insertText: new vscode.SnippetString('@EntityDomainLayer(${1|true,false|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'生成Demain层文件',
					[
						'#### 使用方法:',
						'```java',
						' @EntityDomainLayer(false)',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			EntityPersistenceLayer: {
				completeItem: {
					label: {
						label: 'EntityPersistenceLayer',
						detail: '',
						description: '生成Persistence层文件'
					},
					insertText: new vscode.SnippetString('@EntityPersistenceLayer(${1|true,false|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'生成Persistence层文件',
					[
						'#### 使用方法:',
						'```java',
						' @EntityPersistenceLayer(false)',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			RestLayer: {
				completeItem: {
					label: {
						label: 'RestLayer',
						detail: '',
						description: '生成Rest层文件'
					},
					insertText: new vscode.SnippetString('@RestLayer(${1|true,false|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'生成Rest层文件',
					[
						'#### 使用方法:',
						'```java',
						' @RestLayer(false)',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			EntitySpringPreAuthorize: {
				completeItem: {
					label: {
						label: 'RestLayer',
						detail: '',
						description: '增加权限注解'
					},
					insertText: new vscode.SnippetString('@EntitySpringPreAuthorize("${1}")${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'增加权限注解',
					[
						'#### 使用方法:',
						'```java',
						' @EntitySpringPreAuthorize("hasAuthority(\'ROLE_CUSTOM\')")',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			EntitySpringReadPreAuthorize: {
				completeItem: {
					label: {
						label: 'EntitySpringReadPreAuthorize',
						detail: '',
						description: '增加Read权限注解'
					},
					insertText: new vscode.SnippetString('@EntitySpringReadPreAuthorize("${1}")${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'增加Read权限注解',
					[
						'#### 使用方法:',
						'```java',
						' @EntitySpringReadPreAuthorize("hasAuthority(\'ROLE_CUSTOM_READ\')")',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			EntitySearchLayer: {
				completeItem: {
					label: {
						label: 'EntitySearchLayer',
						detail: '',
						description: '生成全文检索层文件'
					},
					insertText: new vscode.SnippetString('@EntitySearchLayer("${1|true,false|}")${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'生成全文检索层文件',
					[
						'#### 使用方法:',
						'```java',
						' @EntitySearchLayer(true)',
						' entity SysConfig {}',
						'```',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
						'- JHipster',
					].join('\n'),
				]
			},
			EditInContainer: {
				completeItem: {
					label: {
						label: 'EditInContainer',
						detail: '',
						description: '编辑表单容器'
					},
					insertText: new vscode.SnippetString('EditInContainer(${1|modal,page,drawer|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'编辑表单容器',
					[
						'#### 使用方法:',
						'```java',
						' @EditInContainer(drawer)',
						' name String',
						'```',
					].join('\n'),
					[
						'#### 可选值：',
						'- drawer',
						'- modal',
						'- page',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				],
				value: {
					modal: {
						contents: ['模态框']
					},
					page: {
						contents: ['页面']
					},
					drawer: {
						contents: ['抽屉']
					},
				}
			},
			MobileConfig: {
				completeItem: {
					label: {
						label: 'MobileConfig',
						detail: '',
						description: '移动端配置'
					},
					insertText: new vscode.SnippetString('MobileConfig(${1|addToHomeMenu,addToUserMenu,addToHomeRecommend,detailWithRecommend|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'增加字段配置',
					[
						'#### 使用方法:',
						'```java',
						' @mobileConfig(addToHomeMenu-addToUserMenu)',
						' entity Product {}',
						'```'
					].join('\n'),
					[
						'#### 可选值：',
						'- addToHomeMenu',
						'- addToUserMenu',
						'- addToHomeRecommend',
						'- detailWithRecommend',
						'- listWithHeader',
						'- listWithStat',
						'- detailByData',
						'- addToBottomNav',
						'- addToHomeRank',
						'**注意:** 多个使用-分隔',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode 并使用移动端插件',
					].join('\n'),
				],
				value: {
					addToHomeMenu: {
						contents: ['添加到首页菜单']
					},
					addToUserMenu: {
						contents: ['添加到用户菜单']
					},
					addToHomeRecommend: {
						contents: ['添加到首页推荐']
					},
					detailWithRecommend: {
						contents: ['详情页带推荐']
					},
					listWithHeader: {
						contents: ['列表页带头部']
					},
					listWithStat: {
						contents: ['列表页带统计']
					},
					detailByData: {
						contents: ['详情页展示数据']
					},
					addToBottomNav: {
						contents: ['添加到底部导航']
					},
					addToHomeRank: {
						contents: ['添加到首页排行']
					},
				}
			},
			WebsiteConfig: {
				completeItem: {
					label: {
						label: 'WebsiteConfig',
						detail: '',
						description: 'Web网站配置'
					},
					insertText: new vscode.SnippetString('WebsiteConfig(${1|addToHomeMenu,addToUserMenu,addToHomeRecommend,detailWithRecommend|})${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'Web网站配置',
					[
						'#### 使用方法:',
						'```java',
						' @WebsiteConfig(addToHomeMenu-addToUserMenu)',
						' entity Product {}',
						'```'
					].join('\n'),
					[
						'#### 可选值：',
						'- addToHomeMenu',
						'- addToUserMenu',
						'- addToHomeRecommend',
						'- detailWithRecommend',
						'- listWithHeader',
						'- listWithStat',
						'- detailByData',
						'- addToBottomNav',
						'- addToHomeRank',
						'**注意:** 多个使用-分隔',
					].join('\n'),
					[
						'#### 适用范围：',
						'- BegCode 并使用Website插件',
					].join('\n'),
				],
				value: {
					addToHomeMenu: {
						contents: ['添加到首页菜单']
					},
					addToUserMenu: {
						contents: ['添加到用户菜单']
					},
					addToHomeRecommend: {
						contents: ['添加到首页推荐']
					},
					detailWithRecommend: {
						contents: ['详情页带推荐']
					},
					listWithHeader: {
						contents: ['列表页带头部']
					},
					listWithStat: {
						contents: ['列表页带统计']
					},
					detailByData: {
						contents: ['详情页展示数据']
					},
					addToBottomNav: {
						contents: ['添加到底部导航']
					},
					addToHomeRank: {
						contents: ['添加到首页排行']
					},
				}
			},
		},
		field: {
			anno: {
				EndUsed: {
					completeItem: {
						label: {
							label: 'EndUsed',
							detail: '',
							description: '设置字段的前端组件'
						},
						insertText: new vscode.SnippetString('EndUsed(${1|fileUrl,iconPicker,imageUrl,videoUrl,audioUrl,editor,codeEditor,select,modalSelect,checkbox,radio,radioButton,rate,slider,switch,textArea,avatar,qrCode|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'设置字段的前端组件',
						[
							'#### 使用方法:',
							'```java',
							' @EndUsed(editor)',
							' content TextBlob',
							'```'
						].join('\n'),
						[
							'#### 可选值：',
							'- editor',
							'- select',
							'- checkbox',
							'- radio',
							'- radio',
							'- textArea',
							'- 更多请参考文档',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					],
					value: {
						fileUrl: {
							'contents': ['文件地址']
						},
						iconPicker: {
							'contents': ['图标选择器']
						},
						imageUrl: {
							'contents': ['图片地址']
						},
						videoUrl: {
							'contents': ['视频地址']
						},
						audioUrl: {
							'contents': ['音频地址']
						},
						editor: {
							'contents': ['富文本编辑器']
						},
						codeEditor: {
							'contents': ['代码编辑器']
						},
						select: {
							'contents': ['下拉选择']
						},
						selectModal: {
							'contents': ['弹出选择']
						},
						checkbox: {
							'contents': ['多选框']
						},
						radio: {
							'contents': ['单选框']
						},
						radioButton: {
							'contents': ['单选按钮']
						},
						rate: {
							'contents': ['评分']
						},
						slider: {
							'contents': ['滑块']
						},
						switch: {
							'contents': ['开关']
						},
						textArea: {
							'contents': ['文本域']
						},
						avatar: {
							'contents': ['头像']
						},
						qrCode: {
							'contents': ['二维码']
						},
						barCode: {
							'contents': ['条形码']
						}
					}
				},
				FieldConfig: {
					completeItem: {
						label: {
							label: 'FieldConfig',
							detail: '',
							description: '增加字段配置'
						},
						insertText: new vscode.SnippetString('FieldConfig(${1|hideInForm,hideInList,editInList,searchForm,hideInDetail,filter,sortable|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'增加字段配置',
						[
							'#### 使用方法:',
							'```java',
							' @FieldConfig(searchForm)',
							' name String',
							'```'
						].join('\n'),
						[
							'#### 可选值：',
							'- hideInForm',
							'- hideInList',
							'- editInList',
							'- searchForm',
							'- hideInDetail',
							'- filter',
							'- sortable',
							'**注意:** 多个使用-分隔',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					],
					value: {
						hideInForm: {
							contents: ['在表单中隐藏']
						},
						hideInList: {
							contents: ['在列表中隐藏']
						},
						editInList: {
							contents: ['在列表中编辑']
						},
						searchForm: {
							contents: ['在搜索表单中显示']
						},
						hideInDetail: {
							contents: ['在详情页中隐藏']
						},
						filter: {
							contents: ['过滤器']
						},
						sortable: {
							contents: ['可排序']
						},
					}
				},
				ShowBy: {
					completeItem: {
						label: {
							label: 'ShowBy',
							detail: '',
							description: '字段在表单显示的条件'
						},
						insertText: new vscode.SnippetString('ShowBy(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'字段在表单显示的条件',
						[
							'#### 使用方法:',
							'```java',
							' @ShowBy(disabled==true)',
							' name String',
							'```',
							'**注意: **仅支持简单的条件表达式',
							`'!=', '>=', '<=', '==', '<>', '>', '<'`,
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
				DefaultValue: {
					completeItem: {
						label: {
							label: 'DefaultValue',
							detail: '',
							description: '字段默认值'
						},
						insertText: new vscode.SnippetString('DefaultValue(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'字段默认值',
						[
							'#### 使用方法:',
							'```java',
							' @DefaultValue("abc")',
							' name String',
							'```',
							'**注意:** 涉及特殊字符时需要使用双引号',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				ValueFrom: {
					completeItem: {
						label: {
							label: 'ValueFrom',
							detail: '',
							description: '字段值来源'
						},
						insertText: new vscode.SnippetString('ValueFrom(${1|currentUser.id,currentUser.login,currentUser.firstName|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'字段默认值',
						[
							'#### 使用方法:',
							'```java',
							' @ValueFrom(currentUser.id)',
							' name String',
							'```',
							'#### 可选值：',
							'- currentUser.id',
							'- currentUser.login',
							'- currentUser.firstName',
							'- currentUser.email',
							'- currentUser.mobile',
							'- currentUser.imageUrl',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
				DefaultValueComputed: {
					completeItem: {
						label: {
							label: 'DefaultValueComputed',
							detail: '',
							description: '数据库函数支持的字段默认值'
						},
						insertText: new vscode.SnippetString('DefaultValueComputed(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'字段默认值',
						[
							'#### 使用方法:',
							'```java',
							' @DefaultValueComputed("NOW(6)")',
							' name String',
							'```',
							'**注意:** 涉及特殊字符时需要使用双引号',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				SortField: {
					completeItem: {
						label: {
							label: 'SortField',
							detail: '',
							description: '排序字段'
						},
						insertText: new vscode.SnippetString('SortField(${1|asc,desc|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'排序字段',
						[
							'#### 使用方法:',
							'```java',
							' @SortField("asc")',
							' name String',
							'```',
						].join('\n'),
						[
							'#### 可选值：',
							'- asc',
							'- desc',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					],
					value: {
						asc: {
							contents: ['升序']
						},
						desc: {
							contents: ['降序']
						},
					}
				},
				ColumnWidth: {
					completeItem: {
						label: {
							label: 'ColumnWidth',
							detail: '',
							description: '表格列宽'
						},
						insertText: new vscode.SnippetString('ColumnWidth(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'表格列宽',
						[
							'#### 使用方法:',
							'```java',
							' @ColumnWidth(120)',
							' name String',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
				FieldColumnName: {
					completeItem: {
						label: {
							label: 'FieldColumnName',
							detail: '',
							description: '数据表列名'
						},
						insertText: new vscode.SnippetString('FieldColumnName(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'数据表列名',
						[
							'#### 使用方法:',
							'```java',
							' @FieldColumnName("user_name")',
							' name String',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
				SkipDto: {
					completeItem: {
						label: {
							label: 'SkipDto',
							detail: '',
							description: 'DTO中忽略该字段'
						},
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'DTO中忽略该字段',
						[
							'#### 使用方法:',
							'```java',
							' @SkipDto',
							' name String',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
				SkipCriteria: {
					completeItem: {
						label: {
							label: 'SkipCriteria',
							detail: '',
							description: 'Criteria条件类中忽略该字段'
						},
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'Criteria条件类中忽略该字段',
						[
							'#### 使用方法:',
							'```java',
							' @SkipCriteria',
							' name String',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
				ImportDataField: {
					completeItem: {
						label: {
							label: 'ImportDataField',
							detail: '',
							description: 'Liqiudbase导入字段'
						},
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'Liqiudbase导入字段',
						[
							'#### 使用方法:',
							'```java',
							' @ImportDataField',
							' name String',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
				OwnerEntityId: {
					completeItem: {
						label: {
							label: 'OwnerEntityId',
							detail: '',
							description: '其他关联实体的ID'
						},
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'其他关联实体的ID',
						[
							'#### 使用方法:',
							'OwnerEntityName与OwnerEntityId结合使用，形成一种支持多种实体的关联关系',
							'```java',
							' @OwnerEntityName',
							' @fieldConfig(hideInList-hideInForm)',
							' ownerEntityName String /** 实体名称 */',
							' @OwnerEntityId',
							' @fieldConfig(hideInList-hideInForm)',
							' ownerEntityId Long /** 使用实体ID */',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
				DisplayAs: {
					completeItem: {
						label: {
							label: 'DisplayAs',
							detail: '',
							description: '字段内容展示形式'
						},
						insertText: new vscode.SnippetString('DisplayAs(${1|avatar,thumb,cover,creator,money,link|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'字段内容展示形式',
						[
							'#### 使用方法:',
							'```java',
							' @DisplayAs(cover)',
							' name String',
							'```',
						].join('\n'),
						[
							'#### 可选值：',
							'- avatar - 头像',
							'- thumb - 缩略图',
							'- cover - 封面',
							'- creator - 创建者',
							'- money - 金额',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- 属实验性注解，仅可能在移动端或Web端发挥作用',
						].join('\n'),
					],
					value: {
						avatar: {
							contents: ['头像']
						},
						thumb: {
							contents: ['缩略图']
						},
						cover: {
							contents: ['封面']
						},
						creator: {
							contents: ['创建者']
						},
						money: {
							contents: ['金额']
						},
					}
				},
			},
			type: {
				Integer: {
					contents: [
						'整数类型',
						[
							'#### 使用方法:',
							'```java',
							' age Integer',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				String: {
					contents: [
						'字符串类型',
						[
							'#### 使用方法:',
							'```java',
							' name String',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				Long: {
					contents: [
						'长整数类型',
						[
							'#### 使用方法:',
							'```java',
							' age Long',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				Boolean: {
					contents: [
						'布尔类型',
						[
							'#### 使用方法:',
							'```java',
							' deleted Boolean',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				Float: {
					contents: [
						'浮点类型',
						[
							'#### 使用方法:',
							'```java',
							' price Float',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				Double: {
					contents: [
						'双精度类型',
						[
							'#### 使用方法:',
							'```java',
							' price Double',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				LocalDate: {
					contents: [
						'日期类型',
						[
							'#### 使用方法:',
							'```java',
							' birthday LocalDate',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				BigDecimal: {
					contents: [
						'大数字类型',
						[
							'#### 使用方法:',
							'```java',
							' price BigDecimal',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				ZonedDateTime: {
					contents: [
						'日期时间类型',
						[
							'#### 使用方法:',
							'```java',
							' createTime ZonedDateTime',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				Instant: {
					contents: [
						'时间戳类型',
						[
							'#### 使用方法:',
							'```java',
							' createTime Instant',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				Duration: {
					contents: [
						'持续时间类型',
						[
							'#### 使用方法:',
							'```java',
							' duration Duration',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				UUID: {
					contents: [
						'UUID类型',
						[
							'#### 使用方法:',
							'```java',
							' uuid UUID',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				Blob: {
					contents: [
						'二进制类型',
						[
							'#### 使用方法:',
							'```java',
							' image Blob',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				AnyBlob: {
					contents: [
						'任意二进制类型',
						[
							'#### 使用方法:',
							'```java',
							' image AnyBlob',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				ImageBlob: {
					contents: [
						'图片二进制类型',
						[
							'#### 使用方法:',
							'```java',
							' image ImageBlob',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				TextBlob: {
					contents: [
						'长文本类型',
						[
							'#### 使用方法:',
							'```java',
							' content TextBlob',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				}
			},
			validation: {
				required: {
					completeItem: {
						label: {
							label: 'required',
							'detail': '',
							'description': '非空'
						},
						kind: vscode.CompletionItemKind.Operator,
						scope: ['String', 'Integer', 'Long', 'BigDecimal', 'Float', 'Double', 'Enum', 'Boolean', 'LocalDate', 'ZonedDateTime', 'Instant', 'Duration', 'UUID', 'Blob', 'AnyBlob', 'ImageBlob', 'TextBlob'],
					},
					contents: [
						'字段非空校验',
						[
							'#### 使用方法:',
							'```java',
							' name String required',
							'```'
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				minlength: {
					completeItem: {
						label: {
							label: 'minlength',
							'detail': '',
							'description': '最小长度'
						},
						insertText: new vscode.SnippetString('minlength(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
						scope: ['String'],
					},
					contents: [
						'最小长度校验',
						[
							'#### 使用方法:',
							'```java',
							' name String minlength(5)',
							'```'
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				maxlength: {
					completeItem: {
						label: {
							label: 'maxlength',
							'detail': '',
							'description': '最大长度'
						},
						insertText: new vscode.SnippetString('maxlength(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
						scope: ['String'],
					},
					contents: [
						'最大长度校验',
						[
							'#### 使用方法:',
							'```java',
							' name String maxlength(10)',
							'```'
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				pattern: {
					completeItem: {
						label: {
							label: 'pattern',
							'detail': '',
							'description': '正则表达式校验'
						},
						insertText: new vscode.SnippetString('pattern(/${1}/)${0}'),
						kind: vscode.CompletionItemKind.Operator,
						scope: ['String'],
					},
					contents: [
						'正则表达式校验',
						[
							'#### 使用方法:',
							'```java',
							' name String pattern(/[a-zA-Z]+/)',
							'```',
							'**注意:** 正则表达式需要使用/包裹，并且本行不能再有注释。',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				unique: {
					completeItem: {
						label: {
							label: 'unique',
							'detail': '',
							'description': '唯一性'
						},
						kind: vscode.CompletionItemKind.Operator,
						scope: ['String', 'Integer', 'Long', 'BigDecimal', 'Float', 'Double', 'Enum', 'Boolean', 'LocalDate', 'ZonedDateTime', 'Instant', 'Duration', 'UUID', 'Blob', 'AnyBlob', 'ImageBlob', 'TextBlob'],
					},
					contents: [
						'唯一性校验',
						[
							'#### 使用方法:',
							'```java',
							' name String unique',
							'```'
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				min: {
					completeItem: {
						label: {
							label: 'min',
							'detail': '',
							'description': '最小值'
						},
						insertText: new vscode.SnippetString('min(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
						scope: ['Integer', 'Long', 'BigDecimal', 'Float', 'Double'],
					},
					contents: [
						'最小值校验',
						[
							'#### 使用方法:',
							'```java',
							' age Integer min(18)',
							'```'
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				max: {
					completeItem: {
						label: {
							label: 'max',
							'detail': '',
							'description': '最大值'
						},
						insertText: new vscode.SnippetString('max(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
						scope: ['Integer', 'Long', 'BigDecimal', 'Float', 'Double'],
					},
					contents: [
						'最大值校验',
						[
							'#### 使用方法:',
							'```java',
							' age Integer max(100)',
							'```'
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				minbytes: {
					completeItem: {
						label: {
							label: 'minbytes',
							'detail': '',
							'description': '最小字节长度'
						},
						insertText: new vscode.SnippetString('minbytes(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
						scope: ['Blob', 'AnyBlob', 'ImageBlob'],
					},
					contents: [
						'最小字节长度校验',
						[
							'#### 使用方法:',
							'```java',
							' name String minbytes(5)',
							'```'
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				maxbytes: {
					completeItem: {
						label: {
							label: 'maxbytes',
							'detail': '',
							'description': '最大字节长度'
						},
						insertText: new vscode.SnippetString('maxbytes(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
						scope: ['Blob', 'AnyBlob', 'ImageBlob'],
					},
					contents: [
						'最大字节长度校验',
						[
							'#### 使用方法:',
							'```java',
							' name String maxbytes(10)',
							'```'
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				}
			}
		}
	},
	relationship: {
		from: {
			anno: {
				AnnotationOnSource: {
					completeItem: {
						label: {
							label: 'AnnotationOnSource',
							detail: '',
							description: '关联关系左侧注解'
						},
						insertText: new vscode.SnippetString('AnnotationOnSource(${1|relateByIdEntity,unidirectional,editInForm,editBySelect,editByFormList,editByList,editInList,detailInList,editByTable,countByPrimaryKey,editBySelectModal,editBySelectDrawer,editByTableModal,editByTableDrawer,importData,hideInList,hideInForm,notExistAdd|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
				},
				FilterFieldsOnSource: {
					completeItem: {
						label: {
							label: 'FilterFieldsOnSource',
							detail: '',
							description: `关联关系左侧增加过滤字段，使用'-'分隔`
						},
						insertText: new vscode.SnippetString('FilterFieldsOnSource(${1})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
				},
				WebsiteOnSource: {
					completeItem: {
						label: {
							label: 'WebsiteOnSource',
							detail: '',
							description: `关系左侧Website相关配置，使用'-'分隔`
						},
						insertText: new vscode.SnippetString('WebsiteOnSource(${1|showInForm, hideInDetail|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
				},
				ValueFromOnSource: {
					completeItem: {
						label: {
							label: 'ValueFromOnSource',
							detail: '',
							description: '关系值来源'
						},
						insertText: new vscode.SnippetString('ValueFromOnSource(${1|currentUser|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
				},
				Id: {
					completeItem: {
						label: {
							label: 'Id',
							detail: '',
							description: `使用实体 Id 关联`
						},
						insertText: new vscode.SnippetString('Id'),
						kind: vscode.CompletionItemKind.Operator,
					},
				}
			}
		},
		to: {
			anno: {
				AnnotationOnDestination: {
					completeItem: {
						label: {
							label: 'AnnotationOnDestination',
							detail: '',
							description: '关联关系右侧注解'
						},
						insertText: new vscode.SnippetString('AnnotationOnDestination(${1|hideInList,editByTableDrawer,editByTableModal,editBySelectDrawer,editBySelectModal,detailInList,editInList|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
				},
				OnDelete: {
					completeItem: {
						label: {
							label: 'OnDelete',
							detail: '',
							description: '级联删除处理方式'
						},
						insertText: new vscode.SnippetString('OnDelete(${1|NO ACTION,RESTRICT,CASCADE,SET NULL,SET DEFAULT|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'级联删除处理方式',
						[
							'#### 使用方法:',
							'```java',
							' SysConfig{user}',
							' to',
							' @OnDelete("SET NULL")',
							' User',
							'```',
							'**注意:** 多个使用-分隔',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
				OnUpdate: {
					completeItem: {
						label: {
							label: 'OnUpdate',
							detail: '',
							description: '级联更新处理方式'
						},
						insertText: new vscode.SnippetString('OnUpdate(${1|NO ACTION,RESTRICT,CASCADE,SET NULL,SET DEFAULT |})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
					contents: [
						'级联更新处理方式',
						[
							'#### 使用方法:',
							'```java',
							' SysConfig{user}',
							' to',
							' @OnUpdate("SET NULL")',
							' User',
							'```',
							'**注意:** 多个使用-分隔',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
				Id: {
					completeItem: {
						label: {
							label: 'Id',
							detail: '',
							description: `使用实体 Id 关联`
						},
						insertText: new vscode.SnippetString('Id'),
						kind: vscode.CompletionItemKind.Operator,
					},
				}
			}
		},
		ManyToOne: {
			contents: [
				'多对一关联',
			]
		},
		OneToMany: {
			contents: [
				'一对多关联',
			]
		},
		ManyToMany: {
			contents: [
				'多对多关联',
			]
		},
		OneToOne: {
			contents: [
				'一对一关联',
			]
		},
		relationshipOption: {
			builtInEntity: {
				contents: [
					'内置实体关联',
					'表示实体已经在之前导入到项目中',
					[
						'#### 适用范围：',
						'- JHipster',
						'- BegCode',
					].join('\n'),
				]
			},
		},
		AnnotationOnSource: {
			contents: [
				'关联关系左侧注解',
				[
					'#### 使用方法:',
					'```java',
					' @AnnotationOnSource(hideInList)',
					' SysConfig{user}',
					' to',
					' User',
					'```',
					'**注意:** 多个使用-分隔',
				].join('\n'),
				[
					'#### 可选值：',
					'- unidirectional // 单向关联',
					'- relateByIdEntity // 通过实体名称和ID关联',
					'- countByPrimaryKey // 通过实体名称和主键统计',
					'- editByFormList // 表单列表编辑',
					'- editBySelect // 下拉框编辑',
					'- editByList // 列表编辑',
					'- editByDescList // 列表详情编辑',
					'- editByTable // 表格编辑',
					'- editBySelectModal // 选择框模态框编辑',
					'- editBySelectDrawer // 选择框抽屉编辑',
					'- editByTableModal // 表格模态框编辑',
					'- editByTableDrawer // 表格抽屉编辑',
					'- importData // 导入关联数据',
					'- hideInList // 列表中隐藏',
					'- hideInForm // 表单中隐藏',
					'- editInForm // 表单中编辑',
					'- editInList // 列表中编辑',
					'- detailInList // 列表中查看详情',
					'- showInTab // 通过Tab页展示',
					'- showInCollapse // 通过折叠面板展示',
					'- showInForm // 通过表单展示',
					'- notExistAdd // 选择时可以新增',
				].join('\n'),
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			],
			createInWebsite: {
				contents: [
					'在网站中创建',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editByWidget: {
				contents: [
					'小部件编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			unidirectional: {
				contents: [
					'单向关联',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			relateByIdEntity: {
				contents: [
					'通过实体名称和ID关联',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			countByPrimaryKey: {
				contents: [
					'通过实体名称和主键统计',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editByFormList: {
				contents: [
					'表单列表编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editByDescList: {
				contents: [
					'列表详情编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editBySelect: {
				contents: [
					'下拉框编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editByList: {
				contents: [
					'列表编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editByTable: {
				contents: [
					'表格编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editBySelectModal: {
				contents: [
					'选择框模态框编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editBySelectDrawer: {
				contents: [
					'选择框抽屉编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editByTableModal: {
				contents: [
					'表格模态框编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editByTableDrawer: {
				contents: [
					'表格抽屉编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			importData: {
				contents: [
					'导入关联数据',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			hideInList: {
				contents: [
					'列表中隐藏',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editInForm: {
				contents: [
					'表单中编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editInList: {
				contents: [
					'列表中编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			detailInList: {
				contents: [
					'列表中查看详情',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			showInTab: {
				contents: [
					'通过Tab页展示',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			showInCollapse: {
				contents: [
					'通过折叠面板展示',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			showInForm: {
				contents: [
					'通过表单展示',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
		},
		required: {
			contents: [
				'关联关系不能为空',
				[
					'#### 使用方法:',
					'```java',
					' SysConfig{user required}',
					' to',
					' User',
					'```',
				].join('\n'),
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
		AnnotationOnDestination: {
			contents: [
				'关联关系右侧注解',
				[
					'#### 使用方法:',
					'```java',
					' SysConfig{user}',
					' to',
					' @AnnotationOnDestination(hideInList)',
					' User',
					'```',
					'**注意:** 多个使用-分隔',
				].join('\n'),
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			],
			editInList: {
				contents: [
					'列表中编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			detailInList: {
				contents: [
					'列表中查看详情',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			countByPrimaryKey: {
				contents: [
					'通过实体名称和主键统计',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editBySelectModal: {
				contents: [
					'选择框模态框编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editBySelectDrawer: {
				contents: [
					'选择框抽屉编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editByTableModal: {
				contents: [
					'表格模态框编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			editByTableDrawer: {
				contents: [
					'表格抽屉编辑',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			hideInList: {
				contents: [
					'列表中隐藏',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
		},
		WebsiteOnSource: {
			contents: [
				'关系左侧Website相关配置',
				[
					'#### 使用方法:',
					'```java',
					' @WebsiteOnSource(hideInDetail)',
					' SysConfig{user}',
					' to',
					' User',
					'```',
					'**注意:** 多个使用-分隔',
				].join('\n'),
				[
					'#### 适用范围：',
					'- BegCode',
				].join('\n'),
			],
			showInForm: {
				contents: [
					'在表单中显示',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
			hideInDetail: {
				contents: [
					'在详情中隐藏',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
		},
		ValueFromOnSource: {
			contents: [
				'关系值来源',
				[
					'#### 使用方法:',
					'```java',
					' @ValueFromOnSource(currentUser)',
					' SysConfig{user}',
					' to',
					' User',
					'```',
				].join('\n'),
				[
					'#### 适用范围：',
					'- BegCode',
				].join('\n'),
			],
			currentUser: {
				contents: [
					'值来源于当前用户',
					[
						'#### 适用范围：',
						'- BegCode',
					].join('\n'),
				]
			},
		},
	},
	binaryOption: {
		paginate: {
			method: {
				pagination: {
					contents: [
						'分页',
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				'infinite-scroll': {
					contents: [
						'无限滚动',
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
			},
			entity: {
				all: {
					contents: [
						'全部使用分页',
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				}
			},
			contents: [
				'分页指令',
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
		dto: {
			method: {
				mapstruct: {
					contents: [
						'MapStruct转换Dto与Domain',
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				no: {
					contents: [
						'不使用Dto',
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
			},
			contents: [
				'DTO指令',
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
		service: {
			method: {
				serviceClass: {
					contents: [
						'Service类',
						'不使用接口实现类',
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
				serviceImpl: {
					contents: [
						'使用Service实现类',
						['增加Service接口类'],
						[
							'#### 适用范围：',
							'- BegCode',
							'- JHipster',
						].join('\n'),
					]
				},
			},
			contents: [
				'Service指令',
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
		clientRootFolder: {
			anno: {
				I18nValue: {
					contents: [
						'国际化值',
						[
							'主要涉及BegCode使用clientRootFolder的值做为菜单名称,需要国际化',
							'#### 使用方法:',
							'```java',
							' clientRootFolder * with myfolder @I18nValue("我的文件夹")',
							' name String',
							'```',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				}
			},
			contents: [
				'客户端根目录',
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
		search: {
			contents: [
				'全文检索配置',
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
		microservice: {
			contents: [
				'微服务配置',
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
		angularSuffix: {
			contents: [
				'Angular后缀',
				[
					'#### 适用范围：',
					'- JHipster',
				].join('\n'),
			]
		}
	},
	unaryOption: {
		filter: {
			contents: [
				'过滤',
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
		readOnly: {
			contents: [
				'只读',
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
		noFluentMethod: {
			contents: [
				'不使用流式方法',
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
		skipServer: {
			contents: [
				'忽略服务端生成',
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
		skipClient: {
			contents: [
				'忽略客户端生成',
				[
					'#### 适用范围：',
					'- BegCode',
					'- JHipster',
				].join('\n'),
			]
		},
	}
};

function tokenLableHover(tokenLabel: any, text: string, word: string): vscode.MarkdownString[]| string[] {
	if (tokenLabel) {
		// entity:GptAssistant=>anno:extendAbstractAuditingEntity
		const labels = tokenLabel.split('=>');
		console.log('tokenLabel:::', tokenLabel);
		if (tokenLabel.startsWith('relationship:')) {
			if (labels.length === 4 && labels[labels.length - 1].startsWith('injectedFieldParam:')) {
				const entity = labels[2].split(':')[1];
				const field = labels[3].split(':')[1];
				const parseResult = parseJdl(text);
				if (parseResult.jdlObject?.entities) {
					// 查找字段的名称
					const entityObj = parseResult.jdlObject.entities.find((entityObj: any) => entityObj.name === entity);
					if (entityObj && entityObj.body) {
						const fieldObj = entityObj.body.find((fieldObj: any) => fieldObj.name === field);
						if (fieldObj && fieldObj.documentation) {
							return [
								`${entity}.${field}`,
								[`类型：${fieldObj.type}`,`备注：${fieldObj.documentation || ''}`].join('\n'),
							];
						} else {
							return [];
						}
					} else {
						return [];
					}
				} else {
					return [];
				}
			} else if (labels.length === 2){
				// relationship:ManyToOne=>to:TestEntity2
				if (labels[labels.length - 1].startsWith('to:') || labels[labels.length - 1].startsWith('from:')) {
					if (labels[labels.length - 1] === 'from:required' || labels[labels.length - 1] === 'to:required') {
						const relationship = labels[0].split(':')[0];
						const annotation = labels[1].split(':')[1];
						return get(hoverData, `${relationship}.${annotation}.contents`, []);
					}
					const entity = labels[1].split(':')[1];
					const parseResult = parseJdl(text);
					if (parseResult.jdlObject?.entities) {
						// 查找实体的名称
						const entityObj = parseResult.jdlObject.entities.find((entityObj: any) => entityObj.name === entity);
						if (entityObj.documentation) {
							return [
								entityObj.documentation,
							];
						}
					}
				}
				if (labels[labels.length - 1].startsWith('anno:')) {
					const relationship = labels[0].split(':')[0];
					const annotation = labels[1].split(':')[1];
					return get(hoverData, `${relationship}.${annotation}.contents`, []);
				} else if (labels[labels.length - 1] === 'builtInEntity' && labels[0].endsWith('relationshipOption')) {
					const relationship = labels[0].split(':')[0];
					const annotation = labels[1];
					return get(hoverData, `${relationship}.relationshipOption.${annotation}.contents`, []);
				}
				return [];
			} else {
				// "relationship:OneToMany"
				if (labels.length === 1) {
					return get(hoverData, labels[0].replace(':', '.') + '.contents', []);
				}
				if (labels.length === 3) {
					const relationship = labels[0].split(':')[0];
					const annotation = labels[1].split(':')[1];
					const value = labels[2].split(':')[1];
					if (labels[1].startsWith('anno:')) {
						return get(hoverData, `${relationship}.${annotation}.${value === word ? value : word}.contents`, []);
					}
				}
				return [];
			}
		}
		// binaryOption:paginate=>entity:all
		const labelPath = labels.reduce((prev: any, current: any, index: number, arr: any[]) => {
			if (index === arr.length - 1 && index > 0) {
				return prev + '.' + current.replace(':', '.');
			} else if (index === arr.length - 2 && index > 0 && current.startsWith('anno:')) {
				return prev + '.' + current.replace(':', '.');
			} else {
				// binaryOption:paginate=>entity:all
				// unaryOption:filter
				if (!prev && (current.startsWith('binaryOption:') || current.startsWith('unaryOption:'))) {
					return current.replace(':', '.');
				} else {
					return (prev ? (prev + '.') : '') + current.split(':')[0];
				}
			}
		
		}, '');
		if (labelPath?.startsWith('binaryOption.') || labelPath?.startsWith('unaryOption.')) {
			const parseField = labelPath.split('.');
			if (parseField.length === 4) {
				const entity = parseField[3];
				const entityToken = parseField[2];
				const parseResult = parseJdl(text);
				if (parseResult.jdlObject?.entities && entityToken === 'entity') {
					if (entity && entity !== 'all') {
						// 查找实体名称
						const entityObj = parseResult.jdlObject.entities.find((entityObj: any) => entityObj.name === entity);
						if (entityObj?.documentation) {
							return [
								entityObj.documentation.trim(),
							];
						} else {
							return [];
						}
					} else {
						return [];
					}
				}
			}
		}
		return get(hoverData, labelPath + '.contents', []);
	}
	return [];
}

function tokenLableComplete(tokenLabel: any, text: string): vscode.MarkdownString[] {
	if (tokenLabel) {
		// entity:GptAssistant=>anno:extendAbstractAuditingEntity
		// relationship:ManyToOne=>to:TestEntity2=>injectedFieldParam:name

		// entity:TestEntity=>field:abc=>type:String
		// entity:TestEntity=>field:abc=>validation:required
		// todo binaryOption:paginate=>entity:all
		const labels: string[] = tokenLabel.split('=>');
		const typeChain = labels.map(label => label.split(':')[0]).join('.');
		if (typeChain === 'entity.field.type') {
			const validationPath = 'entity.field.validation';
			const typeName = [...labels].pop()?.split(':')[1];
			const validationObject = get(hoverData, validationPath, {});
			const completeItems: any[] = [];
			Object.keys(validationObject).forEach(key => {
				if (validationObject[key]?.completeItem?.scope?.includes(typeName)) {
					completeItems.push(validationObject[key].completeItem);
				}
			});
			return completeItems;
		}
		if (typeChain === 'entity.field.validation') {
			const validationPath = 'entity.field.validation';
			const parseResult = parseJdl(text);
			if (parseResult.jdlObject?.entities) {
				const entityName = labels[0].split(':')[1];
				const fieldName = labels[1].split(':')[1];
				const entity = parseResult.jdlObject?.entities.find((entity: any) => entity.name === entityName);
				if (entity?.body) {
					const field = entity?.body?.find((field: any) => field.name === fieldName);
					if (field) {
						const existValidations = field.validations?.map((valid: any) => valid.key) || [];
						const fieldType = field.type;
						const validationObject = get(hoverData, validationPath, {});
						const completeItems: any[] = [];
						Object.keys(validationObject)
							.filter(key => !existValidations.includes(key))
							.forEach(key => {
								if (validationObject[key]?.completeItem?.scope?.includes(fieldType)) {
									completeItems.push(validationObject[key].completeItem);
								}
							});
						return completeItems;
					}
				}
			}
		}
		if (typeChain === 'entity.field.validation.value') {
			const validationPath = 'entity.field.validation';
			const parseResult = parseJdl(text);
			if (parseResult.jdlObject?.entities) {
				const entityName = labels[0].split(':')[1];
				const fieldName = labels[1].split(':')[1];
				const entity = parseResult.jdlObject?.entities.find((entity: any) => entity.name === entityName);
				if (entity?.body) {
					const field = entity?.body?.find((field: any) => field.name === fieldName);
					if (field) {
						const existValidations = field.validations?.map((valid: any) => valid.key) || [];
						const fieldType = field.type;
						const validationObject = get(hoverData, validationPath, {});
						const completeItems: any[] = [];
						Object.keys(validationObject)
							.filter(key => !existValidations.includes(key))
							.forEach(key => {
								if (validationObject[key]?.completeItem?.scope?.includes(fieldType)) {
									completeItems.push(validationObject[key].completeItem);
								}
							});
						return completeItems;
					}
				}
			}
		}
	}
	return [];
}

export { hoverData, tokenLableHover, tokenLableComplete };
