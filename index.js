const { readFileSync } = require("fs");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");
const { buildSubgraphSchema } = require("@apollo/subgraph");
require("dotenv").config();
const typeDefs = gql(readFileSync("./tours.graphql", { encoding: "utf-8" }));
const resolvers = require("./resolvers");
const { permissions } = require("./permissions");
// Api
const TourAPI = require("./datasources/TourApi");
const OrderAPI = require("./datasources/OrderApi");

const server = new ApolloServer({
  schema: applyMiddleware(buildSubgraphSchema({ typeDefs, resolvers }), permissions),
  context: ({ req }) => {
    const user = req.headers.auth ? JSON.parse(req.headers.auth) : null;
    const dataSources = {
      tourAPI: new TourAPI(),
      orderAPI: new OrderAPI(),
    };
    return { user, dataSources };
  },
});

const subgraphName = "tours";

server
  .listen({ port: process.env.PORT || 4002 })
  .then(({ url }) => {
    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
