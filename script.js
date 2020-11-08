const vars = {
    sInput: document.getElementById("search-input"),
    sBtn: document.getElementById("button-addon2"),
    showSpinner: function (spinner) { spinner.style.display = "inline-block"; },
    hideSpinner: function (spinner) { spinner.style.display = "none"; },
    searchSpinner: document.getElementById("loading-res"),
    resultsRow: document.getElementById("results")
}

vars.sBtn.addEventListener('click', () => {
    let userInput = vars.sInput.value;
    let resultsCols = document.querySelectorAll('.result');
    vars.showSpinner(vars.searchSpinner);
    resultsCols.forEach( col=>col.remove());
    fetch('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=' + userInput + '&limit=10&exchange=NASDAQ').then(response => {
        response.json().then(data => {
            vars.hideSpinner(vars.searchSpinner);
            for (let i = 0; i < data.length; i++) {
                let currentCol = document.createElement("div");
                let spaceCol = document.createElement("div");
                currentCol.classList.add("col-sm-10", "col-md-6", "w-20", "mx-auto", "result", "p-3");
                spaceCol.classList.add("w-100");
                vars.resultsRow.appendChild(currentCol);
                vars.resultsRow.appendChild(spaceCol);
                currentCol.innerHTML = `${data[i].name} <b>(${data[i].symbol})</b>`;
            }

        })
    })

})
