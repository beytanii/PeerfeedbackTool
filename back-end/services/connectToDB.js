const mysql = require('mysql2');

// Create a pool of connections to the database
const connection = mysql.createPool({
    host: 'peerfeedback.betbet.website',      // Replace with your host
    user: 'root',           // Replace with your MySQL username
    password: 'betbet',    // Replace with your MySQL password
    database: 'PeerFeedback' // Replace with the name of your database
});

// Export the pool for use in other modules
module.exports = connection.promise(); // Use promise-based API