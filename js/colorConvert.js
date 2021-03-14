class colorConvert {//some code lines are inspired and or euqal to those you can find on css-tricks: https://css-tricks.com/converting-color-spaces-in-javascript/
    constructor() {}

    static ranColorGen(range) {
        const HEXCHARS = '0123456789ABCDEF';
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
            if(color.lightness+lightValue <= 100) {
                color.lightness += lightValue
            } else {
                color.lightness = 100;
            }
        } else {
            if(color.lightness+lightValue >= 0) {
                color.lightness += lightValue
            } else {
                color.lightness = 0;
            }
        }
        return color;
    }

    static hslToHex(hslObject) {
        hslObject.saturation /= 100;
        hslObject.lightness /= 100;
        
        let c = (1 - Math.abs(2 * hslObject.lightness - 1)) * hslObject.saturation,
            x = c * (1 - Math.abs((hslObject.hue / 60) % 2 - 1)),
            m = hslObject.lightness - c/2,
            r = 0,
            g = 0, 
            b = 0; 
        
        if (0 <= hslObject.hue && hslObject.hue < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= hslObject.hue && hslObject.hue < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= hslObject.hue && hslObject.hue < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= hslObject.hue && hslObject.hue < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= hslObject.hue && hslObject.hue < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= hslObject.hue && hslObject.hue < 360) {
            r = c; g = 0; b = x;
        }
        // Having obtained RGB, convert channels to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);
        
        // Prepend 0s, if necessary
        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        
        return "#" + r + g + b;
    }

    static hexToHsl(hex) {
        // Convert hex to RGB first
        let rgb = colorConvert.hexToRgb(hex);
        // Then to HSL
        rgb[0] /= 255;
        rgb[1] /= 255;
        rgb[2] /= 255;
        let cmin = Math.min(rgb[0],rgb[1],rgb[2]),
            cmax = Math.max(rgb[0],rgb[1],rgb[2]),
            delta = cmax - cmin,
            hue = 0,
            saturation = 0,
            lightness = 0;

        if (delta == 0)
            hue = 0;
        else if (cmax == rgb[0])
            hue = ((rgb[1] - rgb[2]) / delta) % 6;
        else if (cmax == rgb[1])
            hue = (rgb[2] - rgb[0]) / delta + 2;
        else
            hue = (rgb[0] - rgb[1]) / delta + 4;

        hue = Math.round(hue * 60);

        if (hue < 0)
            hue += 360;

        lightness = (cmax + cmin) / 2;
        saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
        saturation = +(saturation * 100).toFixed(1);
        lightness = +(lightness * 100).toFixed(1);

        return {hue: hue, saturation: saturation, lightness: lightness};
    }
}