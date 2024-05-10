import { httpClient } from '@/utils/request';

// import { getBindingIdentifiers } from '@babel/types';
import { QueryFunctionContext } from '@tanstack/react-query';

// import keys = getBindingIdentifiers.keys;

export const queryBuilder = (url: string, config: { [keys: string]: any }): string => {
  if (Object.keys(config).length === 0) return url;

  const queryString = Object.entries(config)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `${url}?${queryString}`;
};

export const queryFn = async (context: QueryFunctionContext, params: object) => {
  const { queryKey, signal } = context;
  const url = queryBuilder(queryKey[1] as string, params);

  try {
    const { data } = await httpClient({
      method: queryKey[0] as string,
      url,
      signal,
    });
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
