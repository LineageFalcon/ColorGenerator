document.addEventListener("DOMContentLoaded", function() {
    new colorConvert();
    new colorPanel();

    colorPanel.createPnl();
    new themeUI();
});

class themeUI { // need to be reworked to take instance parameters
    constructor() {
        this._colorModeUIElements = [4];
        //buttons eventListener hinzufügen
        //2 buttons

        themeUI.bindControls();
        themeUI.loadUIElements();
        themeUI.main();
    }

    //#region Setter
    static setColorModeUIElements(elements) {
        this._colorModeUIElements = elements;
    }

    static getColorModeUIElements() {
        return this._colorModeUIElements;
    }
    //#endregion Setter

    static loadUIElements() {
        let elements = [4];
        elements[0] = document.querySelectorAll('button');
        elements[1] = document.getElementsByClassName('cTwo');
        elements[2] = document.querySelector('section').querySelector('p');
        elements[3] = document.getElementsByClassName('btnColorGen');


        themeUI.setColorModeUIElements(elements);
    }

    static bindControls() {
        let btnArray = Array.prototype.slice.call(document.querySelectorAll('button'));

        btnArray.forEach((arrayItem) => {
			let btnClass = arrayItem.className;

			switch(btnClass) {
				case 'toggleColorMode': 
				        themeUI.toggleColorMode(arrayItem);
					break;
				case 'addPnl': 
				        themeUI.addPnl(arrayItem);
					break;
				case 'delPnl':
				        themeUI.delPnl(arrayItem);
					break;
				case 'genColor':
				        themeUI.genColor(arrayItem);
					break;
			}
		});
    }

    static toggleColorMode(arrayItem) {
        arrayItem.addEventListener('click', () => {
            themeUI.colorMode();
            if(arrayItem.classList.contains('white')) {
                arrayItem.textContent = "lightmode";
            } else {
                arrayItem.textContent = "darkmode";
            }
        });
    }

    static addPnl(arrayItem) {
        arrayItem.addEventListener('click', () => {
            colorPanel.createPnl();
            themeUI.bindControls();
		});
    }

    static delPnl(arrayItem) {
        arrayItem.addEventListener('click', () => {
            let pnlContainer = arrayItem.parentNode.parentNode;
            pnlContainer.remove();
            themeUI.calcWidth();
		});
    }

    static genColor(arrayItem) {
        arrayItem.addEventListener('click', () => {
            let pnlContainer = arrayItem.parentNode.parentNode;
            themeUI.mainColor(pnlContainer);
		});
    }

    static main() {
        themeUI.colorMode();
    }

    static colorMode() {
        let elements = themeUI.getColorModeUIElements();//should check item length instead of solid numbers what dimension the array has !
        for (let i = elements.length-1; i >= 0; i--) {
            if(i == 2) {
                elements[i].classList.toggle('white');
            } else if(i == 0 || i == 1 || i == 3) {
                for (let k = elements[i].length; k > 0; k--) {
                    elements[i][k-1].classList.toggle('white');
                }
            } else {
                elements[i][0].classList.toggle('white');
            }
        }
    }

    static mainColor(pnlID) {//handle objects --> which are create with createElement and stored in an array !
        let ColorOne = colorConvert.ranColorGen();
        let ColorTwo;
        let ColorTwoTxt;
        
        ColorTwo = colorConvert.changeLightness(colorConvert.hexToRgb(ColorOne), 50);
        ColorTwoTxt =colorConvert.rgbToHex(ColorTwo);
        
        themeUI.distributer(ColorOne, ColorTwoTxt, pnlID);
    }

    static distributer(ColorOne, ColorTwoTxt, PnlID) {
    
            PnlID.getElementsByClassName('colorOne')[0].style.backgroundColor = ColorOne;
            PnlID.getElementsByClassName('colorTwo')[0].style.backgroundColor = ColorTwoTxt;
    
            PnlID.getElementsByClassName('btnColorGen')[0].querySelector('p').textContent = ColorOne;
            PnlID.getElementsByClassName('containerCTwo')[0].querySelector('p').textContent = ColorTwoTxt;
    }

