@REM ----------------------------------------------------------------------------
@REM Copyright (C) 2021      European Space Agency
@REM                         European Space Operations Centre
@REM                         Darmstadt
@REM                         Germany
@REM ----------------------------------------------------------------------------
@REM System                : ESA NanoSat MO Framework
@REM ----------------------------------------------------------------------------
@REM Licensed under European Space Agency Public License (ESA-PL) Weak Copyleft – v2.4
@REM You may not use this file except in compliance with the License.
@REM 
@REM Except as expressly set forth in this License, the Software is provided to
@REM You on an "as is" basis and without warranties of any kind, including without
@REM limitation merchantability, fitness for a particular purpose, absence of
@REM defects or errors, accuracy or non-infringement of intellectual property rights.
@REM 
@REM See the License for the specific language governing permissions and
@REM limitations under the License. 
@REM ----------------------------------------------------------------------------

@echo off

set ERROR_CODE=0

:init
@REM Decide how to startup depending on the version of windows

@REM -- Win98ME
if NOT "%OS%"=="Windows_NT" goto Win9xArg

@REM set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" @setlocal

@REM -- 4NT shell
if "%eval[2+2]" == "4" goto 4NTArgs

@REM -- Regular WinNT shell
set CMD_LINE_ARGS=%*
goto WinNTGetScriptDir

@REM The 4NT Shell from jp software
:4NTArgs
set CMD_LINE_ARGS=%$
goto WinNTGetScriptDir

:Win9xArg
@REM Slurp the command line arguments.  This loop allows for an unlimited number
@REM of arguments (up to the command line limit, anyway).
set CMD_LINE_ARGS=
:Win9xApp
if %1a==a goto Win9xGetScriptDir
set CMD_LINE_ARGS=%CMD_LINE_ARGS% %1
shift
goto Win9xApp

:Win9xGetScriptDir
set SAVEDIR=%CD%
%0\
cd %0\..\target\nmf-sdk-2.1.0-SNAPSHOT\home\.. 
set BASEDIR=%CD%
cd %SAVEDIR%
set SAVE_DIR=
goto repoSetup

:WinNTGetScriptDir
set BASEDIR=%~dp0\..\target\nmf-sdk-2.1.0-SNAPSHOT\home

:repoSetup
set REPO=


if "%JAVACMD%"=="" set JAVACMD=java

if "%REPO%"=="" set REPO=%BASEDIR%\nmf\lib

set CLASSPATH="%BASEDIR%"\etc;"%REPO%"\*
set NMF_HOME=%cd%\..
set ENDORSED_DIR=
if NOT "%ENDORSED_DIR%" == "" set CLASSPATH="%BASEDIR%"\%ENDORSED_DIR%\*;%CLASSPATH%

if NOT "%CLASSPATH_PREFIX%" == "" set CLASSPATH=%CLASSPATH_PREFIX%;%CLASSPATH%

@REM Reaching here means variables are defined and arguments have been captured
:endInit

%JAVACMD% %JAVA_OPTS%  -classpath %CLASSPATH% -Dapp.name="nanosat-mo-supervisor-sim" -Dapp.repo="%REPO%" -Dapp.home="%BASEDIR%" -Dbasedir="%BASEDIR%" -Djava.util.logging.config.file="%NMF_HOME%\logging.properties" -Dnmf.platform.impl=esa.mo.platform.impl.util.PlatformServicesProviderSoftSim esa.mo.nmf.nanosatmosupervisor.NanosatMOSupervisorBasicImpl %CMD_LINE_ARGS%
if %ERRORLEVEL% NEQ 0 goto error
goto end

:error
if "%OS%"=="Windows_NT" @endlocal
set ERROR_CODE=%ERRORLEVEL%

:end
@REM set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" goto endNT

@REM For old DOS remove the set variables from ENV - we assume they were not set
@REM before we started - at least we don't leave any baggage around
set CMD_LINE_ARGS=
goto postExec

:endNT
@REM If error code is set to 1 then the endlocal was done already in :error.
if %ERROR_CODE% EQU 0 @endlocal


:postExec

if "%FORCE_EXIT_ON_ERROR%" == "on" (
  if %ERROR_CODE% NEQ 0 exit %ERROR_CODE%
)

exit \B %ERROR_CODE%
