0. Create backend folder.
1. Initialize a new Node.js project `npm init -y`
2. Install required packages: `express sqlite3`

- Use sqlite because it's an embedded db (no need to worry about hosting it externally). Useful to create a db on the spot. Other situations MySQL or PostgreSQL or for no SQL use Mongo.

3. Create a server.js file.
   3.1. Import express module and create an instance of it.
