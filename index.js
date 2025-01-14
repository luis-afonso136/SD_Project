const express = require("express");

const app = express();
const port = 8080;

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "db", 
    database: "IEEE_db",
    password: "postgres",
    port: 5432, 
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
        console.log("Tabela de Filmes criada com sucesso");
    } catch (err) {
        console.error(err);
        console.error("Erro ao criar a tabela de filmes");
    }
}

createMoviesTable();

// Create new movie
app.post("/create-movies", async (req, res) => {
    const { title, director, price } = req.body;
    console.log(req.body);
    if (!title || !director || !price) {
        return res.status(400).json({ error: "Um dos campos está a faltar"});
    }
    try {
        const query = `
        INSERT INTO movies (title, director, price)
        VALUES ($1, $2, $3)
        RETURNING id;
        `;
        const values = [title, director, price];
        const result = await pool.query(query, values);
        res.status(201).send({ movieId: result.rows[0].id, message: "Novo Filme Criado" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Algum erro ocorreu");
    }
});

// Get all movies
app.get("/getAll-movies", async (req, res) => {
    try {
        const query = `SELECT * FROM movies;`;
        const { rows } = await pool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed");
    }
});

// Get movie by ID
app.get("/get-movies-byId/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM movies WHERE id = $1;`;
        const { rows } = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Filme não encontrado" });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar o filme" });
    }
});


// Update movie
app.put("/update-movies/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, director, price } = req.body;

        if (!title && !director && !price) {
            return res.status(400).json({ error: "Escreva pelo menos um destes campos (title, director, or price)"});
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
            return res.status(404).json({ error: "Filme não encontrado"});
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Algum erro ocorreu");
    }
});

// Delete movie
app.delete("/delete-movies/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM movies WHERE id = $1 RETURNING *;`;
        const { rows } = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Filme não encontrado"});
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Algum erro ocorreu");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
