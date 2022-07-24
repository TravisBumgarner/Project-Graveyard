import { gql } from 'apollo-server'
import { getConnection, getManager } from "typeorm"

const queryTypeDefs = gql`
  type Query {
    rooms: [RoomRoom]
  }
`;

const queryResolvers = {
  rooms: async () => {
    return ['a', 'b', 'c']
  },
};

export {
  queryResolvers,
  queryTypeDefs
}