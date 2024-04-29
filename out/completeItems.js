"use strict";
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
exports.completeItems = void 0;
const console_1 = require("console");
const vscode = __importStar(require("vscode"));
const annotationValueDetail = {
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
const annotationData = Object.keys(annotationValueDetail).reduce((acc, key) => {
    acc[key] = Object.keys(annotationValueDetail[key]);
    return acc;
}, {});
const annotation = vscode.languages.registerCompletionItemProvider({ language: 'jdl' }, {
    provideCompletionItems(document, position) {
        // get all text until the `position` and check if it reads `console.`
        // and if so then complete if `log`, `warn`, and `error`
        (0, console_1.log)('annotation: ');
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
                    const completionItem = new vscode.CompletionItem({ label: item, ...annotationValueDetail[annotationName][item] });
                    completionItem.kind = vscode.CompletionItemKind.Text;
                    return completionItem;
                });
            }
        }
        return undefined;
    }
}, '-', '(');
exports.completeItems = [annotation];
//# sourceMappingURL=completeItems.js.map