const proxyquire = require('proxyquire')
const { test } = require('tap')
const SRError = require('@semantic-release/error')

const condition = proxyquire('../../', {
  'auditPackage': (cb) => cb(null)
})

test('find vulnerable packages', (tt) => {
  tt.plan(2)

  condition({}, 'test/data/vulnerable-package.json', (err, results) => {
    tt.ok(err instanceof SRError)
    tt.is(err.code, 'EVULNERABLEDEPS')
  })
})

test('does not raise error on safe packages', (tt) => {
  tt.plan(1)

  condition({}, 'test/data/dep-package.json', (err) => {
    tt.is(err, null)
  })
})

test('requires proper path to package', (tt) => {
  tt.plan(2)

  condition({}, 'weird', (err) => {
    tt.ok(err instanceof SRError)
    tt.is(err.code, 'ENSPFAIL')
  })
})

test('if no path given, path defaults to cwd + package.json', (tt) => {
  tt.plan(1)

  condition({}, '', (err) => {
    tt.is(err, null)
  })
})

