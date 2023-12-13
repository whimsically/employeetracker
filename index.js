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
                addRolePrompt();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartmentPrompt();
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
            addEmployeeSQL(response.employeeFirstName, response.employeeLastName, response.employeeRole, response.employeeManager);
            main();
    })
    
}
        
//SQL query for adding new employee
function addEmployeeSQL(firstName, lastName, role, manager) {
    console.log(firstName, lastName, role, manager);
}

function updateEmployeeRole() {

}

//prompts to get info to create new role
function addRolePrompt() {
    inquirer.prompt([
        {
        type: 'input',
        name: 'roleTitle',
        message: 'Please enter the title of the new role'},
        {
        type: 'input',
        name: 'roleSalary',
        message: 'Please enter the salary of the new role'},
        {
        type: 'input',
        name: 'roleDepartment',
        message: 'Please enter the department of the new role'}
        ])
        .then((response) => {
            addRoleSQL(response.roleTitle, response.roleSalary, response.roleDepartment);
            main();
    })
    
}

function addRoleSQL(title, salary, department) {
    console.log(title, salary, department);
}

function addDepartmentPrompt() {
    inquirer.prompt([
        {
        type: 'input',
        name: 'deptName',
        message: 'Please enter the name of the new department'}
        ])
        .then((response) => {
            addDepartmentSQL(response.deptName);
            main();
    })
}

function addDepartmentSQL(deptName) {
    console.log(deptName);
}

//quits program
function quitProgram() {
    process.exit();
}

//initial welcome message
console.log('Welcome to the Employee Management System!');

//runs main function for first time
main();