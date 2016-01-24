const SRError = require('@semantic-release/error')
var auditPackage = require('nsp/lib/auditPackage.js')

module.exports = function (pluginConfig, packagePath, cb) {
  if (!packagePath) {
    packagePath = process.cwd() + '/package.json'
  }

  auditPackage(packagePath, (err, results) => {
    if (err) return cb(new SRError('nsp returned unexpected error code', 'ENSPFAIL'))

    if (results.length > 0) return cb(new SRError('Vulnerable Dependencies', 'EVULNERABLEDEPS'))

    return cb(null)
  })
}
