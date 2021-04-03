document.addEventListener("DOMContentLoaded", function() {//poses as main function call and calls the controllers main function
    controller.main();
    new controllerOld('container', new Set(), 770);
});