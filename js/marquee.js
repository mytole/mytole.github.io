class Marquee {
    constructor(element){
        this.marqElement = element;
    }
    load(){
        fetch('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list').then(response=>{
    response.json().then(data=>{
        data.splice(50, data.length-50);
        
        let compSymbs = [];
        data.forEach(comp => compSymbs.push(comp.symbol));
        compSymbs.forEach(symbol => {
            getProfile(symbol).then(proComp =>{
                console.log(proComp);
                let currLi = document.createElement("li");
                this.marqElement.appendChild(currLi);
                currLi.innerHTML = `<b>${symbol}</b>&nbsp${proComp.profile.price}$  ${proComp.profile.changes} <span id="${symbol}c">${proComp.profile.changesPercentage}</span>`; 
                if(proComp.profile.changesPercentage.charAt(1)==='+') document.getElementById(`${symbol}c`).style.color = '#0ddd83';
                    else document.getElementById(`${symbol}c`).style.color = 'red';
            })
        })
        
        
    })
    
})
    }
}