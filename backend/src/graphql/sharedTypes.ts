import { gql } from 'apollo-server'

const sharedTypeDefs = gql`
  type Metric {
    id: String!
    title: String!
    entry: [Entry]
  }

  type Entry {
    id: String!
    value: Float!
    date: String!
    metric: Metric
  }
`

export {
    sharedTypeDefs
}
