#!/bin/sh

# looks for a jvm at $JAVA_HOME
if [ ! -z "$JAVA_HOME" ] ; then
    java_home=$JAVA_HOME
fi

# no environment variable with java path, no game
if [ -z "$java_home" ] ; then
	echo ERROR Set JAVA_HOME before running this tool.
	exit 1
fi

# no java application at the java path, still no game 
if [ ! -x "${java_home}/bin/java" ] ; then
	echo ERROR - Set JAVA_HOME to the path of a valid jdk.
	exit 1
fi

app_home=..
app_classes=${app_home}/classes
app_lib=${app_home}/lib

if [ -z "$CATALINA_HOME" ] ; then
    tomcat_home=$CATALINA_HOME
else
	tomcat_home=$TOMCAT_HOME
fi

# Finally set the right classpath
app_classpath=${java_home}/jre/lib/rt.jar:${app_classes}

for i in `ls ${app_lib}/*.jar`; do
     app_classpath=$i:$app_classpath
done

for i in `ls ${tomcat_home}/lib/*.jar`; do
     app_classpath=$i:$app_classpath
done

# run application
${java_home}/bin/java -classpath "$app_classpath" com.yds.batch.service.impl.BatchServiceCtrlImpl
