const fs = require('fs');

// Read the version from package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = packageJson.version || 'Unknown';

// Update environment.ts
const environmentFile = './src/environments/environment.ts';
let environmentContents = fs.readFileSync(environmentFile, 'utf8');
environmentContents = environmentContents.replace(
  /version: '.*'/,
  `version: '${version}'`
);
fs.writeFileSync(environmentFile, environmentContents, 'utf8');

console.log(`Updated version in environment.ts to ${version}`);
