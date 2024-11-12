const PORT = process.env.PORT || 5000;
const app = require('./app');
const os = require('os');

if (process.env.NODE_ENV === 'production') {
  const numCPUs = os.cpus().length;

  pm2.start({
    script: 'server.js',
    instances: numCPUs,
    exec_mode: 'cluster',
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production'
    }
  }, (err) => {
    if (err) {
      console.error('Error saat memulai PM2:', err);
      process.exit(2);
    } else {
      console.log(`Server berjalan dalam cluster mode dengan ${numCPUs} instances`);
    }
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
