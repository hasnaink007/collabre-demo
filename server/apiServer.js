// NOTE: this server is purely a dev-mode server. In production, the
// server/index.js server also serves the API routes.

// Configure process.env with .env.* files
require('./env').configureEnv();

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./apiRouter');
const FileHandlingHooks = require('./fileHandlingHooks');
const fileUpload = require('express-fileupload');
const customStripeChages = require('./customStripeCharges')
const system_pref_api = require('./system-preferences-api');

const radix = 10;
const PORT = parseInt(process.env.REACT_APP_DEV_API_SERVER_PORT, radix) ;
const app = express();

// NOTE: CORS is only needed in this dev API server because it's
// running in a different port than the main app.
app.use(
  cors({
    origin: process.env.REACT_APP_CANONICAL_ROOT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(fileUpload({
  createParentPath:true
}));

app.use(express.static('./uploads'))

app.use('/api', apiRouter);
app.use('/files',FileHandlingHooks);
app.use('/customStripecharges',customStripeChages);
app.use('/system-api',system_pref_api)


app.listen(PORT, () => {
  console.log(`API server listening on ${PORT}`);
});
