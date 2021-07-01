rm -rf dist babel postcss
npm run generate
cross-env environment=production node app.js