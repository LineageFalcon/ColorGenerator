class controller {
    constructor() {}

    static main() {
        viewHandler.load();
        dragAndDrop.load(viewHandler._colorPanelContainerNode, viewHandler._dragStyleClass);
        viewHandler._colorPanelContainerNode.onclick = (event) => {eventHandler.delegateClickEvent(event)}
        viewHandler._addPanelButton.onclick = () => {viewHandler.addPanel()}
        viewHandler._colorPanelContainerNode.onpointerdown = (event) => {eventHandler.delegatePointerDownEvent(event)}
        window.onresize = () => {viewHandler.checkOrientation()}

        viewHandler.addPanel();
    }
}