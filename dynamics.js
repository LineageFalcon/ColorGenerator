class themeUI { // viewModel
    constructor() {
        this._colorModeUIElements = [4];

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

    static bindMenuButtons() {
        let btnArray = Array.prototype.slice.call(document.querySelectorAll('.menuBtn'));

        btnArray.forEach((arrayItem) => {
            let btnClass = arrayItem.className;
            console.log(btnClass);

			switch(btnClass) {
				case 'toggleColorMode menuBtn': 
				        themeUI.toggleColorMode(arrayItem);
					break;
				case 'addPnl menuBtn': 
				        themeUI.addPnl(arrayItem);
					break;
			}
		});
    }

    static bindPanelButtons(panel) {
        let btnArray = Array.prototype.slice.call(panel.querySelectorAll('button'));

        btnArray.forEach((arrayItem) => {
			let btnClass = arrayItem.className;

			switch(btnClass) {
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
            console.log('Cry');
		});
    }

    static main() {
        themeUI.bindMenuButtons();
        colorPanel.createPnl();
    }

    static colorMode() {
        let UIElements = themeUI.getColorModeUIElements();//should check item length instead of solid numbers what dimension the array has !
        for (let i = UIElements.length-1; i >= 0; i--) {
            if(i == 2) {
                UIElements[i].classList.toggle('white');
            } else if(i == 0 || i == 1 || i == 3) {
                for (let k = UIElements[i].length; k > 0; k--) {
                    UIElements[i][k-1].classList.toggle('white');
                }
            } else {
                UIElements[i][0].classList.toggle('white');
            }
        }
    }

    static mainColor(panel) {
        let ColorOne = colorConvert.ranColorGen();
        let ColorTwo;
        let ColorTwoTxt;
        
        ColorTwo = colorConvert.changeLightness(colorConvert.hexToRgb(ColorOne), 50);
        ColorTwoTxt = colorConvert.rgbToHex(ColorTwo);
        
        themeUI.distributer(ColorOne, ColorTwoTxt, panel);
    }

    static distributer(ColorOne, ColorTwoTxt, panel) {
            panel.getElementsByClassName('colorOne')[0].style.backgroundColor = ColorOne;
            panel.getElementsByClassName('colorTwo')[0].style.backgroundColor = ColorTwoTxt;
    
            panel.getElementsByClassName('btnColorGen')[0].querySelector('p').textContent = ColorOne;
            panel.getElementsByClassName('containerCTwo')[0].querySelector('p').textContent = ColorTwoTxt;
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

class colorPanel {//view
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
        themeUI.bindPanelButtons(colorPanelEl.container);
    }
}