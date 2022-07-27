import { gql } from 'apollo-server'
import { getConnection } from 'typeorm'
import { TMetric } from '../../../shared'

import entity from '../postgres'

const queryTypeDefs = gql`
  type Query {
    metric: [Metric]
    entry: [Entry]
  }
`

const metric = () => {
    return getConnection()
        .getRepository(entity.Metric)
        .createQueryBuilder('metric')
        .getMany()
}

const entry = () => {
    return getConnection()
        .getRepository(entity.Entry)
        .createQueryBuilder('entry')
        .getMany()
}

const Metric = {
    entry: (parent: TMetric) => {
        return getConnection()
            .getRepository(entity.Entry)
            .createQueryBuilder('entry')
            .andWhere('entry.metricId = :metricId', { metricId: parent.id })
            .getMany()
    }
}

const queryResolvers = {
    metric,
    entry,
}

export {
    queryResolvers,
    queryTypeDefs,
    Metric
}
