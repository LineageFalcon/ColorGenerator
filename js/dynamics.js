class viewHandler { // viewModel
    constructor() {}

    //#region Accessors
    static setColorModeUIElements(elements) {
        viewHandler._colorModeUIElements = elements;
    }

    static getColorModeUIElements() {
        return viewHandler._colorModeUIElements;
    }
    //#endregion Accessors

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

        viewHandler.checkDeviceRotation();
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
            controller.pushNewPanel();
		});
    }

    static delPnl(arrayItem, panel) {
        arrayItem.addEventListener('click', () => {
            controller.deletePanel(panel);
		});
    }

    static genColor(arrayItem, panel) {
        arrayItem.addEventListener('click', () => {
            controller.newColors(panel);
		});
    }

    static checkDeviceRotation() {
        window.addEventListener('resize', () => {
            controller.checkDevice();
        });
    }
}
class colorPanel {//view
    constructor() {
        this.colorPanelDOMElements = {
            delBtn:  document.createElement('button'), 
            colorBtn: document.createElement('button'),
            delBtnIcon: document.createElement('i'),
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
        
        this.colorPanelElementClasses = {
            containerClass: 'colorPnl', 
            colorWrapperClass: ['colorOne', 'colorTwo'],
            delBtnClass: 'delPnl',
            delBtnIconClass: 'material-icons',
            genBtnClass: 'genColor',
            colorOneTextClass: ['containerCOne', 'cOne'],
            colorTwoTextClass: ['containerCTwo', 'cTwo'],
            toolTipClass: 'tooltip'
        }

        this.colorPanelElementColors = {
            colorOne: '#aaaaaa',
            colorTwo: '#555555',
            colorLabelOne: '#222222',
            colorLabelTwo: '#dddddd'
        }

        this._combinedColorPanel = null;

        this.combinePanelElements();
        this.generateColors();
        this.setColors();
    }

    //#region Accessors
        setCombinedColorPanel(cColorPanel) {
            this._combinedColorPanel = cColorPanel;
        }

        getCombinedColorPanel() {
            return this._combinedColorPanel;
        }
    //#endregion Accessors

    combinePanelElements() {
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.colorTwoElem);
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.colorOneElem);
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.colorBtn);
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.delBtn);
            this.colorPanelDOMElements.delBtn.append(this.colorPanelDOMElements.delBtnIcon);
                this.colorPanelDOMElements.delBtnIcon.textContent = 'remove_circle_outline';
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.cOneContainer);
            this.colorPanelDOMElements.cOneContainer.append(this.colorPanelDOMElements.cOneP);
                this.colorPanelDOMElements.cOneP.append(this.colorPanelDOMElements.toolTipOne);
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.cTwoContainer);
            this.colorPanelDOMElements.cTwoContainer.append(this.colorPanelDOMElements.cTwoP);
                this.colorPanelDOMElements.cTwoP.append(this.colorPanelDOMElements.toolTipTwo);

        this.colorPanelDOMElements.container.classList.add(this.colorPanelElementClasses.containerClass);
        this.colorPanelDOMElements.colorOneElem.classList.add(this.colorPanelElementClasses.colorWrapperClass[0]);
        this.colorPanelDOMElements.colorTwoElem.classList.add(this.colorPanelElementClasses.colorWrapperClass[1]);
        this.colorPanelDOMElements.delBtn.classList.add(this.colorPanelElementClasses.delBtnClass);
            this.colorPanelDOMElements.delBtnIcon.classList.add(this.colorPanelElementClasses.delBtnIconClass);
        this.colorPanelDOMElements.colorBtn.classList.add(this.colorPanelElementClasses.genBtnClass);
        this.colorPanelDOMElements.cOneContainer.classList.add(this.colorPanelElementClasses.colorOneTextClass[0]);
            this.colorPanelDOMElements.cOneP.classList.add(this.colorPanelElementClasses.colorOneTextClass[1]);
                this.colorPanelDOMElements.toolTipOne.classList.add(this.colorPanelElementClasses.toolTipClass);
        this.colorPanelDOMElements.cTwoContainer.classList.add(this.colorPanelElementClasses.colorTwoTextClass[0]);
            this.colorPanelDOMElements.cTwoP.classList.add(this.colorPanelElementClasses.colorTwoTextClass[1]);
                this.colorPanelDOMElements.toolTipTwo.classList.add(this.colorPanelElementClasses.toolTipClass);

        this._combinedColorPanel = this.colorPanelDOMElements.container;
    }

    generateColors() {
        this.colorPanelElementColors.colorOne = colorConvert.ranColorGen();
        this.colorPanelElementColors.colorTwo = colorConvert.hslToHex(colorConvert.changeLightness(colorConvert.hexToHsl(this.colorPanelElementColors.colorOne), -20));
        this.colorPanelElementColors.colorLabelOne = colorConvert.hslToHex(colorConvert.changeLightness(colorConvert.hexToHsl(this.colorPanelElementColors.colorOne), -20));
        this.colorPanelElementColors.colorLabelTwo = colorConvert.hslToHex(colorConvert.changeLightness(colorConvert.hexToHsl(this.colorPanelElementColors.colorOne), 15));
    }

    setColors() {//rename funciton //viewModel
        this.colorPanelDOMElements.colorOneElem.style.backgroundColor = this.colorPanelElementColors.colorOne;
        this.colorPanelDOMElements.colorTwoElem.style.backgroundColor = this.colorPanelElementColors.colorTwo;
    
        this.colorPanelDOMElements.cOneP.textContent = this.colorPanelElementColors.colorOne;
        this.colorPanelDOMElements.cTwoP.textContent = this.colorPanelElementColors.colorTwo;

        this.colorPanelDOMElements.cOneP.style.color = this.colorPanelElementColors.colorLabelOne;
        this.colorPanelDOMElements.cTwoP.style.color = this.colorPanelElementColors.colorLabelTwo;
        
        this.colorPanelDOMElements.delBtn.style.backgroundColor = this.colorPanelElementColors.colorTwo;
        this.colorPanelDOMElements.delBtn.style.color = this.colorPanelElementColors.colorOne;
    }
}

