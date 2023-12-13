INSERT INTO department (dept_name)
VALUES ("Legal"),
        ("IT"),
        ("Sales"),
        ("Human Resources"),
        ("Executive"),
        ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("President", "120000", "5"),
        ("Accountant", "60000", "6"),
        ("IT Manager", "70000", "2"),
        ("Sales Rep", "50000", "3"),
        ("HR Rep", "50000", "4"),
        ("Sales Manager", "70000", "3");

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Some", "Guy", "1", null),
        ("Sales", "McSalesy", "6", null),
        ("Love", "Mycat", "2", null),
        ("Testing", "Test123", "4", "2"),
        ("HR", "Person", "5", null);