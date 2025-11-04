# noesoft-hospital

东软云医院是学校在大四第一学期举行的实训课中的小组作业的一部分，这里提供一个易于扩展的基本框架，它具有约定大于配置的特点：
- 通过集成unplugin-auto-import实现vue/vue-router api的自动导入
- 使用专门的模块，实现对/router/modules/xx/ 下的文件的自动扫描和自动导入
- 自动生成对应的菜单等

## 分支管理
- master  主分支 作为基础管理系统模板，可用于任何管理系统的二次开发
- feature 各种其他特性分支，完全体的东软实训位于 feature/mock 分支
- fix  修复缺陷分支

## 项目技术栈
- Vue
- TypeScript
- TailwindCSS
- Axios
- MockJS
- Element-Plus
- Pinia

## 项目目录结构

- src
  - assets
  - server
    - api
  - components
  - views
  - hook
  - const
  - utils
  - router
    - modules
  - store

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
