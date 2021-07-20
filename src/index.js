const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require("neo4j-driver");
const { ApolloServer } = require("apollo-server");
const typeDefs = require('./graphql-schema');
const dotenv = require('dotenv');

dotenv.config();

const driver = neo4j.driver(
    process.env.AURA_ENDPOINT, 
    neo4j.auth.basic(process.env.AURA_USERNAME, process.env.AURA_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({
    schema: neoSchema.schema, 
    context: ({ req }) => ({ req }),
});

server.listen().then(({ url }) => console.log(`🚀 Server is running at ${url}`));