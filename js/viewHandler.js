class viewHandler { // viewModel
    constructor() {}

    static _addButton;
    static _newRandomColorButtonID;
    static _deletePanelButtonID;
    static _colorPanelContainerNode;
    static _responsiveMaxDeviceWidth;
    static _colorPanelList;

    static loadView() {
        this._addButton = document.getElementById('addPnl');
        this._colorPanelContainerNode = document.getElementById('container');
        this._newRandomColorButtonID = 'genColor';
        this._deletePanelButtonID = 'delPnl';
        this._responsiveMaxDeviceWidth = 700;
        this._colorPanelList = new Set();
    }

    static findTargetedPanel(targetItem, targetItemClass) {
        let propertyToCheck;

        switch (targetItemClass) {
            case viewHandler._newRandomColorButtonID:
                propertyToCheck = 'colorBtn';
                break;
        
            case viewHandler._deletePanelButtonID:
                propertyToCheck = 'delBtn';
                break;

            default:
                break;
        }

        for (let panel of this._colorPanelList) {
            if(panel.colorPanelDOMElements[propertyToCheck] === targetItem) {
                return panel;
            }
        }
    }

    static addPanel() {
        let panelListItem = new colorPanel();
        let cPanel = panelListItem.CombinedColorPanel;
        
        console.log(this._colorPanel.size);
        panelListItem.PanelAttributeOrder = this._colorPanel.size;
        
        document.getElementById(this._containerNode).insertAdjacentElement( 'beforeend', cPanel);//seperate function
        this._colorPanel.add(panelListItem);
        // this.checkDevice();
    }

    static deletePanel(panelListItem) {
        panelListItem._combinedColorPanel.remove();
        this._colorPanel.delete(panelListItem);
        // this.checkDevice();
    }

    // static checkDevice() {
    //     if(document.body.clientWidth <= this._responsiveMaxDeviceWidth) {
    //         this.calcHeight();
    //     } else {
    //         this.calcWidth();
    //     }
    // }

    // static calcHeight() {
    //     let coefficient = 100;
    //     for(let panel of this._colorPanel) {
    //         panel._combinedColorPanel.style.height = 100 / (this._colorPanel.size) + "%";
    //         panel._combinedColorPanel.style.top = coefficient - 100 / (this._colorPanel.size) + "%";
    //         panel._combinedColorPanel.style.width = "100%";
    //         panel._combinedColorPanel.style.left = 0;
    //         coefficient -= 100 / (this._colorPanel.size);
    //     }
    // }

    // static calcWidth() {//viewModel
    //     let coefficient = 100;
    //     for(let panel of this._colorPanel) {
    //         panel._combinedColorPanel.style.width = 100 / (this._colorPanel.size) + "%";
    //         panel._combinedColorPanel.style.left = coefficient - 100 / (this._colorPanel.size) + "%";
    //         panel._combinedColorPanel.style.height = "100%";
    //         panel._combinedColorPanel.style.top = 0;
    //         coefficient -= 100 / (this._colorPanel.size);
    //     }
    // }
}