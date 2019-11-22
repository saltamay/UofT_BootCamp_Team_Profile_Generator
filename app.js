const inquirer = require('inquirer');

class App {
    constructor() {
        this.db = {
            manager: {
                id: null,
                email: null,
                officeNumber: null,
            },
            engineers: [], // Array of engineer object instances,
            interns: [], // Also array of intern object intances
        }
    }

    async getEmployeeInfo() {

        console.log(`\nPlease enter employee information:\n`);
        // let employeeInfo =
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

    saveEmployeeToDb(employeeInfo) {
        switch (employeeInfo.title.toLowerCase()) {
            case 'manager':
                this.db.manager = { ...employeeInfo }
                break;
            case 'engineer':
                this.db.engineers.push(employeeInfo);
            case 'intern':
                this.db.interns.push(employeeInfo);
            default:
                break;
        }
    }

    async init() {

        this.saveEmployeeToDb(await this.getEmployeeInfo());

        console.log(this.db);
    }
}

const app = new App();

app.init();