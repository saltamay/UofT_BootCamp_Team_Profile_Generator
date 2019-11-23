class EmployeeProfile {

    constructor(employee) {
        this.id = employee.id;
        this.name = employee.name;
        this.email = employee.email;
        this.title = employee.getRole();

        this.html;
    }

    setProfile() {

        this.html =
            `<div class="col col-md-6 col-lg-6 col-xl-4">
            <div class="card">
            <div class="badge badge-info mt-3 p-3">
            <span class="employee-title">${this.title}</span>
            </div>
            `;

        if (this.title.toLowerCase() === 'manager') {
            this.html += `<img src="./img/manager.svg" class="card-img-top mt-5 img-fluid rounded mx-auto d-block"
                    alt="Employee Image" style="width: 50%;">`;
        } else {
            this.html += `<img src="./img/employee${this.setProfilePicture()}.svg" class="card-img-top mt-5 img-fluid rounded mx-auto d-block"
                    alt="Employee Image" style="width: 50%;">`;
        }

        this.html +=
            `
            <div class="card-body">
            <h3 class="card-title">${this.name}</h3>
            <ul class="card-text list-group">
            <li class="list-group-item"><span class="font-weight-bold">ID:</span> ${this.id}</li>
            <li class="list-group-item"><span class="font-weight-bold">Email:</span> ${this.email}</li>
            `

        switch (this.title.toLowerCase()) {
            case 'manager':
                this.html += `<li class="list-group-item"><span class="font-weight-bold">Office Phone: </span>${this.officeNumber}</li>`;
                break;
            case 'engineer':
                this.html += `<li class="list-group-item"><span class="font-weight-bold">GitHub: </span>${this.github}</li>`;
                break;
            case 'intern':
                this.html += `<li class="list-group-item"><span class="font-weight-bold">School: </span>${this.school}</li > `;
                break;
            default:
                break;
        }

        this.html +=
            `
            </ul >
            <a href="#" class="mt-3 btn btn-info btn-block">Contact</a>
            </div >
            </div >
            </div >
            `;
    }

    setProfilePicture() {
        return Math.floor(Math.random() * 9) + 1;
    }

    createProfile() {
        return this.html;
    }
}

module.exports = EmployeeProfile;