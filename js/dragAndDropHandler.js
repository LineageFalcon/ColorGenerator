class dragAndDrop {
    constructor() {}

    static _container;
    static _dragStyleClass;
    static _movementDirection;//object
    static _animationFrame;
    //static _callback;

    static load(container, classString, /*callback*/) {
        this._container = container;
        this._dragStyleClass = classString;
        // this._callback = callback;
    }

    static drag(event, dragItem) {
        const offsetTop = dragItem.offsetTop; 
        const offsetLeft = dragItem.offsetLeft;
        console.log(offsetLeft);
        this._container.onpointermove = (moveEvent) => {this.move({
            event: event,
            moveEvent: moveEvent,
            dragItem: dragItem, 
            initalMousePositionX: event.clientX,
            initalMousePositionY: event.clientY
        })}
        this._container.onpointerup = () => {this.removeDrag(dragItem, offsetTop, offsetLeft)}
        this._container.onpointercancel = () => {this.removeDrag(dragItem, offsetTop, offsetLeft)}
    }

    static move(dragParameters) {
        console.log('%cstill running!', 'color: green');
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
    }

    static removeDrag(dragItem, offsetTop, offsetLeft) {
        console.log('loaded', offsetLeft + 'px');
        this._container.onpointermove = null;
        dragItem.classList.remove(this._dragStyleClass);
        dragItem.style.left = offsetLeft + 'px';
        dragItem.style.transform = 'translate3d(0px, 0px, 0px)';
        // this._container.insertAdjacentElement('afterbegin', dragItem);
        //callback function --> maybe inserted or passed as a parameter in the settings at the setUp
    }
}