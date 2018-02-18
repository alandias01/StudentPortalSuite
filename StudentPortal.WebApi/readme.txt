
New asp.net empty project
Add data project
rebuild all
To add->New scaffolded item->Web API 2 Controller with actions, using Entity Framework

First
goto app.config in database project and copy tag <connectionStrings> and its contents
and put it in your webapi projects web.config file inside <configuration>

also inside tag <entityFramework><providers></providers></entityFramework>
You need to add the provider for the db you are connecting to.  You can copy this from your app.config file

Add mysql.data, mysql.data.entity.EF6 as references