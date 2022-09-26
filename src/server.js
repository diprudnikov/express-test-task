const app = require('./app');
const { appConfig } = require('./shared/config');

init();

async function init() {
  try {
    app.listen(appConfig.port, () => {
      console.log(`Express App Listening on Port ${appConfig.port}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
