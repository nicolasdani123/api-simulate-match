import express from "express"
import cors from "cors"
import routerTeams from "../routes/teamsRouter.js"

const app = express();
app.use(cors())
app.use(express.json())
app.use("/teams", routerTeams)
app.get("/",(_req,res)=>{
     res.send("Servidor conectado com sucesso!")
})
export default app