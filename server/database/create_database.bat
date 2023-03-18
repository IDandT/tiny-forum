@echo off 

set mysqlpath="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe "
set host=localhost 
set user=dev 
set pass=dev

echo:
echo ***************************************
echo * TINY-FORUM DATABASE CREATION SCRIPT *
echo ***************************************
echo:
echo CREATING DATABASE
%mysqlpath% -h %host% -u %user% -p%pass% < scripts\database.sql
echo:

echo CREATING TABLES
%mysqlpath% -h %host% -u %user% -p%pass% < scripts\users.sql
%mysqlpath% -h %host% -u %user% -p%pass% < scripts\posts.sql
%mysqlpath% -h %host% -u %user% -p%pass% < scripts\topics.sql
echo:

echo CREATING STORED PROCEDURES
%mysqlpath% -h %host% -u %user% -p%pass% < procs\usp_PostGet.sql
%mysqlpath% -h %host% -u %user% -p%pass% < procs\usp_PostNew.sql
%mysqlpath% -h %host% -u %user% -p%pass% < procs\usp_TopicGet.sql
%mysqlpath% -h %host% -u %user% -p%pass% < procs\usp_TopicNew.sql
%mysqlpath% -h %host% -u %user% -p%pass% < procs\usp_UserCreate.sql
%mysqlpath% -h %host% -u %user% -p%pass% < procs\usp_UserLogin.sql
%mysqlpath% -h %host% -u %user% -p%pass% < procs\usp_UserUpdateAvatar.sql
%mysqlpath% -h %host% -u %user% -p%pass% < procs\usp_UserUpdateSession.sql
echo: