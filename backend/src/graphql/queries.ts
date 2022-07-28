import { gql } from 'apollo-server'
import { createQueryBuilder, getConnection } from 'typeorm'
import { TEntry, TMetric } from '../../../shared'

import entity from '../postgres'

const queryTypeDefs = gql`
  type Query {
    metric: [Metric]
    entry(date: String): [Entry]
  }
`

const metric = () => {
    return getConnection()
        .getRepository(entity.Metric)
        .createQueryBuilder('metric')
        .getMany()
}

type EntryArgs = {
    date?: string
}
const entry = (parent, { date }: EntryArgs) => {
    const query = getConnection()
        .getRepository(entity.Entry)
        .createQueryBuilder('entry')

    if (date) query.andWhere('entry.date = :date', { date })

    return query.getMany()
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

const Entry = {
    metric: async (parent: TEntry) => {
        const result = await createQueryBuilder('entry', 'e') //eslint-disable-line
            .innerJoinAndSelect('e.metric', 'm')
            .where('e.id = :id', { id: parent.id })
            .getOne() as unknown as {metric: TMetric}
        return result.metric
    }
}

const queryResolvers = {
    metric,
    entry,
}

export {
    queryResolvers,
    queryTypeDefs,
    Metric,
    Entry
}
