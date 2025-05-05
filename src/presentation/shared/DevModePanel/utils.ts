import { ENABLED_SERVICE_NAME_HEADER } from "@dashboard/configs";
import { createFetch } from "@dashboard/graphql/client";
import { createGraphiQLFetcher, FetcherOpts } from "@graphiql/toolkit";

const authHeaders = ["Authorization", "Authorization-Bearer"];

const authorizedFetch = createFetch();

export const getFetcher = (opts: FetcherOpts) => {
  let httpFetch = authorizedFetch;

  const hasAuthorizationHeaders =
    opts.headers &&
    authHeaders.some(header => opts.headers![header] || opts.headers![header.toLowerCase()]);

  if (hasAuthorizationHeaders) {
    httpFetch = fetch;
  }

  const headers: Record<string, string> = {};

  if (ENABLED_SERVICE_NAME_HEADER) {
    headers["source-service-name"] = "saleor.dashboard.playground";
  }

  return createGraphiQLFetcher({
    url: process.env.API_URL as string,
    fetch: httpFetch as typeof fetch,
    headers,
  });
};
