class EmployeeProfile {

    constructor(employee) {
        this.id = employee.id;
        this.name = employee.name;
        this.email = employee.email;
    }

    setProfilePicture() {
        return Math.floor(Math.random() * 9) + 1;
    }

    createProfile() {
        return this.html;
    }
}

module.exports = EmployeeProfile;