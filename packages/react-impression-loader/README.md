# react-impression-loader

![](https://img.shields.io/badge/npm-v0.1.0-brightgreen)

☀ This package contains built-in TypeScript declarations.

为你的 React 组件添加骨架屏加载视图。



## Features

* 🔰 **易使用**：缺省参数自动化生成；
* 🧷 **低侵入**：使用基类或 hooks 快速激活；
* ✏ **可定制**：支持自定义骨架屏元素样式；
* 🧰 **可搭建**：开发模式提供工具基于页面快照直接生成配置；



## Index

* [Getting Started](#gettingstarted)
* [Usage](#usage)
  * [Enable Skeleton View for a Component](#enableskeletonviewforacomponent)
  * [Customize Styles for the Skeleton View](#customizestylesfortheskeletonview)
  * [Generate Configurations in the Development Environment](#generateconfigurationsinthedevelopmentenvironment)
* [API](#api)



## Getting Started

### If you are using [espoir](https://www.npmjs.com/package/espoir-cli)

`espoir i react-impression-loader -w \<your_package\>`

### Use npm

`npm i react-impression-loader --save`



## Usage

### Enable Skeleton View for a Component

#### For Class Component

```typescript
import ImpressionLoader from 'react-impression-loader';
```

#### For Function Component

```typescript
import { useImpressionLoader } from 'react-impression-loader';
```



### Customize Styles for the Skeleton View

#### For Class Component

```typescript

```

#### For Function Component

```typescript

```



### Generate Configurations in the Development Environment

// TODO:



## API



## Development

1. Fork [这个仓库](https://github.com/AntoineYANG/react-impression-loader) 并 clone 到本地；

2. `espoir i` - 安装依赖；
3. `espoir run react-impression-loader.dev` - 启动开发环境；
4. 在 `packages\react-impression-loader\package.json` 中 `contributors` 字段添加你的信息；
5. `espoir run build` - 打包发布；
6. 提交你的代码；