import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import data from "./_db.js";

const port = "4000";

const resolvers = {
  Query: {
    games: () => {
      return data.games;
    },
    authors: () => {
      return data.authors;
    },
    reviews: () => {
      return data.reviews;
    },
    review(_, args, context) {
      return data.reviews.find((r) => r.id === args.id);
    },
    author(_, args, context) {
      return data.authors.find((a) => a.id === args.id);
    },
    game(_, args, context) {
      return data.games.find((g) => g.id === args.id);
    },
  },

  //   Mutation resolvers Which handle update add delete mutations
  Mutation: {
    deleteGame(_, args, context) {
      data.games = data.games.filter((g) => g.id !== args.id);
      return data.games;
    },
    addGame(_, args, context) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      data.games.push(game);

      return game;
    },
    updateGame(_, args) {
      data.games = data.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }
        return game;
      });

      return data.games.find(game => game.id === args.id);
    },
  },

  // These are to get nested properties and their relationships ( Kinds making the forign keys and relationships)
  Game: {
    reviews(parents, _1, _2) {
      return data.reviews.filter((r) => r.id === parents.id);
    },
  },

  Author: {
    reviews(parents) {
      return data.reviews.filter((r) => r.id === parents.id);
    },
  },

  Review: {
    author(parents) {
      return data.authors.find((a) => a.id === parents.author_id);
    },
    game(parents) {
      return data.games.find((g) => g.id === parents.game_id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});

console.log("Server is listening on : " + url + " port : " + port);
