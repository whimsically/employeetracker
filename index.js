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

  console.log('Welcome to the Employee Management System!');

  inquirer
  .prompt([
    {
        type: 'list',
        name: 'first_menu',
        message: 'What would you like to do?',
        choices: ['View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Roles',
        'View All Departments',
        'Add Department',
        'Quit'
        ]
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });