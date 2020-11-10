const cVars= {
    compSymbol: vars.urlParams.get('symbol'),
    chart: document.getElementById('myChart').getContext('2d')
}
getProfile(cVars.compSymbol).then(data =>{
    
        document.getElementById('title').innerHTML = cVars.compSymbol;
        let compImage = data.profile.image;
        let compName = data.profile.companyName;
        let compPrice = data.profile.price;
        let compChange = data.profile.changesPercentage;
        let compDes = data.profile.description;
        vars.hideSpinner(vars.companySpinner);
        vars.compImageCol.innerHTML = `<img src="${compImage}" width="100" hight="100">`;
        vars.compNameCol.innerHTML = `<b>${compName}</b>`;
        vars.compPriceCol.innerHTML = `Stock Price: <b>${compPrice}$</b>`;
        vars.compChangeCol.innerHTML = compChange;
        if(compChange.charAt(1)==='+') vars.compChangeCol.style.color = '#0ddd83';
        else vars.compChangeCol.style.color = 'red';
        vars.compDesCol.innerHTML = `<p>${compDes}</p>`;
    
});

fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${cVars.compSymbol}?serietype=line`).then(response =>{
    response.json().then(data=>{
        
        let chartData = data.historical;
        let chartYears = [];
        let chartClose = [];
        chartData.forEach(e=> {
            chartYears.push(e.date);
            chartClose.push(e.close);
        }); 
   
        let myChart = new Chart(cVars.chart , {
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
            }
        });
        
    })
})

