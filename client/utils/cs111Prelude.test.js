import { strip } from './cs111Prelude';

const exampleInput = `
// The timestamp of your freeze frame
// TODO: Replace these zero values
let minutes = Editor.slider(0, 100, 4);
let seconds = Editor.slider(0, 100, 13);

// Screenshot of your freeze frame
let img;

// Canvas size; canvasHeight will be set during setup()
let canvasWidth = 400;
let canvasHeight;

// Adjust transparency level (between 0.0 and 1.0)
// while you work; then set to 1.0 for submission
let transparency = 1.0;

function preload() {
  // "Upload file" from the left sidebar, then load it here
  // TODO: Uncomment the next line, using appropriate filename
  img = loadImage("screenshot.png");
}

function setup() {
  if (img === undefined) {
    createCanvas(canvasWidth, 100);
    textSize(32);
    text("Upload file. Edit preload().", 10, 30);
  } else {
    // Rescale the image to 400px wide; canvasHeight will
    // be scaled proportionally. Set canvas size to that
    // of rescaled image. (don't modify next three lines)
    img.resize(canvasWidth, 0);
    canvasHeight = img.height;
    createCanvas(canvasWidth, canvasHeight);

    // TODO: If you need more setup(), do so here
  }
}

function draw() {
  drawOriginalImage();
  drawTransparentLayer();
  drawMyFreezeFrame();
}

function drawOriginalImage() {
  if (img !== undefined) {
    image(img, 0, 0);
  }
}

function drawTransparentLayer() {
  if (img !== undefined) {
    fill(255, 255, 255, transparency * 255);
    noStroke();
    rect(0, 0, canvasWidth, canvasHeight);
  }
}

function mouseMoved() {
  console.log("mouseX = " + mouseX, "mouseY = " + mouseY);
}

function drawMyFreezeFrame() {
  // define color of background
  background("#e3ffa1");

  // draw shadows of both characters
  Editor.shapeToolbox(() => {
    fill("#cce693");
    rect(74, 189, 98, 21);
    ellipse(282, 198, 70, 22);
  });
  
 // define overarching variables for legs
  const x1 = 114;
  const x2 = 141;
  const y2 = 192;
  const y1 = 156;
  
  // draw the outline of the square character
  Editor.shapeToolbox(() => {
    fill("#941936");
    rect(78, 70, 94, 94);
  });

  // draw legs of the square character
  Editor.shapeToolbox(function() {
    stroke("black");
    strokeWeight(6);
    line(x1, y1, x1, y2);
    line(x2, y1 + 10, x2, y2);
    line(x1, y2, 123, y2);
    line(x2, y2, 151, y2);
  });

  // draw arms of the square character
  Editor.shapeToolbox(function example() {
    // left arm (my pov)
    line(105, 127, 82, 140);
    line(84, 141, 94, 151);
    // fingers
    line(95, 152, 92, 157);
    line(97, 153, 96, 157);
    line(98, 151, 99, 159);
    // right arm (my pov)
    line(172, 114, 189, 97);
    line(172, 77, 189, 97);
    // fingers
    line(172, 72, 172, 83);
    line(165, 76, 177, 83);
    line(168, 70, 169, 78);
  });

  // draw eyes of the square character
  let d = 16;
  let x3 = 138;
  let y3 = 111;
  let elY = 108;
  let elW = 10;
  let elH = 12;

  Editor.shapeToolbox(() => {
    noStroke();
    fill("white");
    circle(138, 111, 16);
    circle(154, 111, 16);
    fill("black");
    ellipse(135, elY, elW, elH);
    ellipse(151, elY, elW, elH);
  });

  // draw brows of the square character
  Editor.shapeToolbox(() => {
    stroke("black");
    line(133, 100, 143, 100);
    line(152, 100, 159, 100);
  });

  // draw mouth of the square character
  Editor.shapeToolbox(() => {
    fill("white");
    strokeWeight(3);
    ellipse(146, 131, 16, 10);
    // teeth
    strokeWeight(1);
    line(143, 128, 143, 136);
    line(148, 128, 148, 136);
  });

  // draw the outline of the circle character
  Editor.shapeToolbox(() => {
    fill("#2b5dad");
    noStroke();
    circle(286, 115, 94);
  });

  // draw the legs of the circle character
  Editor.shapeToolbox(() => {
    stroke("black");
    strokeWeight(6);
    line(301, 151, 301, y2);
    line(274, 161, 274, y2);
    line(265, y2, 274, y2);
    line(288, y2, 301, y2);
  });

  // draw arms of the circle character
  Editor.shapeToolbox(() => {
    strokeWeight(6);
    // left arm (my pov)
    line(245, 138, 239, 148);
    line(240, 148, 253, 140);
    // fingers
    line(251, 141, 258, 141);
    line(249, 139, 259, 134);
    line(249, 143, 253, 144);
    // right arm (my pov)
    line(312, 130, 293, 147);
    line(284, 140, 289, 144);
    // fingers
    line(280, 139, 287, 139);
    line(274, 133, 284, 139);
    line(281, 143, 284, 137);
  });

  // draw eyes of the circle character
  Editor.shapeToolbox(() => {
    noStroke();
    fill("white");
    circle(254, 108, 16);
    circle(272, 108, 16);
    fill("black");
    ellipse(268, elY, elW, elH);
    ellipse(251, elY, elW, elH);
  });

  // draw tears of the circle character
  let elY1 = 114;
  let elW1 = 13;
  let elH1 = 4;
  Editor.shapeToolbox(() => {
    fill("#234d91");
    ellipse(254, elY1, elW1, elH1);
    ellipse(273, elY1, elW1, elH1);
  });

  // draw brows of the circle character
  Editor.shapeToolbox(() => {
    stroke("black");
    strokeWeight(4);
    line(268, 93, 274, 96);
    line(249, 96, 255, 93);
  });

  // draw mouth of the circle character
  Editor.shapeToolbox(() => {
    strokeWeight(3);
    line(254, 125, 273, 125);
  });
}`;

const smallExampleInput = `
let minutes = Editor.slider(0, 100, 4);
let seconds = Editor.slider(0, 100, 13);

function draw() {
  console.log('wow good job')
  // draw brows of the circle character
  Editor.shapeToolbox(() => {
    stroke("black");
    strokeWeight(4);
    line(268, 93, 274, 96);
    line(249, 96, 255, 93);
  });

  // draw mouth of the circle character
  Editor.shapeToolbox(() => {
    strokeWeight(3);
    line(254, 125, 273, 125);
  });
}`;

test('strip should correctly remove multiple shapetoolboxes and sliders', () => {
  expect(strip(exampleInput)).toMatchSnapshot();
  expect(strip(smallExampleInput)).toMatchSnapshot();
});
