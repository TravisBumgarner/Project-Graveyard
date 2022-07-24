import { gql } from 'apollo-server'
import { getConnection, getManager } from "typeorm"

import entity from '../postgres'


const queryTypeDefs = gql`
  type Query {
    metrics: [Metric]
  }
`;

const metrics = async () => {
  return await getConnection()
    .getRepository(entity.Metric)
    .createQueryBuilder('metric')
    .getMany()
}

const queryResolvers = {
  metrics
}

export {
  queryResolvers,
  queryTypeDefs
}