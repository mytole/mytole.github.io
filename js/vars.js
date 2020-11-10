const vars = {
    marquee: document.getElementById("marquee-content"),
    sInput: document.getElementById("search-input"),
    sBtn: document.getElementById("button-addon2"),
    compImageCol: document.getElementById("comp-image"),
    compNameCol: document.getElementById("comp-name"),
    compPriceCol: document.getElementById("comp-price"),
    compChangeCol: document.getElementById("comp-change"),
    compDesCol: document.getElementById("comp-des"),
    showSpinner: function (spinner) { spinner.style.display = "inline-block"; },
    hideSpinner: function (spinner) { spinner.style.display = "none"; },
    searchSpinner: document.getElementById("loading-res"),
    companySpinner: document.getElementById("company-spinner"),
    resultsRow: document.getElementById("results"),
    urlParams: new URLSearchParams(window.location.search)
}
//https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list

async function getProfile(symbol){ 
    let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);
    let data = await response.json();
    return data;
}
fetch('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list').then(response=>{
    response.json().then(data=>{
        data.splice(50, data.length-50);
        
        let compSymbs = [];
        data.forEach(comp => compSymbs.push(comp.symbol));
        compSymbs.forEach(symbol => {
            getProfile(symbol).then(proComp =>{
                console.log(proComp);
                let currLi = document.createElement("li");
                vars.marquee.appendChild(currLi);
                currLi.innerHTML = `<b>${symbol}</b>&nbsp${proComp.profile.price}$  ${proComp.profile.changes} <span id="${symbol}c">${proComp.profile.changesPercentage}</span>`; 
                if(proComp.profile.changesPercentage.charAt(1)==='+') document.getElementById(`${symbol}c`).style.color = '#0ddd83';
                    else document.getElementById(`${symbol}c`).style.color = 'red';
            })
        })
        
        
    })
})



