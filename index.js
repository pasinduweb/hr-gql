const { ApolloServer, gql } = require('apollo-server');
const EmployeeService = require('./datasources/file');
const ProjectService = require('./datasources/project');

const typeDefs = gql`
    type Query {
        employees(
            id: ID
            firstName: String
            lastName: String
            designation: String
            department: String
            nearestCity: String
        ): [Employee]
        findEmployeeById(id: ID): Employee
        projects: [Project]
        findProjectById(id: ID): Project
    }
    type Employee {
        id: ID!
        firstName: String
        lastName: String
        designation: String
        department: String @deprecated(reason: "company has changed the structure")
        nearestCity: String
        projects: [Project]
    }
    type Project {
        id: ID!
        projectName: String
        startDate: String
        client: String
        employees: [Int]
    }
`;

const dataSources = () => ({
    employeeService: new EmployeeService(),
    projectService: new ProjectService(),
});

const resolvers = {
    Query: {
        employees: (parent, args, { dataSources }, info) => {
            return dataSources.employeeService.getEmployees(args);
        },
        findEmployeeById: (parent, { id }, { dataSources }, info) => {
            return dataSources.employeeService.getEmployeeById(id);
        },
        projects: (parent, args, { dataSources }, info) => {
            return dataSources.projectService.getProjects();
        },
        findProjectById: (parent, { id }, { dataSources }, info) => {
            return dataSources.projectService.findProjectById(id);
        },
    },
    Employee: {
        async projects(employee, args, { dataSources }, info) {
            let projects = await dataSources.projectService.getProjects();
            let workingProjects = projects.filter((project) => {
                return project.employees.includes(employee.id);
            });
            return workingProjects;
        },
    },
};

const gqlServer = new ApolloServer({ typeDefs, resolvers, dataSources });

const port = process.env.PORT || 3005;

gqlServer.listen({ port }).then(({ url }) => console.log(`gql server running on ${url}`));
