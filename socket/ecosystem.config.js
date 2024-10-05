module.exports = {
  apps: [
    {
      name: 'SocketIO',
      exec_mode: 'cluster',
      instances: 'max',
      script: './api.js',
    }
  ]
}