# doc-app

> My astonishing Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## 模块

1. 动态菜单栏（已完成）
2. 权限管理（权限组：已完成，用户权限：待续）
3. 文章标签（已完成）
4. 文章发布、文章展示（已完成）
5. 网站设置（待续）
6. 登录注册（已完成）
7. 前台（待续）

## 配置

在根目录下创建 `.env` 文件

#### MySQL配置
```
sql_host = 127.0.0.1
sql_port = 3306
sql_user = root
sql_password = 123456
sql_database = doc
sql_debug = true
```

#### SMTP配置
```
smtp_host = smtp.qq.com
smtp_port = 587
smtp_user = ******@qq.com
smtp_pass = ******
```
