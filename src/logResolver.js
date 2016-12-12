import Logger from './logger';

const GraphQLLogger = Logger('graphql');

export function logResolverMessage(level, metadata) {
  return GraphQLLogger[level](JSON.stringify(metadata));
}

export default function logResolver(args: Array<any>): void {
  if (args.length < 4) {
    return;
  }

  const funcArgs = args[1];
  const resolverData = args[3];
  const resolverName = resolverData && resolverData.fieldName;

  return logResolverMessage('trace', {
    resolver: resolverName,
    args: funcArgs,
  });
}
