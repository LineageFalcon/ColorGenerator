class eventHandler {
    constructor() {}

    static delegateClickEvent(event) {
        let eventTargetClass = event.target.className;
        console.log(eventTargetClass);
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
}