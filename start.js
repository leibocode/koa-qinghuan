const { resolve } = require('path')
const r = path => resolve(__dirname, path)

require('babel-core/register')({
  'presets': [
    'stage-3'
  ],
  'plugins': [
    'transform-decorators-legacy',
    [
      'module-alias', [
        {
          src: r('./src/app'), 'expose': '~'
        }
      ]
    ]
  ]
})

require('babel-polyfill')
require('./src/app')