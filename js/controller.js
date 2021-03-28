class controller {
    constructor() {}

    static _colorPanel = new Set();
    static _colorPanelEventHandler = new colorPanelEventHandler(this);
    static _responsiveMaxDeviceWidth;//in die UI

    //#region Accessors
    static get ColorPanel() {
        return this._colorPanel;
    }

    static get ResponsiveMaxDeviceWidth() {
        return this._responsiveMaxDeviceWidth;
     }
    //#endregion Accessors

    static main() {
        // viewHandler.bindMenuButtons();
        // this._colorPanelEventHandler.bindAddBtn();
        // this.pushNewPanel(); 

        // this.colorPanel;
        viewHandler._addButton.onclick = interactor.addPanel();
        Interactor.onAddPanelDone = ViewHandler.addPanel;//some kind of callback ?
    }

    static newColors(panelListItem) {
        for (let panel of this._colorPanel) {
            if(panel._combinedColorPanel === panelListItem._combinedColorPanel) {
                panel.generateColors();
                panel.setColors();
            }
        }
    }

    static pushNewPanel() {
        let panelListItem = new colorPanel();
        let cPanel = panelListItem.CombinedColorPanel;
        
        console.log(this._colorPanel.size);
        panelListItem.PanelAttributeOrder = this._colorPanel.size;
        
        document.getElementById(this._containerNode).insertAdjacentElement( 'beforeend', cPanel);//seperate function
        this._colorPanel.add(panelListItem);
        this._colorPanelEventHandler.bindPanelButtons(panelListItem);
        this.checkDevice();
    }

    static deletePanel(panelListItem) {
        panelListItem._combinedColorPanel.remove();
        this._colorPanel.delete(panelListItem);
        this.checkDevice();
    }

    static checkDevice() {
        if(document.body.clientWidth <= this._responsiveMaxDeviceWidth) {
            this.calcHeight();
        } else {
            this.calcWidth();
        }
    }

    static calcHeight() {
        let coefficient = 100;
        for(let panel of this._colorPanel) {
            panel._combinedColorPanel.style.height = 100 / (this._colorPanel.size) + "%";
            panel._combinedColorPanel.style.top = coefficient - 100 / (this._colorPanel.size) + "%";
            panel._combinedColorPanel.style.width = "100%";
            panel._combinedColorPanel.style.left = 0;
            coefficient -= 100 / (this._colorPanel.size);
        }
    }

    static calcWidth() {//viewModel
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