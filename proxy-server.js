const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all origins (adjust as needed for security)
app.use(cors());




app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
