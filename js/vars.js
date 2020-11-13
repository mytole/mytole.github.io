const vars = {
    searchForm: document.getElementById("form"),
    marquee: document.getElementById("marquee-content"),
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
async function getProfile(symbol) {
    let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);
    let data = await response.json();
    return data;
}




