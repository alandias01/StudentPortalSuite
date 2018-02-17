*************** To access a mysql db on linux inside virtual box ***************

sudo apt install mysql-server

Check if it’s running
sudo netstat -tap | grep mysql

You should see
tcp 0 0 localhost:mysql *:* LISTEN 2556/mysqld


Add port forwarding for 3306
Mysql,TCP, 127.0.0.1, 3306,  ,3306

goto file /etc/mysql/my.cnf and do
sudo vim my.cnf
you will see a line bind-address=127.0.0.1 	(put # before)
now it should be # bind-address=127.0.0.1
we want anyone to be able to connect


log into mysql mysql -u root -p

show user, host from mysql.user

show grants for 'root'@'10.0.2.2'

We need access for 10.0.2.2 in order for Visual studio to connect

create user 'root'@'10.0.2.2' identified by ‘makeapassword'
GRANT ALL PRIVILEGES ON *.* TO ‘root’@’10.0.2.2’ with grant option
flush privileges

it may help to create user 'root'@'127.0.0.1'

then restart mysql 
/etc/init.d/mysql restart


**************************** Create data base layer ****************************
Create new project

Goto nuget and get latest entity framework

install mysql connector and manually add reference to the files mysql.data.dll, mysql.data.entity.EF6

App.config Item needs to be modified by adding to <providers>

<providers>
      <provider invariantName="MySql.Data.MySqlClient" type="MySql.Data.MySqlClient.MySqlProviderServices, MySql.Data.Entity.EF6" />
</providers>


add new ADO.NET Entity Data Model
server 127.0.0.1
user: root
pw: whatever you set


