rm -rf dist 
npm run generate
cross-env environment=production node app.js