class SearchResult {
    constructor(element){
        this.element = element;
        this.spinner = document.createElement('div');
        this.spinAtr1 = document.createAttribute('class');
        this.spinAtr2 = document.createAttribute('id');
        this.spinAtr1.value = 'col-sm-12 col-md-8 w-90 mx-auto text-center';
        this.spinAtr2.value = 'loading-res';
        this.spinner.setAttributeNode(this.spinAtr1);
        this.spinner.setAttributeNode(this.spinAtr2);
        this.spinnerInnerDiv = document.createElement('div');
        this.spinnerInnerAtr1 = document.createAttribute('class');
        this.spinnerInnerAtr2 = document.createAttribute('role');
        this.spinnerInnerAtr1.value = 'spinner-border';
        this.spinnerInnerAtr2.value = 'status';
        this.spinnerInnerDiv.setAttributeNode(this.spinnerInnerAtr1);
        this.spinnerInnerDiv.setAttributeNode(this.spinnerInnerAtr2);
        this.spinner.append(this.spinnerInnerDiv);
        this.element.append(this.spinner);
    }
    showSpinner(spinner) { spinner.style.display = "inline-block"; }
    hideSpinner(spinner) { spinner.style.display = "none"; }
    renderResults(userInput1){
        let userInput = userInput1;
        let resultsCols = document.querySelectorAll('.result');
        this.showSpinner(this.spinner);
        resultsCols.forEach( col=>col.remove());
        fetch('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=' + userInput + '&limit=10&exchange=NASDAQ').then(response => {
            response.json().then(data => {
                this.hideSpinner(this.spinner);
                for (let i = 0; i < data.length; i++) {
                    let currentCol = document.createElement("div");
                    let spaceCol = document.createElement("div");
                    currentCol.classList.add("col-sm-10", "col-md-6", "w-20", "mx-auto", "result", "p-3");
                    spaceCol.classList.add("w-100");
                    this.element.appendChild(currentCol);
                    this.element.appendChild(spaceCol);
                    let url = "company.html?symbol="+data[i].symbol;
                    getProfile(data[i].symbol).then(ful=>{
                        currentCol.innerHTML = `<img src="${ful.profile.image}" width="40" height="40"><a href=${url}><span id="cName${data[i].symbol}">${data[i].name}</span> <b id="${data[i].symbol}${i}">(${data[i].symbol})</b> <span class="res-float" id="${data[i].symbol}">${ful.profile.changesPercentage}</span></a>`;
                        let userInputUp = userInput.toUpperCase();
                        let lightSymb = document.getElementById(`${data[i].symbol}${i}`);
                        if(lightSymb.innerHTML.indexOf(userInputUp)!==-1){
                            lightSymb.innerHTML = lightSymb.innerHTML.substring(0, lightSymb.innerHTML.indexOf(userInputUp))+"<span class='highlight'>" + lightSymb.innerHTML.substring(lightSymb.innerHTML.indexOf(userInputUp), lightSymb.innerHTML.indexOf(userInputUp)+userInputUp.length) + "</span>" + lightSymb.innerHTML.substring(lightSymb.innerHTML.indexOf(userInputUp)+userInputUp.length);
                        }
                        let lightName = document.getElementById(`cName${data[i].symbol}`);
                        let copyInnerUpper = lightName.innerHTML.toUpperCase();
                        if(copyInnerUpper.indexOf(userInputUp)!==-1){
                            lightName.innerHTML = lightName.innerHTML.substring(0, copyInnerUpper.indexOf(userInputUp))+"<span class='highlight'>" + lightName.innerHTML.substring(copyInnerUpper.indexOf(userInputUp), copyInnerUpper.indexOf(userInputUp)+userInputUp.length) + "</span>" + lightName.innerHTML.substring(copyInnerUpper.indexOf(userInputUp)+userInputUp.length);
                        }
                        if(ful.profile.changesPercentage.charAt(1)==='+') document.getElementById(data[i].symbol).style.color = '#0ddd83';
                        else document.getElementById(data[i].symbol).style.color = 'red';
                    })
                    
                    
                }

            })
        })
        
    }
}
