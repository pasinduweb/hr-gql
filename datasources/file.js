const employees = require('../data/employees.json');
const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

class EmployeeService extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {}

    getEmployees(args) {
        return _.filter(employees, args);
    }

    getEmployeeById(id) {
        return employees.find((employee) => employee.id === parseInt(id));
    }
}

module.exports = EmployeeService;
