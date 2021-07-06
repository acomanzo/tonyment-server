const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require("neo4j-driver");
const { ApolloServer } = require("apollo-server");
const typeDefs = require('./graphql-schema');

const driver = neo4j.driver(
    "bolt://localhost:7687", 
    neo4j.auth.basic("neo4j", "letmein")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({
    schema: neoSchema.schema, 
    context: ({ req }) => ({ req }),
});

server.listen().then(({ url }) => console.log(`🚀 Server is running at ${url}`));