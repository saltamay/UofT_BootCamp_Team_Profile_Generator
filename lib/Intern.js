const Employee = require('./Employee');

class Intern extends Employee {
    constructor(id, name, email, school) {
        super(id, name, email);
        this.title = 'Intern';
        this.school = school;
    }

    getRole() {
        return this.title;
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;