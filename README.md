# TodoApplication
A Todo list application with CRUD operations in database 

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This application uses ASP.Net core and React.js to CRUD todo list in MS SQL.
	
## Technologies
Project is created with:
* Visual Studio 2019 (Community version)
* ASP.NET core
* React.js
	
## Setup
To run this project, follow the steps below:

```
1.	Creating the Tables
CREATE TABLE Todo (
Id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
Title varchar(100) NOT NULL,
Time DateTime NOT NULL,
Detail varchar(200) NOT NULL
)

2.	Adding the model to the Application
Install the following two packages, run the following command in the Package Manger Console:

Install-Package Microsoft.EntityFrameworkCore.SqlServer

Install-Package Microsoft.EntityFrameworkCore.Tools

Scaffold model from the database table using the following command:
Scaffold-DbContext "Data Source=ConnectionString" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Tables Todo
Note: please add your DB ConnectionString.


$ Install node.js if doesn't have it in your environment
$ Open project with Visual Studio 2019 (Community version)
$ Click IIS Express

```
