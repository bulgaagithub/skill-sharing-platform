module.exports = {
  env: {
    NEXTAUTH_URL: "http://localhost:4000",
    SECRET:
      " # Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32",
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};
