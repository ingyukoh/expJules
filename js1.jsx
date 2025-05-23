// js1.jsx
// Opens a new document and places PatBlk.eps scaled to fit 40mm x 80mm

function mmToPoints(mm) {
    return mm * 2.834645669; // 1 mm = 2.834645669 points
}

// Set units to millimeters
app.preferences.setIntegerPreference('rulerType', RulerUnits.Millimeters);

var docPreset = new DocumentPreset();
docPreset.units = RulerUnits.Millimeters;
docPreset.width = 200;
docPreset.height = 500;

var doc = app.documents.addDocument('Print', docPreset);
var ab = doc.artboards[0];
ab.name = 'AB';
ab.artboardRect = [0, 500, 200, 0];

doc.artboards.setActiveArtboardIndex(0);

var imgPath = File(File($.fileName).parent + '/PatBlk.eps');
if (!imgPath.exists) {
    alert('Image file not found: ' + imgPath.fsName);
} else {
    var placed = doc.placedItems.add();
    placed.file = imgPath;

    // Scale proportionally to fit within 40 x 80 mm
    var targetWidth = 40;
    var targetHeight = 80;
    var scaleW = targetWidth / placed.width;
    var scaleH = targetHeight / placed.height;
    var scale = Math.min(scaleW, scaleH) * 100; // scale percentage

    placed.resize(scale, scale);
    
    // position top left with small margin
    placed.position = [10, -10];

    // Add text label with file name below the image
    var txt = doc.textFrames.add();
    txt.contents = imgPath.name;
    txt.left = placed.left;
    txt.top = placed.top - placed.height - 5; // 5 mm gap
}
