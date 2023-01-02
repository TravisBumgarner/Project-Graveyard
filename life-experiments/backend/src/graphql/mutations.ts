import { gql } from 'apollo-server'
import { getConnection } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import entity from '../postgres'
import { TEntry, TMetric } from '../../../shared'

const mutationTypeDefs = gql`
  type Mutation {
    upsertMetric(title: String!, id: String!): String
    upsertEntry(id: String!, value: Float, date: String!, metricId: String!): String
  }
`

const upsertEntry = async (_: unknown, { date, value, metricId, id }: (TEntry & {metricId: TMetric['id']})) => {
    const metric = await getConnection()
        .getRepository(entity.Metric)
        .createQueryBuilder('metric')
        .andWhere('metric.id = :metricId', { metricId })
        .getOne()

    if (!metric) {
        throw new Error('Could not find metric by id')
    }

    const upsertedEntry = {
        id: id.length > 0 ? id : uuidv4(),
        date,
        value,
        metric
    }

    await getConnection()
        .getRepository(entity.Entry)
        .save(upsertedEntry)

    return upsertedEntry.id
}

const upsertMetric = async (_, { title, id }: TMetric) => {
    const upsertedMetric = {
        id: id.length > 0 ? id : uuidv4(),
        title
    }

    await getConnection()
        .getRepository(entity.Metric)
        .save(upsertedMetric)

    return upsertedMetric.id
}

const mutationResolvers = {
    upsertMetric,
    upsertEntry,
}

export {
    mutationTypeDefs,
    mutationResolvers
}
