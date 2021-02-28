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

    static changeLightness(color, lightValue) { //should use hsl for changing the saturation and lightness
        if(lightValue >= 0) {
            for(let i = 0; i < 3; i++) {
                if (color[i] !== 0 && color[i] >= lightValue) {
                    color[i] -= lightValue;
                } else if (color[i] === color[i]) {
                    color[i] = 0;
                }
            }
        } else {
            for(let i = 0; i < 3; i++) {
                if (color[i] !== 255 && color[i] <= 255-lightValue) {
                    color[i] -= lightValue;
                } else if (color[i] === color[i]) {
                    color[i] = 255;
                }
            }
        }

        return color;
    }

    static hex(x) { //unknown method --> I dont know if this is needed but I left it here for the sake of the codes integrity
        let hexD = colorConvert.getHexChars();
        return isNaN(x) ? "00" : hexD[(x - x % 16) / 16] + hexD[x % 16];
    }

    static rgbToHsl() {

    }

    static hslToHex() {

    }
}