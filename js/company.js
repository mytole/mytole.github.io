const cVars = {
    symbol: vars.urlParams.get('symbol'),
    
}

class CompanyInfo {
    constructor(element, symbol) {
        /* this.compImageCol: document.getElementById("comp-image"),
        this.compNameCol: document.getElementById("comp-name"), /////fixxx
        this.compPriceCol: document.getElementById("comp-price"),
        this.compChangeCol: document.getElementById("comp-change"),
        this.compDesCol: document.getElementById("comp-des"), */
        this.element = element;
        this.symbol = symbol
        this.cSpinner = document.createElement('div');
        this.cSpinner.classList.add('spinner-border', 'text-dark');
        this.cSpinner.setAttribute('id', 'company-spinner');
        this.cSpinner.setAttribute('role', 'status');
        this.cHeader = document.createElement('div');
        this.cHeader.classList.add('row', 'justify-content-center');
        this.chInnerDiv1 = document.createElement('div');
        this.cInnerDiv2 = document.createElement('div');
        this.chInnerDiv1.classList.add('col-md-2', 'col-sm-12', 'md-mr-5', 'text-center');
        this.chInnerDiv1.setAttribute('id', 'comp-image');
        this.cInnerDiv2.classList.add('col-md-4', 'col-sm-12','text-center');
        this.cInnerDiv2.setAttribute('id', 'comp-name');
        this.cHeader.append(this.chInnerDiv1, this.cInnerDiv2);
        this.cPrice = document.createElement('div');
        this.cPrice.classList.add('row', 'justify-content-center', 'mt-5');
        this.cpInnerDiv1 = document.createElement('div');
        this.cpInnerDiv2 = document.createElement('div');
        this.cpInnerDiv1.classList.add('col-6', 'col-md-5');
        this.cpInnerDiv1.setAttribute('id', 'comp-price');
        this.cpInnerDiv2.classList.add('col-3', 'col-md-2');
        this.cpInnerDiv2.setAttribute('id', 'comp-change');
        this.cPrice.append(this.cpInnerDiv1, this.cpInnerDiv2);
        this.cDes = document.createElement('div');
        this.cDes.classList.add('row', 'justify-content-md-center');
        this.cdInnerDiv = document.createElement('div');
        this.cdInnerDiv.classList.add('col-md-8', 'mt-5', 'pl-3', 'pr-3');
        this.cdInnerDiv.setAttribute('id', 'comp-des');
        this.cDes.append(this.cdInnerDiv);
        this.cChart = document.createElement('div');
        this.cChart.classList.add('row', 'justify-content-md-center', 'mt-5');
        this.ccInnerDiv = document.createElement('div');
        this.ccInnerDiv.classList.add('col-md-8');
        this.ccInnerDiv.setAttribute('id', 'comp-chart');
        this.ccCanvas = document.createElement('canvas');
        this.ccCanvas.setAttribute('id', 'myChart');
        this.ccInnerDiv.append(this.ccCanvas);
        this.cChart.append(this.ccInnerDiv);
        
    }
    showSpinner(spinner) { spinner.style.display = "inline-block"; }
    hideSpinner(spinner) { spinner.style.display = "none"; }
    load() {
        this.element.append(this.cSpinner, this.cHeader, this.cPrice, this.cDes, this.cChart)
        getProfile(this.symbol).then(data => {

            document.getElementById('title').innerHTML = this.symbol;
            let compImage = data.profile.image;
            let compName = data.profile.companyName;
            let compPrice = data.profile.price;
            let compChange = data.profile.changesPercentage;
            let compDes = data.profile.description;
            this.hideSpinner(this.cSpinner);
            this.chInnerDiv1.innerHTML = `<img src="${compImage}" width="100" hight="100">`;
            this.cInnerDiv2.innerHTML = `<b>${compName}</b>`;
            this.cpInnerDiv1.innerHTML = `Stock Price: <b>${compPrice}$</b>`;
            this.cpInnerDiv2.innerHTML = compChange;
            if (compChange.charAt(1) === '+') this.cpInnerDiv2.style.color = '#0ddd83';
            else this.cpInnerDiv2.style.color = 'red';
            this.cdInnerDiv.innerHTML = `<p>${compDes}</p>`;
        
        });
    }
    loadChart() {
        fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${this.symbol}?serietype=line`).then(response => {
            response.json().then(data => {
                let chartData = data.historical;
                let chartYears = [];
                let chartClose = [];
                chartData.forEach(e => {
                    chartYears.push(e.date);
                    chartClose.push(e.close);
                });
                chartYears.reverse();
                chartClose.reverse();

                let myChart = new Chart(this.ccCanvas, {
                    type: 'line',
                    data: {
                        labels: chartYears,
                        datasets: [{
                            label: 'Stock History',
                            data: chartClose,

                        }]
                    },
                    options: {
                        aspectRatio: 1,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    
                                    min: 0,
                                    stepSize: 5
                                }
                            }]
                        },
                        position: 'right',
                    }
                        
                });

            })
        })
    }
}

const compInfo = new CompanyInfo(document.getElementById("compInfo"), cVars.symbol);
compInfo.load();
compInfo.loadChart();