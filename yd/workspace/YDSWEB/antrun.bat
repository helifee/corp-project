set ANT_HOME=D:\javasoft\apache-ant-1.8.0
set JAVA_HOME=D:\Java\jdk1.6.0_13
set PATH=%PATH%;%ANT_HOME%\bin
set ANT_OPTS=-Xmx512m -Xms512m
chdir /D D:\eclipse\workspace\YDSWEB

rem ant -buildfile build.xml all -verbose -logfile build.log
ant -buildfile build.xml build -verbose -logfile build.log
