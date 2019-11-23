const EmployeeProfile = require('./EmployeeProfile');

class InternProfile extends EmployeeProfile {

    constructor(intern) {
        super(intern);
        this.school = intern.school;

        this.html =
            `<div class="col col-md-6 col-lg-6 col-xl-4">
            <div class="card">
            <div class="badge badge-info mt-3 p-3">
            <span class="employee-title">Intern</span>
            </div>
            <img src="./img/employee${this.setProfilePicture()}.svg" class="card-img-top mt-5 img-fluid rounded mx-auto d-block"
                alt="Employee Image" style="width: 50%;">
            <div class="card-body">
            <h3 class="card-title">${this.name}</h3>
            <h5 class="card-subtitle">Intern</h5>
            <ul class="card-text list-group">
            <li class="list-group-item"><span class="font-weight-bold">ID:</span> ${this.id}</li>
            <li class="list-group-item"><span class="font-weight-bold">Email:</span> ${this.email}</li>
            <li class="list-group-item"><span class="font-weight-bold">School: </span> ${this.school}</li>
            </ul>
            <a href="#" class="mt-3 btn btn-info btn-block">Contact</a>
            </div>
            </div>
            </div>
            `;
    }
}

module.exports = InternProfile;