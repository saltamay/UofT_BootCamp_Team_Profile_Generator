const EmployeeProfile = require('./EmployeeProfile');

class ManagerProfile extends EmployeeProfile {

    constructor(manager) {
        super(manager);
        this.officeNumber = manager.officeNumber;
        this.setProfile();
    }
}

module.exports = ManagerProfile;