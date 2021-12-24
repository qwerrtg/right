rm -rf dist babel postcss
npm run generate
cross-env NODE_ENV=production node app.js