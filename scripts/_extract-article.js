// Verify full content length
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/extra-articles.json', 'utf8'));
const a = data.find(x => x.slug === 'vloeibaar-collageen-hl5-huid-haar-nagels');
console.log('Content length:', a.content.length);
console.log('Last 300 chars:', a.content.slice(-300));
