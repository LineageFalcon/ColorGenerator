class viewHandler { // viewModel
    constructor() {
        viewHandler._colorModeUIElements = [4];

        colorPanel.main();
    }

    //#region Setter
    static setColorModeUIElements(elements) {
        viewHandler._colorModeUIElements = elements;
    }

    static getColorModeUIElements() {
        return viewHandler._colorModeUIElements;
    }
    //#endregion Setter

    static bindMenuButtons() {
        let btnArray = Array.prototype.slice.call(document.querySelectorAll('.menuBtn'));

        btnArray.forEach((arrayItem) => {
            let btnClass = arrayItem.className;

			switch(btnClass) {
				case 'toggleColorMode menuBtn': 
				        viewHandler.toggleColorMode(arrayItem);
					break;
				case 'addPnl menuBtn': 
				        viewHandler.addPnl(arrayItem);
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
				        viewHandler.delPnl(arrayItem, panel);
					break;
				case 'genColor':
				        viewHandler.genColor(arrayItem, panel);
					break;
			}
		});
    }

    static toggleColorMode(arrayItem) {
        arrayItem.addEventListener('click', () => {
            viewHandler.colorMode();
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

    static delPnl(arrayItem, panel) {
        arrayItem.addEventListener('click', () => {
            panel.remove();
            colorPanel.calcWidth();
		});
    }

    static genColor(arrayItem, panel) {
        arrayItem.addEventListener('click', () => {
            colorPanel.mainColor(panel);
		});
    }
}
class colorPanel {//view
    constructor() {
        this._colorPanelList;

        colorPanel._colorPanelList = [0];
    }

    //#region Setter
    static setColorPanelList(list) {
        this._colorPanelList.push(list);
    }

    static getColorPanelList() {
        return this._colorPanelList;
    }
    //#endregion Setter

    static createPnl() { //calling from instance (give instance as parameter)(maybe)
        let node = document.getElementById('container');
        let colorPanelEl = {
            delBtn:  document.createElement('button'), 
            colorBtn: document.createElement('button'), 
            cOneP: document.createElement('p'),
            cTwoP: document.createElement('p'),
            toolTipOne: document.createElement('span'),
            toolTipTwo: document.createElement('span'),
            container: document.createElement('div'),
            colorOneElem: document.createElement('div'),
            colorTwoElem: document.createElement('div'),
            cOneContainer: document.createElement('div'), 
            cTwoContainer: document.createElement('div')
        }
        
        let PnlClasses = {
            containerClass: 'colorPnl', 
            colorWrapperClass: ['colorOne', 'colorTwo'],
            delBtnClass: 'delPnl',
            genBtnClass: 'genColor',
            colorOneTextClass: ['containerCOne', 'cOne'],
            colorTwoTextClass: ['containerCTwo', 'cTwo'],
            toolTipClass: 'tooltip'
        }

        colorPanelEl.container.append(colorPanelEl.colorTwoElem);
        colorPanelEl.container.append(colorPanelEl.colorOneElem);
        colorPanelEl.container.append(colorPanelEl.colorBtn);
        colorPanelEl.container.append(colorPanelEl.delBtn);
            colorPanelEl.delBtn.textContent = '🗙';
        colorPanelEl.container.append(colorPanelEl.cOneContainer);
            colorPanelEl.cOneContainer.append(colorPanelEl.cOneP);
                colorPanelEl.cOneP.append(colorPanelEl.toolTipOne);
        colorPanelEl.container.append(colorPanelEl.cTwoContainer);
            colorPanelEl.cTwoContainer.append(colorPanelEl.cTwoP);
                colorPanelEl.cTwoP.append(colorPanelEl.toolTipTwo);

        console.log(colorPanelEl.container);

        colorPanelEl.container.classList.add(PnlClasses.containerClass);
        colorPanelEl.colorOneElem.classList.add(PnlClasses.colorWrapperClass[0]);
        colorPanelEl.colorTwoElem.classList.add(PnlClasses.colorWrapperClass[1]);
        colorPanelEl.delBtn.classList.add(PnlClasses.delBtnClass);
        colorPanelEl.colorBtn.classList.add(PnlClasses.genBtnClass);
        colorPanelEl.cOneContainer.classList.add(PnlClasses.colorOneTextClass[0]);
            colorPanelEl.cOneP.classList.add(PnlClasses.colorOneTextClass[1]);
                colorPanelEl.toolTipOne.classList.add(PnlClasses.toolTipClass);
        colorPanelEl.cTwoContainer.classList.add(PnlClasses.colorTwoTextClass[0]);
            colorPanelEl.cTwoP.classList.add(PnlClasses.colorTwoTextClass[1]);
                colorPanelEl.toolTipTwo.classList.add(PnlClasses.toolTipClass);
    
        // colorPanel._colorPanelList.push(colorPanelEl.container);
        node.insertAdjacentElement( 'beforeend', colorPanelEl.container);//seperate funciton
        colorPanel.calcWidth();
        colorPanel.mainColor(colorPanelEl.container);
        viewHandler.bindPanelButtons(colorPanelEl.container);
        // console.log(colorPanel.getColorPanelList());
    }

    static main() {
        viewHandler.bindMenuButtons();
        colorPanel.createPnl();
    }

    static mainColor(panel) {//rename function //model
        let ColorOne = colorConvert.ranColorGen();
        let ColorTwo;
        let UIColorCOne;
        let UIColorCTwo;
        
        ColorTwo = colorConvert.changeLightness(colorConvert.hexToHsl(ColorOne), -20);
        ColorTwo = colorConvert.hslToHex(ColorTwo);
        UIColorCOne = colorConvert.changeLightness(colorConvert.hexToHsl(ColorOne), -25);
        UIColorCOne = colorConvert.hslToHex(UIColorCOne);
        UIColorCTwo = colorConvert.changeLightness(colorConvert.hexToHsl(ColorTwo), 25);
        UIColorCTwo = colorConvert.hslToHex(UIColorCTwo);
        
        // colorPanel.distributerLogic(ColorOne, ColorTwo, UIColorCOne, UIColorCTwo, panel);
        colorPanel.distributerView(ColorOne, ColorTwo, UIColorCOne, UIColorCTwo, panel);
    }

    static distributerView(ColorOne, ColorTwo, UIColorCOne, UIColorCTwo , panel) {//rename funciton //viewModel
        let cOne = panel.getElementsByClassName('cOne')[0];
        let cTwo = panel.getElementsByClassName('cTwo')[0];
        let delPnl = panel.getElementsByClassName('delPnl')[0];

        panel.getElementsByClassName('colorOne')[0].style.backgroundColor = ColorOne;
        panel.getElementsByClassName('colorTwo')[0].style.backgroundColor = ColorTwo;
    
        cOne.textContent = ColorOne;
        cTwo.textContent = ColorTwo;

        cOne.style.color = UIColorCOne;
        cTwo.style.color = UIColorCTwo;

        delPnl.style.backgroundColor = ColorTwo;
        delPnl.style.color = ColorOne;
    }

    static calcWidth() {//viewModel
        let colorPnl = document.getElementsByClassName('colorPnl');
        for(let i = colorPnl.length - 1; i >= 0; i--) {
            colorPnl[i].style.width = 100 / (colorPnl.length) + "%";
        }
    }
}