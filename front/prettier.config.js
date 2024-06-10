/** @type {import('prettier').Config} */
module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
  },
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
  tabWidth: 2,
  trailingComma: "all",
}
