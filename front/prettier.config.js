/** @type {import('prettier').Config} */
module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
  },
  plugins: ['prettier-plugin-tailwindcss'],
  semi: false,
  printWidth: 90,
  tabWidth: 2,
  trailingComma: "all",
}
