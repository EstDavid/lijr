const { gql } = require('@apollo/server');
const types = require('./types.gql');

// The reason to write the types in a separate .gql file is to get gql syntax highlighting
// This method in inspired in this stackoverflow answer: https://stackoverflow.com/a/49972332

const typeDefs = `${types}`;

module.exports = typeDefs;