CREATE TABLE
    IF NOT EXISTS times (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) UNIQUE NOT NULL,
        sigla CHAR(3) UNIQUE NULL,
        ataque INTEGER NOT NULL,
        defesa INTEGER NOT NULL
    );