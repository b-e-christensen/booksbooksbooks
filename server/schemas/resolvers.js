const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { user = null, params }) => {
            return User.findOne({ $or: [{ _id: user ? user._id : params.id }, { username: params.username }], })
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },

          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
          },

          saveBook: async (parent, { body }, context) => {
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
              );
          },

          deleteBook: async (parent, { bookId }, context) => {
              if(context.user){
              return User.findOneAndUpdate(
                { _id: context.user._id },
                { 
                    $pull: { 
                        savedBooks: { 
                            _id: bookId },
                        },
                    },
                { new: true }
              );
            }
          },
    },
}

module.exports = resolvers;