class eventHandler {
    constructor() {}

    static delegateClickEvent(event) {// first find target element and return panel as well as its property on which can be decided what the element is supposed to call
        let eventTargetClass = event.target.className;
        console.log(eventTargetClass);
        console.log(event.target);
        viewHandler.findTargetedPanelAlpha(event.target);
        switch (eventTargetClass) {
            case viewHandler._newRandomColorButtonID:
                viewHandler.findTargetedPanel(event.target, eventTargetClass).setNewRandomColor();
                    console.log('new Color :D');
                break;

            case viewHandler._deletePanelButtonID:
            case viewHandler._deletePanelIconID:
                let targetPanel = viewHandler.findTargetedPanel(event.target, eventTargetClass);
                viewHandler.deletePanel(targetPanel);
                    console.log('panel deleted, job done ^^');
                break;

            default:
                console.log('no entry found :/');
                break;
        }
    }

    static delegatePointerDownEvent() {
        console.log("%cPinged",  "color: red");
    }
}