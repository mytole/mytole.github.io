const cVars = {
    symbol: vars.urlParams.get('symbol'),

}

const compInfo = new CompanyInfo(document.getElementById("compInfo"), cVars.symbol);
compInfo.load();
compInfo.loadChart();
document.getElementById('title').innerHTML = cVars.symbol;