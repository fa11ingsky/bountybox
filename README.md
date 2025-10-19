# BountyBox
![pipeline status](https://github.com/fa11ingsky/collectorscache/actions/workflows/node.js.yml/badge.svg)

Bounty Box by ArmourScope

Build and run local dev environment: 
```
npm install
npm run dev
```

For new deployments. Push /dist to the gh-pages branch after a fresh build. You must also replace occurances of localhost with the live site url. 

Retrieve `/bin` directory from code owner. 
```bash
# From main branch
git checkout main
git pull
# Generate nuxt static content
npm run generate
# Deploy to gh-pages
npm run deploy

```