class viewHandler { // viewModel
    constructor() {}

//#region properties
    static _addPanelButton;
    static _colorPanelContainerNode;

    static _responsiveMaxDeviceWidth;
    static _dragStyleClass;
    static _colorPanelList;
//#endregion properties

    static load() {//hardcoded setttings for the software to be adjusted
        this._addPanelButton = document.getElementById('addPnl');
        this._colorPanelContainerNode = document.getElementById('container');

        this._responsiveMaxDeviceWidth = 770;
        this._dragStyleClass = 'drag';
        this._colorPanelList = new Set();
    }

    static findTargetedPanel(targetItem) {
        for (let colorPanel of this._colorPanelList) {
            for(let propertyClass in colorPanel.colorPanelDOMElements) {
                if(colorPanel.colorPanelDOMElements[propertyClass] === targetItem) {
                    const eventKeys = Object.keys(colorPanel.colorPanelDOMElements);
                    return {colorPanel: colorPanel, propertyClass: propertyClass, eventKeys: eventKeys};
                }
            }
        }
    }

    static addPanel() {
        let colorPanelInstance = new colorPanel();
        
        this._colorPanelContainerNode.insertAdjacentElement( 'beforeend', colorPanelInstance.CombinedColorPanel);//seperate function maybe
        this._colorPanelList.add(colorPanelInstance);
        this.checkOrientation();
    }

    static deletePanel(targetItem) {
        targetItem._combinedColorPanel.remove();
        viewHandler._colorPanelList.delete(targetItem);
         this.checkOrientation();
    }

    static checkOrientation() {
        (document.body.clientWidth <= this._responsiveMaxDeviceWidth) ? this.calcHeight() : this.calcWidth();
    }

    static calcHeight() {
        let coefficient = 0;
        dragAndDrop._movementDirection = {moveOnX: false, moveOnY: true};
        for(let panel of this._colorPanelList) {
            coefficient += 100 / (this._colorPanelList.size);
            panel._combinedColorPanel.style.height = 100 / (this._colorPanelList.size) + "%";
            panel._combinedColorPanel.style.top = coefficient - 100 / (this._colorPanelList.size) + "%";
            panel._combinedColorPanel.style.width = "100%";
            panel._combinedColorPanel.style.left = 0;
        }
    }

    static calcWidth() {
        let coefficient = 0;
        dragAndDrop._movementDirection = {moveOnX: true, moveOnY: false};
        for(let panel of this._colorPanelList) {
            coefficient += 100 / (this._colorPanelList.size);
            panel._combinedColorPanel.style.width = 100 / (this._colorPanelList.size) + "%";
            panel._combinedColorPanel.style.left = coefficient - 100 / (this._colorPanelList.size) + "%";
            panel._combinedColorPanel.style.height = "100%";
            panel._combinedColorPanel.style.top = 0;
        }
    }
}