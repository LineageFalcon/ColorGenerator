class colorPanel {
    constructor() {
        this.colorPanelDOMElements = {
            delBtn:  document.createElement('button'), 
            colorBtn: document.createElement('button'),
            dragBtn: document.createElement('button'),
            cTwoBtn: document.createElement('button'),
            cOneBtn: document.createElement('button'),
            delBtnIcon: document.createElement('i'),
            dragBtnIcon: document.createElement('i'),
            toolTipOne: document.createElement('span'),
            toolTipTwo: document.createElement('span'),
            container: document.createElement('div'),
            colorOneElem: document.createElement('div'),
            colorTwoElem: document.createElement('div')
        }
        
        this.colorPanelElementClasses = {
            containerClass: 'colorPnl', 
            colorWrapperClass: ['colorOne', 'colorTwo'],
            delBtnClass: 'delPnl',
            btnIconClass: 'material-icons',
            genBtnClass: 'genColor',
            colorOneTextBtnClass: 'cOne',
            colorTwoTextBtnClass: 'cTwo',
            toolTipClass: 'tooltip',
            dragBtnClass: 'dragPnl'
        }

        this.colorPanelElementColors = {
            colorOne: '#aaaaaa',
            colorTwo: '#555555',
            colorLabelOne: '#222222',
            colorLabelTwo: '#dddddd'
        }

        // this._panelAttributeOrder = 1;

        this._combinedColorPanel = null;

        this.combinePanelElements();
        this.setNewRandomColor();
    }

    //#region Accessors
        set CombinedColorPanel(cColorPanel) {
            this._combinedColorPanel = cColorPanel;
        }

        get CombinedColorPanel() {
            return this._combinedColorPanel;
        }

        set PanelAttributeOrder(order) {
            this._panelAttributeOrder = order;
            this.colorPanelDOMElements.container.style.order = order;
        }

        get PanelAttributeOrder() {
            return this._panelAttributeOrder;
        }
    //#endregion Accessors

    combinePanelElements() {
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.colorTwoElem);
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.colorOneElem);
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.colorBtn);
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.delBtn);
            this.colorPanelDOMElements.delBtn.append(this.colorPanelDOMElements.delBtnIcon);
                this.colorPanelDOMElements.delBtnIcon.textContent = 'remove_circle_outline';
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.dragBtn);
            this.colorPanelDOMElements.dragBtn.append(this.colorPanelDOMElements.dragBtnIcon);
                this.colorPanelDOMElements.dragBtnIcon.textContent = 'drag_handle';
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.cOneBtn);
            this.colorPanelDOMElements.cOneBtn.append(this.colorPanelDOMElements.toolTipOne);
        this.colorPanelDOMElements.container.append(this.colorPanelDOMElements.cTwoBtn);
            this.colorPanelDOMElements.cTwoBtn.append(this.colorPanelDOMElements.toolTipTwo);

        this.colorPanelDOMElements.container.classList.add(this.colorPanelElementClasses.containerClass);
        this.colorPanelDOMElements.colorOneElem.classList.add(this.colorPanelElementClasses.colorWrapperClass[0]);
        this.colorPanelDOMElements.colorTwoElem.classList.add(this.colorPanelElementClasses.colorWrapperClass[1]);
        this.colorPanelDOMElements.delBtn.classList.add(this.colorPanelElementClasses.delBtnClass);
            this.colorPanelDOMElements.delBtnIcon.classList.add(this.colorPanelElementClasses.btnIconClass);
        this.colorPanelDOMElements.dragBtn.classList.add(this.colorPanelElementClasses.dragBtnClass);
            this.colorPanelDOMElements.dragBtnIcon.classList.add(this.colorPanelElementClasses.btnIconClass)
        this.colorPanelDOMElements.colorBtn.classList.add(this.colorPanelElementClasses.genBtnClass);
        this.colorPanelDOMElements.cOneBtn.classList.add(this.colorPanelElementClasses.colorOneTextBtnClass);
            // this.colorPanelDOMElements.toolTipOne.classList.add(this.colorPanelElementClasses.toolTipClass);
        this.colorPanelDOMElements.cTwoBtn.classList.add(this.colorPanelElementClasses.colorTwoTextBtnClass);
            // this.colorPanelDOMElements.toolTipTwo.classList.add(this.colorPanelElementClasses.toolTipClass);

        this._combinedColorPanel = this.colorPanelDOMElements.container;
    }

    setNewRandomColor() {//needed ?
        this.colorPanelElementColors.colorOne = colorConvert.newRandomColor();
        this.colorPanelElementColors.colorTwo = colorConvert.hslToHex(colorConvert.changeLightness(colorConvert.hexToHsl(this.colorPanelElementColors.colorOne), -20));
        this.colorPanelElementColors.colorLabelOne = this.colorPanelElementColors.colorTwo;//can be summed up
        this.colorPanelElementColors.colorLabelTwo = colorConvert.hslToHex(colorConvert.changeLightness(colorConvert.hexToHsl(this.colorPanelElementColors.colorOne), 15));
    
        this.colorPanelDOMElements.colorOneElem.style.backgroundColor = this.colorPanelElementColors.colorOne;
        this.colorPanelDOMElements.colorTwoElem.style.backgroundColor = this.colorPanelElementColors.colorTwo;
        this.colorPanelDOMElements.colorOneElem.style.boxShadow = this.colorPanelElementColors.colorOne + ' 0 0 0 1px';
        this.colorPanelDOMElements.colorTwoElem.style.boxShadow = this.colorPanelElementColors.colorTwo + ' 0 0 0 1px';
        console.log(this.colorPanelElementColors.colorTwo + ' 0 0 0 1px');
    
        this.colorPanelDOMElements.cOneBtn.textContent = this.colorPanelElementColors.colorOne;
        this.colorPanelDOMElements.cTwoBtn.textContent = this.colorPanelElementColors.colorTwo;

        this.colorPanelDOMElements.cOneBtn.style.color = this.colorPanelElementColors.colorLabelOne;
        this.colorPanelDOMElements.dragBtn.style.color = this.colorPanelElementColors.colorLabelOne;
        this.colorPanelDOMElements.cTwoBtn.style.color = this.colorPanelElementColors.colorLabelTwo;
        
        this.colorPanelDOMElements.delBtn.style.color = this.colorPanelElementColors.colorOne;
        this.colorPanelDOMElements.delBtn.style.backgroundColor = this.colorPanelElementColors.colorTwo;
    }
}