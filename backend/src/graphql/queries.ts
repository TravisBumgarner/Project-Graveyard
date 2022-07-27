import { gql } from 'apollo-server'
import { getConnection } from 'typeorm'

import entity from '../postgres'

const queryTypeDefs = gql`
  type Query {
    metrics: [Metric]
  }
`

const metrics = () => {
    return getConnection()
        .getRepository(entity.Metric)
        .createQueryBuilder('metric')
        .getMany()
}

const entries = () => {
  return getConnection()
      .getRepository(entity.Entry)
      .createQueryBuilder('entry')
      .getMany()
}

const queryResolvers = {
    metrics,
    entries
}

export {
    queryResolvers,
    queryTypeDefs
}
