const EmployeeProfile = require('./EmployeeProfile');

class EngineerProfile extends EmployeeProfile {

    constructor(engineer) {
        super(engineer);
        this.github = engineer.github
        this.setProfile();
    }
}

module.exports = EngineerProfile;