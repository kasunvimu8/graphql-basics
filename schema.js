export const typeDefs = `#graphql
    type Review {
        id: ID!
        rating: Int!
        content: String!
        author: Author!
        game: Game! 
    }
    type Game {
        id : ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    # Entry point of GQL
    type Query {
        games : [Game]
        reviews : [Review]
        authors : [Author]
        review (id : ID!) : Review
        game (id : ID!) : Game
        author (id : ID!) : Author
    }

    # to update delete add operations in GQL
    type Mutation {
        deleteGame (id : ID!) : [Game]
        addGame(game : gameInput!) : Game
        updateGame (id : ID!, edits : editGameInput) : Game
    }

    # This is the input type for new game
    input gameInput {
        title : String!,
        platform : [String!]!
    }
    # This is the input type for update game !!! check for the required properties
    input editGameInput {
        title : String,
        platform : [String!]
    }
`;
