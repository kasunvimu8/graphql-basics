import { ApolloServer } from "@apollo/server";
import {startStanderloneServer} from "@apollo/server/standalone";

import {typeDefs} from "./schema.js";

const port = "4000"
const server = new ApolloServer({
    typeDefs,

});

const {url} = await startStanderloneServer(server, {
    listen: {port : port}
})

console.log("Server is listening on : "+ url +  " port : " + port);