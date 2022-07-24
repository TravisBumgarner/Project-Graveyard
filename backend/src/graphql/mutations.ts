import { gql } from 'apollo-server'

const mutationTypeDefs = gql`
  type Mutation {
    paintEvent(color: String!, pixelIndex: Int!, room: String!): Pixel
  }
`;

const mutationResolvers = {
    paintEvent: async (_, { color, pixelIndex, room }) => {
        return { color: 'red', pixelIndex: 0, room: 'abc' }
    },
};

export {
    mutationTypeDefs,
    mutationResolvers
}