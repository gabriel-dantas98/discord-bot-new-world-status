const axios = require('axios');
const cheerio = require('cheerio');

const formatDate = (rawData) => {
    let formatedDate;

    rawDateSplitted = rawData.split(":")[1] // Última atualização: 24 de Julho de 2021 16h30min39s PDT -> 24 de Julho de 2021 16h30min39s PDT 
    rawDateCleaned = rawDateSplitted.replace("PDT", "").trim() 
    rawDateHour = rawDateCleaned.split(" ").slice(-1); 
    rawDateDay = rawDateCleaned.split(" ").slice(0, -1);

    console.log(rawDateCleaned)

    return rawDateCleaned;
} 

const getServerStatusFromClass = (classInput) => {
    if (classInput.includes("up")) return "UP"
    
    return "DOWN"
}

async function GetServerStatus() {

    const newWorldStatusReport = [];
    const regions = [];

    try {
    const { data } = await axios.get('https://www.newworld.com/pt-br/support/server-status');

    const $ = cheerio.load(data);
    latestUpdateServersStatus = formatDate($(".ags-ServerStatus-content-lastUpdated").text());

    $(".ags-ServerStatus-content-tabs").each((_idx, el) => {
        $(el).find(".ags-ServerStatus-content-tabs-tabHeading-label").each((i, regionDiv) => {
            newWorldStatusReport.push({ "region": $(regionDiv).text().trim(), "servers": [] });
        });
    });

    $(".ags-ServerStatus-content-responses-response.ags-ServerStatus-content-responses-response--centered").each((regionIndex, regionServers) => {
        $(regionServers).find(".ags-ServerStatus-content-responses-response-server").each((serverIndex, serversTable) => {

            serverClassStatus = $(serversTable).find(".ags-ServerStatus-content-responses-response-server-status").attr('class');
            serverName = $(serversTable).find(".ags-ServerStatus-content-responses-response-server-name").text().trim();
            serverStatus = getServerStatusFromClass(serverClassStatus);

            newWorldStatusReport[regionIndex].servers.push({ "name": serverName, "status": serverStatus });
        });
    });

    console.log("finish scrapping server status...");

    return newWorldStatusReport;
    }
    catch(err) {
        console.error(err)
        return err;
    }
}

// getServerStatus().then((status) => console.log(status));
module.exports = { GetServerStatus }
