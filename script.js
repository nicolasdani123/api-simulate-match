
      const BASE_URL = "http://localhost:3000/teams";
      const btn_Simulate = document.querySelector(".btn-simulate")
      const selectTime1 = document.querySelector("#time1")
      const selectTime2 = document.querySelector("#time2")
      const resultDiv = document.querySelector("#result")
    
      const GetApi = async()=>{
        try{
          const response = await fetch(BASE_URL)
          const data = await response.json()
          const result = data.data
          console.log(result)
          createOption(result)

        }catch(error){
            if(error){
              console.log("Error de requsição")
            }
        }

      }

      const createOption  = (data)=>{
        for(let i = 0; i <data.length;i++){
           const optionTime1 = document.createElement("option")
           const optionTime2 = document.createElement("option")
           optionTime1.textContent = data[i].nome
           optionTime1.value = data[i].id
           selectTime1.appendChild(optionTime1)

           optionTime2.textContent = data[i].nome
           optionTime2.value = data[i].id
           selectTime2.appendChild(optionTime2)

         }

           

      }

      document.addEventListener("DOMContentLoaded",GetApi())


     // btn_Simulate?.addEventListener("click",()=>)

const simulateMatch = async () => {
  const team1Id = selectTime1.value;
  const team2Id = selectTime2.value;

  if (!team1Id || !team2Id) {
    resultDiv.textContent = "Selecione ambos os times";
    return;
  }

  if (team1Id === team2Id) {
    resultDiv.textContent = "Os times devem ser diferentes";
    return;
  }

  try {
    const response = await fetch(BASE_URL + "/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team1Id: parseInt(team1Id), team2Id: parseInt(team2Id) }),
    });

    const data = await response.json();

    if (data.success) {
      const result = data.data;
      resultDiv.innerHTML = `
        <h2>Resultado da Simulação</h2>
        <p>${result.team1} vs ${result.team2}</p>
        <p>Placar: ${result.score}</p>
        <p>Vencedor: ${result.winner  === "draw" ? "empate":result.winner}</p>
      `;
    } else {
      resultDiv.textContent = "Erro: " + data.message;
    }
  } catch (error) {
    resultDiv.textContent = "Erro na requisição: " + error.message;
  }
};

btn_Simulate?.addEventListener("click", simulateMatch);

const blockOption = (origin,destination)=>{

  const SelectOrigin = origin.value
  

Array.from(destination).forEach((optionDestination)=>{
  optionDestination.disabled = (optionDestination.value === SelectOrigin)
})

}


selectTime1.addEventListener("change",()=> blockOption(selectTime1,selectTime2))
selectTime2.addEventListener("change",()=> blockOption(selectTime2,selectTime1))