    static calcWidth() {
        let colorPnl = document.getElementsByClassName('colorPnl');
        let addPnl = document.getElementsByClassName('addPnl');
        for(let i = colorPnl.length - 1; i >= 0; i--) {
            colorPnl[i].style.width = 100 / (colorPnl.length + 1) + "%";
        }
        addPnl[0].style.width = 100 / (colorPnl.length + 1) + "%";
    }
}

class colorPanel {
    constructor() {
        this._colorPanelList = [null];
    }

    //#region Setter
    static setColorPanelList(list, i) {
        this._colorPanelList[i] = list;
    }

    static getColorPanelList() {
        return this._colorPanelList;
    }
    //#endregion Setter

    static createPnl() { //calling from instance (give instance as parameter)(maybe)
        let pnlList = colorPanel.getColorPanelList();
        let colorPanelEl = {//first layer
            delBtn:  document.createElement('button'), 
            colorBtn: document.createElement('button'), 
            colorBtnSection: document.createElement('section'), 
            colorBtnSectionP: document.createElement('p'),
            cTwoP: document.createElement('p'),
            container: document.createElement('div'),
            colorOneElem: document.createElement('div'),
            colorTwoElem: document.createElement('div'),
            delContainer: document.createElement('div'),
            cTwoContainer: document.createElement('div')
        }
        
        let PnlClasses = {
            containerClass: 'colorPnl', 
            colorWrapperClass: ['colorOne', 'colorTwo'],
            delBtnClass: ['delete-container', 'delPnl'],
            sectionControlClass: ['btnColorGen', 'genColor'],
            sectionSignClass: ['containerCTwo', 'cTwo']
        }

        colorPanelEl.container.append(colorPanelEl.colorOneElem);
        colorPanelEl.container.append(colorPanelEl.colorTwoElem);
        colorPanelEl.container.append(colorPanelEl.delContainer);
            colorPanelEl.delContainer.append(colorPanelEl.delBtn);
                colorPanelEl.delBtn.textContent = '-';
        colorPanelEl.container.append(colorPanelEl.colorBtnSection);
            colorPanelEl.colorBtnSection.append(colorPanelEl.colorBtn);
                colorPanelEl.colorBtn.textContent = 'Generieren';
            colorPanelEl.colorBtnSection.append(colorPanelEl.colorBtnSectionP);
        colorPanelEl.container.append(colorPanelEl.cTwoContainer);
            colorPanelEl.cTwoContainer.append(colorPanelEl.cTwoP);

        console.log(colorPanelEl.container);

        colorPanelEl.container.classList.add(PnlClasses.containerClass);
        colorPanelEl.colorOneElem.classList.add(PnlClasses.colorWrapperClass[0]);
        colorPanelEl.colorTwoElem.classList.add(PnlClasses.colorWrapperClass[1]);
        colorPanelEl.delContainer.classList.add(PnlClasses.delBtnClass[0]);
            colorPanelEl.delBtn.classList.add(PnlClasses.delBtnClass[1]);
        colorPanelEl.colorBtnSection.classList.add(PnlClasses.sectionControlClass[0]);
            colorPanelEl.colorBtn.classList.add(PnlClasses.sectionControlClass[1]);
        colorPanelEl.cTwoContainer.classList.add(PnlClasses.sectionSignClass[0]);
            colorPanelEl.cTwoP.classList.add(PnlClasses.sectionSignClass[1]);

        let node = document.getElementsByClassName('addPnl')[0];
        node.insertAdjacentElement( 'beforebegin', colorPanelEl.container);

        themeUI.calcWidth();
        themeUI.mainColor(colorPanelEl.container);
    }
}

class controller {
    constructor() {

    }
}