document.addEventListener("DOMContentLoaded", function() {
    new colorConvert();
    new themeUI();
});

class themeUI {
    constructor() {
        this._colorModeUIElements = [3];
        //buttons eventListener hinzufügen
        //2 buttons
        this.bindControls();
        themeUI.loadUIElements();

        themeUI.main();
    }

    //#region Setter
    static setColorModeUIElements(elements) {
        this._colorModeUIElements = elements;
    }

    static getColorModeUIElements() {
        return this._colorModeUIElements;
    }
    //#endregion Setter

    static loadUIElements() {
        let elements = [3];
        elements[0] = document.querySelectorAll('button');
        elements[1] = document.getElementsByClassName('cTwo');
        elements[2] = document.querySelector('section').querySelector('p');
        elements[3] = document.getElementsByClassName('btnColorGen')[0];

        themeUI.setColorModeUIElements(elements);
    }

    bindControls() {
        let btnWhite = document.getElementById('btnWhite');

        btnWhite.addEventListener('click', () => {
            themeUI.colorMode();
            if(btnWhite.classList.contains('white')) {
                btnWhite.textContent = "lightmode";
            } else {
                btnWhite.textContent = "darkmode";
            }
        });
    }

    static main() {
        themeUI.colorMode();
    }

    static colorMode() {
        let elements = themeUI.getColorModeUIElements();//should check item length instead of solid numbers what dimension the array has !
        for (let i = elements.length-1; i >= 0; i--) {
            if(i == 2 || i == 3) {
                elements[i].classList.toggle('white');
            } else if(i == 0) {
                for (let k = elements[i].length; k > 0; k--) {
                    elements[i][k-1].classList.toggle('white');
                }
            } else {
                elements[i][0].classList.toggle('white');
            }
        }
    }

    static calcWidth() {
        $('.colorPnl, .addPnl').css('width', 100 / (colorPnl.elmtCount + 1) + "%");
    }
}

function mainColor(pnlID) {//handle objects --> which are create with createElement and stored in an array !
    let ColorOne = colorConvert.ranColorGen();
    let ColorTwo;
    let ColorTwoTxt;
    
    ColorTwo = colorConvert.changeLightness(colorConvert.hexToRgb(ColorOne), 50);
    ColorTwoTxt =colorConvert.rgbToHex(ColorTwo);
    
    distributer(ColorOne, ColorTwoTxt, pnlID);
}

function distributer(ColorOne, ColorTwoTxt, PnlID) {
    $(PnlID).each(function() {
        let selector = $(this).children();

        selector.filter('.colorOne').css('background-color', ColorOne);
        selector.filter('.colorTwo').css('background-color', ColorTwoTxt);

        selector.filter('section').find('p').text(ColorOne);
        selector.filter('#containerCTwo').find('p').text(ColorTwoTxt);
    });
}

function hex(x) { // other function for rgb to hex just with one value yet
    let hexD = colorConvert.getHexChars();
    return isNaN(x) ? "00" : hexD[(x - x % 16) / 16] + hexD[x % 16];
}

//---------------[End of ColorGenCode]---------------

// function colorMode(color) {
//     const controlColor = color; //'#272727'
//     $('button').css('color', controlColor);
//     $('section p').css('color', controlColor);
//     $('.cTwo').css('color', controlColor);
//     $('.cTwo').css('border-color', controlColor);
//     $('.btnColorGen').css('border-color', controlColor);
//     $('button:first-child').css('border-color', controlColor);
//     $('.addBtn').css('border-color', controlColor);
// }

//---------------[End of ColorSetUp]---------------

let colorPnl = {
    get container() {
       return '<div class="colorPnl pnl-' + this.elmtCount + '">' + this.colorOneElmt + this.colorTwoElmt + this.btnDel + this.sectionControl + this.sectionSign + '\n</div>'; 
    },
    get elmtCount() {
        return $('.colorPnl').length;
    },
    get colorOneElmt() {
        return '\n\t<div class="colorOne"></div>';   
    },
    get colorTwoElmt() {
        return '\n\t<div class="colorTwo"></div>';   
    },
    get btnDel() {
        return '\n\t\t<div class="delete-container">\n\t\t\t' + '<button class="delete" onclick="delPnl(' + this.elmtCount + ')">-</button>\n' + '\t\t</div>'  
    },
    get sectionControl() {
        return '\n\t<section class="btnColorGen">' + this.btnColorGen + '\n\t\t<p> Color </p>' + '\n\t</section>';    
    },
    get btnColorGen() {
        return '\n\t\t<button onclick="mainColor(\'.pnl-' + this.elmtCount + '\')"> Generieren </button>';
    },
    get sectionSign() {
        return '\n\t<div id="containerCTwo">\n\t\t' + '<p class="cTwo"> Color 2 </p>' + '\n\t</div>';
    }
}

function calcWidth() {
    $('.colorPnl, .addPnl').css('width', 100 / (colorPnl.elmtCount + 1) + "%");
}
    
function addPnl() {
    if ($('.external').children().is('.colorPnl')) {
        $('.colorPnl:nth-child(' + (colorPnl.elmtCount + ')')).after(colorPnl.container);
    }
    else {
        $('.addPnl').before(colorPnl.container);
    }
    calcWidth();
    colorMode('white');
    $('.pnl-' + (colorPnl.elmtCount - 1) + ' .btnColorGen button').click();
}

function delPnl(delPnlID) {
    let indexer = 0;
    $('.colorPnl').remove('.pnl-' + delPnlID + '');
    $('.colorPnl').each(function() {
        let targetPnl = $(this);
        targetPnl.removeClass('pnl-' + (indexer + 1) +'').addClass('pnl-' + indexer + '')
        targetPnl.find('.delete').attr('onclick', 'delPnl(' + indexer + ')');
        targetPnl.find('.btnColorGen button').attr('onclick', 'mainColor(".pnl-' + indexer + '")');
        indexer++;
    })
    calcWidth();
}

// Shorthand for $( document ).ready()
$(function() {
    $('.colorPnl, .addPnl').css('width', 100 / (colorPnl.elmtCount + 1) + '%')
    mainColor('.pnl-0');
});