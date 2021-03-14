document.addEventListener("DOMContentLoaded", function() {
    new controller();

    controller.setContainerNode('container');
    controller._colorPanel = [];
    controller.main();
});