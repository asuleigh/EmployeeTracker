// Requirements
const inquirer= require("inquirer");
let Database= require("./db");
let cTable= require("console.table");

// Set up connection for sql db
const db= new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employeetrackerdb"
  });

// Call for getting managers
async function getManagers() {
    let query= "SELECT * FROM employee WHERE manager_id IS NULL";
    const rows= await db.query(query);
    let employeeNames= [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

// Call for getting roles
async function getRoles() {
    let query= "SELECT title FROM role";
    const rows= await db.query(query);
    let roles= [];
    for(const row of rows) {
        roles.push(row.title);
    }
    return roles;
}

// Call for getting departments
async function getDepartmentNames() {
    let query= "SELECT name FROM department";
    const rows= await db.query(query);
    let departments= [];
    for(const row of rows) {
        departments.push(row.name);
    }
    return departments;
}

// Call for getting the id of the manager
async function getEmployeeId(fullName) {
    let employee= getFirstAndLastName(fullName);
    let query= 'SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?';
    let args=[employee[0], employee[1]];
    const rows= await db.query(query, args);
    return rows[0].id;
}

// Call for getting the id of the role
async function getRoleId(roleName) {
    let query= "SELECT * FROM role WHERE role.title=?";
    let args= [roleName];
    const rows= await db.query(query, args);
    return rows[0].id;
}

// Call for getting the id of the department
async function getDepartmentId(departmentName) {
    let query= "SELECT * FROM department WHERE department.name=?";
    let args= [departmentName];
    const rows= await db.query(query, args);
    return rows[0].id;
}

// Call for getting employee names
async function getEmployeeNames() {
    let query= "SELECT * FROM employee";

    const rows= await db.query(query);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

// Call for viewing all roles
async function viewAllRoles() {
    console.log("");
    let query= "SELECT * FROM role";
    const rows= await db.query(query);
    console.table(rows);
    return rows;
}

// Call for viewing all departments
async function viewAllDepartments() {
    let query= "SELECT * FROM department";
    const rows= await db.query(query);
    console.table(rows);
}

// Call for viewing all employees
async function viewAllEmployees() {
    console.log("");
    let query= "SELECT * FROM employee";
    const rows= await db.query(query);
    console.table(rows);
}

// Call for viewing employees by department
async function viewAllByDept() {
    console.log("");
    let query= "SELECT first_name, last_name, department.name FROM ((employee INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);";
    const rows= await db.query(query);
    console.table(rows);
}

// Gets first and last name; Makes sure to ignore spaces for array count
function getFirstAndLastName( fullName ) {
    let employee= fullName.split(" ");
    if(employee.length == 2) {
        return employee;
    }
    let last_name= " ";
    for(let i=0; i<employee.length-1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    let first_name= " ";
    for(let i=0; i<employee.length-1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name.trim()];
}

// Gets id for role and name and sets to update id for role
async function updateEmployeeRole(employeeInfo) {
    const roleId= await getRoleId(employeeInfo.role);
    const employee= getFirstAndLastName(employeeInfo.employeeName);
    let query= 'UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?';
    let args=[roleId, employee[0], employee[1]];
    const rows= await db.query(query, args);
    console.log(`Updated employee ${employee[0]} ${employee[1]} with role ${employeeInfo.role}`);
}

// Sets up for adding new employee
async function addEmployee(employeeInfo) {
    let roleId= await getRoleId(employeeInfo.role);
    let managerId= await getEmployeeId(employeeInfo.manager);
    let query= "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    let args= [employeeInfo.first_name, employeeInfo.last_name, roleId, managerId];
    const rows= await db.query(query, args);
    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
}

// Sets up for removing an employee
async function removeEmployee(employeeInfo) {
    const employeeName = getFirstAndLastName(employeeInfo.employeeName);
    let query= "DELETE from employee WHERE first_name=? AND last_name=?";
    let args= [employeeName[0], employeeName[1]];
    const rows= await db.query(query, args);
    console.log(`Employee removed: ${employeeName[0]} ${employeeName[1]}`);
}

// Sets up for adding a department
async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query= 'INSERT into department (name) VALUES (?)';
    let args= [departmentName];
    const rows= await db.query(query, args);
    console.log(`Added department named ${departmentName}`);
}

// Sets up for removing an department
async function removeDepartment(departmentInfo) {
    const departmentName= departmentInfo.departmentName;
    let query= "DELETE from department (name) VALUES (?)";
    let args= [departmentName];
    const rows= await db.query(query, args);
    console.log(`Department removed: ${departmentName}`);
}

// Sets up for adding a role
async function addRole(roleInfo) {
    // INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
    const departmentId= await getDepartmentId(roleInfo.departmentName);
    const salary= roleInfo.salary;
    const title= roleInfo.roleName;
    let query= 'INSERT into role (title, salary, department_id) VALUES (?,?,?)';
    let args= [title, salary, departmentId];
    const rows= await db.query(query, args);
    console.log(`Added role ${title}`);
}

// Prompt for terminal
async function mainPrompt() {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                  "View all departments",
                  "View all employees",
                  "View all employees by department",
                  "View all roles",
                  "Add department",
                  "Add employee",
                  "Add role",
                  "Remove employee",
                  "Update employee role",
                  "Remove department",
                  "Exit"
                ]
            }
        ])
}

