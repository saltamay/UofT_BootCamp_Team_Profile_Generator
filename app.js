const fs = require('fs');
const http = require('http');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const ManagerProfile = require('./templates/ManagerProfile');
const EngineerProfile = require('./templates/EngineerProfile');
const InternProfile = require('./templates/InternProfile');
const TeamRoster = require('./templates/TeamRoster');

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
                const manager = new Manager(name, id, email, employeeInfo.officeNumber);
                employee = manager;
                break;
            case 'engineer':
                const engineer = new Engineer(name, id, email, employeeInfo.github);
                employee = engineer;
                break;
            case 'intern':
                const intern = new Intern(name, id, email, employeeInfo.school);
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

    createTeamRoster() {

        let managerProfile = '';
        let engineers = '';
        let interns = '';

        if (this.db.manager) {
            managerProfile = new ManagerProfile(this.db.manager);
            managerProfile = managerProfile.createProfile();
        }

        if (this.db.engineers) {
            for (const engineer of this.db.engineers) {
                let engineerProfile = new EngineerProfile(engineer);
                engineerProfile = engineerProfile.createProfile();

                engineers += engineerProfile;
            }
        }

        if (this.db.interns) {
            for (const intern of this.db.interns) {
                let internProfile = new InternProfile(intern);
                internProfile = internProfile.createProfile();

                engineers += internProfile;
            }
        }

        const team = managerProfile + engineers + interns;

        let teamRoster = new TeamRoster(team);
        teamRoster = teamRoster.createTeamRoster();

        return teamRoster;
    }

    createServer(teamRoster) {

        fs.writeFile('./public/team.html', teamRoster, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });


        http.createServer(function (req, res) {
            fs.readFile('./public/team.html', function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            });

        }).listen(8080);
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

        const teamRoster = this.createTeamRoster();

        this.createServer(teamRoster);
    }
}

const app = new App();

app.init();