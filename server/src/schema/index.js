import { SchemaComposer } from 'graphql-compose';

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { WarningQuery, WarningMutation } from './warning';

schemaComposer.Query.addFields({
  ...UserQuery,
  ...WarningQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...WarningMutation,
});

export default schemaComposer.buildSchema();
