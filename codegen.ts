import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [process.env.CONTENTFUL_GRAPHQL_ENDPOINT!]: {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_API_TOKEN}`,
      },
    },
  },
  documents: "src/**/*.tsx",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
