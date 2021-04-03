class controller {
    constructor() {}

    static main() {
        // viewHandler.bindMenuButtons();
        // this._colorPanelEventHandler.bindAddBtn();
        // this.pushNewPanel(); 

        // this.colorPanel;
        viewHandler.loadView();
        viewHandler._colorPanelContainerNode.onclick = (event) => {eventHandler.delegateClickEvent(event)};
    }
}