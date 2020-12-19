function RanColorGen(PnlID) {
    const HexChars = '0123456789ABCDEF';
    let ColorOne = '#';
    let ColorTwo;
    let ColorTwoTxt;
    
    for (let i = 0; i < 6; i++) {
        ColorOne += HexChars[Math.floor(Math.random() * 16)];
    }
    
    ColorTwo = alphaEdit(ColorOne);
    ColorTwoTxt = rgb2hex(ColorTwo);
    
    distributer(ColorOne, ColorTwo, ColorTwoTxt, PnlID);
}

function distributer(ColorOne, ColorTwo, ColorTwoTxt, PnlID) {
    $(PnlID).each(function() {
        let selector = $(this).children();

        selector.filter('.colorOne').css('background-color', ColorOne);
        selector.filter('.colorTwo').css('background-color', ColorTwo);

        selector.filter('section').find('p').text(ColorOne);
        selector.filter('#containerCTwo').find('p').text(ColorTwoTxt);
    });
}

const hexDigits = new Array
    ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
 
function alphaEdit(hex) {
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

    return "rgb("+ + decreaser(r) + "," + + decreaser(g) + "," + + decreaser(b) + ")";
} // verwiesen wird hier wieder auf css-tricks

function decreaser(val) {
    if (val !== 0 && val >= 50) {
        val = val - 50;
    } else if (val === val) {
        val = 0;
    }
    return val;
}

//---------------[End of ColorGenCode]---------------

function black() {
    const controlColor = '#272727';
    $('button').css('color', controlColor);
    $('section p').css('color', controlColor);
    $('.cTwo').css('color', controlColor);
    $('.cTwo').css('border-color', controlColor);
    $('.btnColorGen').css('border-color', controlColor);
    $('button:first-child').css('border-color', controlColor);
    $('.addBtn').css('border-color', controlColor);
}

function white() {
    const controlColor = 'white';
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
        return '\n\t\t<button onclick="RanColorGen(\'.pnl-' + this.elmtCount + '\')"> Generieren </button>';
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
    white();
    $('.pnl-' + (colorPnl.elmtCount - 1) + ' .btnColorGen button').click();
}

function delPnl(delPnlID) {
    let indexer = 0;
    $('.colorPnl').remove('.pnl-' + delPnlID + '');
    $('.colorPnl').each(function() {
        let targetPnl = $(this);
        targetPnl.removeClass('pnl-' + (indexer + 1) +'').addClass('pnl-' + indexer + '')
        targetPnl.find('.delete').attr('onclick', 'delPnl(' + indexer + ')');
        targetPnl.find('.btnColorGen button').attr('onclick', 'RanColorGen(".pnl-' + indexer + '")');
        indexer++;
    })
    calcWidth();
}

// Shorthand for $( document ).ready()
$(function() {
    $('.colorPnl, .addPnl').css('width', 100 / (colorPnl.elmtCount + 1) + '%')
    RanColorGen('.pnl-0');
    white();
});