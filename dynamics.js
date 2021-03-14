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
            controller.createPanel();
		});
    }

    static delPnl(arrayItem, panel) {
        arrayItem.addEventListener('click', () => {
            panel.remove();
            controller.calcWidth();
		});
    }

    static genColor(arrayItem, panel) {
        arrayItem.addEventListener('click', () => {
            controller.newColors(panel);
		});
    }
}
class colorPanel {//view
    constructor() {
        this.colorPanelDOMElements = {
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
        
        this.colorPanelElementClasses = {
            containerClass: 'colorPnl', 
            colorWrapperClass: ['colorOne', 'colorTwo'],
            delBtnClass: 'delPnl',
            genBtnClass: 'genColor',
            colorOneTextClass: ['containerCOne', 'cOne'],
            colorTwoTextClass: ['containerCTwo', 'cTwo'],
            toolTipClass: 'tooltip'
        }

        this._combinedColorPanel = null;
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
            this.colorPanelDOMElements.delBtn.textContent = '🗙';
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
        let colorOne = colorConvert.ranColorGen();
        let colorTwo;
        let UIColorCOne;
        let UIColorCTwo;
        
        colorTwo = colorConvert.changeLightness(colorConvert.hexToHsl(colorOne), -20);
        colorTwo = colorConvert.hslToHex(colorTwo);
        UIColorCOne = colorConvert.changeLightness(colorConvert.hexToHsl(colorOne), -25);
        UIColorCOne = colorConvert.hslToHex(UIColorCOne);
        UIColorCTwo = colorConvert.changeLightness(colorConvert.hexToHsl(colorTwo), 25);
        UIColorCTwo = colorConvert.hslToHex(UIColorCTwo);
        
        // colorPanel.distributerLogic(ColorOne, ColorTwo, UIColorCOne, UIColorCTwo, panel);
        return {cOne: colorOne, cTwo: colorTwo, UIcolorCOne: UIColorCOne, UIcolorCTwo: UIColorCTwo};
    }

    distributerView(colorObject) {//rename funciton //viewModel
        this.colorPanelDOMElements.colorOneElem.style.backgroundColor = colorObject.cOne;
        this.colorPanelDOMElements.colorTwoElem.style.backgroundColor = colorObject.cTwo;
    
        
        this.colorPanelDOMElements.cOneP.textContent = colorObject.cOne;
        this.colorPanelDOMElements.cTwoP.textContent = colorObject.cTwo;

        this.colorPanelDOMElements.cOneP.style.color = colorObject.UIcolorCOne;
        this.colorPanelDOMElements.cTwoP.style.color = colorObject.UIcolorCTwo;

        
        this.colorPanelDOMElements.delBtn.style.backgroundColor = colorObject.cTwo;
        this.colorPanelDOMElements.delBtn.style.color = colorObject.cOne;
    }
}

class controller {
    constructor() {
        this._colorPanel = null;
        this._containerNode = null;
    }

    //#region Accessors
    static setColorPanel(colorPanel) {
        controller._colorPanel.push(colorPanel);
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
        controller.createPanel(); 
    }

    static addPanel() {

    }

    static newColors(cPanelContainer) {
        let panel = controller.getColorPanel();
        let i = panel.findIndex(e => e._combinedColorPanel === cPanelContainer);

        panel[i].distributerView(panel[i].generateColors());
    }

    static createPanel() {
        let panel = new colorPanel();
        panel.combinePanelElements();
        let cPanel = panel.getCombinedColorPanel();
        let containerNode = controller.getContainerNode();
        document.getElementById(containerNode).insertAdjacentElement( 'beforeend', cPanel);//seperate function
        controller.calcWidth();
        panel.distributerView(panel.generateColors());
        viewHandler.bindPanelButtons(cPanel, panel);
        controller.setColorPanel(panel);
    }

    static calcWidth() {//viewModel
        let colorPnl = document.getElementsByClassName('colorPnl');
        for(let i = colorPnl.length - 1; i >= 0; i--) {
            colorPnl[i].style.width = 100 / (colorPnl.length) + "%";
        }
    }
}