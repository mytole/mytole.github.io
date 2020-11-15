class Search {//spiner put in search result
    constructor(element) {
        this.element = element;
        this.inputGrp = document.createElement('div');
        this.inputGrpAtr = document.createAttribute('class');
        this.inputGrpAtr.value = 'input-group mb-3';
        this.inputGrp.setAttributeNode(this.inputGrpAtr);
        this.input = document.createElement('input');
        this.inputAtr1 = document.createAttribute('type');
        this.inputAtr2 = document.createAttribute('class');
        this.inputAtr3 = document.createAttribute('placeholder');
        this.inputAtr4 = document.createAttribute('aria-label');
        this.inputAtr5 = document.createAttribute('aria-describedby');
        this.inputAtr6 = document.createAttribute('id');
        this.inputAtr1.value = 'text';
        this.inputAtr2.value = 'form-control';
        this.inputAtr3.value = 'Search';
        this.inputAtr4.value = 'Search';
        this.inputAtr5.value = 'button-addon2';
        this.inputAtr6.value = 'search-input';
        this.input.setAttributeNode(this.inputAtr1);
        this.input.setAttributeNode(this.inputAtr2);
        this.input.setAttributeNode(this.inputAtr3);
        this.input.setAttributeNode(this.inputAtr4);
        this.input.setAttributeNode(this.inputAtr5);
        this.input.setAttributeNode(this.inputAtr6);
        this.divGrp = document.createElement('div');
        this.divAtr1 = document.createAttribute('class');
        this.divAtr1.value = 'input-group-append';
        this.divGrp.setAttributeNode(this.divAtr1);
        this.sBtn = document.createElement('button');
        this.btnAtr1 = document.createAttribute('class');
        this.btnAtr2 = document.createAttribute('type');
        this.btnAtr3 = document.createAttribute('id');
        this.btnAtr1.value = 'btn btn-outline-secondary';
        this.btnAtr2.value = 'button';
        this.btnAtr3.value = 'button-addon2';
        this.sBtn.setAttributeNode(this.btnAtr1);
        this.sBtn.setAttributeNode(this.btnAtr2);
        this.sBtn.setAttributeNode(this.btnAtr3);
        this.divGrp.append(this.sBtn);
        this.icon = document.createElement('i');
        this.iAtr = document.createAttribute('class');
        this.iAtr.value = 'fas fa-search';
        this.icon.setAttributeNode(this.iAtr);
        this.sBtn.append(this.icon);
        this.inputGrp.append(this.input, this.divGrp);
    }
    onSearch(callback) {
        this.element.append(this.inputGrp);
        this.sBtn.addEventListener('click', callback);
    }

}