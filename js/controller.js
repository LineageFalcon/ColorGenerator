class controller {
    constructor() {}

    static main() {
        viewHandler.loadView();
        viewHandler._colorPanelContainerNode.onclick = (event) => {eventHandler.delegateClickEvent(event);}
        viewHandler._colorPanelContainerNode.onpointerdown = (event) => {eventHandler.delegatePointerDownEvent(event);}
        viewHandler._addPanelButton.onclick = () => {viewHandler.addPanel();}
        window.onresize = () => {viewHandler.checkOrientation()}

        viewHandler.addPanel();
    }
}