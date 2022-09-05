const { and, or, allow, rule, shield } = require("graphql-shield");

function getPermissions(user) {
  if (user && user.data) {
    return user.data.permissions;
  }
  return [];
}

const canCreateAny = rule()((_, __, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("create:any");
});

const canUpdateAny = rule()((_, __, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("update:any");
});

const canDeleteAny = rule()((_, __, { user }) => {
  const userPermissions = getPermissions(user);
  return userPermissions.includes("delete:any");
});

const permissions = shield(
  {
    Query: {
      tour: allow,
      tours: allow,
    },
    Mutation: {
      createTour: canCreateAny,
      updateTour: canUpdateAny,
      deleteTour: canDeleteAny,
    },
  },
  {
    debug: process.env.NODE_ENV === "developer" ? true : false,
    allowExternalErrors: process.env.NODE_ENV === "developer" ? true : false,
  }
);
module.exports = { permissions };
