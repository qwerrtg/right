rm -rf dist 
npm run build
cross-env environment=production node app.js