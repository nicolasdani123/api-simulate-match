import type { Request, Response } from "express";
import { getAllTeamsService, getByIdTeamsService,createTeamsService, updateTeamsService,deleteTeamService } from "../services/teamsService.js";
import { getCurrentDate } from "../config/connectPostgree.js";
import { timeStamp } from "console";

const getAllTeams = async (req: Request, res: Response) => {
  const date = await getCurrentDate();
  try {
    const rows = await getAllTeamsService();
    return res.status(200).json({
      success: true,
      message: "Times listados com sucesso",
      data: rows,
      timestamp: date,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    return res.status(500).json({
      success: false,
      message: "Erro no servidor.",
      timestamp: date,
    });
  } finally {
    console.log(`GET/teams IP${req.ip} | ${date}`);
  }
};

const getByIdTeams = async (req: Request, res: Response) => {
  const date = await getCurrentDate();
  const id = Number(req.params.id);
  try {
    const rows = await getByIdTeamsService(id)
    return res.status(200).json({
      success:true,
      message:`Time ${id} listado com sucesso`,
      data:rows,
      timestamp:date
    })
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    if (errorMessage === "id é obrigatório") {
      return res.status(400).json({
        success: false,
        message: errorMessage,
        timestamp: date,
      });
    }

    if (errorMessage === `Time ${id} não encontrado.`) {
      return res.status(404).json({
        success: false,
        message: errorMessage,
        timestamp: date,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro no servidor",
      timestamp: date,
    });
  } finally {
    console.log(`GET/teams:id IP ${req.ip} | ${date}`);
  }
};


const createTeams  = async(req:Request,res:Response)=>{
  const date= await getCurrentDate()
  try{
    const team = req.body
    const rows =  await createTeamsService(team)
    return res.status(201).json({
      success:true,
      message:"Time criado com sucesso",
      data:rows,
      timestamp:date
    })

  }catch(error:unknown){
    const errorMessage =  error instanceof Error ? error.message:"Erro desconhecido"
    if(errorMessage.includes("obrigatório") || errorMessage.includes("deve")){
      return res.status(400).json({
        success:false,
        message:errorMessage,
        timestamp:date
      })
    }

    return res.status(500).json({
      success:false,
      message:"Erro no servidor",
      timestamp:date
    })

  }finally{
    console.log(`POST/teams IP${req.ip} | ${date}`)
  }


}



const updateTeams = async (req:Request,res:Response)=>{
   const date= await getCurrentDate()
   try{
     const id = Number(req.params.id);
    const body = req.body
    const  rows = await updateTeamsService(id, body)
    return res.status(200).json({
      success:true,
      message:"Time atualizado com sucesso",
      data:rows,
      timestamp:date
    })


  }catch(error:unknown){
  const errorMessage = error instanceof Error ? error.message:"Erro desconhecido"
  if(errorMessage.includes("obrigatório") || errorMessage.includes("deve")){
    return res.status(400).json({
      success:false,
      message:errorMessage,
      timestamp:date
    })
  }
  
  return res.status(500).json({
    success:false,
    message:"Erro no servidor",
    timestamp:date
  })
}finally {
  console.log(`PUT/teams:id ${req.ip} | ${date}`)
}

}

const deleteTeam =  async (req:Request,res:Response)=>{
  const date = await getCurrentDate()
  const id = Number(req.params.id);
  try{

    await deleteTeamService(id)

    return res.status(204).send();

  }catch(error:unknown){
    const errorMessage = error instanceof Error ? error.message:"Erro desconhecido";
    if(errorMessage === "id é obrigatório"){
      return res.status(400).json({
        success:false,
        message:errorMessage,
        timestamp:date
      })
    }

    if(errorMessage === `Time ${id} não encontrado.`){
      return res.status(404).json({
        success:false,
        message:errorMessage,
        timestamp:date
      })
    }

    return res.status(500).json({
      success:false,
      message:"Erro no servidor",
      timestamp:date
    })
  }finally {
    console.log(`DELETE/teams:id IP${req.ip} | ${date}`)
  }
}
export {getAllTeams,getByIdTeams,createTeams,updateTeams,deleteTeam}
