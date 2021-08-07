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

        collisionDetection.checkForDirection(dragParameters);
        collisionDetection.checkForCollision(this._container, dragParameters);
        
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

    static switchPositions(collisionPanel, dragItem) {
        //switch panels onyl visually
        let cPOffsetLeft = collisionPanel.offsetLeft;
        collisionPanel.style.left = dragAndDrop._dropCoordinateX + 'px';
        dragAndDrop._dropCoordinateX = cPOffsetLeft;

        //switch panels in the DOM
        if(collisionDetection._direction === 'right') {
            collisionPanel.parentNode.insertBefore(collisionPanel, dragItem);
        }
        if(collisionDetection._direction === 'left') {
            dragItem.parentNode.insertBefore(dragItem, collisionPanel);
        }
    }
}

class collisionDetection {
    constructor() {}

    static _direction = '';
    static _orientationPointX = 0;
    static _orientationPointY = 0;

    static checkForCollision(container, dragParameters) {
        const collisionPanelArray = container.getElementsByClassName('colorPanel');
        for (let collisionPanel of collisionPanelArray) {
            if(!(collisionPanel === dragParameters.dragItem)) {
                if(collisionPanel.offsetLeft < dragParameters.moveEvent.clientX && (collisionPanel.offsetLeft + collisionPanel.offsetWidth) > dragParameters.moveEvent.clientX) {
                    dragAndDrop.switchPositions(collisionPanel, dragParameters.dragItem);
                    return collisionPanel;
                }
            }
        }
    }

    static checkForDirection(dragParameters) {
        if(dragAndDrop._movementDirection.moveOnX) {
            if(collisionDetection._orientationPointX > dragParameters.moveEvent.pageX) {
                collisionDetection._direction = 'left';
            }
            else if(collisionDetection._orientationPointX < dragParameters.moveEvent.pageX) {
                collisionDetection._direction = 'right';
            }
            collisionDetection._orientationPointX = dragParameters.moveEvent.pageX;
        }
        if(dragAndDrop._movementDirection.moveOnY) {
            if (collisionDetection._orientationPointY > dragParameters.moveEvent.pageY) {
                collisionDetection._direction = 'left';
            } 
            else if(collisionDetection._orientationPointY < dragParameters.moveEvent.pageY) {
                collisionDetection._direction = 'right';
            }
            collisionDetection._orientationPointY = dragParameters.moveEvent.pageY;
        }
        return collisionDetection._direction;
    }
}