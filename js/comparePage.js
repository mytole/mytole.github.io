const cpVars = {
    urlParams: new URL(window.location.href),

}
class CompanyCard {
    constructor(symbol) {
        this.symbol = symbol;
        this.container = document.createElement('div');
        this.container.classList.add('col-3', 'm-5', 'pt-5');
        this.container.setAttribute('id', `${symbol}`);
        this.container.style.borderRadius = '6px';
        this.container.style.boxShadow = "0px 2px 10px rgba(0, 0, 0, 0.08)";
    }

    loadInfo() {
        const info = new CompanyInfo(this.container, this.symbol);
        info.load();
        info.loadChart();
    }
}
const symbols = cpVars.urlParams.searchParams.get('symbols');

function getSymbolsArr(symbols) {
    let numOfSymbs = 1;
    for (let i = 0; i < symbols.length; i++) {
        if (symbols.charAt(i) === '_') numOfSymbs++;
    }
    let symbsArr = [];
    let copyStr = symbols;
    for (let i = 0; i < numOfSymbs; i++) {
        if (copyStr.indexOf('_') !== -1) {
            symbsArr.push(copyStr.substring(0, copyStr.indexOf('_')));
            copyStr = copyStr.substring(copyStr.indexOf('_') + 1);
        }
        else {
            symbsArr.push(copyStr);

        }
    }
    return symbsArr;
}

const symbsArr = getSymbolsArr(symbols);
symbsArr.forEach(s => {
    let currCard = new CompanyCard(s);
    currCard.loadInfo();
    document.getElementById('company-cards').append(currCard.container);
})
