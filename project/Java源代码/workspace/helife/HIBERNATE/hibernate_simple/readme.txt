第一个Hibernate项目：

1.新建一个普通Java项目。

2.创建User Library,加入如下jar包：
	|-Hibernate_home/lib/*.jar
	|-Hibernate_home/hibernate3.jar
	|-mysql jdbc驱动

3.创建Hibernate配置文件，hibernate.cfg.xml

4.定义实体类User

5.定义User对象的映射文件User.hbm.xml

6.将User.hbm.xml添加到hibernate.cfg.xml中

7.创建数据库表，利用hibernate的工具类，将实体映射导入到数据库

8.开发客户端