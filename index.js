const { ApolloServer, gql } = require('apollo-server');

const port = process.env.PORT || 3005;

const typeDefs = gql`
    type Query {
        employees: [Employee]
    }
    type Employee {
        id: ID!
        firstname: String
        lastName: String
        designation: String
        department: String
        nearestCity: String
    }
`;

const gqlServer = new ApolloServer({ typeDefs });

gqlServer.listen({ port }).then(({ url }) => console.log(`gql server running on ${url}`));
