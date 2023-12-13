var inquirer = require('inquirer');
const mysql = require('mysql2');

//creates connection to MYSQL database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'm1s4m1s@5462',
      database: 'employees_db'
    }
  );

//initial menu prompt
const firstMenu = {
    type: 'list',
    name: 'firstMenu',
    message: 'What would you like to do?',
    choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit'
    ]
}

//shows the firstMenu prompt
function main() {
    inquirer.prompt(firstMenu).then((answers) => {
        switch (answers.firstMenu) {
            //switch statement that runs a function based on what was selected
            case 'View All Employees':
                console.log('hii');
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployeePrompt();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                quitProgram();
                break;
        }
    });
}

//views employees table
function viewEmployees() {
    db.query(`SELECT * FROM employees`, function (err, result) {
        console.log(result);
        main();
    });
}

//views roles table
function viewRoles() {
    db.query(`SELECT * FROM role`, function (err, result) {
        console.log(result);
        main();
    });
}

//views department table
function viewDepartments() {
    db.query(`SELECT * FROM department`, function (err, result) {
        console.log(result);
        main();
    });
}

function addEmployeePrompt() {
    inquirer.prompt([
        {
        type: 'input',
        name: 'employeeFirstName',
        message: 'Please enter the first name of the new employee'},
        {
        type: 'input',
        name: 'employeeLastName',
        message: 'Please enter the last name of the new employee'},
        {
        type: 'input',
        name: 'employeeRole',
        message: 'Please enter the role of the new employee'},
        {
        type: 'input',
        name: 'employeeManager',
        message: 'Please enter the manager of the new employee'},
        ])
        .then((response) => {
            console.log(response.employeeFirstName);
            addEmployeeSQL();
            main();
    })
    
}
        

function addEmployeeSQL() {

}

function updateEmployeeRole() {

}

function addRole() {

}

function addDepartment() {

}

function quitProgram() {

}

console.log('Welcome to the Employee Management System!');
main();