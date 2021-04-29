import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import schema from './schema';

const server = express()


server.get('/',(req,res)=>{
    res.send("GraphQl is up and running");
});




const root ={hello:()=>"Hello world"};


server.use('/gql', graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true,

}));


server.listen(8080,()=>
    console.log("Server is running on port 8080,cheers!")
);
