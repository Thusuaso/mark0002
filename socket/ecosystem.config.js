module.exports = {
    apps: [
      {
        name: 'SocketIO',
        exec_mode: 'cluster',
        instances: '1',
        script: './api.js',
        env : {

          "PORT" : 3001

      },
      env_production: {

        "PORT" : 3001

    }
      },
      
    ]
  }