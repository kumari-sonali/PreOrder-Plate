module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.fallback = {
          path: require.resolve("path-browserify"),
          fs: false,
          crypto: false,
          stream: false,
          buffer: false,
        };
        return webpackConfig;
      },
    },
  };