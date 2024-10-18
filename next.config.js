module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
          pathname: "/u/**",
        },
      ],
    },
    webpack: (config, { isServer }) => {  
      config.module.rules.push({
        test: /nw-pre-gyp\/index\.html$/,
        loader: "null-loader",
      });
  
      return config;
    },
  };