build.xml 说明文件。       
       Notes:
        1.要成功运行所有任务，必须安装相关软件,并设置相关环境变量：
          各安装路径参考以下相关设置
          1.jdk           要设置 JAVA_HOME(javac,javadoc用到)
          2.ant           要设置 ANT_HOME（需要扩展ant-contrib）
          3.jsdoctoolkit  生成javascript文档
          4.doxygen       生成javadoc文档
          5.hhc           HTML Help Compiler(doxygen用到)
                          路径在以下文件中设置
                          src/main/config/doxygen.cfg
          6.checkstyle    代码检查
          7.findbugs      代码检查 Badpractice:60, CorRECtneSS:80, INTernationalization:1,
                                   MaliCIouscoDEvulnerability:12, MultithreaDEdCorRECtneSS:27,
                                   Performance:23, Dodgy:43。
        
        8.pmd           代码检查
            PMD是一个Java源码分析器。它可以发现不需要使用的变量，
            空的Catch块和不需要创建的对象等。
            它还包含一个CPD工具可以探测一块代码中相同的部分。
          9.statsvn       从Subversion版本库中取得信息，
            然后生成描述项目开发的各种表格和图表。
            比如：
              代码行数的时间线；
              针对每个开发者的代码行数；
              开发者的活跃程度等信息。


        2.此build文件依赖src/main/config下相关文件,请不要随意改动。

        3.查看运行命令，请在build.xml文件所在目录输入
             ant
          如要编译代码，请输入
             ant build
        ======================================
        4.已知问题解决方法
        Q1.关于eclipse运行ant时，因为字体不能识别而自动中断的问题
        A1.选择build.xml，点右键，选择[Run as]->[3 Ant build...]
        选择common标签，在console encoding中选择other，然后再选择ms932，然后apply就可以啦。
        另，如果你的other里面没有ms932，到window-perforences里面配置添加一下就可以了。
        要处理日志，在main标签下arguments中输入，*注意此时控制台就没有信息了。
          -logfile build.log -logger org.apache.tools.ant.NoBannerLogger
        ======================================
        5.TODO list xieyujun 2010/03/03
          1.以下任务规则要自定义
             checkstyle,findbugs,pmd
          2.还需加入以下任务
             覆盖率测试，自定义代码格式(java,js,jsp,xml等)
             共通性检查(文件名，注释等)
             findbugs：历史信息的记录,对比等
          3.以下任务未完全测试
             buildjar,warfile,deploy,dist等
        6.相关目录说明
        YDSWEB
           │  antrun.bat          命令行运行ant
           │  build.xml           本文件
           ├─build                编译所用文件夹
           │  ├─docs              各种文档
           │  │  ├─api            java api doc
           │  │  ├─doxygendoc     doxygen生成的javadoc
           │  │  └─jsdoc          javascript doc
           │  ├─lib               生成的jar
           │  ├─report            各种检查工具生成的报告
           │  │  ├─checkstyle
           │  │  ├─findbugs
           │  │  ├─junit
           │  │  └─pmd
           │  └─war
           ├─dist                    发布用文件夹
           └─main                    主文件夹
               ├─config              ant用各配置文件
               │  ├─checkstyle
               │  └─pmd
               └─script              各种脚本等