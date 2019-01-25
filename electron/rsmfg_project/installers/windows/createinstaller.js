const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds', 'rsmfg-assessment-app-win32-x64')

  return Promise.resolve({
    appDirectory: outPath,//path.join(outPath, 'rsmfg-assessment-app-win32-x64/'),
    authors: 'Brian Craw',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'rsmfg-assessment-app.exe',
    setupExe: 'RsmfgAssessmentAppInstaller.exe',
    setupIcon: path.join(rootPath, 'app', 'img', 'icon_Hpx_icon.ico')
  })
}
