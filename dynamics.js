document.addEventListener("DOMContentLoaded", function() {
    new colorConvert();
    new themeUI();
});
class colorConvert {
    constructor() {
        this._hexChars = null
        
        colorConvert.setHexChars( '0123456789ABCDEF');
    }

    //#region Setter
    static setHexChars(chars) {
        this._hexChars = chars;
    }

    static getHexChars() {
        return this._hexChars;
    }
    //#endregion Setter

    static ranColorGen(range) {
        const HEXCHARS = colorConvert.getHexChars();
        let ranColor = '#';

        for(let i = 6; i > 0; i--) {
            ranColor += HEXCHARS[Math.floor(Math.random() * 16)];
        }

        return ranColor;
    }

    static rgbStringToHex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        let hex = '#';

        for(let i = 1; i < 4; i++) {
           hex += ("0" + parseInt(rgb[i]).toString(16)).slice(-2);
        }

        return hex;
    }

    static rgbToHex(rgb) {
        let r = rgb[0].toString(16),
            g = rgb[1].toString(16),
            b = rgb[2].toString(16);

        if (r.length == 1)
          r = "0" + r;
        if (g.length == 1)
          g = "0" + g;
        if (b.length == 1)
          b = "0" + b;
      
        return "#" + r + g + b;
    }

    static hexToRgbString(hex) {
        let r = 0, g = 0, b = 0;

        // 3 digits
        if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    
        // 6 digits
        } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
        }
    
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    static hexToRgb(hex) {
        let r = 0, g = 0, b = 0;

        // 3 digits
        if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    
        // 6 digits
        } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
        }
    
        return [r, g, b];
    }

    static changeLightness(color, lightValue) {
        for(let i = 0; i < 3; i++) {
            if (color[i] !== 0 && color[i] >= lightValue) {
                color[i] -= lightValue;
            } else if (color[i] === color[i]) {
                color[i] = 0;
            }
        }

        return color;
    }
}

class themeUI {
    constructor() {
        //buttons eventListener hinzufügen
        //4 buttons
        this.setControls();
    }

    setControls() {
        let btnWhite = document.getElementById('btnWhite'),
            btnBlack = document.getElementById('btnBlack');

        btnWhite.addEventListener('click', () => {colorMode('white')});
        btnBlack.addEventListener('click', () => {colorMode('#272727')});
    }
}

function mainColor(pnlID) {
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

function colorMode(color) {
    const controlColor = color; //'#272727'
    $('button').css('color', controlColor);
    $('section p').css('color', controlColor);
    $('.cTwo').css('color', controlColor);
    $('.cTwo').css('border-color', controlColor);
    $('.btnColorGen').css('border-color', controlColor);
    $('button:first-child').css('border-color', controlColor);
    $('.addBtn').css('border-color', controlColor);
}

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
    colorMode('white');
});