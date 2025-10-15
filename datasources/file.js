const employees = require('../data/employees.json');
const { DataSource } = require('apollo-datasource');

class EmployeeService extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {}

    getEmployees() {
        return employees;
    }

    getEmployeeById(id) {
        return employees.find((employee) => employee.id === parseInt(id));
    }
}

module.exports = EmployeeService;
