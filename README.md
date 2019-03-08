# vue-vuetify-electron-project

**包含的 内容**

**vue**

**vuex**

**vuetify**

**electron**

------

**里面有一个 模板页**

**左侧抽屉,**

**tabs 之类的.**

------



### 

# 关于Electron 在 运行时候的 提示

==Failed to fetch extension, trying 4 more times==

倒数到1 也可以 运行成功. 只是没有 vue 插件了. 并且每次运行都会 倒数. 效率很慢.

这个是在 安装 Vue.js devtools 浏览器 监测 vue 的插件

需要连接谷歌. 

国内的小伙伴 可以  在==项目中找到  Vue.jsDevtools 文件夹. 将 里面的那个  extensions  文件夹== 

复制到 ==C:\ Users \ xxxue \ AppData \ Roaming \ vue-project \ extensions==  

xxxue 是电脑用户名

vue-project 是  项目名称

然后重新运行项目.  开发者窗口就有 Vue 的一个 tab  . 就是这个 监测 vue 的插件了.  .

之后 运行就会间 启动成功  ,不会出现 上面的提示了. 





## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
