import { normalize, schema } from 'normalizr';

export const flattenJSON = (data) => {
  // TODO FEEDBACK
  const entity = new schema.Entity('results');

  const entityListSchema = new schema.Array(entity);

  const normalizedData = normalize(data, entityListSchema);
  return normalizedData;
};
