/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "clarity-ethsg",
      removal: input.stage === "PROD" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "ap-southeast-1",
          profile: "school",
        },
      },
    };
  },
  async run() {
    const clarityApi = await import("./infra/clarity/api");
    const clarityFrontend = await import("./infra/clarity/frontend");
    const merchantApi = await import("./infra/merchant/api");
    const merchantFrontend = await import("./infra/merchant/frontend");

    return {
      clarityBackendUrl: clarityApi.api.url,
      merchantBackendUrl: merchantApi.api.url,
    };
  },
  console: {
    autodeploy: {
      target(event) {
        if (event.type === "branch" && event.branch === "main" && event.action === "pushed") {
          return {
            stage: "DEV",
          };
        }
      },
    },
  },
});
