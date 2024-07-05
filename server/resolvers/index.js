// server/resolvers/index.js
import { queryResolvers } from './queryResolvers';
import { mutationResolvers } from './mutationResolvers';

export const resolvers = {
  ...queryResolvers,
  ...mutationResolvers,
};
