import { Team } from "../types/teamTypes.js";
const randomNumber  = ()=>{
     return Math.random() *5 -2.5
}

const calculateScore = ({ataque,defesa}:Team)=>{
  
    const sort  = randomNumber();
    return Math.max(0, Math.round((ataque - defesa + sort) / 2))

}

const simulateMatch = (team1:Team,team2:Team)=>{

    const teamScore1 = calculateScore(team1)
    const teamScore2 = calculateScore(team2)

    let winner = "draw"


    if(teamScore1 > teamScore2) winner = team1.nome
    if(teamScore2 > teamScore1) winner = team2.nome

    return{
        team1:team1.nome,
        team2:team2.nome,
        score:`${teamScore1} x ${teamScore2}`,winner

    }
}
export default simulateMatch