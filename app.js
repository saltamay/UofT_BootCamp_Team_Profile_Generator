const inquirer = require('inquirer');

class App {
    constructor() {
        this.data = {
            manager: {
                id: null,
                email: null,
                officeNumber: null,
            },
            engineers: [], // Array of engineer object instances,
            interns: [], // Also array of intern object intances
        }
    }

    getEmployeeInfo() {

        console.log(`\nPlease enter employee information:\n`);
        // let employeeInfo =
        inquirer
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
            ])
            .then(employeeInfo => {

                switch (employeeInfo.title.toLowerCase()) {
                    case 'manager':
                        this.getOfficeNumber(employeeInfo);
                        break;
                    case 'engineer':
                        this.getGithubHandle(employeeInfo);
                        break;
                    case 'intern':
                        this.getSchoolInfo(employeeInfo);
                        break;
                    default:
                        break;
                }
            })

    }

    getOfficeNumber(managerInfo) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Office Number: ",
                    name: "officeNumber"
                }
            ])
            .then(input => {
                managerInfo.officeNumber = input.officeNumber;
                return managerInfo;
            })
            .then(managerInfo => {
                console.log(managerInfo)
                return managerInfo;
            })
    }

    getGithubHandle(engineerInfo) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "GitHub handle: ",
                    name: "github"
                }
            ])
            .then(input => {
                engineerInfo.github = input.github;
                return engineerInfo;
            })
            .then(engineerInfo => {
                console.log(engineerInfo)
                return engineerInfo;
            })
    }

    getSchoolInfo(internInfo) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "School: ",
                    name: "school"
                }
            ])
            .then(input => {
                internInfo.school = input.school;
                return internInfo;
            })
            .then(internInfo => {
                console.log(internInfo)
                return internInfo;
            })
    }
}

const app = new App();

app.getEmployeeInfo()