export default () => ({
  microservices: {
    service: {
      port: process.env.SERVICE_MICROSERVICE_PORT,
      host: process.env.SERVICE_MICROSERVICE_HOST,
    },
  },
  http_port: process.env.HTTP_PORT ?? '8000',
  http_port2: process.env.HTTP_PORT2 ?? '8001',
  swagger: {
    auth: {
      authorization: { url: process.env.SWAGGER_AUTH_AUTHORIZATION_URL },
      token: { url: process.env.SWAGGER_AUTH_TOKEN_URL },
      client_id: process.env.SWAGGER_AUTH_CLIENT_ID,
    },
  },
});
