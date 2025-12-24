import { pool } from "../config/connectPostgree.js";
import { Team } from "../types/teamTypes.js";

const getAllTeamsRepository = async () => {
  const { rows } = await pool.query("SELECT id, nome, sigla, ataque, defesa FROM times ORDER BY id");
  return rows.map(row => ({
    id: row.id,
    nome: row.nome,
    sigla: row.sigla,
    ataque: row.ataque,
    defesa: row.defesa
  }));
}

const getByIdTeamsRepository = async (id: number) => {
  const { rows } = await pool.query(
    "SELECT id, nome, sigla, ataque, defesa FROM times WHERE id = $1",
    [id]
  );
  if (rows.length === 0) return null;
  const row = rows[0];
  return {
    id: row.id,
    nome: row.nome,
    sigla: row.sigla,
    ataque: row.ataque,
    defesa: row.defesa
  };
}

const createTeamsRepository = async (team: Team) => {
  const { nome, sigla, ataque, defesa } = team;
  const { rows } = await pool.query(
    "INSERT INTO times(nome,sigla,ataque,defesa) VALUES ($1,$2,$3,$4) RETURNING *",
    [nome, sigla, ataque, defesa]
  );
  return rows[0];
}

const updateTeamsRepository = async (id: number, team: Team) => {
  const { nome, sigla, ataque, defesa } = team;
  const { rows } = await pool.query(
    "UPDATE times SET nome = $2, sigla = $3, ataque = $4, defesa = $5 WHERE id = $1 RETURNING *",
    [id, nome, sigla, ataque, defesa]
  );
  return rows[0] || null;
}


const deleteTeamRepository = async (id:number)=>{
    const { rows } = await pool.query(
      "SELECT id, nome, sigla, ataque, defesa FROM times WHERE id = $1",
      [id]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    await pool.query("DELETE FROM times WHERE id = $1", [id]);
    return {
      id: row.id,
      nome: row.nome,
      sigla: row.sigla,
      ataque: row.ataque,
      defesa: row.defesa
    };
}

export { getAllTeamsRepository, getByIdTeamsRepository, createTeamsRepository, updateTeamsRepository,deleteTeamRepository };
