const { ApolloServer, gql } = require('apollo-server');

const port = process.env.PORT || 3005;

const typeDefs = gql`
    type Query {
        employees: [Employee]
    }
    type Employee {
        id: ID!
        firstName: String
        lastName: String
        designation: String
        department: String
        nearestCity: String
    }
`;

const resolvers = {
    Query: {
        employees: () => {
            return [
                {
                    firstName: 'Kamal',
                },
            ];
        },
    },
};

const gqlServer = new ApolloServer({ typeDefs, resolvers });

gqlServer.listen({ port }).then(({ url }) => console.log(`gql server running on ${url}`));
