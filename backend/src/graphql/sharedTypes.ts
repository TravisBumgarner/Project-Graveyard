import { gql } from 'apollo-server'

const sharedTypeDefs = gql`
  type Metric {
    id: String!
    title: String!
  }
`;

export {
  sharedTypeDefs
}