class dragAndDropHandler {
    constructor(containerNode, panelNode) {
        this._panelContainer = document.getElementById(containerNode);
        this._panelElementCombined = panelNode.CombinedColorPanel;
        this._panelElement = panelNode;
        this._dragElement = this._panelElement.colorPanelDOMElements.dragBtn;
        this._borderBox;
        this._startX;
        this._startY;
        this._deltaX;
        this._deltaX;
        this._animationFrame;

        this.panelMoved = this.panelMoved.bind(this);
        this.panelReleased = this.panelReleased.bind(this);// bind for adding and removing eventlisteners
        this.panelMovedAnimatioFrameY = this.panelMovedAnimatioFrameY.bind(this);
        this.panelMovedAnimatioFrameX = this.panelMovedAnimatioFrameX.bind(this);
        
        this.setDragAndDropEvent();
    }

    setDragAndDropEvent() {
        console.log('eventRegistered');
        
        this._dragElement.addEventListener('pointerdown', this.dragBtnPressed.bind(this), { passive: true });
    }
    
    dragBtnPressed(event) {
        this._borderBox = this._panelElementCombined.getBoundingClientRect();
        this._startX = event.clientX;
        this._startY = event.clientY;
        this._panelContainer.addEventListener('pointermove', this.panelMoved, { passive: true });
        this._panelContainer.addEventListener('pointerup', this.panelReleased, { passive: true });
        this._panelContainer.addEventListener('pointercancel', this.panelReleased, { passive: true });
    };
    
    panelMoved(event) {
        this._panelElementCombined.classList.add('drag');

        if (!this._animationFrame) {
            if(document.body.clientWidth <= 600) {
                this._deltaY = event.clientY - this._startY;
                this._animationFrame = requestAnimationFrame(this.panelMovedAnimatioFrameY);
            } else {
                this._deltaX = event.clientX - this._startX;
                this._animationFrame = requestAnimationFrame(this.panelMovedAnimatioFrameX);
            }
        }
        // console.log(event.clientY, this._startY);
    }

    panelMovedAnimatioFrameY() {
        this._panelElementCombined.style.transform = 'translate3d(0px, ' + this._deltaY + 'px, 0px)';
        this._animationFrame = null;
    }

    panelMovedAnimatioFrameX() {
        this._panelElementCombined.style.transform = 'translate3d(' + this._deltaX + 'px, 0px, 0px)';
        this._animationFrame = null;
    }
    
    panelReleased() {
        this._panelContainer.removeEventListener('pointermove', this.panelMoved);
        this._panelContainer.removeEventListener('pointerup', this.panelReleased);
        this._panelContainer.removeEventListener('pointercancel', this.panelReleased);

        if (!this._animationFrame) {
            cancelAnimationFrame(this._animationFrame);
            this._animationFrame = null;
        }
        this._panelElementCombined.classList.remove('drag');

        if(document.body.clientWidth <= 600) {
            this._panelElementCombined.style.top = this._borderBox.top + this._deltaY + 'px';// border box must be added again after container is absolute
            console.log(this._deltaY);
        } else {
            this._panelElementCombined.style.left = this._borderBox.left + this._deltaX + 'px';
        }

        this._panelElementCombined.style.transform = 'translate3d(0px, 0px, 0px)';

        this._deltaX = this._deltaY = null;
    }
}