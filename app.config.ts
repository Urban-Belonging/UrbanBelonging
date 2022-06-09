export default ({ config }: { config: any }) => {
  return {
    ...config,
    extra: {
      ...(config.extra || {}),
      apiBaseUrl: process.env.API_BASE_URL || "https://urbanbelonging.app",
      sentryDsn: process.env.URBANBELONGING_SENTRY_DSN,
    },
  };
};
