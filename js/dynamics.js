class browerStorageInterface {
    constructor() {}
}

//createCookie();
//window.localStorage.setItem('key', 'value');

class viewHandler { // viewModel
    constructor() {}

    static bindMenuButtons() {
        let btnArray = Array.prototype.slice.call(document.querySelectorAll('.menuBtn'));

        btnArray.forEach((arrayItem) => {
            let btnClass = arrayItem.className;

			switch(btnClass) {
				case 'toggleColorMode menuBtn': 
				        viewHandler.toggleColorMode(arrayItem);
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
}

class colorPanelEventHandler {
    constructor(controller) {
        this._controller = controller;
    }

    bindAddBtn() {//temporary method
        let addBtn = document.getElementById('addPnl');//temporary variable
        this.addPnl(addBtn);//temporary method 
    }

    bindPanelButtons(panelListItem) {
        let btnArray = Array.prototype.slice.call(panelListItem._combinedColorPanel.querySelectorAll('button'));

        btnArray.forEach((arrayItem) => {
			let btnClass = arrayItem.className;

			switch(btnClass) {
				case 'delPnl':
				        this.delPnl(arrayItem, panelListItem);
					break;
				case 'genColor':
				        this.genColor(arrayItem, panelListItem);
					break;
                // case 'addPnl menuBtn': 
				//         this.addPnl(arrayItem);
				// 	break;
			}
		});

        this.checkDeviceRotation();
    }

    delPnl(arrayItem, panelListItem) {
        arrayItem.addEventListener('click', () => {
            this._controller.deletePanel(panelListItem);
		});
    }

    genColor(arrayItem, panelListItem) {
        arrayItem.addEventListener('click', () => {
            this._controller.newColors(panelListItem);
		});
    }

    addPnl(arrayItem) {
        arrayItem.addEventListener('click', () => {
            this._controller.pushNewPanel();
		});
    }

    checkDeviceRotation() {
        window.addEventListener('resize', () => {
            this._controller.checkDevice();
        });
    }
}
class colorPanel {//view
    constructor() {
        this.colorPanelDOMElements = {
            delBtn:  document.createElement('button'), 
            colorBtn: document.createElement('button'),
            dragBtn: document.createElement('button'),
            cTwoBtn: document.createElement('button'),
            cOneBtn: document.createElement('button'),
            delBtnIcon: document.createElement('i'),
            dragBtnIcon: document.createElement('i'),
            toolTipOne: document.createElement('span'),
            toolTipTwo: document.createElement('span'),
            container: document.createElement('div'),
            colorOneElem: document.createElement('div'),
            colorTwoElem: document.createElement('div')
        }
        
        this.colorPanelElementClasses = {
            containerClass: 'colorPnl', 
            colorWrapperClass: ['colorOne', 'colorTwo'],
            delBtnClass: 'delPnl',
            btnIconClass: 'material-icons',
            genBtnClass: 'genColor',
            colorOneTextBtnClass: 'cOne',
            colorTwoTextBtnClass: 'cTwo',
            toolTipClass: 'tooltip',
            dragBtnClass: 'dragPnl'
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
        set CombinedColorPanel(cColorPanel) {
            this._combinedColorPanel = cColorPanel;
        }

        get CombinedColorPanel() {
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
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.dragBtn);
            this.colorPanelDOMElements.dragBtn.append(this.colorPanelDOMElements.dragBtnIcon);
                this.colorPanelDOMElements.dragBtnIcon.textContent = 'drag_handle';
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.cOneBtn);
            this.colorPanelDOMElements.cOneBtn.append(this.colorPanelDOMElements.toolTipOne);
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.cTwoBtn);
            this.colorPanelDOMElements.cTwoBtn.append(this.colorPanelDOMElements.toolTipTwo);

        this.colorPanelDOMElements.container.classList.add(this.colorPanelElementClasses.containerClass);
        this.colorPanelDOMElements.colorOneElem.classList.add(this.colorPanelElementClasses.colorWrapperClass[0]);
        this.colorPanelDOMElements.colorTwoElem.classList.add(this.colorPanelElementClasses.colorWrapperClass[1]);
        this.colorPanelDOMElements.delBtn.classList.add(this.colorPanelElementClasses.delBtnClass);
            this.colorPanelDOMElements.delBtnIcon.classList.add(this.colorPanelElementClasses.btnIconClass);
        this.colorPanelDOMElements.dragBtn.classList.add(this.colorPanelElementClasses.dragBtnClass);
            this.colorPanelDOMElements.dragBtnIcon.classList.add(this.colorPanelElementClasses.btnIconClass)
        this.colorPanelDOMElements.colorBtn.classList.add(this.colorPanelElementClasses.genBtnClass);
        this.colorPanelDOMElements.cOneBtn.classList.add(this.colorPanelElementClasses.colorOneTextBtnClass);
            // this.colorPanelDOMElements.toolTipOne.classList.add(this.colorPanelElementClasses.toolTipClass);
        this.colorPanelDOMElements.cTwoBtn.classList.add(this.colorPanelElementClasses.colorTwoTextBtnClass);
            // this.colorPanelDOMElements.toolTipTwo.classList.add(this.colorPanelElementClasses.toolTipClass);

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
    
        this.colorPanelDOMElements.cOneBtn.textContent = this.colorPanelElementColors.colorOne;
        this.colorPanelDOMElements.cTwoBtn.textContent = this.colorPanelElementColors.colorTwo;

        this.colorPanelDOMElements.cOneBtn.style.color = this.colorPanelElementColors.colorLabelOne;
        this.colorPanelDOMElements.dragBtn.style.color = this.colorPanelElementColors.colorLabelOne;
        this.colorPanelDOMElements.cTwoBtn.style.color = this.colorPanelElementColors.colorLabelTwo;
        
        this.colorPanelDOMElements.delBtn.style.backgroundColor = this.colorPanelElementColors.colorTwo;
        this.colorPanelDOMElements.delBtn.style.color = this.colorPanelElementColors.colorOne;
    }
}

class controller {
    constructor(containerNode, colorPanelList) {
        this._colorPanel = colorPanelList;
        this._containerNode = containerNode;
        this._colorPanelEventHandler = new colorPanelEventHandler(this);

        console.log(this);
        this.main();
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

    main() {
        viewHandler.bindMenuButtons();
        this._colorPanelEventHandler.bindAddBtn();
        this.pushNewPanel(); 

        this.colorPanel;
    }

    newColors(panelListItem) {
        for (let panel of this._colorPanel) {
            if(panel._combinedColorPanel === panelListItem._combinedColorPanel) {
                panel.generateColors();
                panel.setColors();
            }
        }
    }

    pushNewPanel() {
        let panelListItem = new colorPanel();
        let cPanel = panelListItem.CombinedColorPanel;
        
        document.getElementById(this._containerNode).insertAdjacentElement( 'beforeend', cPanel);//seperate function
        this._colorPanel.add(panelListItem);
        this._colorPanelEventHandler.bindPanelButtons(panelListItem);
        this.checkDevice();
    }

    deletePanel(panelListItem) {
        panelListItem._combinedColorPanel.remove();
        this._colorPanel.delete(panelListItem);
        this.checkDevice();
    }

    checkDevice() {
        if(document.body.clientWidth <= 600) {
            this.calcHeight();
        } else {
            this.calcWidth();
        }
    }

    calcHeight() {
        for(let panel of this._colorPanel) {
            panel._combinedColorPanel.style.height = 100 / (this._colorPanel.size) + "%";
            panel._combinedColorPanel.style.width = "100%";
        }
    }

    calcWidth() {//viewModel
        for(let panel of this._colorPanel) {
            panel._combinedColorPanel.style.width = 100 / (this._colorPanel.size) + "%";
            panel._combinedColorPanel.style.height = "100%";
        }
    }
}