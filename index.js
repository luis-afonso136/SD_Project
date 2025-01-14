const express = require("express");

const app = express();
const port = 8080;

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "db", // Nome do serviço no docker-compose
    database: "IEEE_db",
    password: "postgres",
    port: 5432, // Porta padrão do PostgreSQL
});

app.get("/", (req, res) => {
    res.send("Api is Working!!!");
});

app.use(express.json());

async function createMoviesTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS movies (
            id SERIAL PRIMARY KEY,
            title VARCHAR(350) NOT NULL,
            director VARCHAR(350) NOT NULL,
            price NUMERIC(10, 2)
        );
        `;
        await pool.query(query);
        console.log("Movies table created");
    } catch (err) {
        console.error(err);
        console.error("Movies table creation failed");
    }
}

createMoviesTable();

// Create new movie
app.post("/movies", async (req, res) => {
    const { title, director, price } = req.body;
    console.log(req.body);
    if (!title || !director || !price) {
        return res.status(400).send("One of the title, director, or price is missing in the data");
    }
    try {
        const query = `
        INSERT INTO movies (title, director, price)
        VALUES ($1, $2, $3)
        RETURNING id;
        `;
        const values = [title, director, price];
        const result = await pool.query(query, values);
        res.status(201).send({ message: "New movie created", movieId: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).send("Some error has occurred");
    }
});

// Get all movies
app.get("/movies", async (req, res) => {
    try {
        const query = `SELECT * FROM movies;`;
        const { rows } = await pool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed");
    }
});

// Update movie
app.put("/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, director, price } = req.body;

        if (!title && !director && !price) {
            return res.status(400).send("Provide at least one field (title, director, or price)");
        }
        const query = `
            UPDATE movies
            SET title = COALESCE($1, title),
                director = COALESCE($2, director),
                price = COALESCE($3, price)
            WHERE id = $4
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [title, director, price, id]);

        if (rows.length === 0) {
            return res.status(404).send("Cannot find anything");
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Some error has occurred");
    }
});

// Delete movie
app.delete("/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM movies WHERE id = $1 RETURNING *;`;
        const { rows } = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).send("We have not found the movie");
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Some error has occurred");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
