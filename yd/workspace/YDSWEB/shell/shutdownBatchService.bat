@echo off

rem no environment variable with java path, no game
if not "%JAVA_HOME%" == "" goto gotJavaHome

echo The JAVA_HOME environment variable is not defined
echo This environment variable is needed to run this program
goto end

:gotJavaHome
if not exist "%JAVA_HOME%\bin\java.exe" goto noJava
goto okJavaHome

:noJava
echo JAVA_HOME\bin\java.exe is missing
echo The JAVA_HOME environment variable may not be defined correctly
echo This environment variable is needed to run this program
goto end

:okJavaHome
SET JAVA_OPTS=

rem SET APP_HOME=D:\eclipse\workspace\YDSWEB\WebRoot\WEB-INF
SET APP_HOME=E:\workspace\YDSWEB\WebRoot\WEB-INF
rem SET APP_HOME=..\WebRoot\WEB-INF
SET APP_LIB=%APP_HOME%\lib
SET APP_CLASSES=%APP_HOME%\classes

if not "%CATALINA_HOME%" == "" SET TOMCAT_HOME=%CATALINA_HOME%

set "JAVA_HOME=%JAVA_HOME:Program Files=Progra~1%"

set CLASSPATH=%JAVA_HOME%\lib\rt.jar;%APP_CLASSES%;

setlocal EnableDelayedExpansion
for %%i in ("%APP_LIB%\*.jar") do set CLASSPATH=!CLASSPATH!%%i;
for %%i in ("%TOMCAT_HOME%\lib\*.jar") do set CLASSPATH=!CLASSPATH!%%i;
rem pause
echo Using JAVA_HOME:	%JAVA_HOME%
echo Using CLASSPATH:	%CLASSPATH%

%JAVA_HOME%\bin\java.exe %JAVA_OPTS% -classpath "%CLASSPATH%" com.yds.batch.service.impl.BatchSocketClient
:end

endlocal