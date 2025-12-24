import {
  getAllTeamsRepository,
  getByIdTeamsRepository,
  createTeamsRepository,
  updateTeamsRepository,
  deleteTeamRepository,
} from "../repository/teamsRepository.js";
import { Team, teamInputSchema } from "../types/teamTypes.js";

const getAllTeamsService = async () => {
  const rows = await getAllTeamsRepository();
  return rows;
};


const getByIdTeamsService = async (id: number) => {
  if(!id || id<=0) throw new Error("id é obrigatório")
 
  const rows = await getByIdTeamsRepository(id);
  if (!rows) throw new Error(`Time ${id} não encontrado.`);
  return rows;
};

const createTeamsService = async (team: Team) => {
  // Validação com Zod
  teamInputSchema.parse(team);

  // Verificar duplicatas
  const existingTeams = await getAllTeamsRepository();
  const duplicateNome = existingTeams.find(t => t.nome.toLowerCase() === team.nome.toLowerCase());
  if (duplicateNome) {
    throw new Error("Já existe um time com esse nome");
  }
  const duplicateSigla = existingTeams.find(t => t.sigla.toUpperCase() === team.sigla.toUpperCase());
  if (duplicateSigla) {
    throw new Error("Já existe um time com essa sigla");
  }

  // Se passou nas validações, prossegue
  const rows = await createTeamsRepository(team);
  return rows;
};

const updateTeamsService = async (id: number, team: Team) => {
  if(!id || id<=0) throw new Error("id é obrigatório")

  // Validação com Zod para update também
  teamInputSchema.parse(team);

  const rows = await updateTeamsRepository(id, team);
  return rows;
};


const deleteTeamService = async (id:number)=>{
      
  if(!id || id<=0) throw new Error("id é obrigatório")
    const rows = await deleteTeamRepository(id)
    if (!rows) throw new Error(`Time ${id} não encontrado.`);
  return rows
}
export {
  getAllTeamsService,
  getByIdTeamsService,
  createTeamsService,
  updateTeamsService,
  deleteTeamService
};
