import { gql } from 'apollo-server'
import { getConnection, getManager } from "typeorm"

const queryTypeDefs = gql`
  type Query {
    metrics: [Metric]
  }
`;

const queryResolvers = {
  metrics: async () => {
    return [{
      id: 'foo',
      title: 'bar'
    }]
  },
};

export {
  queryResolvers,
  queryTypeDefs
}