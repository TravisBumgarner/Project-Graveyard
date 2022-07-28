import { gql } from 'apollo-server'
import { getConnection } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import entity from '../postgres'
import { TEntry, TMetric } from '../../../shared'

const mutationTypeDefs = gql`
  type Mutation {
    createMetric(title: String!): Metric
    createEntry(value: Float!, date: String!, metricId: String!): Entry
  }
`

const createEntry = async (_: unknown, { date, value, metricId }: Omit<TEntry, 'id'>) => {
    const metric = await getConnection()
        .getRepository(entity.Metric)
        .createQueryBuilder('metric')
        .andWhere('metric.id = :metricId', { metricId })
        .getOne()

    if (!metric) {
        throw new Error('Could not find metric by id')
    }

    const newEntry = {
        id: uuidv4(),
        date: new Date(date),
        value,
        metric
    }

    await getConnection()
        .getRepository(entity.Entry)
        .save(newEntry)

    return {
        ...newEntry,
        metricId: metric.id
    }
}

const createMetric = async (_, { title }: Omit<TMetric, 'id'>) => {
    const newMetric = new entity.Metric()
    newMetric.id = uuidv4()
    newMetric.title = title

    await getConnection()
        .getRepository(entity.Metric)
        .save(newMetric)

    return newMetric
}

const mutationResolvers = {
    createMetric,
    createEntry
}

export {
    mutationTypeDefs,
    mutationResolvers
}
