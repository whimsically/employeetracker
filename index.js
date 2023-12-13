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
const mainMenu = {
    type: 'list',
    name: 'mainMenu',
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
    inquirer.prompt(mainMenu).then((answers) => {
        switch (answers.mainMenu) {
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
        message: 'Please enter the last name of the manager of the new employee'},
        ])
        .then((response) => {
            addEmployeeSQL(response.employeeFirstName, response.employeeLastName, response.employeeRole, response.employeeManager);
    })
    
}
        
//SQL query for adding new employee
function addEmployeeSQL(firstName, lastName, role, manager) {
    //getting the role's ID
    db.query(`SELECT id FROM role WHERE title=?;`, role, function (err, result) {
        const roleID = result[0].id;

        //getting manager's ID
        db.query(`SELECT id FROM employees WHERE last_name=?;`, manager, function (err, result) {
            const managerID = result[0].id;

            //inserting into employee table
            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?);`, [firstName, lastName, roleID, managerID], function (err, result) {
                if (err) {
                    console.log(err);
                }
                console.log('Database updated!');
                main();
            })
        })
    })
};

function updateEmployeeRole() {
    //prompt for user input
    inquirer.prompt(
        [{
            type: 'input',
            name: 'employeeToUpdate',
            message: 'Please enter the last name of the employee to update.'
        },
        {
            type: 'input',
            name: 'updatedRole',
            message: 'Please enter the new role for the employee.'
        }
        ]).then((response) => {
            //query to get role ID
            db.query(`SELECT id FROM role WHERE title=?;`, response.updatedRole, function (err, result) {
                    const updatedRoleID = result[0].id;
                    const employeeToUpdate = response.employeeToUpdate;
                //update employee
                db.query(`UPDATE employees SET role_id = ? WHERE last_name = ?;`, [updatedRoleID, employeeToUpdate], function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Database updated!');
                    main();
                })
            })
        })
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
    })
    
}

//SQL query to add a role
function addRoleSQL(title, salary, department) {
    //query to get the department ID
    db.query(`SELECT id FROM department WHERE dept_name=?;`, department, function (err, result) {
        const deptID = result[0].id;

            //inserts new role into role table
            db.query(`INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)`, [title, salary, deptID], function (err, result) {
                if (err) {
                   console.log(err);
                }
                console.log('Database updated!');
                main();
            })
        })
    }

//prompt to get needed info to add department
function addDepartmentPrompt() {
    inquirer.prompt([
        {
        type: 'input',
        name: 'deptName',
        message: 'Please enter the name of the new department'}
        ])
        .then((response) => {
            addDepartmentSQL(response.deptName);
    })
}

//SQL query to add a department
function addDepartmentSQL(deptName) {
    db.query(`INSERT INTO department (dept_name)
    VALUES (?)`, [deptName], function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log('Database updated!');
        main();
    })
}

//quits program
function quitProgram() {
    process.exit();
}

//initial welcome message
console.log('Welcome to the Employee Management System!');

//runs main function for first time
main();