import type { Request, Response } from "express";
import simulateMatch from "../services/simulationService.js";
import { pool } from "../config/connectPostgree.js";

const simulateMatchController = async (req: Request, res: Response) => {
  try {
    const { team1Id, team2Id } = req.body;

    if (team1Id === team2Id) {
      return res.status(400).json({
        success: false,
        message: "Os times devem ser diferentes",
      });
    }

    const query = await pool.query(
      "SELECT id,nome,ataque,defesa FROM times WHERE id IN ($1,$2) ORDER BY id",
      [team1Id, team2Id]
    );

    if (query.rowCount !== 2) {
      return res.status(404).json({
        success: false,
        message: "Time não encontrado",
      });
    }
    const team1 = query.rows.find(row => row.id === team1Id);
    const team2 = query.rows.find(row => row.id === team2Id);

    const result = simulateMatch(team1, team2);

    return res.status(200).json({
      success: true,
      message: "Simulação realizada com sucesso",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro no servidor",
    });
  }
};

export { simulateMatchController };
