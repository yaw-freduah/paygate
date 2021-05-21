import {ApolloServer} from 'apollo-server'
import {typeDefs} from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(8080).then(({url})=>{
    console.log(`Server is running at ${url}, cheers!`);
});

// server.get('/',(req,res)=>{
//     res.send("GraphQl is up and running");
// });




// const root = resolvers ;


// server.use('/gql', graphqlHTTP({
//     schema:schema,
//     rootValue:root,
//     graphiql:true,

// }));



