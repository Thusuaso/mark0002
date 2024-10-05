module.exports = {
    apps: [
      {
        name: 'SocketIO',
        exec_mode: 'cluster',
        instances: '1',
        script: './api.js',
        env_production: {
          PORT: 3001,
          exec_mode: "cluster_mode",
        },
      },
      
    ]
  }