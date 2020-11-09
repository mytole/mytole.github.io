const vars = {
    sInput: document.getElementById("search-input"),
    sBtn: document.getElementById("button-addon2"),
    compImageCol: document.getElementById("comp-image"),
    compNameCol: document.getElementById("comp-name"),
    compPriceCol: document.getElementById("comp-price"),
    compChangeCol: document.getElementById("comp-change"),
    compDesCol: document.getElementById("comp-des"),
    chart: document.getElementById('myChart').getContext('2d'),
    showSpinner: function (spinner) { spinner.style.display = "inline-block"; },
    hideSpinner: function (spinner) { spinner.style.display = "none"; },
    searchSpinner: document.getElementById("loading-res"),
    companySpinner: document.getElementById("company-spinner"),
    resultsRow: document.getElementById("results"),
    urlParams: new URLSearchParams(window.location.search)
}