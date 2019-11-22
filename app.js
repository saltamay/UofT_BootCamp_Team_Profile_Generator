const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

class App {
    constructor() {
        this.db = {
            manager: null,
            engineers: [], // Array of engineer object instances,
            interns: [], // Also array of intern object intances
        }
    }

    async getEmployeeInfo() {

        console.log(`\nPlease enter employee information:\n`);

        let employeeInfo =
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "ID: ",
                        name: "id"
                    },
                    {
                        type: "input",
                        message: "Name: ",
                        name: "name"
                    },
                    {
                        type: "input",
                        message: "Email: ",
                        name: "email"
                    },
                    {
                        type: "input",
                        message: "Title: ",
                        name: "title"
                    }
                ]);

        switch (employeeInfo.title.toLowerCase()) {
            case 'manager':
                employeeInfo = await this.getOfficeNumber(employeeInfo);
                break;
            case 'engineer':
                employeeInfo = await this.getGithubHandle(employeeInfo);
                break;
            case 'intern':
                employeeInfo = await this.getSchoolInfo(employeeInfo);
                break;
            default:
                break;

        }

        return employeeInfo;
    }

    async getOfficeNumber(employeeInfo) {
        const managerInfo =
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Office Number: ",
                        name: "officeNumber"
                    }
                ])

        employeeInfo.officeNumber = await managerInfo.officeNumber;

        return employeeInfo;
    }

    async getGithubHandle(employeeInfo) {
        let engineerInfo =
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "GitHub handle: ",
                        name: "github"
                    }
                ]);

        employeeInfo.github = await engineerInfo.github;

        return employeeInfo;
    }

    async getSchoolInfo(employeeInfo) {
        let internInfo =
            await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "School: ",
                        name: "school"
                    }
                ]);

        employeeInfo.school = internInfo.school;

        return employeeInfo;
    }

    createEmployee(employeeInfo) {
        let employee;
        const { id, name, email } = employeeInfo;
        switch (employeeInfo.title.toLowerCase()) {
            case 'manager':
                const manager = new Manager(id, name, email, employeeInfo.officeNumber);
                employee = manager;
                break;
            case 'engineer':
                const engineer = new Engineer(id, name, email, employeeInfo.github);
                employee = engineer;
                break;
            case 'intern':
                const intern = new Intern(id, name, email, employeeInfo.school);
                employee = intern;
                break;
            default:
                break;
        }

        return employee;
    }

    saveEmployeeToDb(employee) {
        switch (employee.getRole().toLowerCase()) {
            case 'manager':
                this.db.manager = employee;
                break;
            case 'engineer':
                this.db.engineers.push(employee);
                break;
            case 'intern':
                this.db.interns.push(employee);
                break;
            default:
                break;
        }
    }

    async init() {

        let input = '';

        do {

            const employee = this.createEmployee(await this.getEmployeeInfo());

            this.saveEmployeeToDb(employee);

            input =
                await inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Type 'yes' if you wish to exit",
                            name: "exit"
                        }
                    ]);

        } while (!input.exit);

        console.log(this.db);
    }
}

const app = new App();

app.init();