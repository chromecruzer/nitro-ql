import { defineEventHandler } from 'h3';

// Define your event handler using defineEventHandler
const eventHandler = defineEventHandler((event) => {
  const { req } = event.node; // Extract the request object from the event

  // Logging request method
  console.log('Request Method:', req.method);

  // Getting user's IP address
  const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('User IP:', userIP);

  // Return response based on request method
  if (req.method === 'GET') {
    return ` <h3>Hello, welcome to Nitro-ql!</h3>
      <p>Go to <a href="/graphql">/graphql</a></p>`;
  } else {
    return "Method not allowed";
  }
});

export default eventHandler;


// import { defineEventHandler } from 'h3';

// // Define your event handler using defineEventHandler
// const eventHandler = defineEventHandler(async (event) => {
//   const { req } = event.node; // Extract the request object from the event

//   // Parsing URL parameters (query)
//   const urlParams = new URLSearchParams(req.url.split('?')[1]);
//   const queryParams = Object.fromEntries(urlParams.entries());

//   console.log('URL Params:', queryParams);

//   // Access specific query parameters
//   const { q } = queryParams; // Example: Accessing 'q' parameter

//   if (q) {
//     return `Query parameter 'q' is: ${q}`;
//   } else {
//     return 'No query parameter found';
//   }
// });

// export default eventHandler;
