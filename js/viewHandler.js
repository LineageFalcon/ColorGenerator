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
        viewHandler._colorPanelList.delete(targetItem);
        targetItem._combinedColorPanel.remove();
         this.checkOrientation();
    }

    static checkOrientation() {
        const colorPanelNodeArray = document.getElementsByClassName('colorPanel');
        
        (document.body.clientWidth <= this._responsiveMaxDeviceWidth) ? this.calcHeight(colorPanelNodeArray) : this.calcWidth(colorPanelNodeArray);
    }

    static calcHeight(colorPanelNodeArray) {
        let coefficient = 0;

        dragAndDrop._movementDirection = {moveOnX: false, moveOnY: true};

        for(let panel of colorPanelNodeArray) {//needs to read in panels out of view
            coefficient += 100 / (this._colorPanelList.size);
            panel.style.height = this.roundTo2Decimals(100 / (this._colorPanelList.size)) + "%";
            panel.style.top = coefficient - 100 / (this._colorPanelList.size) + "%";
            panel.style.width = "100%";
            panel.style.left = 0;
        }
    }

    static calcWidth(colorPanelNodeArray) {
        let coefficient = 0;

        dragAndDrop._movementDirection = {moveOnX: true, moveOnY: false};

        for(let panel of colorPanelNodeArray) {//needs to read in panels out of view (works with for of loop!)
            coefficient += 100 / (this._colorPanelList.size);
            panel.style.width = this.roundTo2Decimals(100 / (this._colorPanelList.size)) + "%";
            panel.style.left = coefficient - 100 / (this._colorPanelList.size) + "%";
            panel.style.height = "100%";
            panel.style.top = 0;
        }
    }

    static roundTo2Decimals(value, exp = -1) {//small needed utility which can be stored in a seperated math library
        value = value.toString().split('e');
        value = Math.ceil(+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }
}