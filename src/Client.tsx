import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

const authLink = (token) =>
  setContext((_, { headers }: any) => {
    return {
      headers: {
        ...headers,
        authorization: token && `Bearer ${token}`,
      },
    };
  });

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_HTTP_LINK_GRAPHQL,
});

const link = (token) => (token ? authLink(token).concat(httpLink) : httpLink);

const cache = new InMemoryCache();

const Client = ({ token }) => {
  return new ApolloClient({
    link: link(token),

    cache: cache,
  });
};

export default Client;