class controller {
    constructor() {
        this._colorPanel = null;
        this._containerNode = null;
    }

    //#region Accessors
    static setPushColorPanel(colorPanel) {
        controller._colorPanel.push(colorPanel);
    }

    static setSpliceColorPanel(index) {
        controller._colorPanel.splice(index, 1);
    }

    static getColorPanel() {
        return controller._colorPanel;
    }
    
    static setContainerNode(node) {
        controller._containerNode = node;
    }
    
    static getContainerNode() {
        return controller._containerNode;
     }
    //#endregion Accessors

    static check() {
        console.log(controller.getColorPanel());
    }

    static main() {
        viewHandler.bindMenuButtons();
        controller.pushNewPanel(); 
    }

    static newColors(cPanelContainer) {
        let panelArray = controller.getColorPanel();
        let index = panelArray.findIndex(e => e._combinedColorPanel === cPanelContainer);

        panelArray[index].generateColors();
        panelArray[index].setColors();
    }

    static pushNewPanel() {
        let panel = new colorPanel();
        let cPanel = panel.getCombinedColorPanel();
        let containerNode = controller.getContainerNode();
        
        document.getElementById(containerNode).insertAdjacentElement( 'beforeend', cPanel);//seperate function
        controller.checkDevice();
        viewHandler.bindPanelButtons(cPanel, panel);
        controller.setPushColorPanel(panel);
    }

    static deletePanel(panel) {
        let panelArray = controller.getColorPanel();
        let index = panelArray.findIndex(e => e._combinedColorPanel === panel);

        panel.remove();
        controller.checkDevice();
        controller.setSpliceColorPanel(index);
    }

    static checkDevice() {
        if(document.body.clientWidth <= 600) {
            controller.calcHeight();
        } else {
            controller.calcWidth();
        }
    }

    static calcHeight() {
        let colorPnl = document.getElementsByClassName('colorPnl');
        for(let i = colorPnl.length - 1; i >= 0; i--) {
            colorPnl[i].style.height = 100 / (colorPnl.length) + "%";
            colorPnl[i].style.width = "100%";
        }
    }

    static calcWidth() {//viewModel
        let colorPnl = document.getElementsByClassName('colorPnl');
        for(let i = colorPnl.length - 1; i >= 0; i--) {
            colorPnl[i].style.width = 100 / (colorPnl.length) + "%";
            colorPnl[i].style.height = "100%";
        }
    }
}