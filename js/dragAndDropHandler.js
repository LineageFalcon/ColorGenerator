class dragAndDrop {
    constructor() {}

//#region properties
    static _container;
    static _dragStyleClass;
    static _movementDirection;//object
    static _animationFrame;
    static _dropCoordinateX;
    static _dropCoordinateY;
    //static _callback;
//#endregion properties

    static load(container, classString, /*callback*/) {
        this._container = container;
        this._dragStyleClass = classString;
        // this._callback = callback;
    }

    static drag(event, dragItem) {
        this._dropCoordinateY = dragItem.offsetTop; 
        this._dropCoordinateX = dragItem.offsetLeft;

        this._container.onpointermove = (moveEvent) => {this.move({
            event: event,
            moveEvent: moveEvent,
            dragItem: dragItem, 
            initalMousePositionX: event.clientX,
            initalMousePositionY: event.clientY
        })}
        this._container.onpointerup = () => {this.removeDrag(dragItem)}
        this._container.onpointercancel = () => {this.removeDrag(dragItem)}
    }

    static move(dragParameters) {
        // console.log('%cstill running!', 'color: green');
        dragParameters.dragItem.classList.add(this._dragStyleClass);

        if(this._movementDirection.moveOnX) {
            dragParameters.dragItem.style.transform = 'translate3d(' + (dragParameters.moveEvent.clientX - dragParameters.initalMousePositionX) + 'px, 0px, 0px)';
        }
        if (this._movementDirection.moveOnY) {
            dragParameters.dragItem.style.transform = 'translate3d(0px, ' + (dragParameters.moveEvent.clientY - dragParameters.initalMousePositionY) + 'px, 0px)';
        }
        if(this._movementDirection.moveOnX && this._movementDirection.moveOnY) {
            dragParameters.dragItem.style.transform = 'translate3d(' + (dragParameters.moveEvent.clientX - dragParameters.initalMousePositionX) + 'px, ' + (dragParameters.moveEvent.clientY - dragParameters.initalMousePositionY) + 'px, 0px)';
        }

        collisionDetection.checkForCollision(this._container, dragParameters);

        // this.switchPositions();

    }

    static removeDrag(dragItem) {
        this._container.onpointermove = null;
        this._container.onpointercancel = null;
        this._container.onpointerup = null;
        dragItem.classList.remove(this._dragStyleClass);

        if(this._movementDirection.moveOnX) {
            dragItem.style.left = this._dropCoordinateX + 'px';
            console.log(this._dropCoordinateX);
        }
        if (this._movementDirection.moveOnY) {
            dragItem.style.top = this._dropCoordinateY + 'px';
        }
        if(this._movementDirection.moveOnX && this._movementDirection.moveOnY) {
            dragItem.style.left = this._dropCoordinateX + 'px';
            dragItem.style.top = this._dropCoordinateY + 'px';
        }

        dragItem.style.transform = 'translate3d(0px, 0px, 0px)';
        // this._container.insertAdjacentElement('afterbegin', dragItem);
        //callback function --> maybe inserted or passed as a parameter in the settings at the setUp
    }

    static switchPositions() {

    }
}

class collisionDetection {
    constructor() {}

    static checkForCollision(container, dragParameters) {
        const collisionPanelArray = container.getElementsByClassName('colorPanel');
        for (let collisionPanel of collisionPanelArray) {
            if(!(collisionPanel === dragParameters.dragItem)) {
                if(collisionPanel.offsetLeft < dragParameters.moveEvent.clientX && (collisionPanel.offsetLeft + collisionPanel.offsetWidth) > dragParameters.moveEvent.clientX) {
                    let cPOffsetLeft = collisionPanel.offsetLeft; //does not belongs here!
                    collisionPanel.style.left = dragAndDrop._dropCoordinateX + 'px';
                    dragAndDrop._dropCoordinateX = cPOffsetLeft;
                }
            }
        }
        // return console.log('collision');
    }
}