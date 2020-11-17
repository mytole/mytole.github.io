class Compare {
    static comparedCount = 0;
    static comparedList = [];
    constructor(element) {
        this.element = element;

    }
    load() {
        this.element.innerHTML += `<div class="col-sm-12 col-md-7 pr-0" id="compare-container">
        <div id="compare-wrapper"></div>
        <a id="companies-compare-link" href="compare.html?symbols="><button type="button" class="btn btn-primary" id="companies-compare" disabled >Compare</button></a>
      </div>`;
        const alertMax = document.createElement('span');
        alertMax.classList.add('col-8');
        alertMax.setAttribute('id', 'maxAlert');
        alertMax.innerText = 'Oops! Maximum 3 companies to compare.';
        alertMax.style.color = 'red';
        const alertSame = document.createElement('span');
        alertSame.classList.add('col-8');
        alertSame.setAttribute('id', 'sameAlert');
        alertSame.innerText = 'Oops! Can not add the same company to compare.';
        alertSame.style.color = 'red';
        this.element.append(alertMax, alertSame);
        Compare.hideAlertGreater();
        Compare.hideAlertSame();
    }
    static setCompareBtnAtr() {
        let comparedComps = "";
        for (let i = 0; i < Compare.comparedList.length; i++) {
            if (i === Compare.comparedList.length - 1) comparedComps += Compare.comparedList[i];
            else comparedComps += Compare.comparedList[i] + "_";
        }
        document.getElementById('companies-compare-link').setAttribute('href', `compare.html?symbols=${comparedComps}`);
    }
    static showAlertGreater() {
        document.getElementById('maxAlert').style.display = 'block';
    }
    static hideAlertGreater() {
        document.getElementById('maxAlert').style.display = 'none';
    }
    static showAlertSame() {
        document.getElementById('sameAlert').style.display = 'block';
    }
    static hideAlertSame() {
        document.getElementById('sameAlert').style.display = 'none';
    }
    static checkCompareBtn() {
        if (Compare.comparedCount >= 2) document.getElementById('companies-compare').disabled = false;
        else document.getElementById('companies-compare').disabled = true;
    }
    static onCompare(symbol) {
        const compareCon = document.getElementById('compare-wrapper');

        if (Compare.comparedList.includes(symbol)) Compare.showAlertSame();
        if (Compare.comparedCount === 3) {

            Compare.showAlertGreater();
        }
        if ((this.comparedCount <= 2) && !(Compare.comparedList.includes(symbol))) {
            Compare.comparedList.push(symbol);
            Compare.hideAlertSame();
            Compare.hideAlertGreater();
            Compare.comparedCount++;
            Compare.checkCompareBtn();
            Compare.setCompareBtnAtr();
            let compDiv = document.createElement('div');
            compDiv.setAttribute('id', `${symbol}ald`);
            compDiv.classList.add('compared');
            compDiv.innerHTML = `<div class="compared">
            ${symbol}
            <button id="${symbol}alc" type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>`;
            compareCon.append(compDiv);
            document.getElementById(`${symbol}alc`).addEventListener(`click`, () => {
                document.getElementById(`${symbol}ald`).remove();
                Compare.hideAlertGreater();
                Compare.comparedList.splice(Compare.comparedList.indexOf(symbol), 1);
                Compare.comparedCount--;
                Compare.checkCompareBtn();
                Compare.setCompareBtnAtr();
            })

        }
    }
    static compareResultListen(compareId) {
        document.getElementById(compareId).addEventListener('click', () => {

            Compare.onCompare(compareId.substring(0, compareId.length - 1));
        })
    }
}