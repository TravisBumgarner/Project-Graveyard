import { gql } from 'apollo-server'
import { getConnection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import entity from '../postgres'

const mutationTypeDefs = gql`
  type Mutation {
    createMetric(title: String!): Metric
  }
`;

const createMetric = async (_, { title }) => {
  const id = uuidv4()

  await getConnection()
    .getRepository(entity.Metric)
    .save({
      id,
      title
    })

  return { id, title }
}

const mutationResolvers = {
  createMetric
}

export {
  mutationTypeDefs,
  mutationResolvers
}