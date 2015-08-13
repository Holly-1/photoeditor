class ImageUtils {
    static getCanvas(w, h) {
        var c = document.querySelector("canvas");
        c.width = w;
        c.height = h;
        return c;
    }

    static getPixels(img) {
        var c = ImageUtils.getCanvas(img.width, img.height);
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0,0,c.width,c.height);
    }

    static putPixels(imageData, w, h) {
        var c = ImageUtils.getCanvas(w, h);
        var ctx = c.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }

    static initializePixelGrid(width, height) {
        var pixelGrid = new Array(height);
        for(var y = 0; y < height; y++) {
            pixelGrid[y] = new Array(width);
        }
        return pixelGrid;
    }
}

class RGBA {
    constructor(redValue, greenValue, blueValue, alphaValue) {
        this.red = redValue;
        this.green = greenValue;
        this.blue = blueValue;
        this.alpha = alphaValue;
    }
}


function colourise(img, colour, level) {

    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all; i += 4) {
        var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
        var modifiedRGBA = colourisePixel(originalRGBA, colour, level);

        setPixel(data, i, modifiedRGBA);
    }

    ImageUtils.putPixels(pixels, img.width, img.height);
}

function colourisePixel(originalRGBA, colour, level) {
    var diffRed = (originalRGBA.red - colour.red) * (level / 100);
    var newRed = originalRGBA.red - diffRed;

    var diffGreen = (originalRGBA.green - colour.green) * (level / 100);
    var newGreen = originalRGBA.green - diffGreen;

    var diffBlue = ((originalRGBA.blue - colour.blue) * (level / 100));
    var newBlue = originalRGBA.blue - diffBlue;

    return new RGBA(newRed, newGreen, newBlue, originalRGBA.alpha);
}

function setPixel(data, i, colour) {
    data[i] = rgba.red;
    data[i+1] = rgba.green;
    data[i+2] = rgba.blue;
    data[i+3] = rgba.alpha;
}

function sepia(img) {

    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all; i += 4) {
        var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
        var sepiaRGBA = sepiaPixel(originalRGBA);
        setPixel(data, i, sepiaRGBA);
    }

    ImageUtils.putPixels(pixels, img.width, img.height);
}

function sepiaPixel(colour) {

    var newRed = colour.red * 0.193 + colour.green * 0.769 + rgba.blue * 0.189;
    var newGreen = colour.red * 0.349 + colour.green * 0.686 + colour.blue * 0.168;
    var newBlue = colour.red * 0.272 + colour.green * 0.534 + colour.blue * 0.131;

    return new RGBA(newRed, newGreen, newBlue, colour.alpha);
}

function clip(img, adjustment) {
    var pixels = ImageUtils.getPixels(img);
    var all = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < all; i += 4) {
        var originalRGBA = new RGBA(data[i], data[i+1], data[i+2], data[i+3]);
        var newRGBA = clipPixel(originalRGBA, adjustment);

        setPixel(data, i, newRGBA);
    }

    ImageUtils.putPixels(pixels, img.width, img.height);
}

function clipPixel(colour, range) {
    var clippedRed = 0;


    if(colour.red > 255 - range) {
        clippedRed = 255;
    }

    var clippedGreen = 0;
    if(colour.green > 255 - range) {
        clippedGreen = 255;
    }

    var clippedBlue = 0;
    if(colour.blue > 255 - range) {
        clippedBlue = 255;
    }

    return new RGBA(clippedRed, clippedGreen, clippedBlue, colour.alpha);
}

$(document).ready(function() {

    var img = new Image();
    img.src = "img/cat.jpg";

    //colourise(img, new RGBA(150, 100, 190, 1), 50);
    //colourise(img, new RGBA(100, 0, 10, 1), 60);
    //colourise(img, new RGBA(0, 0, 255, 1), 40);
    sepia(img);
    //clip(img, 180);
});