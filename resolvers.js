const { GraphQLScalarType, Kind } = require("graphql");
const mongoose = require("mongoose");
const resolvers = {
  Query: {
    tour: async (_, { id }, { dataSources }) => {
      return await dataSources.tourAPI.getTourById(id);
    },
    tours: async (_, __, { dataSources }) => {
      return await dataSources.tourAPI.getAllTours();
    },
  },
  Tour: {
    __resolveReference: ({ id }, { dataSources }) => {
      return dataSources.tourAPI.getTourById(id);
    },
    active: async ({ id }, _, { dataSources, user }) => {
      if (!user) {
        return null;
      }
      const orderExist = await dataSources.orderAPI.getOrderByAccountIdAndTourId({ accountId: user.sub, tourId: id });
      return orderExist?.id || null;
    },
  },

  Mutation: {
    createTour: async (_, { tour }, { dataSources }) => {
      const newTour = await dataSources.tourAPI.createTour(tour);
      if (newTour) {
        return {
          code: 200,
          success: true,
          message: "Create tour success",
          tour: newTour,
        };
      }
      return {
        code: 400,
        success: false,
        message: "Create tour fail",
        tour: null,
      };
    },
    updateTour: async (_, { id, tour }, { dataSources }) => {
      const updatedTour = await dataSources.tourAPI.updateTour(id, tour);
      if (updatedTour) {
        return {
          code: 200,
          success: true,
          message: "Update tour success",
          tour: updatedTour,
        };
      }
      return {
        code: 400,
        success: false,
        message: "Create tour fail",
        tour: null,
      };
    },
    deleteTour: async (_, { id }, { dataSources }) => {
      const deleteTour = await dataSources.tourAPI.deleteTour(id);
      if (deleteTour) {
        return {
          code: 200,
          success: true,
          message: "Delete tour success",
          tour: deleteTour,
        };
      }
      return {
        code: 400,
        success: false,
        message: "Delete tour fail",
        tour: null,
      };
    },
  },
};

module.exports = resolvers;
