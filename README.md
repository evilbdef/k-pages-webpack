## 如果使用
下载 git clone https://github.com/faimaklg/k-pages-webpack.git

安装 npm i

开发模式 npm run dev

打包 npm run build

## 目录结构

```
├─build
	├─webpack.base.conf.js #webpack基础配置
	├─webpack.dev.conf.js #webpack开发模式配置
	├─webpack.prod.conf.js #webpack生产模式配置
├─config
	├─index.js #配置文件参数
├─node_modules
├─src
	├─common
		├─images #公用img文件
		├─js #公用js文件
		└─scss #公用scss文件
	├─helpers #handlebars模板引擎扩展helpers方法（可自定义扩展）
		├─ahref.js a标签href使用方法
		└─file.js 独立引用文件配置
	├─page #页面
		└─index #例子，内文件名同文件夹名
			├─index.hbs #handlebars页面文件
			├─index.js #脚本文件
			├─index.plan.js #html-webpack-plugin模板入口（可配置参数，引用part中的模块）
			└─index.scss #样式文件
	└─part #模块
		└─footer #公用模块
			├─footer.hbs #模块文件（在.plan.js被引用）
			├─footer.js #模块脚本 （在common/js/被引用）
			└─footer.scss #模块样式（在common/scss/被引用）
├─.babelrc
├─.eslintignore
├─.eslintrc
├─.gitignore
├─package.json
├─postcss.config.js
```
