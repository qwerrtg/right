rm -rf dist 
npm run build
cross-env environment=production nodemon app.js