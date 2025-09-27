// Check homepage HTML for /project-images/ references
const http = require('http');
http.get('http://localhost:3000', (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    const matches = [...body.matchAll(/\/project-images\/[\w_\-]+\.png/g)];
    if (matches.length === 0) {
      console.log('MISSING');
    } else {
      console.log('FOUND', Array.from(new Set(matches.map(m => m[0]))).join(', '));
    }
  });
}).on('error', (err) => {
  console.error('ERR', err.message);
  process.exit(1);
});
