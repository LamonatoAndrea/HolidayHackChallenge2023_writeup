#!/bin/sh
export JAVA_HOME=/opt/java/openjdk
export JAVA_VERSION=jdk-11.0.20.1+1
export PATH=/opt/java/openjdk/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# NMF_LIB can be provided by the parent app (i.e. supervisor) or set locally
if [ -z "$NMF_LIB" ] ; then
    NMF_LIB=`cd ../lib > /dev/null; pwd`
fi

if [ -z "$NMF_HOME" ] ; then
    NMF_HOME=`cd .. > /dev/null; pwd`
fi

if [ -z "$MAX_HEAP" ] ; then
    MAX_HEAP=384m
fi

JAVA_OPTS="-Xms32m -Xmx$MAX_HEAP $JAVA_OPTS"

LOCAL_LIB_PATH=`readlink -f lib`
LD_LIBRARY_PATH=$LOCAL_LIB_PATH:`cd ../lib > /dev/null; pwd`:$LD_LIBRARY_PATH

export JAVA_OPTS
export NMF_LIB
export NMF_HOME
export LD_LIBRARY_PATH

# Replaced with the main class name
MAIN_CLASS_NAME=esa.mo.nmf.nanosatmosupervisor.NanosatMOSupervisorBasicImpl

exec java $JAVA_OPTS \
  -classpath "$NMF_LIB/*:lib/*:/usr/lib/java/*" \
  -Dnmf.platform.impl=esa.mo.platform.impl.util.PlatformServicesProviderSoftSim \
  -Djava.util.logging.config.file="$NMF_HOME/logging.properties" \
  "$MAIN_CLASS_NAME" \
  "$@"

