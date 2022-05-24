const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID!
        # could be wrong on this one. A preliminary glance at the docs has me believing this is the way.
        authors: [String!]!
        description: String!
        boodId: String!
        image: String!
        link: String!
        title: String!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        # again, could be very wrong on this one. 
        savedBooks: [Book]!
    }

    type Query {

    }

    type Mutation {

    }
`

module.exports = typeDefs;
