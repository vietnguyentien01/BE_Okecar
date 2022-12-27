const env = require('./env')

module.exports = {
    apps: [
        {
            name: 'oke_car',
            script: 'dist/main.js',
            exec_mode: 'cluster_mode',
            instances: 1,
            env,
        },
    ],
}
