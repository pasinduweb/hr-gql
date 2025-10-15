const { ApolloServer, gql } = require('apollo-server');
const EmployeeService = require('./datasources/file');

const port = process.env.PORT || 3005;

const typeDefs = gql`
    type Query {
        employees: [Employee]
        findEmployeeById(id: ID): Employee
    }
    type Employee {
        id: ID!
        firstName: String
        lastName: String
        designation: String
        department: String @deprecated(reason: "company has changed the structure")
        nearestCity: String
    }
`;

const dataSources = () => ({
    employeeService: new EmployeeService(),
});

const resolvers = {
    Query: {
        employees: (parent, args, { dataSources }, info) => {
            return dataSources.employeeService.getEmployees();
        },
        findEmployeeById: (parent, { id }, { dataSources }, info) => {
            return dataSources.employeeService.getEmployeeById(id);
        },
    },
};

const gqlServer = new ApolloServer({ typeDefs, resolvers, dataSources });

gqlServer.listen({ port }).then(({ url }) => console.log(`gql server running on ${url}`));
