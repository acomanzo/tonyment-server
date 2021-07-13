const resolvers = {
    Mutation: {
        seedBracket: (parent, args, context, info) => {
            console.log(context);
            return "hi";
        }
    }
};

module.exports = {
    resolvers,
}