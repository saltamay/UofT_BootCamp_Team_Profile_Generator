const Employee = require('./Employee');

class Manager extends Employee {
    constructor(id, name, email, officeNumber) {

        super(id, name, email);

        this.title = 'Manager';
        this.officeNumber = officeNumber;

    }

    getRole() {
        return this.title;
    }

    getOfficeNumber = () => {
        return this.officeNumber;
    }
}

module.exports = Manager;