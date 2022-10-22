
const fs = require('fs')
const axios = require('axios');
const LOL_KEY = 'api key here'



let elos = ['CHALLENGER', 'GRANDMASTER', 'MASTER']

PlayersHighElos = []

start()
async function start() {

    await getNames(1, 0)

}


async function getNames(pagina, elo) {


    let players = await axios.get(`https://br1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/${elos[elo]}/I?page=${pagina}`,
        { headers: { 'X-Riot-Token': LOL_KEY } }).then(resp => {
            return resp.data
        }).catch((e) => {
           
           if (e.response.status==400) {
            console.log("finished");
           }else{
             console.log(e);
           }
            return
        })
    try {
        if (players[0]) {

            console.log("pag: "+pagina,"elo: "+ elos[elo]);
            pagina++
            players.map(e => PlayersHighElos.push(e.summonerName));
            getNames(pagina, elo)
        } else {
            if (elo == elos.length + 1) {
                return
            }
            elo++
            getNames(1, elo)
        }


    } catch (error) {
        fs.writeFileSync('./nome.json', JSON.stringify(PlayersHighElos), err => { !err ? console.log('pegou todos os nome') : console.log(err);; })
    }
    return
}