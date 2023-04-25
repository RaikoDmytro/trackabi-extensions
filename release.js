const { zip } = require('zip-a-folder')
const fs = require('fs');

const releaseDir = './dist/release/'

console.log('# Release -> Zipping folders')
const todoZip = async () => {
  if (!fs.existsSync(releaseDir)){
    fs.mkdirSync(releaseDir, { recursive: true });
  }
  await Promise.all([
    zip('./dist/builds/chrome', `${releaseDir}chrome.zip`),
    zip('./dist/builds/edge/', `${releaseDir}edge.zip`),
    zip('./dist/builds/opera/', `${releaseDir}opera.zip`),
    zip('./dist/builds/firefox/', `${releaseDir}firefox.zip`),
  ])
}

todoZip()
  .then(() => {
    console.log(`# Release -> Folders were zipped to ${releaseDir}`)
  })
  .catch(e => console.log('# Release -> Something went wrong: \n', e))

