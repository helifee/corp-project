---
title: 巨洲云web-oa项目部署流程
---

标签（空格分隔）： 未分类

---

# 部署开发演示版，测试版前提（192.168.3.57这台机器请略过该前提）
确保机器上安装了**nodejs8.0+**版本，**npm**和**cnpm**和**forever**即可。
说明：
1 linux安装nodejs:**https://nodejs.org/en/download/package-manager/#void-linux**(一般安装完npm会自动安装，没有的话请自行百度，google)
2 安装cnpm(在npm安装完成的基础上执行：**npm install -g cnpm --registry=https://registry.npm.taobao.org** ，即可完成cnpm安装)
3 完成上述两步骤后执行**npm -g install forever**安装forever进程守护

# 目前已部署开发演示版项目位置：
1 在机器上**192.168.3.57**上
2 位置在**/home/adminuser/jzy-web/**下方的**platform-app_dev_v2**目录中

说明：
1 账号密码（for ssh or sftp）：**adminuser**   **1qaz@WSX**
2 建议开发演示版部署在**web-oa-dev**目录中，将来测试，正式目录可在父级目录新建**web-oa-test**和**web-oa-prod**;如有灰度环境可明明为**web-oa-stage**（部署前请先到**platform-app_dev_v2**目录中，按照下述步骤4终止当前项目进程）


# 部署开发演示版

1 svn clone或者更新代码（svn地址为：**http://192.168.6.21:1443/svn/erp_cloud_platform/v2r1-hio-app**）；或者通过ftp软件传输也行
2 执行**cnpm install**(在明确确定项目未增加新的安装包依赖的情况下可略过此步骤，但第一次部署必须执行)
3 完成1,2步骤后执行**npm run build:dev**打包编译项目代码
4 终止当前项目进程进程：**forever stop build/static-server.js**(若项目未启动情况下，无需执行此命令)
5 运行**forever -s start build/static-server.js**启动项目


# 其他说明
1 项目端口号为**8084**，访问地址格式为**协议头+ip+':'+端口+'/dist/'**,例如当前部署服务下访问地址为：**http://192.168.3.57:8084/dist/#/**
2 测试环境等提测时候我再协助部署；灰度，正式环境等都测试通过没bug了我再协助部署。目前项目端口号是写死的8084，将来提测后如果任何环境部署在了和这个ip相同的机器上，我会协助为不同环境划分不同的版本号
3 从第二次开始部署起，若项目处于运行状态，可以通过执行**npm run deploy:dev**替代上述3,4，5步骤
4 此部署手段不像apache,nginx一样，默认开机启动，访问url即可访问项目；一旦服务器重启，请重新到项目目录里执行**forever -s start build/static-server** 启动项目
5 有任何问题请联系我（杜百兴）






                                        





