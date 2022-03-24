const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require('path')

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "alexmickelson",
    projectName: "blog",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    output: {
      path: path.resolve('./dist/serve/blog'),
      publicPath: '/serve/blog',
    }
  });
};
