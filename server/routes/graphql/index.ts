// import { createSchema, createYoga, createPubSub } from 'graphql-yoga';
// import { defineEventHandler } from 'h3';
// import { Request } from '@whatwg-node/fetch';

// // subscriptions 
// // const pubSub = createPubSub<{
// //   newMessage: [payload: {from: string, body: string}]
// // }>()

// // Define your GraphQL schema
// export const schema = createSchema({
//   typeDefs: /* GraphQL */ `
//     type Query {
//       hello: String
//     }
//       type Mutation {
//       create: String
//       }
//   `,
//   resolvers: {
//     Query: {
//       hello: () => 'world'
//     },
//     Mutation: {
//       create: () => `mutation is working nigga`
//     }
//   }
// });

// // Create a Yoga instance with the GraphQL schema
// const yoga = createYoga({
//   graphqlEndpoint: '/graphql',
//   schema,
//   // context: {
//   //   pubSub,
//   // }
// });

// // Define your event handler using defineEventHandler
// const eventHandler = defineEventHandler(async (event) => {
//   // Create a Request object compatible with GraphQL Yoga
//   const request = new Request(event.node.req.url!, {
//     method: event.node.req.method,
//     headers: event.node.req.headers as any,
//     body: event.node.req.method !== 'GET' && event.node.req.method !== 'HEAD' ? event.node.req : undefined
//   });

//   // Use the Yoga handler to process the request
//   const response = await yoga.handleRequest(request);

//   // Convert the Yoga Response to a format compatible with H3
//   event.node.res.statusCode = response.status;
//   response.headers.forEach((value, name) => {
//     event.node.res.setHeader(name, value);
//   });
//   event.node.res.end(await response.text());
// });

// export default eventHandler;

//////////////////////////////////////////////////////

// server/index.js
import { createSchema, createYoga } from 'graphql-yoga';
// server/schema/index.js
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync('./server/schema/typeDefs', { extensions: ['gql', 'graphql'] });
export const typeDefs = mergeTypeDefs(typesArray);
import { defineEventHandler } from 'h3';
import { Request } from '@whatwg-node/fetch';
import { queryResolvers } from '../../resolvers/queryResolvers';
import { mutationResolvers } from '../../resolvers/mutationResolvers';  

const resolvers = {
  ...queryResolvers,
  ...mutationResolvers,
};

// Define your GraphQL schema
const schema = createSchema({ 
  typeDefs,
  resolvers,
});

// Create a Yoga instance with the GraphQL schema
const yoga = createYoga({
  graphqlEndpoint: '/graphql',
  schema,
});

// Define your event handler using defineEventHandler
const eventHandler = defineEventHandler(async (event) => {
  // Create a Request object compatible with GraphQL Yoga
  const request = new Request(event.node.req.url!, {
    method: event.node.req.method,
    headers: event.node.req.headers as any,
    body: event.node.req.method !== 'GET' && event.node.req.method !== 'HEAD' ? event.node.req : undefined,
  });

  // Use the Yoga handler to process the request
  const response = await yoga.handleRequest(request);

  // Convert the Yoga Response to a format compatible with H3
  event.node.res.statusCode = response.status;
  response.headers.forEach((value, name) => {
    event.node.res.setHeader(name, value);
  });
  event.node.res.end(await response.text());
});

export default eventHandler;
 