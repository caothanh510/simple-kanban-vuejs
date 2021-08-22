module.exports = {
  env: {
    serve: {
      presets: ["@vue/app"],
      plugins: [
        ["import", { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }],
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
      ]
    }
  }
};


