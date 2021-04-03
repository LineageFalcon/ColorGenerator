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

    pushNewPanel() {
        let panelListItem = new colorPanel();
        
        let cPanel = panelListItem.CombinedColorPanel;
        
        console.log(this._colorPanel.size);
        panelListItem.PanelAttributeOrder = this._colorPanel.size;
        
        document.getElementById(this._containerNode).insertAdjacentElement( 'beforeend', cPanel);//seperate function
        this._colorPanel.add(panelListItem);
        viewHandler._colorPanelList.add(panelListItem);
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