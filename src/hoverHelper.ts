import { get } from 'lodash';
import * as vscode from 'vscode';

const hoverData: any = {
	'entity': {
		'anno': {
			'ExtendAbstractAuditingEntity': {
				'contents': [
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
			'EntityPackage': {
				'contents': [
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
			'SkipFakeData': {
				'contents': [
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
			'ImportData': {
				'contents': [
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
			'SkipComponent': {
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
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
				'contents': [
					'为生成后的代码增加自定义方法',
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
			}
		},
		field: {
			anno: {
				EndUsed: {
					'contents': [
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
					]
				},
				FieldConfig: {
					'contents': [
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
					]
				},
				ShowBy: {
					'contents': [
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
					'contents': [
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
					'contents': [
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
					]
				},
				ColumnWidth: {
					'contents': [
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
					'contents': [
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
					'contents': [
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
					'contents': [
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
					'contents': [
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
					'contents': [
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
					]
				},
			},
			validation: {
				required: {
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
				}
			}
		}
	}
};

function tokenLableHover(tokenLabel: any): vscode.MarkdownString[] {
	if (tokenLabel) {
		// entity:GptAssistant=>anno:extendAbstractAuditingEntity
		const labels = tokenLabel.split('=>');
		const labelPath = labels.reduce((prev: any, current: any, index: number, arr: any[]) => {
			if (index === arr.length - 1 && index > 0) {
				return prev + '.' + current.replace(':', '.');
			} else {
				return (prev ? (prev + '.') : '') + current.split(':')[0];
			}
		
		}, '');
		return get(hoverData, labelPath + '.contents', []);
	}
	return [];
}

export { hoverData, tokenLableHover };
