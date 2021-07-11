class eventHandler {
    constructor() {}

    static delegateClickEvent(event) {// first find target element and return panel as well as its property on which can be decided what the element is supposed to call
        console.log(event.target);
        const targetedObject = viewHandler.findTargetedPanel(event.target);

        if (targetedObject === undefined || targetedObject === null) {return};

        switch (targetedObject.propertyClass) {
            case targetedObject.eventKeys[1]:
                targetedObject.colorPanel.setNewRandomColor();
                    console.log('New color suspect!');
                break;

            case targetedObject.eventKeys[0]:
            case targetedObject.eventKeys[5]:
                viewHandler.deletePanel(targetedObject.colorPanel);
                    console.log('Panel liquidated!');
                break;

            default:
                console.log('%cError, no entry found :/', 'color: orangered');
                break;
        }
    }

    static delegatePointerDownEvent(event) {
        console.log('%cPinged',  'color: red');
        const targetedObject = viewHandler.findTargetedPanel(event.target);
        if(targetedObject.propertyClass === targetedObject.eventKeys[2] || targetedObject.propertyClass === targetedObject.eventKeys[6]) {
            console.log('dragItemChoosen');
            dragAndDrop.drag(event, targetedObject.colorPanel.CombinedColorPanel);
        }
    }
}