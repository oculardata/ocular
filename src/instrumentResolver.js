// @flow
import logResolver, { logResolverMessage } from './logResolver';

export default function instrumentResolver(func: Function, resolverArgs: Array<any>): void {
  logResolver(resolverArgs);
  const startTime = new Date().getTime();

  /**
   * This is the array of arguments passed into the implementer of the resolver.
   */
  const funcArgs = resolverArgs[1];

  /**
   * This is metadata regarding the graphql resolver.
   */
  const resolverData = resolverArgs[3];
  const resolverName = resolverData && resolverData.fieldName;

  return func.apply().then((retval) => {
    const elapsedTime = new Date().getTime() - startTime;

    logResolverMessage('trace', {
      resolver: resolverName,
      args: funcArgs,
      elapsedTime,
    });

    return retval;
  }).catch((err) => {
    const elapsedTime = new Date().getTime() - startTime;

    logResolverMessage('error', {
      resolver: resolverName,
      args: funcArgs,
      elapsedTime,
      error: err.message,
      errored: true,
    });

    return Promise.reject(err);
  });
}
