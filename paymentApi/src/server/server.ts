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



