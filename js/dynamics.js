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

    bindPanelButtons(panelListItem) {
        let btnArray = Array.prototype.slice.call(panelListItem._combinedColorPanel.querySelectorAll('button'));

        btnArray.forEach((arrayItem) => {
			let btnClass = arrayItem.className;

			switch(btnClass) {
                case 'dragPnl':
                    this.setDragAndDropEvent(panelListItem);
                    break;
			}
		});

        this.checkDeviceRotation();
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
    }

    //#region Accessors
    get ContainerNode() {
        return this._containerNode;
     }

     get ResponsiveMaxDeviceWidth() {
        return this._responsiveMaxDeviceWidth;
     }
    //#endregion Accessors
}