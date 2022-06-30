import { cacheExchange } from "@urql/exchange-graphcache";
import { Client, dedupExchange, fetchExchange } from "urql";

export const BASE_URL = "https://portal-cms.ieee-mint.org";

const cache = cacheExchange({
  keys: {
    ScholarshipEntityResponse: () => null,
    ScholarshipEntityResponseCollection: () => null,
    Scholarship: () => null,
    UploadFileEntityResponse: () => null,
    UploadFile: () => null,
    OrganizationEntityResponse: () => null,
    OrganizationEntityResponseCollection: () => null,
    Organization: () => null,
  },
});

export const client = new Client({
  url: `${BASE_URL}/graphql`,
  exchanges: [dedupExchange, cache, fetchExchange],
});
