class browserStorageInterface {
    constructor() {}
}

//createCookie();
//window.localStorage.setItem('key', 'value');

class viewHandlerOld { // viewModel
    constructor() {}

    static bindMenuButtons() {
        let btnArray = Array.prototype.slice.call(document.querySelectorAll('.menuBtn'));

        btnArray.forEach((arrayItem) => {
            let btnClass = arrayItem.className;

			switch(btnClass) {
				case 'toggleColorMode menuBtn': 
				        viewHandlerOld.toggleColorMode(arrayItem);
					break;
			}
		});
    }

    static toggleColorMode(arrayItem) {
        arrayItem.addEventListener('click', () => {
            viewHandlerOld.colorMode();
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
        this._panelContainerNode = this._controller.ContainerNode;
        this._dndHanlder = new Set();
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
                case 'dragPnl':
                    this.setDragAndDropEvent(panelListItem);
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

    setDragAndDropEvent(panelListItem) {
        new dragAndDropHandler(this._panelContainerNode, panelListItem, this._controller.ResponsiveMaxDeviceWidth);

        console.log('dnd Class created'); 
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

        this._panelAttributeOrder = 1;

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

        set PanelAttributeOrder(order) {
            this._panelAttributeOrder = order;
            this.colorPanelDOMElements.container.style.order = order;
        }

        get PanelAttributeOrder() {
            return this._panelAttributeOrder;
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
        this.colorPanelDOMElements.colorOneElem.style.boxShadow = this.colorPanelElementColors.colorOne + ' 0 0 0 1px';
        this.colorPanelDOMElements.colorTwoElem.style.boxShadow = this.colorPanelElementColors.colorTwo + ' 0 0 0 1px';
        console.log(this.colorPanelElementColors.colorTwo + ' 0 0 0 1px');
    
        this.colorPanelDOMElements.cOneBtn.textContent = this.colorPanelElementColors.colorOne;
        this.colorPanelDOMElements.cTwoBtn.textContent = this.colorPanelElementColors.colorTwo;

        this.colorPanelDOMElements.cOneBtn.style.color = this.colorPanelElementColors.colorLabelOne;
        this.colorPanelDOMElements.dragBtn.style.color = this.colorPanelElementColors.colorLabelOne;
        this.colorPanelDOMElements.cTwoBtn.style.color = this.colorPanelElementColors.colorLabelTwo;
        
        this.colorPanelDOMElements.delBtn.style.color = this.colorPanelElementColors.colorOne;
        this.colorPanelDOMElements.delBtn.style.backgroundColor = this.colorPanelElementColors.colorTwo;
    }
}

class controllerOld {
    constructor(containerNode, colorPanelList, width) {
        this._colorPanel = colorPanelList;
        this._containerNode = containerNode;
        this._colorPanelEventHandler = new colorPanelEventHandler(this);
        this._responsiveMaxDeviceWidth = width;//in die UI

        console.log(this);
        this.main();//wird durch document ready ausgeführt
    }

    //#region Accessors
    get ColorPanel() {
        return this._colorPanel;
    }
    
    set ContainerNode(node) {
        this._containerNode = node;
    }
    
    get ContainerNode() {
        return this._containerNode;
     }

     get ResponsiveMaxDeviceWidth() {
        return this._responsiveMaxDeviceWidth;
     }
    //#endregion Accessors

    main() {
        viewHandlerOld.bindMenuButtons();
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
        
        console.log(this._colorPanel.size);
        panelListItem.PanelAttributeOrder = this._colorPanel.size;
        
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
        if(document.body.clientWidth <= this._responsiveMaxDeviceWidth) {
            this.calcHeight();
        } else {
            this.calcWidth();
        }
    }

    calcHeight() {
        let coefficient = 100;
        for(let panel of this._colorPanel) {
            panel._combinedColorPanel.style.height = 100 / (this._colorPanel.size) + "%";
            panel._combinedColorPanel.style.top = coefficient - 100 / (this._colorPanel.size) + "%";
            panel._combinedColorPanel.style.width = "100%";
            panel._combinedColorPanel.style.left = 0;
            coefficient -= 100 / (this._colorPanel.size);
        }
    }

    calcWidth() {//viewModel
        let coefficient = 100;
        for(let panel of this._colorPanel) {
            panel._combinedColorPanel.style.width = 100 / (this._colorPanel.size) + "%";
            panel._combinedColorPanel.style.left = coefficient - 100 / (this._colorPanel.size) + "%";
            panel._combinedColorPanel.style.height = "100%";
            panel._combinedColorPanel.style.top = 0;
            coefficient -= 100 / (this._colorPanel.size);
        }
    }
}