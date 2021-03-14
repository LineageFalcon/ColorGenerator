document.addEventListener("DOMContentLoaded", function() {
    new controller();

    controller.setContainerNode('container');
    controller._colorPanel = [];
    controller.main();
});

class test {//test to understand the referencing of js objects
    constructor() {
        this.elementOne = document.createElement('div');
        this.elementTwo = document.createElement('p');

        this.classOne = 'xavier';
    }

    bind() {
        this.elementOne.append(this.elementTwo);
        this.elementOne.classList.add(this.classOne);

        return this.elementOne;
    }

    change(value) {
        this.elementOne.classList.add(value);
    }

    insert() {
        document.querySelector('body').appendChild(this.elementOne);
    }

    eventListener() {
        
    }
}