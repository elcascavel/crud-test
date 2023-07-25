0. Create server folder.
1. Initialize a new Node.js project `npm init -y`
2. Install required packages: `express sqlite3`
3. Install `nodemon -D` (-D is dev dependency)

- Use sqlite because it's an embedded db (no need to worry about hosting it externally). Useful to create a db on the spot. Other situations MySQL or PostgreSQL or for noSQL use Mongo.

4. Create a server.js file.

5. `npx create-react-app client` to create a React project inside the client folder

6. Go back to the server.js file

```js
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api", (req, res) => {
  res.json("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```

## TBD fellas...
