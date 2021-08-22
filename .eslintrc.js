module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["import", "vue"],
  extends: ["plugin:vue/essential", "plugin:vue/recommended", "plugin:prettier/recommended", "@vue/prettier"],
  rules: {
    "no-unused-vars": "warn",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  parserOptions: {
    "parser": 'babel-eslint',
    "ecmaFeatures": {
      "legacyDecorators": true
    },
    "ecmaVersion": 6,
    "sourceType": "module"
  },
}
