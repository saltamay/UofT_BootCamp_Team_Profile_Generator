const EmployeeProfile = require('./EmployeeProfile');

class InternProfile extends EmployeeProfile {

    constructor(intern) {
        super(intern);
        this.school = intern.school;
        this.setProfile();
    }
}

module.exports = InternProfile;