// Get info for adding new managers/employees/roles
async function getAddInfo() {
    const managers= await getManagers();
    const roles= await getRoles();
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: [
                    ...managers
                ]
            }
        ])
}

// Functions for removing employees and departments
async function getRemoveInfo() {
    const employees= await getEmployeeNames();
    const departments= await getDepartmentId();
    return inquirer
    .prompt([
        {
            type: "list",
            message: "Which employee do you want to remove?",
            name: "employeeName",
            choices: [
                ...employees
            ]
        },
        {
            type: "list",
            message: "Which department do you want to remove?",
            name: "departmentName",
            choices: [
                ...departments
            ]
        }
    ])
}

// Function for adding new dept
async function getDepartmentInfo() {
    return inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
        }
    ])
}

// Function for adding new role
async function getRoleInfo() {
    const departments = await getDepartmentNames();
    return inquirer
    .prompt([
        {
            type: "input",
            message: "What is the title of the new role?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary of the new role?",
            name: "salary"
        },
        {
            type: "list",
            message: "Which department uses this role?",
            name: "departmentName",
            choices: [
                ...departments
            ]
        }
    ])
}

// Functions for updating employees and roles
async function getUpdateInfo() {
    const employees = await getEmployeeNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to update?",
                name: "employeeName",
                choices: [
                    ...employees
                ]
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "role",
                choices: [
                    ...roles
                ]
            }
        ])

}

async function main() {
    let exitLoop = false;
    while(!exitLoop) {
        const prompt = await mainPrompt();

        switch(prompt.action) {
            case 'Add department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break;
            }

            case 'Remove department': {
                const department = await getRemoveInfo();
                await removeDepartment(department);
                break;
            }

            case 'Add employee': {
                const newEmployee = await getAddInfo();
                console.log("add an employee");
                console.log(newEmployee);
                await addEmployee(newEmployee);
                break;
            }

            case 'Add role': {
                const newRole = await getRoleInfo();
                console.log("add a role");
                await addRole(newRole);
                break;
            }

            case 'Remove employee': {
                const employee = await getRemoveInfo();
                await removeEmployee(employee);
                break;
            }
            
            case 'Update employee role': {
                const employee = await getUpdateInfo();
                await updateEmployeeRole(employee);
                break;
            }

            case 'View all departments': {
                await viewAllDepartments();
                break;
            }

            case 'View all employees': {
                await viewAllEmployees();
                break;
            }

            case 'View all employees by department': {
                await viewAllByDept();
                break;
            }

            case 'View all roles': {
                await viewAllRoles();
                break;
            }

            case 'Exit': {
                exitLoop = true;
                process.exit(0); 
                return;
            }
            default:
                console.log(`Error. Action was ${prompt.action}`);
        }
    }
}

// Close db when exiting Node
process.on("exit", async function(code) {
    await db.close();
    return console.log(`Exiting with code ${code}`);
});

main();