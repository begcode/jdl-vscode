import { get } from 'lodash';
import * as vscode from 'vscode';
import { parseJdl } from './parseJdl';

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
						'**注意：**: 需要存在相应的csv文件',
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
					insertText: new vscode.SnippetString('SkipComponent(${1}|listPage, editPage, detailPage, clientService, clientRoute, domain, mapper, controllerTest, serviceClass, restController, repository, queryService|)${0}'),
					kind: vscode.CompletionItemKind.Operator,
				},
				contents: [
					'忽略部分文件生成',
					[
						'#### 使用方法:',
						'```java',
						' @SkipComponent(listPage)',
						'```',
						'**注意：**: 多个文件时使用-分隔',
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
						'**注意：**: 仅在设置多租户模式时有效',
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
					insertText: new vscode.SnippetString('SkipRestApi(${1}|dataExport, dataImport, create|)${0}'),
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
						'**注意：**: 多个接口时使用-分隔',
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
					insertText: new vscode.SnippetString('SkipWebButton(${1}|listAdd, listModalEdit, listEdit, listDelete, listDetail|)${0}'),
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
						'**注意：**: 多个时使用-分隔',
					].join('\n'),
					[
						'#### 可选值：',
						'- listAdd',
						'- listModalEdit',
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
					insertText: new vscode.SnippetString('ListBy(${1}|table, list|)${0}'),
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
						'- table',
						'- list',
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
					insertText: new vscode.SnippetString('Dto(${1|mapstruct, no |})${0}'),
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
						'- mapstruct',
						'- no',
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
						'**注意：**: 此功能强烈建议开启',
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
					insertText: new vscode.SnippetString('Service(${1|serviceClass, serviceImpl|})${0}'),
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
						'**注意：**: 建议使用serviceClass',
					].join('\n'),
					[
						'#### 可选值：',
						'- serviceClass',
						'- serviceImpl',
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
					insertText: new vscode.SnippetString('Paginate(${1|pagination, servinfinite-scroll, no|})${0}'),
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
						'- pagination',
						'- servinfinite-scroll',
						'- no',
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
					insertText: new vscode.SnippetString('Search(${1|elasticsearch, no |})${0}'),
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
						'- elasticsearch',
						'- no',
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
						'**注意：**: 仅支持简单的条件表达式',
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
						'**注意：**: 已经具有表结构情况下使用',
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
						'**注意：**: 仅用在User实体',
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
						'**注意：**: 仅在系统启用逻辑删除时有效',
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
					insertText: new vscode.SnippetString('AddCustomMethod(${1|repository, service, rest, clientService, queryService, updateComponent, listComponent, clientRoute, editComponent, dto, listRelation, detailTemplate|})${0}'),
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
						'**注意：**: 蓝图中使用, -分隔',
					].join('\n'),
					[
						'#### 可选值：',
						'- repository',
						'- service',
						'- rest',
						'- no',
						'- clientService',
						'- queryService',
						'- updateComponent',
						'- listComponent',
						'- clientRoute',
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
						'**注意：**: 内容为更新的字段列表，使用-分隔',
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
						'**注意：**: 前部分参数为更新条件，后部分参数为更新字段，多个字段使用-分隔',
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
						'**注意：**: 多个字段使用-分隔',
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
						'**注意：**: 多个字段使用-分隔',
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
					insertText: new vscode.SnippetString('@EntityDomainLayer(${1|true, false|})${0}'),
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
					insertText: new vscode.SnippetString('@EntityPersistenceLayer(${1|true, false|})${0}'),
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
					insertText: new vscode.SnippetString('@RestLayer(${1|true, false|})${0}'),
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
					insertText: new vscode.SnippetString('@EntitySearchLayer("${1|true, false|}")${0}'),
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
			}
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
						insertText: new vscode.SnippetString('EndUsed(${1|fileUrl, iconPicker, imageUrl, videoUrl, audioUrl, editor, codeEditor, select, modalSelect, checkbox, radio, radioButton, rate, slider, switch, textArea, avatar |})${0}'),
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
					}
				},
				FieldConfig: {
					completeItem: {
						label: {
							label: 'FieldConfig',
							detail: '',
							description: '增加字段配置'
						},
						insertText: new vscode.SnippetString('FieldConfig(${1}|hideInForm, hideInList, editInList, searchForm, hideInDetail, filter, sortable |)${0}'),
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
							'**注意：**: 多个使用-分隔',
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
							'**注意：**: 仅支持简单的条件表达式',
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
							'**注意：**: 涉及特殊字符时需要使用双引号',
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
						insertText: new vscode.SnippetString('SortField(${1|asc, desc|})${0}'),
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
				EditInContainer: {
					completeItem: {
						label: {
							label: 'EditInContainer',
							detail: '',
							description: '编辑表单容器'
						},
						insertText: new vscode.SnippetString('EditInContainer(${1|modal, page, drawer|})${0}'),
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
							'**注意**: 正则表达式需要使用/包裹，并且本行不能再有注释。',
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
						insertText: new vscode.SnippetString('AnnotationOnSource(${1|relateByIdEntity, unidirectional, editInForm, editBySelect, editByFormList, editByList, editInList, detailInList, editByTable, countByPrimaryKey, editBySelectModal, editBySelectDrawer, editByTableModal, editByTableDrawer, importData, hideInList|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
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
							'**注意：**: 多个使用-分隔',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
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
						insertText: new vscode.SnippetString('AnnotationOnDestination(${1|hideInList, editByTableDrawer, editByTableModal, editBySelectDrawer, editBySelectModal, detailInList, editInList|})${0}'),
						kind: vscode.CompletionItemKind.Operator,
					},
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
							'**注意：**: 多个使用-分隔',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
				OnDelete: {
					completeItem: {
						label: {
							label: 'OnDelete',
							detail: '',
							description: '级联删除处理方式'
						},
						insertText: new vscode.SnippetString('OnDelete(${1|NO ACTION, RESTRICT, CASCADE, SET NULL, SET DEFAULT |})${0}'),
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
							'**注意：**: 多个使用-分隔',
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
						insertText: new vscode.SnippetString('OnUpdate(${1|NO ACTION, RESTRICT, CASCADE, SET NULL, SET DEFAULT |})${0}'),
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
							'**注意：**: 多个使用-分隔',
						].join('\n'),
						[
							'#### 适用范围：',
							'- BegCode',
						].join('\n'),
					]
				},
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
		}
	}
};

function tokenLableHover(tokenLabel: any, text: string): vscode.MarkdownString[]| string[] {
	if (tokenLabel) {
		// entity:GptAssistant=>anno:extendAbstractAuditingEntity
		const labels = tokenLabel.split('=>');
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

			} else if (labels.length === 2 && (labels[labels.length - 1].startsWith('to:') || labels[labels.length - 1].startsWith('from:'))){
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
				return [];
			} else {
				return [];
			}
		}
		const labelPath = labels.reduce((prev: any, current: any, index: number, arr: any[]) => {
			if (index === arr.length - 1 && index > 0) {
				return prev + '.' + current.replace(':', '.');
			} else if (index === arr.length - 2 && index > 0 && current.startsWith('anno:')) {
				return prev + '.' + current.replace(':', '.');
			} else {
				return (prev ? (prev + '.') : '') + current.split(':')[0];
			}
		
		}, '');
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
