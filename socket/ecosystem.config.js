module.exports = {
    apps: [
      {
        name: 'SocketIO',
        exec_mode: 'cluster',
        instances: '1',
        script: './node_modules/nuxt/bin/nuxt.js',
      }
    ]
  }