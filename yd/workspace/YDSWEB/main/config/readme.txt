代码质量相关

各配置文件说明：
checkstyle
  checkstyle_checks.xml         ant&eclipse用checkstyle配置文件

 注意变量声明顺序：
 			public
			protected
			private
			abstract
			static
			final
			transient
			volatile
			synchronized
			native
			strictfp 
 
eclipse
  eclipse-cleanup-profile.xml   Eclipse Cleanup设置文件
  eclipse-formatter-profile.xml Eclipse Formatter设置文件

findbugs
 yds-fancy-hist.xsl             ant用findbugs输出样式配置文件

1.Eclipse设定： 
 1.修改
     在 Windows->Preferences->Java Code Style的 和 
   Formatter 中导入   eclipse-formatter-profile.xml
   Cleanup   中导入   eclipse-cleanup-profile.xml

     修改Preference->General->Keys ，调整与输入法切换冲突的内容助手热键， 找到Content Assist, 改为诸如alt+/
     修改Windows->Preferences->XML->XML Files->Editor  ,增加到120字符

 2.使用方法：
  Formatter  : ctrl+shift+F
  Cleanup    ： Source->Clean up...->一步一步执行。

