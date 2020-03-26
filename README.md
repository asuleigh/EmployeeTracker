# [EmployeeTracker](https://asuleigh.github.io/EmployeeTracker/)
Architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

### Links
[Developer Profile Generator](https://asuleigh.github.io/EmployeeTracker/)
<br>
[GitHub Repo](https://github.com/asuleigh/EmployeeTracker)

### GIF
![Gif](tracker1GIF.gif)
![Gif](tracker2GIF.gif)
![Gif](tracker3GIF.gif)
![Gif](tracker4GIF.gif)

<hr>

ABSTRACT: This is a simple employee tracker that uses node, inquirer, and a seeded mysql database to keep track of an employee database. This tracker seeks to allow for viewing, adding, and removing Departments, Employee Roles, Managers, and Employees. 

<hr>

Table of Contents:

i: Installation and Usage ii: Credits iii: License

i: INSTALLATION AND USAGE
-In order to clone or download website for functionality on local drives, be sure to install files to proper locations.

-server.js, db.js, schema.sql, and seeds.sql should be located in the source folder

-Clone repo files to your local computer

-Open the terminal and npm install (be sure to npm install the dependencies listed in server.js {mysql, inquirer, console.table})

-Open mySQL Workbench and run schema.sql, then seeds.sql in a separate file to create and seed the database

-Run 'node server.js' in the terminal and you can start working with your new employee tracking system!

-Currently the system can view roles, departments, employees, and managers; add roles, departments, employees, and managers; change roles and departments; and remove employees. Currently the code for removing departments is not functioning as it is not properly retrieving the id (code is currently commented out to avoid errors), but this will be fixed in future updates.

ii: CREDITS -https://www.w3schools.com/sql/sql_foreignkey.asp -https://www.w3schools.com/sql/sql_datatypes.asp -https://www.npmjs.com/package/mysql -https://www.npmjs.com/package/inquirer/v/0.2.3 -https://www.npmjs.com/package/console.table -https://sqlbolt.com/lesson/select_queries_with_constraints -https://fsprojects.github.io/SQLProvider/core/async.html -https://stackoverflow.com/questions/46132137/how-to-write-database-module-in-nodejs -https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises -https://developers.google.com/web/fundamentals/primers/promises -https://codeburst.io/node-js-mysql-and-promises-4c3be599909b -https://stackoverflow.com/questions/25865104/field-id-doesnt-have-a-default-value/42941784 -https://www.w3schools.com/js/js_switch.asp

iii: LICENSE GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc. https://fsf.org/ Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.
<hr>