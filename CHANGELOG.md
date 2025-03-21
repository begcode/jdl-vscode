# 更新记录

## 0.2.4

- 更新generator-begcode 到 8.6.8版本
- AnnotationOnSource 增加可选值notExistAdd，选择关联关系时可以新建
- AnnotationOnSource 增加可选值hideInForm，编辑表单中不显示关系项

## 0.2.3

- 更新generator-begcode 到 8.6.5版本
- 注解@FilterFieldsOnSourceSide简化为@FilterFieldsOnSource
- 关联关系中增加注解@WebsiteOnSource,主要用来配置Website端
- 增加注解@ValueFrom,支持 entity 的field 和relationship。可用值@ValueForm(currentUser),当前用户

## 0.2.2

- 增加关系注解@Id和@FilterFieldsOnSourceSide，其中@Id 由JHipster 提供支持，@FilterFieldsOnSourceSide为 BegCode 提供
- 更新generator-begcode 到 8.6.4版本
- 增加 WebListTemplate/WebDetailTemplate/WebRecommendTemplate/WebRankTemplate/WebRelationTemplate 注解，为 PC Web 应用的生成做准备。
- 增加builtInEntity 和关联关系中required 关键字的提示

## 0.2.1

- 增加实体注解@Features,当前仅支持一个选项，copy，表示实体支持copy功能的Api接口及实现。
- 补充AnnotationOnSource注解提示信息
- 字段类型可设置为二维码展示qrCode

## 0.2.0

- 修复jdl文件格式错误时，插件失效的问题。
- 增加部分注解和注解的提示。
- 增加clientRootFolder等指令的提示与Entity跳转到定义功能。
- 升级generator-begcode依赖到8.6.2版本。

## 0.1.3

- 修复字段类型提示
- 增加ListBy注解可选值tableEdit
- 增加FilterByTree注解

## 0.1.1

- 增加E-R图预览和生成

## 0.1.0

- 支持跳转到定义

## 0.0.9

- 字段类型提示增加枚举类型
- 增加relationship中字段补全

## 0.0.8

- 优化代码提示和自动补全

## 0.0.7

- 补充动态代码补全
- 完善提示功能。

## 0.0.6

- 增加基本诊断功能
- 增加部分关键字提示

## 0.0.5

- 修复部分Bug
- 增加自动补全

## 0.0.4

- 第1个版本发布，基础语法高亮和代码片段
