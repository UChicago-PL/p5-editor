export const methodInfo = [
  {
    description: '<p>Extracts the alpha value from a color or pixel array.</p>\n',
    itemtype: 'method',
    name: 'alpha',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    return: { description: 'the alpha value', type: 'Number' },
    example: [
      "\n<div>\n<code>\nnoStroke();\nlet c = color(0, 126, 255, 102);\nfill(c);\nrect(15, 15, 35, 70);\nlet value = alpha(c); // Sets 'value' to 102\nfill(value);\nrect(50, 15, 35, 70);\n</code>\n</div>"
    ],
    alt: 'Left half of canvas light blue and right half light charcoal grey.',
    class: 'p5',
    module: 'Color',
    submodule: 'Creating & Reading'
  },
  {
    description: '<p>Extracts the blue value from a color or pixel array.</p>\n',
    itemtype: 'method',
    name: 'blue',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    return: { description: 'the blue value', type: 'Number' },
    example: [
      '\n<div>\n<code>\nlet c = color(175, 100, 220);\nfill(c);\nrect(15, 20, 35, 60); // Draw left rectangle\nlet blueValue = blue(c);\nfill(0, 0, blueValue);\nrect(50, 20, 35, 60); // Draw right rectangle\n</code>\n</div>'
    ],
    alt: 'Left half of canvas light purple and right half a royal blue.',
    class: 'p5',
    module: 'Color',
    submodule: 'Creating & Reading'
  },
  {
    description: '<p>Extracts the HSB brightness value from a color or pixel array.</p>\n',
    itemtype: 'method',
    name: 'brightness',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    return: { description: 'the brightness value', type: 'Number' },
    example: [
      "\n<div>\n<code>\nnoStroke();\ncolorMode(HSB, 255);\nlet c = color(0, 126, 255);\nfill(c);\nrect(15, 20, 35, 60);\nlet value = brightness(c); // Sets 'value' to 255\nfill(value);\nrect(50, 20, 35, 60);\n</code>\n</div>\n\n<div>\n<code>\nnoStroke();\ncolorMode(HSB, 255);\nlet c = color('hsb(60, 100%, 50%)');\nfill(c);\nrect(15, 20, 35, 60);\nlet value = brightness(c); // A 'value' of 50% is 127.5\nfill(value);\nrect(50, 20, 35, 60);\n</code>\n</div>"
    ],
    alt: "Left half of canvas salmon pink and the right half with it's brightness colored white.\nLeft half of canvas olive colored and the right half with it's brightness color gray.",
    class: 'p5',
    module: 'Color',
    submodule: 'Creating & Reading'
  },
  {
    description:
      '<p>Creates colors for storing in variables of the color datatype. The\nparameters are interpreted as RGB or HSB values depending on the\ncurrent <a href="#/p5/colorMode">colorMode()</a>. The default mode is RGB values from 0 to 255\nand, therefore, the function call color(255, 204, 0) will return a\nbright yellow color.</p>\n<p>Note that if only one value is provided to <a href="#/p5/color">color()</a>, it will be interpreted\nas a grayscale value. Add a second value, and it will be used for alpha\ntransparency. When three values are specified, they are interpreted as\neither RGB or HSB values. Adding a fourth value applies alpha\ntransparency.</p>\n<p>If a single string argument is provided, RGB, RGBA and Hex CSS color\nstrings and all named color strings are supported. In this case, an alpha\nnumber value as a second argument is not supported, the RGBA form should be\nused.</p>\n',
    itemtype: 'method',
    name: 'color',
    return: { description: 'resulting color', type: 'p5.Color' },
    example: [
      "\n<div>\n<code>\nlet c = color(255, 204, 0);\nfill(c);\nnoStroke();\nrect(30, 20, 55, 55);\n</code>\n</div>\n\n<div>\n<code>\nlet c = color(255, 204, 0);\nfill(c);\nnoStroke();\nellipse(25, 25, 80, 80); // Draw left circle\n// Using only one value generates a grayscale value.\nc = color(65);\nfill(c);\nellipse(75, 75, 80, 80);\n</code>\n</div>\n\n<div>\n<code>\n// You can use named SVG & CSS colors\nlet c = color('magenta');\nfill(c);\nnoStroke();\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// Example of hex color codes\nnoStroke();\nlet c = color('#0f0');\nfill(c);\nrect(0, 10, 45, 80);\nc = color('#00ff00');\nfill(c);\nrect(55, 10, 45, 80);\n</code>\n</div>\n\n<div>\n<code>\n// RGB and RGBA color strings are also supported\n// these all set to the same color (solid blue)\nlet c;\nnoStroke();\nc = color('rgb(0,0,255)');\nfill(c);\nrect(10, 10, 35, 35); // Draw rectangle\nc = color('rgb(0%, 0%, 100%)');\nfill(c);\nrect(55, 10, 35, 35); // Draw rectangle\nc = color('rgba(0, 0, 255, 1)');\nfill(c);\nrect(10, 55, 35, 35); // Draw rectangle\nc = color('rgba(0%, 0%, 100%, 1)');\nfill(c);\nrect(55, 55, 35, 35); // Draw rectangle\n</code>\n</div>\n\n<div>\n<code>\n// HSL color can also be specified by value\nlet c = color('hsl(160, 100%, 50%)');\nnoStroke();\nfill(c);\nrect(0, 10, 45, 80); // Draw rectangle\nc = color('hsla(160, 100%, 50%, 0.5)');\nfill(c);\nrect(55, 10, 45, 80); // Draw rectangle\n</code>\n</div>\n\n<div>\n<code>\n// HSB color can also be specified\nlet c = color('hsb(160, 100%, 50%)');\nnoStroke();\nfill(c);\nrect(0, 10, 45, 80); // Draw rectangle\nc = color('hsba(160, 100%, 50%, 0.5)');\nfill(c);\nrect(55, 10, 45, 80); // Draw rectangle\n</code>\n</div>\n\n<div>\n<code>\nnoStroke();\nlet c = color(50, 55, 100);\nfill(c);\nrect(0, 10, 45, 80); // Draw left rect\ncolorMode(HSB, 100);\nc = color(50, 55, 100);\nfill(c);\nrect(55, 10, 45, 80);\n</code>\n</div>"
    ],
    alt: 'Yellow rect in middle right of canvas, with 55 pixel width and height.\nYellow ellipse in top left of canvas, black ellipse in bottom right,both 80x80.\nBright fuchsia rect in middle of canvas, 60 pixel width and height.\nTwo bright green rects on opposite sides of the canvas, both 45x80.\nFour blue rects in each corner of the canvas, each are 35x35.\nBright sea green rect on left and darker rect on right of canvas, both 45x80.\nDark green rect on left and lighter green rect on right of canvas, both 45x80.\nDark blue rect on left and light teal rect on right of canvas, both 45x80.',
    class: 'p5',
    module: 'Color',
    submodule: 'Creating & Reading',
    overloads: [
      {
        line: 116,
        params: [
          {
            name: 'gray',
            description: '<p>number specifying value between white and black.</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description:
              '<p>alpha value relative to current color range\n                                (default is 0-255)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        return: { description: 'resulting color', type: 'p5.Color' }
      },
      {
        line: 257,
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          { name: 'alpha', description: '', type: 'Number', optional: true }
        ],
        return: { description: '', type: 'p5.Color' }
      },
      {
        line: 269,
        params: [{ name: 'value', description: '<p>a color string</p>\n', type: 'String' }],
        return: { description: '', type: 'p5.Color' }
      },
      {
        line: 275,
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red,green,blue &\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ],
        return: { description: '', type: 'p5.Color' }
      },
      {
        line: 282,
        params: [{ name: 'color', description: '', type: 'p5.Color' }],
        return: { description: '', type: 'p5.Color' }
      }
    ]
  },
  {
    description: '<p>Extracts the green value from a color or pixel array.</p>\n',
    itemtype: 'method',
    name: 'green',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    return: { description: 'the green value', type: 'Number' },
    example: [
      "\n<div>\n<code>\nlet c = color(20, 75, 200); // Define color 'c'\nfill(c); // Use color variable 'c' as fill color\nrect(15, 20, 35, 60); // Draw left rectangle\n\nlet greenValue = green(c); // Get green in 'c'\nprint(greenValue); // Print \"75.0\"\nfill(0, greenValue, 0); // Use 'greenValue' in new fill\nrect(50, 20, 35, 60); // Draw right rectangle\n</code>\n</div>"
    ],
    alt: 'blue rect on left and green on right, both with black outlines & 35x60.',
    class: 'p5',
    module: 'Color',
    submodule: 'Creating & Reading'
  },
  {
    description:
      '<p>Extracts the hue value from a color or pixel array.</p>\n<p>Hue exists in both HSB and HSL. This function will return the\nHSB-normalized hue when supplied with an HSB color object (or when supplied\nwith a pixel array while the color mode is HSB), but will default to the\nHSL-normalized hue otherwise. (The values will only be different if the\nmaximum hue setting for each system is different.)</p>\n',
    itemtype: 'method',
    name: 'hue',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    return: { description: 'the hue', type: 'Number' },
    example: [
      '\n<div>\n<code>\nnoStroke();\ncolorMode(HSB, 255);\nlet c = color(0, 126, 255);\nfill(c);\nrect(15, 20, 35, 60);\nlet value = hue(c); // Sets \'value\' to "0"\nfill(value);\nrect(50, 20, 35, 60);\n</code>\n</div>'
    ],
    alt: 'salmon pink rect on left and black on right, both 35x60.',
    class: 'p5',
    module: 'Color',
    submodule: 'Creating & Reading'
  },
  {
    description:
      '<p>Blends two colors to find a third color somewhere between them. The amt\nparameter is the amount to interpolate between the two values where 0.0\nis equal to the first color, 0.1 is very near the first color, 0.5 is halfway\nin between, etc. An amount below 0 will be treated as 0. Likewise, amounts\nabove 1 will be capped at 1. This is different from the behavior of <a href="#/p5/lerp">lerp()</a>,\nbut necessary because otherwise numbers outside the range will produce\nstrange and unexpected colors.</p>\n<p>The way that colors are interpolated depends on the current color mode.</p>\n',
    itemtype: 'method',
    name: 'lerpColor',
    params: [
      { name: 'c1', description: '<p>interpolate from this color</p>\n', type: 'p5.Color' },
      { name: 'c2', description: '<p>interpolate to this color</p>\n', type: 'p5.Color' },
      { name: 'amt', description: '<p>number between 0 and 1</p>\n', type: 'Number' }
    ],
    return: { description: 'interpolated color', type: 'p5.Color' },
    example: [
      '\n<div>\n<code>\ncolorMode(RGB);\nstroke(255);\nbackground(51);\nlet from = color(218, 165, 32);\nlet to = color(72, 61, 139);\ncolorMode(RGB); // Try changing to HSB.\nlet interA = lerpColor(from, to, 0.33);\nlet interB = lerpColor(from, to, 0.66);\nfill(from);\nrect(10, 20, 20, 60);\nfill(interA);\nrect(30, 20, 20, 60);\nfill(interB);\nrect(50, 20, 20, 60);\nfill(to);\nrect(70, 20, 20, 60);\n</code>\n</div>'
    ],
    alt: '4 rects one tan, brown, brownish purple, purple, with white outlines & 20x60',
    class: 'p5',
    module: 'Color',
    submodule: 'Creating & Reading'
  },
  {
    description: '<p>Extracts the HSL lightness value from a color or pixel array.</p>\n',
    itemtype: 'method',
    name: 'lightness',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    return: { description: 'the lightness', type: 'Number' },
    example: [
      "\n<div>\n<code>\nnoStroke();\ncolorMode(HSL);\nlet c = color(156, 100, 50, 1);\nfill(c);\nrect(15, 20, 35, 60);\nlet value = lightness(c); // Sets 'value' to 50\nfill(value);\nrect(50, 20, 35, 60);\n</code>\n</div>"
    ],
    alt: 'light pastel green rect on left and dark grey rect on right, both 35x60.',
    class: 'p5',
    module: 'Color',
    submodule: 'Creating & Reading'
  },
  {
    description: '<p>Extracts the red value from a color or pixel array.</p>\n',
    itemtype: 'method',
    name: 'red',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    return: { description: 'the red value', type: 'Number' },
    example: [
      "\n<div>\n<code>\nlet c = color(255, 204, 0); // Define color 'c'\nfill(c); // Use color variable 'c' as fill color\nrect(15, 20, 35, 60); // Draw left rectangle\n\nlet redValue = red(c); // Get red in 'c'\nprint(redValue); // Print \"255.0\"\nfill(redValue, 0, 0); // Use 'redValue' in new fill\nrect(50, 20, 35, 60); // Draw right rectangle\n</code>\n</div>\n\n<div class=\"norender\">\n<code>\ncolorMode(RGB, 255); // Sets the range for red, green, and blue to 255\nlet c = color(127, 255, 0);\ncolorMode(RGB, 1); // Sets the range for red, green, and blue to 1\nlet myColor = red(c);\nprint(myColor); // 0.4980392156862745\n</code>\n</div>"
    ],
    alt: 'yellow rect on left and red rect on right, both with black outlines and 35x60.\ngrey canvas',
    class: 'p5',
    module: 'Color',
    submodule: 'Creating & Reading'
  },
  {
    description:
      '<p>Extracts the saturation value from a color or pixel array.</p>\n<p>Saturation is scaled differently in HSB and HSL. This function will return\nthe HSB saturation when supplied with an HSB color object (or when supplied\nwith a pixel array while the color mode is HSB), but will default to the\nHSL saturation otherwise.</p>\n',
    itemtype: 'method',
    name: 'saturation',
    params: [
      {
        name: 'color',
        description:
          '<p><a href="#/p5.Color">p5.Color</a> object, color components,\n                                        or CSS color</p>\n',
        type: 'p5.Color|Number[]|String'
      }
    ],
    return: { description: 'the saturation value', type: 'Number' },
    example: [
      "\n<div>\n<code>\nnoStroke();\ncolorMode(HSB, 255);\nlet c = color(0, 126, 255);\nfill(c);\nrect(15, 20, 35, 60);\nlet value = saturation(c); // Sets 'value' to 126\nfill(value);\nrect(50, 20, 35, 60);\n</code>\n</div>"
    ],
    alt: 'deep pink rect on left and grey rect on right, both 35x60.',
    class: 'p5',
    module: 'Color',
    submodule: 'Creating & Reading'
  },
  {
    description:
      '<p>The <a href="#/p5/background">background()</a> function sets the color used\nfor the background of the p5.js canvas. The default background is transparent.\nThis function is typically used within <a href="#/p5/draw">draw()</a> to clear\nthe display window at the beginning of each frame, but it can be used inside\n<a href="#/p5/setup">setup()</a> to set the background on the first frame of\nanimation or if the background need only be set once.</p>\n<p>The color is either specified in terms of the RGB, HSB, or HSL color depending\non the current <a href="#/p5/colorMode">colorMode</a>. (The default color space\nis RGB, with each value in the range from 0 to 255). The alpha range by default\nis also 0 to 255.<br><br></p>\n<p>If a single string argument is provided, RGB, RGBA and Hex CSS color strings\nand all named color strings are supported. In this case, an alpha number\nvalue as a second argument is not supported, the RGBA form should be used.</p>\n<p>A <a href="#/p5.Color">p5.Color</a> object can also be provided to set the background color.</p>\n<p>A <a href="#/p5.Image">p5.Image</a> can also be provided to set the background image.</p>\n',
    itemtype: 'method',
    name: 'background',
    chainable: 1,
    example: [
      "\n<div>\n<code>\n// Grayscale integer value\nbackground(51);\n</code>\n</div>\n\n<div>\n<code>\n// R, G & B integer values\nbackground(255, 204, 0);\n</code>\n</div>\n\n<div>\n<code>\n// H, S & B integer values\ncolorMode(HSB);\nbackground(255, 204, 100);\n</code>\n</div>\n\n<div>\n<code>\n// Named SVG/CSS color string\nbackground('red');\n</code>\n</div>\n\n<div>\n<code>\n// three-digit hexadecimal RGB notation\nbackground('#fae');\n</code>\n</div>\n\n<div>\n<code>\n// six-digit hexadecimal RGB notation\nbackground('#222222');\n</code>\n</div>\n\n<div>\n<code>\n// integer RGB notation\nbackground('rgb(0,255,0)');\n</code>\n</div>\n\n<div>\n<code>\n// integer RGBA notation\nbackground('rgba(0,255,0, 0.25)');\n</code>\n</div>\n\n<div>\n<code>\n// percentage RGB notation\nbackground('rgb(100%,0%,10%)');\n</code>\n</div>\n\n<div>\n<code>\n// percentage RGBA notation\nbackground('rgba(100%,0%,100%,0.5)');\n</code>\n</div>\n\n<div>\n<code>\n// p5 Color object\nbackground(color(0, 0, 255));\n</code>\n</div>"
    ],
    alt: 'canvas with darkest charcoal grey background.\ncanvas with yellow background.\ncanvas with royal blue background.\ncanvas with red background.\ncanvas with pink background.\ncanvas with black background.\ncanvas with bright green background.\ncanvas with soft green background.\ncanvas with red background.\ncanvas with light purple background.\ncanvas with blue background.',
    class: 'p5',
    module: 'Color',
    submodule: 'Setting',
    overloads: [
      {
        line: 13,
        params: [
          {
            name: 'color',
            description: '<p>any value created by the <a href="#/p5/color">color()</a> function</p>\n',
            type: 'p5.Color'
          }
        ],
        chainable: 1
      },
      {
        line: 131,
        params: [
          {
            name: 'colorstring',
            description:
              '<p>color string, possible formats include: integer\n                        rgb() or rgba(), percentage rgb() or rgba(),\n                        3-digit hex, 6-digit hex</p>\n',
            type: 'String'
          },
          {
            name: 'a',
            description:
              '<p>opacity of the background relative to current\n                            color range (default is 0-255)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        line: 141,
        params: [
          { name: 'gray', description: '<p>specifies a value between white and black</p>\n', type: 'Number' },
          { name: 'a', description: '', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 148,
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value (depending on the current color\n                       mode)</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value (depending on the current\n                       color mode)</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value (depending on the current\n                       color mode)</p>\n',
            type: 'Number'
          },
          { name: 'a', description: '', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 160,
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red, green, blue\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ],
        chainable: 1
      },
      {
        line: 167,
        params: [
          {
            name: 'image',
            description:
              '<p>image created with <a href="#/p5/loadImage">loadImage()</a> or <a href="#/p5/createImage">createImage()</a>,\n                            to set as background\n                            (must be same size as the sketch window)</p>\n',
            type: 'p5.Image'
          },
          { name: 'a', description: '', type: 'Number', optional: true }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Clears the pixels within a buffer. This function only clears the canvas.\nIt will not clear objects created by createX() methods such as\n<a href="#/p5/createVideo">createVideo()</a> or <a href="#/p5/createDiv">createDiv()</a>.\nUnlike the main graphics context, pixels in additional graphics areas created\nwith <a href="#/p5/createGraphics">createGraphics()</a> can be entirely\nor partially transparent. This function clears everything to make all of\nthe pixels 100% transparent.</p>\n',
    itemtype: 'method',
    name: 'clear',
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// Clear the screen on mouse press.\nfunction draw() {\n  ellipse(mouseX, mouseY, 20, 20);\n}\nfunction mousePressed() {\n  clear();\n  background(128);\n}\n</code>\n</div>'
    ],
    alt: "small white ellipses are continually drawn at mouse's x and y coordinates.",
    class: 'p5',
    module: 'Color',
    submodule: 'Setting'
  },
  {
    description:
      '<p><a href="#/p5/colorMode">colorMode()</a> changes the way p5.js interprets\ncolor data. By default, the parameters for <a href="#/p5/fill">fill()</a>,\n<a href="#/p5/stroke">stroke()</a>, <a href="#/p5/background">background()</a>,\nand <a href="#/p5/color">color()</a> are defined by values between 0 and 255\nusing the RGB color model. This is equivalent to setting colorMode(RGB, 255).\nSetting colorMode(HSB) lets you use the HSB system instead. By default, this\nis colorMode(HSB, 360, 100, 100, 1). You can also use HSL.</p>\n<p>Note: existing color objects remember the mode that they were created in,\nso you can change modes as you like without affecting their appearance.</p>\n',
    itemtype: 'method',
    name: 'colorMode',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nnoStroke();\ncolorMode(RGB, 100);\nfor (let i = 0; i < 100; i++) {\n  for (let j = 0; j < 100; j++) {\n    stroke(i, j, 0);\n    point(i, j);\n  }\n}\n</code>\n</div>\n\n<div>\n<code>\nnoStroke();\ncolorMode(HSB, 100);\nfor (let i = 0; i < 100; i++) {\n  for (let j = 0; j < 100; j++) {\n    stroke(i, j, 100);\n    point(i, j);\n  }\n}\n</code>\n</div>\n\n<div>\n<code>\ncolorMode(RGB, 255);\nlet c = color(127, 255, 0);\ncolorMode(RGB, 1);\nlet myColor = c._getRed();\ntext(myColor, 10, 10, 80, 80);\n</code>\n</div>\n\n<div>\n<code>\nnoFill();\ncolorMode(RGB, 255, 255, 255, 1);\nbackground(255);\nstrokeWeight(4);\nstroke(255, 0, 10, 0.3);\nellipse(40, 40, 50, 50);\nellipse(50, 50, 40, 40);\n</code>\n</div>'
    ],
    alt: 'Green to red gradient from bottom L to top R. shading originates from top left.\nRainbow gradient from left to right. Brightness increasing to white at top.\nunknown image.\n50x50 ellipse at middle L & 40x40 ellipse at center. Translucent pink outlines.',
    class: 'p5',
    module: 'Color',
    submodule: 'Setting',
    overloads: [
      {
        line: 214,
        params: [
          {
            name: 'mode',
            description:
              '<p>either RGB, HSB or HSL, corresponding to\n                         Red/Green/Blue and Hue/Saturation/Brightness\n                         (or Lightness)</p>\n',
            type: 'Constant'
          },
          { name: 'max', description: '<p>range for all values</p>\n', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 289,
        params: [
          { name: 'mode', description: '', type: 'Constant' },
          {
            name: 'max1',
            description:
              '<p>range for the red or hue depending on the\n                             current color mode</p>\n',
            type: 'Number'
          },
          {
            name: 'max2',
            description:
              '<p>range for the green or saturation depending\n                             on the current color mode</p>\n',
            type: 'Number'
          },
          {
            name: 'max3',
            description:
              '<p>range for the blue or brightness/lightness\n                             depending on the current color mode</p>\n',
            type: 'Number'
          },
          { name: 'maxA', description: '<p>range for the alpha</p>\n', type: 'Number', optional: true }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Sets the color used to fill shapes. For example, if you run fill(204, 102, 0),\nall shapes drawn after the fill command will be filled with the color orange.\nThis color is either specified in terms of the RGB or HSB color depending on\nthe current <a href="#/p5/colorMode">colorMode()</a>. (The default color space\nis RGB, with each value in the range from 0 to 255). The alpha range by default\nis also 0 to 255.</p>\n<p>If a single string argument is provided, RGB, RGBA and Hex CSS color strings\nand all named color strings are supported. In this case, an alpha number\nvalue as a second argument is not supported, the RGBA form should be used.</p>\n<p>A p5 <a href="#/p5.Color">Color</a> object can also be provided to set the fill color.</p>\n',
    itemtype: 'method',
    name: 'fill',
    chainable: 1,
    example: [
      "\n<div>\n<code>\n// Grayscale integer value\nfill(51);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// R, G & B integer values\nfill(255, 204, 0);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// H, S & B integer values\ncolorMode(HSB);\nfill(255, 204, 100);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// Named SVG/CSS color string\nfill('red');\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// three-digit hexadecimal RGB notation\nfill('#fae');\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// six-digit hexadecimal RGB notation\nfill('#222222');\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// integer RGB notation\nfill('rgb(0,255,0)');\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// integer RGBA notation\nfill('rgba(0,255,0, 0.25)');\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// percentage RGB notation\nfill('rgb(100%,0%,10%)');\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// percentage RGBA notation\nfill('rgba(100%,0%,100%,0.5)');\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// p5 Color object\nfill(color(0, 0, 255));\nrect(20, 20, 60, 60);\n</code>\n</div>"
    ],
    alt: '60x60 dark charcoal grey rect with black outline in center of canvas.\n60x60 yellow rect with black outline in center of canvas.\n60x60 royal blue rect with black outline in center of canvas.\n60x60 red rect with black outline in center of canvas.\n60x60 pink rect with black outline in center of canvas.\n60x60 black rect with black outline in center of canvas.\n60x60 light green rect with black outline in center of canvas.\n60x60 soft green rect with black outline in center of canvas.\n60x60 red rect with black outline in center of canvas.\n60x60 dark fuchsia rect with black outline in center of canvas.\n60x60 blue rect with black outline in center of canvas.',
    class: 'p5',
    module: 'Color',
    submodule: 'Setting',
    overloads: [
      {
        line: 333,
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          { name: 'alpha', description: '', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 460,
        params: [{ name: 'value', description: '<p>a color string</p>\n', type: 'String' }],
        chainable: 1
      },
      {
        line: 466,
        params: [
          { name: 'gray', description: '<p>a gray value</p>\n', type: 'Number' },
          { name: 'alpha', description: '', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 473,
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red,green,blue &\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ],
        chainable: 1
      },
      {
        line: 480,
        params: [{ name: 'color', description: '<p>the fill color</p>\n', type: 'p5.Color' }],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Disables filling geometry. If both <a href="#/p5/noStroke">noStroke()</a> and <a href="#/p5/noFill">noFill()</a> are called,\nnothing will be drawn to the screen.</p>\n',
    itemtype: 'method',
    name: 'noFill',
    chainable: 1,
    example: [
      "\n<div>\n<code>\nrect(15, 10, 55, 55);\nnoFill();\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div modernizr='webgl'>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(0);\n  noFill();\n  stroke(100, 100, 240);\n  rotateX(frameCount * 0.01);\n  rotateY(frameCount * 0.01);\n  box(45, 45, 45);\n}\n</code>\n</div>"
    ],
    alt: 'white rect top middle and noFill rect center. Both 60x60 with black outlines.\nblack canvas with purple cube wireframe spinning',
    class: 'p5',
    module: 'Color',
    submodule: 'Setting'
  },
  {
    description:
      '<p>Disables drawing the stroke (outline). If both <a href="#/p5/noStroke">noStroke()</a> and <a href="#/p5/noFill">noFill()</a>\nare called, nothing will be drawn to the screen.</p>\n',
    itemtype: 'method',
    name: 'noStroke',
    chainable: 1,
    example: [
      "\n<div>\n<code>\nnoStroke();\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div modernizr='webgl'>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(0);\n  noStroke();\n  fill(240, 150, 150);\n  rotateX(frameCount * 0.01);\n  rotateY(frameCount * 0.01);\n  box(45, 45, 45);\n}\n</code>\n</div>"
    ],
    alt: '60x60 white rect at center. no outline.\nblack canvas with pink cube spinning',
    class: 'p5',
    module: 'Color',
    submodule: 'Setting'
  },
  {
    description:
      '<p>Sets the color used to draw lines and borders around shapes. This color\nis either specified in terms of the RGB or HSB color depending on the\ncurrent <a href="#/p5/colorMode">colorMode()</a> (the default color space\nis RGB, with each value in the range from 0 to 255). The alpha range by\ndefault is also 0 to 255.</p>\n<p>If a single string argument is provided, RGB, RGBA and Hex CSS color\nstrings and all named color strings are supported. In this case, an alpha\nnumber value as a second argument is not supported, the RGBA form should be\nused.</p>\n<p>A p5 <a href="#/p5.Color">Color</a> object can also be provided to set the stroke color.</p>\n',
    itemtype: 'method',
    name: 'stroke',
    chainable: 1,
    example: [
      "\n<div>\n<code>\n// Grayscale integer value\nstrokeWeight(4);\nstroke(51);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// R, G & B integer values\nstroke(255, 204, 0);\nstrokeWeight(4);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// H, S & B integer values\ncolorMode(HSB);\nstrokeWeight(4);\nstroke(255, 204, 100);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// Named SVG/CSS color string\nstroke('red');\nstrokeWeight(4);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// three-digit hexadecimal RGB notation\nstroke('#fae');\nstrokeWeight(4);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// six-digit hexadecimal RGB notation\nstroke('#222222');\nstrokeWeight(4);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// integer RGB notation\nstroke('rgb(0,255,0)');\nstrokeWeight(4);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// integer RGBA notation\nstroke('rgba(0,255,0,0.25)');\nstrokeWeight(4);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// percentage RGB notation\nstroke('rgb(100%,0%,10%)');\nstrokeWeight(4);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// percentage RGBA notation\nstroke('rgba(100%,0%,100%,0.5)');\nstrokeWeight(4);\nrect(20, 20, 60, 60);\n</code>\n</div>\n\n<div>\n<code>\n// p5 Color object\nstroke(color(0, 0, 255));\nstrokeWeight(4);\nrect(20, 20, 60, 60);\n</code>\n</div>"
    ],
    alt: '60x60 white rect at center. Dark charcoal grey outline.\n60x60 white rect at center. Yellow outline.\n60x60 white rect at center. Royal blue outline.\n60x60 white rect at center. Red outline.\n60x60 white rect at center. Pink outline.\n60x60 white rect at center. Black outline.\n60x60 white rect at center. Bright green outline.\n60x60 white rect at center. Soft green outline.\n60x60 white rect at center. Red outline.\n60x60 white rect at center. Dark fuchsia outline.\n60x60 white rect at center. Blue outline.',
    class: 'p5',
    module: 'Color',
    submodule: 'Setting',
    overloads: [
      {
        line: 573,
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          { name: 'alpha', description: '', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 712,
        params: [{ name: 'value', description: '<p>a color string</p>\n', type: 'String' }],
        chainable: 1
      },
      {
        line: 718,
        params: [
          { name: 'gray', description: '<p>a gray value</p>\n', type: 'Number' },
          { name: 'alpha', description: '', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 725,
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red,green,blue &\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ],
        chainable: 1
      },
      {
        line: 732,
        params: [{ name: 'color', description: '<p>the stroke color</p>\n', type: 'p5.Color' }],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>All drawing that follows <a href="#/p5/erase">erase()</a> will subtract from\nthe canvas.Erased areas will reveal the web page underneath the canvas.Erasing\ncan be canceled with <a href="#/p5/noErase">noErase()</a>.</p>\n<p>Drawing done with <a href="#/p5/image">image()</a> and <a href="#/p5/background">\nbackground()</a> in between <a href="#/p5/erase">erase()</a> and\n<a href="#/p5/noErase">noErase()</a> will not erase the canvas but works as usual.</p>\n',
    itemtype: 'method',
    name: 'erase',
    params: [
      {
        name: 'strengthFill',
        description:
          "<p>A number (0-255) for the strength of erasing for a shape's fill.\n                                       This will default to 255 when no argument is given, which\n                                       is full strength.</p>\n",
        type: 'Number',
        optional: true
      },
      {
        name: 'strengthStroke',
        description:
          "<p>A number (0-255) for the strength of erasing for a shape's stroke.\n                                       This will default to 255 when no argument is given, which\n                                       is full strength.</p>\n",
        type: 'Number',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      "\n<div>\n<code>\nbackground(100, 100, 250);\nfill(250, 100, 100);\nrect(20, 20, 60, 60);\nerase();\nellipse(25, 30, 30);\nnoErase();\n</code>\n</div>\n\n<div>\n<code>\nbackground(150, 250, 150);\nfill(100, 100, 250);\nrect(20, 20, 60, 60);\nstrokeWeight(5);\nerase(150, 255);\ntriangle(50, 10, 70, 50, 90, 10);\nnoErase();\n</code>\n</div>\n\n<div>\n<code>\nfunction setup() {\n  smooth();\n  createCanvas(100, 100, WEBGL);\n  // Make a &lt;p&gt; element and put it behind the canvas\n  let p = createP('I am a dom element');\n  p.center();\n  p.style('font-size', '20px');\n  p.style('text-align', 'center');\n  p.style('z-index', '-9999');\n}\n\nfunction draw() {\n  background(250, 250, 150);\n  fill(15, 195, 185);\n  noStroke();\n  sphere(30);\n  erase();\n  rotateY(frameCount * 0.02);\n  translate(0, 0, 40);\n  torus(15, 5);\n  noErase();\n}\n</code>\n</div>"
    ],
    alt: '60x60 centered pink rect, purple background. Elliptical area in top-left of rect is erased white.\n60x60 centered purple rect, mint green background. Triangle in top-right is partially erased with fully erased outline.\n60x60 centered teal sphere, yellow background. Torus rotating around sphere erases to reveal black text underneath.',
    class: 'p5',
    module: 'Color',
    submodule: 'Setting'
  },
  {
    description:
      '<p>Ends erasing that was started with <a href="#/p5/erase">erase()</a>.\nThe <a href="#/p5/fill">fill()</a>, <a href="#/p5/stroke">stroke()</a>, and\n<a href="#/p5/blendMode">blendMode()</a> settings will return to what they were\nprior to calling <a href="#/p5/erase">erase()</a>.</p>\n',
    itemtype: 'method',
    name: 'noErase',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nbackground(235, 145, 15);\nnoStroke();\nfill(30, 45, 220);\nrect(30, 10, 10, 80);\nerase();\nellipse(50, 50, 60);\nnoErase();\nrect(70, 10, 10, 80);\n</code>\n</div>'
    ],
    alt: 'Orange background, with two tall blue rectangles. A centered ellipse erased the first blue rect but not the second.',
    class: 'p5',
    module: 'Color',
    submodule: 'Setting'
  },
  {
    description:
      '<p>Draw an arc to the screen. If called with only x, y, w, h, start and stop,\nthe arc will be drawn and filled as an open pie segment. If a mode parameter\nis provided, the arc will be filled like an open semi-circle (OPEN), a closed\nsemi-circle (CHORD), or as a closed pie segment (PIE). The origin may be changed\nwith the <a href="#/p5/ellipseMode">ellipseMode()</a> function.</p>\n<p>The arc is always drawn clockwise from wherever start falls to wherever stop\nfalls on the ellipse. Adding or subtracting TWO_PI to either angle does not\nchange where they fall. If both start and stop fall at the same place, a full\nellipse will be drawn. Be aware that the y-axis increases in the downward\ndirection, therefore angles are measured clockwise from the positive\nx-direction ("3 o\'clock").</p>\n',
    itemtype: 'method',
    name: 'arc',
    params: [
      { name: 'x', description: "<p>x-coordinate of the arc's ellipse</p>\n", type: 'Number' },
      { name: 'y', description: "<p>y-coordinate of the arc's ellipse</p>\n", type: 'Number' },
      { name: 'w', description: "<p>width of the arc's ellipse by default</p>\n", type: 'Number' },
      { name: 'h', description: "<p>height of the arc's ellipse by default</p>\n", type: 'Number' },
      { name: 'start', description: '<p>angle to start the arc, specified in radians</p>\n', type: 'Number' },
      { name: 'stop', description: '<p>angle to stop the arc, specified in radians</p>\n', type: 'Number' },
      {
        name: 'mode',
        description:
          '<p>optional parameter to determine the way of drawing\n                        the arc. either CHORD, PIE or OPEN</p>\n',
        type: 'Constant',
        optional: true
      },
      {
        name: 'detail',
        description:
          "<p>optional parameter for WebGL mode only. This is to\n                        specify the number of vertices that makes up the\n                        perimeter of the arc. Default value is 25. Won't\n                        draw a stroke for a detail of more than 50.</p>\n",
        type: 'Integer',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\narc(50, 55, 50, 50, 0, HALF_PI);\nnoFill();\narc(50, 55, 60, 60, HALF_PI, PI);\narc(50, 55, 70, 70, PI, PI + QUARTER_PI);\narc(50, 55, 80, 80, PI + QUARTER_PI, TWO_PI);\n</code>\n</div>\n\n<div>\n<code>\narc(50, 50, 80, 80, 0, PI + QUARTER_PI);\n</code>\n</div>\n\n<div>\n<code>\narc(50, 50, 80, 80, 0, PI + QUARTER_PI, OPEN);\n</code>\n</div>\n\n<div>\n<code>\narc(50, 50, 80, 80, 0, PI + QUARTER_PI, CHORD);\n</code>\n</div>\n\n<div>\n<code>\narc(50, 50, 80, 80, 0, PI + QUARTER_PI, PIE);\n</code>\n</div>'
    ],
    alt: 'shattered outline of an ellipse with a quarter of a white circle bottom-right.\nwhite ellipse with top right quarter missing.\nwhite ellipse with black outline with top right missing.\nwhite ellipse with top right missing with black outline around shape.\nwhite ellipse with top right quarter missing with black outline around the shape.',
    class: 'p5',
    module: 'Shape',
    submodule: '2D Primitives'
  },
  {
    description:
      '<p>Draws an ellipse (oval) to the screen. By default, the first two parameters\nset the location of the center of the ellipse, and the third and fourth\nparameters set the shape\'s width and height. If no height is specified, the\nvalue of width is used for both the width and height. If a negative height or\nwidth is specified, the absolute value is taken.</p>\n<p>An ellipse with equal width and height is a circle. The origin may be changed\nwith the <a href="#/p5/ellipseMode">ellipseMode()</a> function.</p>\n',
    itemtype: 'method',
    name: 'ellipse',
    chainable: 1,
    example: ['\n<div>\n<code>\nellipse(56, 46, 55, 55);\n</code>\n</div>'],
    alt: 'white ellipse with black outline in middle-right of canvas that is 55x55',
    class: 'p5',
    module: 'Shape',
    submodule: '2D Primitives',
    overloads: [
      {
        line: 232,
        params: [
          { name: 'x', description: '<p>x-coordinate of the center of ellipse.</p>\n', type: 'Number' },
          { name: 'y', description: '<p>y-coordinate of the center of ellipse.</p>\n', type: 'Number' },
          { name: 'w', description: '<p>width of the ellipse.</p>\n', type: 'Number' },
          { name: 'h', description: '<p>height of the ellipse.</p>\n', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 259,
        params: [
          { name: 'x', description: '', type: 'Number' },
          { name: 'y', description: '', type: 'Number' },
          { name: 'w', description: '', type: 'Number' },
          { name: 'h', description: '', type: 'Number' },
          {
            name: 'detail',
            description:
              "<p>optional parameter for WebGL mode only. This is to\n                        specify the number of vertices that makes up the\n                        perimeter of the ellipse. Default value is 25. Won't\n                        draw a stroke for a detail of more than 50.</p>\n",
            type: 'Integer',
            optional: true
          }
        ]
      }
    ]
  },
  {
    description:
      '<p>Draws a circle to the screen. A circle is a simple closed shape. It is the set\nof all points in a plane that are at a given distance from a given point,\nthe centre. This function is a special case of the ellipse() function, where\nthe width and height of the ellipse are the same. Height and width of the\nellipse correspond to the diameter of the circle. By default, the first two\nparameters set the location of the centre of the circle, the third sets the\ndiameter of the circle.</p>\n',
    itemtype: 'method',
    name: 'circle',
    params: [
      { name: 'x', description: '<p>x-coordinate of the centre of the circle.</p>\n', type: 'Number' },
      { name: 'y', description: '<p>y-coordinate of the centre of the circle.</p>\n', type: 'Number' },
      { name: 'd', description: '<p>diameter of the circle.</p>\n', type: 'Number' }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// Draw a circle at location (30, 30) with a diameter of 20.\ncircle(30, 30, 20);\n</code>\n</div>'
    ],
    alt: 'white circle with black outline in mid of canvas that is 55x55.',
    class: 'p5',
    module: 'Shape',
    submodule: '2D Primitives'
  },
  {
    description:
      '<p>Draws a line (a direct path between two points) to the screen. If called with\nonly 4 parameters, it will draw a line in 2D with a default width of 1 pixel.\nThis width can be modified by using the <a href="#/p5/strokeWeight">\nstrokeWeight()</a> function. A line cannot be filled, therefore the <a\nhref="#/p5/fill">fill()</a> function will not affect the color of a line. So to\ncolor a line, use the <a href="#/p5/stroke">stroke()</a> function.</p>\n',
    itemtype: 'method',
    name: 'line',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nline(30, 20, 85, 75);\n</code>\n</div>\n\n<div>\n<code>\nline(30, 20, 85, 20);\nstroke(126);\nline(85, 20, 85, 75);\nstroke(255);\nline(85, 75, 30, 75);\n</code>\n</div>'
    ],
    alt: 'An example showing a line 78 pixels long running from mid-top to bottom-right of canvas.\nAn example showing 3 lines of various stroke sizes. Form top, bottom and right sides of a square.',
    class: 'p5',
    module: 'Shape',
    submodule: '2D Primitives',
    overloads: [
      {
        line: 339,
        params: [
          { name: 'x1', description: '<p>the x-coordinate of the first point</p>\n', type: 'Number' },
          { name: 'y1', description: '<p>the y-coordinate of the first point</p>\n', type: 'Number' },
          { name: 'x2', description: '<p>the x-coordinate of the second point</p>\n', type: 'Number' },
          { name: 'y2', description: '<p>the y-coordinate of the second point</p>\n', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 375,
        params: [
          { name: 'x1', description: '', type: 'Number' },
          { name: 'y1', description: '', type: 'Number' },
          { name: 'z1', description: '<p>the z-coordinate of the first point</p>\n', type: 'Number' },
          { name: 'x2', description: '', type: 'Number' },
          { name: 'y2', description: '', type: 'Number' },
          { name: 'z2', description: '<p>the z-coordinate of the second point</p>\n', type: 'Number' }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Draws a point, a coordinate in space at the dimension of one pixel.\nThe first parameter is the horizontal value for the point, the second\nparam is the vertical value for the point. The color of the point is\nchanged with the <a href="#/p5/stroke">stroke()</a> function. The size of the point\ncan be changed with the <a href="#/p5/strokeWeight">strokeWeight()</a> function.</p>\n',
    itemtype: 'method',
    name: 'point',
    chainable: 1,
    example: [
      "\n<div>\n<code>\npoint(30, 20);\npoint(85, 20);\npoint(85, 75);\npoint(30, 75);\n</code>\n</div>\n\n<div>\n<code>\npoint(30, 20);\npoint(85, 20);\nstroke('purple'); // Change the color\nstrokeWeight(10); // Make the points 10 pixels in size\npoint(85, 75);\npoint(30, 75);\n</code>\n</div>\n\n<div>\n<code>\nlet a = createVector(10, 10);\npoint(a);\nlet b = createVector(10, 20);\npoint(b);\npoint(createVector(20, 10));\npoint(createVector(20, 20));\n</code>\n</div>"
    ],
    alt: '4 points centered in the middle-right of the canvas.\n2 large points and 2 large purple points centered in the middle-right of the canvas.\nVertices of a square of length 10 pixels towards the top-left of the canvas.',
    class: 'p5',
    module: 'Shape',
    submodule: '2D Primitives',
    overloads: [
      {
        line: 400,
        params: [
          { name: 'x', description: '<p>the x-coordinate</p>\n', type: 'Number' },
          { name: 'y', description: '<p>the y-coordinate</p>\n', type: 'Number' },
          {
            name: 'z',
            description: '<p>the z-coordinate (for WebGL mode)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        line: 450,
        params: [
          { name: 'coordinate_vector', description: '<p>the coordinate vector</p>\n', type: 'p5.Vector' }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Draws a quad on the canvas. A quad is a quadrilateral, a four sided polygon. It is\nsimilar to a rectangle, but the angles between its edges are not\nconstrained to ninety degrees. The first pair of parameters (x1,y1)\nsets the first vertex and the subsequent pairs should proceed\nclockwise or counter-clockwise around the defined shape.\nz-arguments only work when quad() is used in WEBGL mode.</p>\n',
    itemtype: 'method',
    name: 'quad',
    chainable: 1,
    example: ['\n<div>\n<code>\nquad(38, 31, 86, 20, 69, 63, 30, 76);\n</code>\n</div>'],
    alt: 'irregular white quadrilateral shape with black outline mid-right of canvas.',
    class: 'p5',
    module: 'Shape',
    submodule: '2D Primitives',
    overloads: [
      {
        line: 478,
        params: [
          { name: 'x1', description: '<p>the x-coordinate of the first point</p>\n', type: 'Number' },
          { name: 'y1', description: '<p>the y-coordinate of the first point</p>\n', type: 'Number' },
          { name: 'x2', description: '<p>the x-coordinate of the second point</p>\n', type: 'Number' },
          { name: 'y2', description: '<p>the y-coordinate of the second point</p>\n', type: 'Number' },
          { name: 'x3', description: '<p>the x-coordinate of the third point</p>\n', type: 'Number' },
          { name: 'y3', description: '<p>the y-coordinate of the third point</p>\n', type: 'Number' },
          { name: 'x4', description: '<p>the x-coordinate of the fourth point</p>\n', type: 'Number' },
          { name: 'y4', description: '<p>the y-coordinate of the fourth point</p>\n', type: 'Number' },
          {
            name: 'detailX',
            description: '<p>number of segments in the x-direction</p>\n',
            type: 'Integer',
            optional: true
          },
          {
            name: 'detailY',
            description: '<p>number of segments in the y-direction</p>\n',
            type: 'Integer',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        line: 508,
        params: [
          { name: 'x1', description: '', type: 'Number' },
          { name: 'y1', description: '', type: 'Number' },
          { name: 'z1', description: '<p>the z-coordinate of the first point</p>\n', type: 'Number' },
          { name: 'x2', description: '', type: 'Number' },
          { name: 'y2', description: '', type: 'Number' },
          { name: 'z2', description: '<p>the z-coordinate of the second point</p>\n', type: 'Number' },
          { name: 'x3', description: '', type: 'Number' },
          { name: 'y3', description: '', type: 'Number' },
          { name: 'z3', description: '<p>the z-coordinate of the third point</p>\n', type: 'Number' },
          { name: 'x4', description: '', type: 'Number' },
          { name: 'y4', description: '', type: 'Number' },
          { name: 'z4', description: '<p>the z-coordinate of the fourth point</p>\n', type: 'Number' },
          { name: 'detailX', description: '', type: 'Integer', optional: true },
          { name: 'detailY', description: '', type: 'Integer', optional: true }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Draws a rectangle on the canvas. A rectangle is a four-sided closed shape with\nevery angle at ninety degrees. By default, the first two parameters set\nthe location of the upper-left corner, the third sets the width, and the\nfourth sets the height. The way these parameters are interpreted, may be\nchanged with the <a href="#/p5/rectMode">rectMode()</a> function.</p>\n<p>The fifth, sixth, seventh and eighth parameters, if specified,\ndetermine corner radius for the top-left, top-right, lower-right and\nlower-left corners, respectively. An omitted corner radius parameter is set\nto the value of the previously specified radius value in the parameter list.</p>\n',
    itemtype: 'method',
    name: 'rect',
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// Draw a rectangle at location (30, 20) with a width and height of 55.\nrect(30, 20, 55, 55);\n</code>\n</div>\n\n<div>\n<code>\n// Draw a rectangle with rounded corners, each having a radius of 20.\nrect(30, 20, 55, 55, 20);\n</code>\n</div>\n\n<div>\n<code>\n// Draw a rectangle with rounded corners having the following radii:\n// top-left = 20, top-right = 15, bottom-right = 10, bottom-left = 5.\nrect(30, 20, 55, 55, 20, 15, 10, 5);\n</code>\n</div>'
    ],
    alt: '55x55 white rect with black outline in mid-right of canvas.\n55x55 white rect with black outline and rounded edges in mid-right of canvas.\n55x55 white rect with black outline and rounded edges of different radii.',
    class: 'p5',
    module: 'Shape',
    submodule: '2D Primitives',
    overloads: [
      {
        line: 552,
        params: [
          { name: 'x', description: '<p>x-coordinate of the rectangle.</p>\n', type: 'Number' },
          { name: 'y', description: '<p>y-coordinate of the rectangle.</p>\n', type: 'Number' },
          { name: 'w', description: '<p>width of the rectangle.</p>\n', type: 'Number' },
          { name: 'h', description: '<p>height of the rectangle.</p>\n', type: 'Number', optional: true },
          {
            name: 'tl',
            description: '<p>optional radius of top-left corner.</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'tr',
            description: '<p>optional radius of top-right corner.</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'br',
            description: '<p>optional radius of bottom-right corner.</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'bl',
            description: '<p>optional radius of bottom-left corner.</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        line: 603,
        params: [
          { name: 'x', description: '', type: 'Number' },
          { name: 'y', description: '', type: 'Number' },
          { name: 'w', description: '', type: 'Number' },
          { name: 'h', description: '', type: 'Number' },
          {
            name: 'detailX',
            description: '<p>number of segments in the x-direction (for WebGL mode)</p>\n',
            type: 'Integer',
            optional: true
          },
          {
            name: 'detailY',
            description: '<p>number of segments in the y-direction (for WebGL mode)</p>\n',
            type: 'Integer',
            optional: true
          }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Draws a square to the screen. A square is a four-sided shape with every angle\nat ninety degrees, and equal side size. This function is a special case of the\nrect() function, where the width and height are the same, and the parameter\nis called "s" for side size. By default, the first two parameters set the\nlocation of the upper-left corner, the third sets the side size of the square.\nThe way these parameters are interpreted, may be changed with the <a\nhref="#/p5/rectMode">rectMode()</a> function.</p>\n<p>The fourth, fifth, sixth and seventh parameters, if specified,\ndetermine corner radius for the top-left, top-right, lower-right and\nlower-left corners, respectively. An omitted corner radius parameter is set\nto the value of the previously specified radius value in the parameter list.</p>\n',
    itemtype: 'method',
    name: 'square',
    params: [
      { name: 'x', description: '<p>x-coordinate of the square.</p>\n', type: 'Number' },
      { name: 'y', description: '<p>y-coordinate of the square.</p>\n', type: 'Number' },
      { name: 's', description: '<p>side size of the square.</p>\n', type: 'Number' },
      {
        name: 'tl',
        description: '<p>optional radius of top-left corner.</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'tr',
        description: '<p>optional radius of top-right corner.</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'br',
        description: '<p>optional radius of bottom-right corner.</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'bl',
        description: '<p>optional radius of bottom-left corner.</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// Draw a square at location (30, 20) with a side size of 55.\nsquare(30, 20, 55);\n</code>\n</div>\n\n<div>\n<code>\n// Draw a square with rounded corners, each having a radius of 20.\nsquare(30, 20, 55, 20);\n</code>\n</div>\n\n<div>\n<code>\n// Draw a square with rounded corners having the following radii:\n// top-left = 20, top-right = 15, bottom-right = 10, bottom-left = 5.\nsquare(30, 20, 55, 20, 15, 10, 5);\n</code>\n</div>'
    ],
    alt: '55x55 white square with black outline in mid-right of canvas.\n55x55 white square with black outline and rounded edges in mid-right of canvas.\n55x55 white square with black outline and rounded edges of different radii.',
    class: 'p5',
    module: 'Shape',
    submodule: '2D Primitives'
  },
  {
    description:
      '<p>Draws a triangle to the canvas. A triangle is a plane created by connecting\nthree points. The first two arguments specify the first point, the middle two\narguments specify the second point, and the last two arguments specify the\nthird point.</p>\n',
    itemtype: 'method',
    name: 'triangle',
    params: [
      { name: 'x1', description: '<p>x-coordinate of the first point</p>\n', type: 'Number' },
      { name: 'y1', description: '<p>y-coordinate of the first point</p>\n', type: 'Number' },
      { name: 'x2', description: '<p>x-coordinate of the second point</p>\n', type: 'Number' },
      { name: 'y2', description: '<p>y-coordinate of the second point</p>\n', type: 'Number' },
      { name: 'x3', description: '<p>x-coordinate of the third point</p>\n', type: 'Number' },
      { name: 'y3', description: '<p>y-coordinate of the third point</p>\n', type: 'Number' }
    ],
    chainable: 1,
    example: ['\n<div>\n<code>\ntriangle(30, 75, 58, 20, 86, 75);\n</code>\n</div>'],
    alt: 'white triangle with black outline in mid-right of canvas.',
    class: 'p5',
    module: 'Shape',
    submodule: '2D Primitives'
  },
  {
    description:
      '<p>Modifies the location from which ellipses are drawn by changing the way in\nwhich parameters given to <a href="#/p5/ellipse">ellipse()</a>,\n<a href="#/p5/circle">circle()</a> and <a href="#/p5/arc">arc()</a> are interpreted.</p>\n<p>The default mode is CENTER, in which the first two parameters are interpreted\nas the shape\'s center point\'s x and y coordinates respectively, while the third\nand fourth parameters are its width and height.</p>\n<p>ellipseMode(RADIUS) also uses the first two parameters as the shape\'s center\npoint\'s x and y coordinates, but uses the third and fourth parameters to\nspecify half of the shapes\'s width and height.</p>\n<p>ellipseMode(CORNER) interprets the first two parameters as the upper-left\ncorner of the shape, while the third and fourth parameters are its width\nand height.</p>\n<p>ellipseMode(CORNERS) interprets the first two parameters as the location of\none corner of the ellipse\'s bounding box, and the third and fourth parameters\nas the location of the opposite corner.</p>\n<p>The parameter to this method must be written in ALL CAPS because they are\npredefined as constants in ALL CAPS and Javascript is a case-sensitive language.</p>\n',
    itemtype: 'method',
    name: 'ellipseMode',
    params: [
      { name: 'mode', description: '<p>either CENTER, RADIUS, CORNER, or CORNERS</p>\n', type: 'Constant' }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// Example showing RADIUS and CENTER ellipsemode with 2 overlaying ellipses\nellipseMode(RADIUS);\nfill(255);\nellipse(50, 50, 30, 30); // Outer white ellipse\nellipseMode(CENTER);\nfill(100);\nellipse(50, 50, 30, 30); // Inner gray ellipse\n</code>\n</div>\n\n<div>\n<code>\n// Example showing CORNER and CORNERS ellipseMode with 2 overlaying ellipses\nellipseMode(CORNER);\nfill(255);\nellipse(25, 25, 50, 50); // Outer white ellipse\nellipseMode(CORNERS);\nfill(100);\nellipse(25, 25, 50, 50); // Inner gray ellipse\n</code>\n</div>'
    ],
    alt: '60x60 white ellipse and 30x30 grey ellipse with black outlines at center.\n60x60 white ellipse and 30x30 grey ellipse top-right with black outlines.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Attributes'
  },
  {
    description:
      '<p>Draws all geometry with jagged (aliased) edges. Note that <a href="#/p5/smooth">smooth()</a> is\nactive by default in 2D mode, so it is necessary to call <a href="#/p5/noSmooth">noSmooth()</a> to disable\nsmoothing of geometry, images, and fonts. In 3D mode, <a href="#/p5/noSmooth">noSmooth()</a> is enabled\nby default, so it is necessary to call <a href="#/p5/smooth">smooth()</a> if you would like\nsmooth (antialiased) edges on your geometry.</p>\n',
    itemtype: 'method',
    name: 'noSmooth',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nbackground(0);\nnoStroke();\nsmooth();\nellipse(30, 48, 36, 36);\nnoSmooth();\nellipse(70, 48, 36, 36);\n</code>\n</div>'
    ],
    alt: '2 pixelated 36x36 white ellipses to left & right of center, black background',
    class: 'p5',
    module: 'Shape',
    submodule: 'Attributes'
  },
  {
    description:
      "<p>Modifies the location from which rectangles are drawn by changing the way\nin which parameters given to <a href=\"#/p5/rect\">rect()</a> are interpreted.</p>\n<p>The default mode is CORNER, which interprets the first two parameters as the\nupper-left corner of the shape, while the third and fourth parameters are its\nwidth and height.</p>\n<p>rectMode(CORNERS) interprets the first two parameters as the location of\none of the corners, and the third and fourth parameters as the location of\nthe diagonally opposite corner. Note, the rectangle is drawn between the\ncoordinates, so it is not neccesary that the first corner be the upper left\ncorner.</p>\n<p>rectMode(CENTER) interprets the first two parameters as the shape's center\npoint, while the third and fourth parameters are its width and height.</p>\n<p>rectMode(RADIUS) also uses the first two parameters as the shape's center\npoint, but uses the third and fourth parameters to specify half of the shape's\nwidth and height respectively.</p>\n<p>The parameter to this method must be written in ALL CAPS because they are\npredefined as constants in ALL CAPS and Javascript is a case-sensitive language.</p>\n",
    itemtype: 'method',
    name: 'rectMode',
    params: [
      { name: 'mode', description: '<p>either CORNER, CORNERS, CENTER, or RADIUS</p>\n', type: 'Constant' }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\nrectMode(CORNER);\nfill(255);\nrect(25, 25, 50, 50); // Draw white rectangle using CORNER mode\n\nrectMode(CORNERS);\nfill(100);\nrect(25, 25, 50, 50); // Draw gray rectangle using CORNERS mode\n</code>\n</div>\n\n<div>\n<code>\nrectMode(RADIUS);\nfill(255);\nrect(50, 50, 30, 30); // Draw white rectangle using RADIUS mode\n\nrectMode(CENTER);\nfill(100);\nrect(50, 50, 30, 30); // Draw gray rectangle using CENTER mode\n</code>\n</div>'
    ],
    alt: '50x50 white rect at center and 25x25 grey rect in the top left of the other.\n50x50 white rect at center and 25x25 grey rect in the center of the other.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Attributes'
  },
  {
    description:
      '<p>Draws all geometry with smooth (anti-aliased) edges. <a href="#/p5/smooth">smooth()</a> will also\nimprove image quality of resized images. Note that <a href="#/p5/smooth">smooth()</a> is active by\ndefault in 2D mode; <a href="#/p5/noSmooth">noSmooth()</a> can be used to disable smoothing of geometry,\nimages, and fonts. In 3D mode, <a href="#/p5/noSmooth">noSmooth()</a> is enabled\nby default, so it is necessary to call <a href="#/p5/smooth">smooth()</a> if you would like\nsmooth (antialiased) edges on your geometry.</p>\n',
    itemtype: 'method',
    name: 'smooth',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nbackground(0);\nnoStroke();\nsmooth();\nellipse(30, 48, 36, 36);\nnoSmooth();\nellipse(70, 48, 36, 36);\n</code>\n</div>'
    ],
    alt: '2 pixelated 36x36 white ellipses one left one right of center. On black.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Attributes'
  },
  {
    description:
      '<p>Sets the style for rendering line endings. These ends are either rounded,\nsquared or extended, each of which specified with the corresponding\nparameters: ROUND, SQUARE and PROJECT. The default cap is ROUND.</p>\n<p>The parameter to this method must be written in ALL CAPS because they are\npredefined as constants in ALL CAPS and Javascript is a case-sensitive language.</p>\n',
    itemtype: 'method',
    name: 'strokeCap',
    params: [{ name: 'cap', description: '<p>either ROUND, SQUARE or PROJECT</p>\n', type: 'Constant' }],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// Example of different strokeCaps\nstrokeWeight(12.0);\nstrokeCap(ROUND);\nline(20, 30, 80, 30);\nstrokeCap(SQUARE);\nline(20, 50, 80, 50);\nstrokeCap(PROJECT);\nline(20, 70, 80, 70);\n</code>\n</div>'
    ],
    alt: '3 lines. Top line: rounded ends, mid: squared, bottom:longer squared ends.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Attributes'
  },
  {
    description:
      '<p>Sets the style of the joints which connect line segments. These joints\nare either mitered, beveled or rounded and specified with the\ncorresponding parameters MITER, BEVEL and ROUND. The default joint is\nMITER.</p>\n<p>The parameter to this method must be written in ALL CAPS because they are\npredefined as constants in ALL CAPS and Javascript is a case-sensitive language.</p>\n',
    itemtype: 'method',
    name: 'strokeJoin',
    params: [{ name: 'join', description: '<p>either MITER, BEVEL, ROUND</p>\n', type: 'Constant' }],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// Example of MITER type of joints\nnoFill();\nstrokeWeight(10.0);\nstrokeJoin(MITER);\nbeginShape();\nvertex(35, 20);\nvertex(65, 50);\nvertex(35, 80);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\n// Example of BEVEL type of joints\nnoFill();\nstrokeWeight(10.0);\nstrokeJoin(BEVEL);\nbeginShape();\nvertex(35, 20);\nvertex(65, 50);\nvertex(35, 80);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\n// Example of ROUND type of joints\nnoFill();\nstrokeWeight(10.0);\nstrokeJoin(ROUND);\nbeginShape();\nvertex(35, 20);\nvertex(65, 50);\nvertex(35, 80);\nendShape();\n</code>\n</div>'
    ],
    alt: 'Right-facing arrowhead shape with pointed tip in center of canvas.\nRight-facing arrowhead shape with flat tip in center of canvas.\nRight-facing arrowhead shape with rounded tip in center of canvas.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Attributes'
  },
  {
    description:
      '<p>Sets the width of the stroke used for lines, points and the border around\nshapes. All widths are set in units of pixels.</p>\n',
    itemtype: 'method',
    name: 'strokeWeight',
    params: [
      { name: 'weight', description: '<p>the weight of the stroke (in pixels)</p>\n', type: 'Number' }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// Example of different stroke weights\nstrokeWeight(1); // Default\nline(20, 20, 80, 20);\nstrokeWeight(4); // Thicker\nline(20, 40, 80, 40);\nstrokeWeight(10); // Beastly\nline(20, 70, 80, 70);\n</code>\n</div>'
    ],
    alt: '3 horizontal black lines. Top line: thin, mid: medium, bottom:thick.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Attributes'
  },
  {
    description:
      '<p>Draws a cubic Bezier curve on the screen. These curves are defined by a\nseries of anchor and control points. The first two parameters specify\nthe first anchor point and the last two parameters specify the other\nanchor point, which become the first and last points on the curve. The\nmiddle parameters specify the two control points which define the shape\nof the curve. Approximately speaking, control points "pull" the curve\ntowards them.</p>\n<p>Bezier curves were developed by French automotive engineer Pierre Bezier,\nand are commonly used in computer graphics to define gently sloping curves.\nSee also <a href="#/p5/curve">curve()</a>.</p>\n',
    itemtype: 'method',
    name: 'bezier',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nnoFill();\nstroke(255, 102, 0);\nline(85, 20, 10, 10);\nline(90, 90, 15, 80);\nstroke(0, 0, 0);\nbezier(85, 20, 10, 10, 90, 90, 15, 80);\n</code>\n</div>\n\n<div>\n<code>\nbackground(0, 0, 0);\nnoFill();\nstroke(255);\nbezier(250, 250, 0, 100, 100, 0, 100, 0, 0, 0, 100, 0);\n</code>\n</div>'
    ],
    alt: 'stretched black s-shape in center with orange lines extending from end points.\na white colored curve on black background from the upper-right corner to the lower right corner.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Curves',
    overloads: [
      {
        line: 13,
        params: [
          { name: 'x1', description: '<p>x-coordinate for the first anchor point</p>\n', type: 'Number' },
          { name: 'y1', description: '<p>y-coordinate for the first anchor point</p>\n', type: 'Number' },
          { name: 'x2', description: '<p>x-coordinate for the first control point</p>\n', type: 'Number' },
          { name: 'y2', description: '<p>y-coordinate for the first control point</p>\n', type: 'Number' },
          { name: 'x3', description: '<p>x-coordinate for the second control point</p>\n', type: 'Number' },
          { name: 'y3', description: '<p>y-coordinate for the second control point</p>\n', type: 'Number' },
          { name: 'x4', description: '<p>x-coordinate for the second anchor point</p>\n', type: 'Number' },
          { name: 'y4', description: '<p>y-coordinate for the second anchor point</p>\n', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 62,
        params: [
          { name: 'x1', description: '', type: 'Number' },
          { name: 'y1', description: '', type: 'Number' },
          { name: 'z1', description: '<p>z-coordinate for the first anchor point</p>\n', type: 'Number' },
          { name: 'x2', description: '', type: 'Number' },
          { name: 'y2', description: '', type: 'Number' },
          { name: 'z2', description: '<p>z-coordinate for the first control point</p>\n', type: 'Number' },
          { name: 'x3', description: '', type: 'Number' },
          { name: 'y3', description: '', type: 'Number' },
          { name: 'z3', description: '<p>z-coordinate for the second control point</p>\n', type: 'Number' },
          { name: 'x4', description: '', type: 'Number' },
          { name: 'y4', description: '', type: 'Number' },
          { name: 'z4', description: '<p>z-coordinate for the second anchor point</p>\n', type: 'Number' }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      "<p>Sets the resolution at which Bezier's curve is displayed. The default value is 20.</p>\n<p>Note, This function is only useful when using the WEBGL renderer\nas the default canvas renderer does not use this information.</p>\n",
    itemtype: 'method',
    name: 'bezierDetail',
    params: [{ name: 'detail', description: '<p>resolution of the curves</p>\n', type: 'Number' }],
    chainable: 1,
    example: [
      "\n<div modernizr='webgl'>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  noFill();\n  bezierDetail(5);\n}\n\nfunction draw() {\n  background(200);\n  bezier(-40, -40, 0,\n          90, -40, 0,\n         -90,  40, 0,\n          40,  40, 0);\n}\n</code>\n</div>"
    ],
    alt: 'stretched black s-shape with a low level of bezier detail',
    class: 'p5',
    module: 'Shape',
    submodule: 'Curves'
  },
  {
    description:
      '<p>Given the x or y co-ordinate values of control and anchor points of a bezier\ncurve, it evaluates the x or y coordinate of the bezier at position t. The\nparameters a and d are the x or y coordinates of first and last points on the\ncurve while b and c are of the control points.The final parameter t is the\nposition of the resultant point which is given between 0 and 1.\nThis can be done once with the x coordinates and a second time\nwith the y coordinates to get the location of a bezier curve at t.</p>\n',
    itemtype: 'method',
    name: 'bezierPoint',
    params: [
      { name: 'a', description: '<p>coordinate of first point on the curve</p>\n', type: 'Number' },
      { name: 'b', description: '<p>coordinate of first control point</p>\n', type: 'Number' },
      { name: 'c', description: '<p>coordinate of second control point</p>\n', type: 'Number' },
      { name: 'd', description: '<p>coordinate of second point on the curve</p>\n', type: 'Number' },
      { name: 't', description: '<p>value between 0 and 1</p>\n', type: 'Number' }
    ],
    return: { description: 'the value of the Bezier at position t', type: 'Number' },
    example: [
      '\n<div>\n<code>\nnoFill();\nlet x1 = 85,\n x2 = 10,\n x3 = 90,\n x4 = 15;\nlet y1 = 20,\n y2 = 10,\n y3 = 90,\n y4 = 80;\nbezier(x1, y1, x2, y2, x3, y3, x4, y4);\nfill(255);\nlet steps = 10;\nfor (let i = 0; i <= steps; i++) {\n  let t = i / steps;\n  let x = bezierPoint(x1, x2, x3, x4, t);\n  let y = bezierPoint(y1, y2, y3, y4, t);\n  circle(x, y, 5);\n}\n</code>\n</div>'
    ],
    alt: '10 points plotted on a given bezier at equal distances.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Curves'
  },
  {
    description:
      '<p>Evaluates the tangent to the Bezier at position t for points a, b, c, d.\nThe parameters a and d are the first and last points\non the curve, and b and c are the control points.\nThe final parameter t varies between 0 and 1.</p>\n',
    itemtype: 'method',
    name: 'bezierTangent',
    params: [
      { name: 'a', description: '<p>coordinate of first point on the curve</p>\n', type: 'Number' },
      { name: 'b', description: '<p>coordinate of first control point</p>\n', type: 'Number' },
      { name: 'c', description: '<p>coordinate of second control point</p>\n', type: 'Number' },
      { name: 'd', description: '<p>coordinate of second point on the curve</p>\n', type: 'Number' },
      { name: 't', description: '<p>value between 0 and 1</p>\n', type: 'Number' }
    ],
    return: { description: 'the tangent at position t', type: 'Number' },
    example: [
      '\n<div>\n<code>\nnoFill();\nbezier(85, 20, 10, 10, 90, 90, 15, 80);\nlet steps = 6;\nfill(255);\nfor (let i = 0; i <= steps; i++) {\n  let t = i / steps;\n  // Get the location of the point\n  let x = bezierPoint(85, 10, 90, 15, t);\n  let y = bezierPoint(20, 10, 90, 80, t);\n  // Get the tangent points\n  let tx = bezierTangent(85, 10, 90, 15, t);\n  let ty = bezierTangent(20, 10, 90, 80, t);\n  // Calculate an angle from the tangent points\n  let a = atan2(ty, tx);\n  a += PI;\n  stroke(255, 102, 0);\n  line(x, y, cos(a) * 30 + x, sin(a) * 30 + y);\n  // The following line of code makes a line\n  // inverse of the above line\n  //line(x, y, cos(a)*-30 + x, sin(a)*-30 + y);\n  stroke(0);\n  ellipse(x, y, 5, 5);\n}\n</code>\n</div>\n\n<div>\n<code>\nnoFill();\nbezier(85, 20, 10, 10, 90, 90, 15, 80);\nstroke(255, 102, 0);\nlet steps = 16;\nfor (let i = 0; i <= steps; i++) {\n  let t = i / steps;\n  let x = bezierPoint(85, 10, 90, 15, t);\n  let y = bezierPoint(20, 10, 90, 80, t);\n  let tx = bezierTangent(85, 10, 90, 15, t);\n  let ty = bezierTangent(20, 10, 90, 80, t);\n  let a = atan2(ty, tx);\n  a -= HALF_PI;\n  line(x, y, cos(a) * 8 + x, sin(a) * 8 + y);\n}\n</code>\n</div>'
    ],
    alt: 's-shaped line with 6 short orange lines showing the tangents at those points.\ns-shaped line with 6 short orange lines showing lines coming out the underside of the bezier.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Curves'
  },
  {
    description:
      '<p>Draws a curved line on the screen between two points, given as the\nmiddle four parameters. The first two parameters are a control point, as\nif the curve came from this point even though it\'s not drawn. The last\ntwo parameters similarly describe the other control point. <br /><br />\nLonger curves can be created by putting a series of <a href="#/p5/curve">curve()</a> functions\ntogether or using <a href="#/p5/curveVertex">curveVertex()</a>. An additional function called\n<a href="#/p5/curveTightness">curveTightness()</a> provides control for the visual quality of the curve.\nThe <a href="#/p5/curve">curve()</a> function is an implementation of Catmull-Rom splines.</p>\n',
    itemtype: 'method',
    name: 'curve',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nnoFill();\nstroke(255, 102, 0);\ncurve(5, 26, 5, 26, 73, 24, 73, 61);\nstroke(0);\ncurve(5, 26, 73, 24, 73, 61, 15, 65);\nstroke(255, 102, 0);\ncurve(73, 24, 73, 61, 15, 65, 15, 65);\n</code>\n</div>\n\n<div>\n<code>\n// Define the curve points as JavaScript objects\nlet p1 = { x: 5, y: 26 };\nlet p2 = { x: 73, y: 24 };\nlet p3 = { x: 73, y: 61 };\nlet p4 = { x: 15, y: 65 };\nnoFill();\nstroke(255, 102, 0);\ncurve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);\nstroke(0);\ncurve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);\nstroke(255, 102, 0);\ncurve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y);\n</code>\n</div>\n\n<div>\n<code>\nnoFill();\nstroke(255, 102, 0);\ncurve(5, 26, 0, 5, 26, 0, 73, 24, 0, 73, 61, 0);\nstroke(0);\ncurve(5, 26, 0, 73, 24, 0, 73, 61, 0, 15, 65, 0);\nstroke(255, 102, 0);\ncurve(73, 24, 0, 73, 61, 0, 15, 65, 0, 15, 65, 0);\n</code>\n</div>'
    ],
    alt: 'horseshoe shape with orange ends facing left and black curved center.\nhorseshoe shape with orange ends facing left and black curved center.\ncurving black and orange lines.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Curves',
    overloads: [
      {
        line: 264,
        params: [
          {
            name: 'x1',
            description: '<p>x-coordinate for the beginning control point</p>\n',
            type: 'Number'
          },
          {
            name: 'y1',
            description: '<p>y-coordinate for the beginning control point</p>\n',
            type: 'Number'
          },
          { name: 'x2', description: '<p>x-coordinate for the first point</p>\n', type: 'Number' },
          { name: 'y2', description: '<p>y-coordinate for the first point</p>\n', type: 'Number' },
          { name: 'x3', description: '<p>x-coordinate for the second point</p>\n', type: 'Number' },
          { name: 'y3', description: '<p>y-coordinate for the second point</p>\n', type: 'Number' },
          { name: 'x4', description: '<p>x-coordinate for the ending control point</p>\n', type: 'Number' },
          { name: 'y4', description: '<p>y-coordinate for the ending control point</p>\n', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 332,
        params: [
          { name: 'x1', description: '', type: 'Number' },
          { name: 'y1', description: '', type: 'Number' },
          {
            name: 'z1',
            description: '<p>z-coordinate for the beginning control point</p>\n',
            type: 'Number'
          },
          { name: 'x2', description: '', type: 'Number' },
          { name: 'y2', description: '', type: 'Number' },
          { name: 'z2', description: '<p>z-coordinate for the first point</p>\n', type: 'Number' },
          { name: 'x3', description: '', type: 'Number' },
          { name: 'y3', description: '', type: 'Number' },
          { name: 'z3', description: '<p>z-coordinate for the second point</p>\n', type: 'Number' },
          { name: 'x4', description: '', type: 'Number' },
          { name: 'y4', description: '', type: 'Number' },
          { name: 'z4', description: '<p>z-coordinate for the ending control point</p>\n', type: 'Number' }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Sets the resolution at which curves display. The default value is 20 while\nthe minimum value is 3.</p>\n<p>This function is only useful when using the WEBGL renderer\nas the default canvas renderer does not use this\ninformation.</p>\n',
    itemtype: 'method',
    name: 'curveDetail',
    params: [{ name: 'resolution', description: '<p>resolution of the curves</p>\n', type: 'Number' }],
    chainable: 1,
    example: [
      "\n<div modernizr='webgl'>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n\n  curveDetail(5);\n}\nfunction draw() {\n  background(200);\n\n  curve(250, 600, 0, -30, 40, 0, 30, 30, 0, -250, 600, 0);\n}\n</code>\n</div>"
    ],
    alt: 'white arch shape with a low level of curve detail.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Curves'
  },
  {
    description:
      '<p>Modifies the quality of forms created with <a href="#/p5/curve">curve()</a>\nand <a href="#/p5/curveVertex">curveVertex()</a>.The parameter tightness\ndetermines how the curve fits to the vertex points. The value 0.0 is the\ndefault value for tightness (this value defines the curves to be Catmull-Rom\nsplines) and the value 1.0 connects all the points with straight lines.\nValues within the range -5.0 and 5.0 will deform the curves but will leave\nthem recognizable and as values increase in magnitude, they will continue to deform.</p>\n',
    itemtype: 'method',
    name: 'curveTightness',
    params: [
      {
        name: 'amount',
        description: '<p>amount of deformation from the original vertices</p>\n',
        type: 'Number'
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// Move the mouse left and right to see the curve change\nfunction setup() {\n  createCanvas(100, 100);\n  noFill();\n}\n\nfunction draw() {\n  background(204);\n  let t = map(mouseX, 0, width, -5, 5);\n  curveTightness(t);\n  beginShape();\n  curveVertex(10, 26);\n  curveVertex(10, 26);\n  curveVertex(83, 24);\n  curveVertex(83, 61);\n  curveVertex(25, 65);\n  curveVertex(25, 65);\n  endShape();\n}\n</code>\n</div>'
    ],
    alt: 'Line shaped like right-facing arrow,points move with mouse-x and warp shape.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Curves'
  },
  {
    description:
      '<p>Evaluates the curve at position t for points a, b, c, d.\nThe parameter t varies between 0 and 1, a and d are control points\nof the curve, and b and c are the start and end points of the curve.\nThis can be done once with the x coordinates and a second time\nwith the y coordinates to get the location of a curve at t.</p>\n',
    itemtype: 'method',
    name: 'curvePoint',
    params: [
      { name: 'a', description: '<p>coordinate of first control point of the curve</p>\n', type: 'Number' },
      { name: 'b', description: '<p>coordinate of first point</p>\n', type: 'Number' },
      { name: 'c', description: '<p>coordinate of second point</p>\n', type: 'Number' },
      { name: 'd', description: '<p>coordinate of second control point</p>\n', type: 'Number' },
      { name: 't', description: '<p>value between 0 and 1</p>\n', type: 'Number' }
    ],
    return: { description: 'bezier value at position t', type: 'Number' },
    example: [
      '\n<div>\n<code>\nnoFill();\ncurve(5, 26, 5, 26, 73, 24, 73, 61);\ncurve(5, 26, 73, 24, 73, 61, 15, 65);\nfill(255);\nellipseMode(CENTER);\nlet steps = 6;\nfor (let i = 0; i <= steps; i++) {\n  let t = i / steps;\n  let x = curvePoint(5, 5, 73, 73, t);\n  let y = curvePoint(26, 26, 24, 61, t);\n  ellipse(x, y, 5, 5);\n  x = curvePoint(5, 73, 73, 15, t);\n  y = curvePoint(26, 24, 61, 65, t);\n  ellipse(x, y, 5, 5);\n}\n</code>\n</div>\n\nline hooking down to right-bottom with 13 5x5 white ellipse points'
    ],
    class: 'p5',
    module: 'Shape',
    submodule: 'Curves'
  },
  {
    description:
      '<p>Evaluates the tangent to the curve at position t for points a, b, c, d.\nThe parameter t varies between 0 and 1, a and d are points on the curve,\nand b and c are the control points.</p>\n',
    itemtype: 'method',
    name: 'curveTangent',
    params: [
      { name: 'a', description: '<p>coordinate of first control point</p>\n', type: 'Number' },
      { name: 'b', description: '<p>coordinate of first point on the curve</p>\n', type: 'Number' },
      { name: 'c', description: '<p>coordinate of second point on the curve</p>\n', type: 'Number' },
      { name: 'd', description: '<p>coordinate of second conrol point</p>\n', type: 'Number' },
      { name: 't', description: '<p>value between 0 and 1</p>\n', type: 'Number' }
    ],
    return: { description: 'the tangent at position t', type: 'Number' },
    example: [
      '\n<div>\n<code>\nnoFill();\ncurve(5, 26, 73, 24, 73, 61, 15, 65);\nlet steps = 6;\nfor (let i = 0; i <= steps; i++) {\n  let t = i / steps;\n  let x = curvePoint(5, 73, 73, 15, t);\n  let y = curvePoint(26, 24, 61, 65, t);\n  //ellipse(x, y, 5, 5);\n  let tx = curveTangent(5, 73, 73, 15, t);\n  let ty = curveTangent(26, 24, 61, 65, t);\n  let a = atan2(ty, tx);\n  a -= PI / 2.0;\n  line(x, y, cos(a) * 8 + x, sin(a) * 8 + y);\n}\n</code>\n</div>'
    ],
    alt: 'right curving line mid-right of canvas with 7 short lines radiating from it.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Curves'
  },
  {
    description:
      '<p>Use the <a href="#/p5/beginContour">beginContour()</a> and\n<a href="#/p5/endContour">endContour()</a> functions to create negative shapes\nwithin shapes such as the center of the letter \'O\'. <a href="#/p5/beginContour">beginContour()</a>\nbegins recording vertices for the shape and <a href="#/p5/endContour">endContour()</a> stops recording.\nThe vertices that define a negative shape must "wind" in the opposite direction\nfrom the exterior shape. First draw vertices for the exterior clockwise order, then for internal shapes, draw vertices\nshape in counter-clockwise.</p>\n<p>These functions can only be used within a <a href="#/p5/beginShape">beginShape()</a>/<a href="#/p5/endShape">endShape()</a> pair and\ntransformations such as <a href="#/p5/translate">translate()</a>, <a href="#/p5/rotate">rotate()</a>, and <a href="#/p5/scale">scale()</a> do not work\nwithin a <a href="#/p5/beginContour">beginContour()</a>/<a href="#/p5/endContour">endContour()</a> pair. It is also not possible to use\nother shapes, such as <a href="#/p5/ellipse">ellipse()</a> or <a href="#/p5/rect">rect()</a> within.</p>\n',
    itemtype: 'method',
    name: 'beginContour',
    chainable: 1,
    example: [
      '\n<div>\n<code>\ntranslate(50, 50);\nstroke(255, 0, 0);\nbeginShape();\n// Exterior part of shape, clockwise winding\nvertex(-40, -40);\nvertex(40, -40);\nvertex(40, 40);\nvertex(-40, 40);\n// Interior part of shape, counter-clockwise winding\nbeginContour();\nvertex(-20, -20);\nvertex(-20, 20);\nvertex(20, 20);\nvertex(20, -20);\nendContour();\nendShape(CLOSE);\n</code>\n</div>'
    ],
    alt: 'white rect and smaller grey rect with red outlines in center of canvas.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Vertex'
  },
  {
    description:
      '<p>Using the <a href="#/p5/beginShape">beginShape()</a> and <a href="#/p5/endShape">endShape()</a> functions allow creating more\ncomplex forms. <a href="#/p5/beginShape">beginShape()</a> begins recording vertices for a shape and\n<a href="#/p5/endShape">endShape()</a> stops recording. The value of the kind parameter tells it which\ntypes of shapes to create from the provided vertices. With no mode\nspecified, the shape can be any irregular polygon.</p>\n<p>The parameters available for <a href="#/p5/beginShape">beginShape()</a> are:</p>\n<p>POINTS\nDraw a series of points</p>\n<p>LINES\nDraw a series of unconnected line segments (individual lines)</p>\n<p>TRIANGLES\nDraw a series of separate triangles</p>\n<p>TRIANGLE_FAN\nDraw a series of connected triangles sharing the first vertex in a fan-like fashion</p>\n<p>TRIANGLE_STRIP\nDraw a series of connected triangles in strip fashion</p>\n<p>QUADS\nDraw a series of seperate quad</p>\n<p>QUAD_STRIP\nDraw quad strip using adjacent edges to form the next quad</p>\n<p>TESS (WebGl only)\nHandle irregular polygon for filling curve by explicit tessellation</p>\n<p>After calling the <a href="#/p5/beginShape">beginShape()</a> function, a series of <a href="#/p5/vertex">vertex()</a> commands must follow. To stop\ndrawing the shape, call <a href="#/p5/endShape">endShape()</a>. Each shape will be outlined with the\ncurrent stroke color and filled with the fill color.</p>\n<p>Transformations such as <a href="#/p5/translate">translate()</a>, <a href="#/p5/rotate">rotate()</a>, and <a href="#/p5/scale">scale()</a> do not work\nwithin <a href="#/p5/beginShape">beginShape()</a>. It is also not possible to use other shapes, such as\n<a href="#/p5/ellipse">ellipse()</a> or <a href="#/p5/rect">rect()</a> within <a href="#/p5/beginShape">beginShape()</a>.</p>\n',
    itemtype: 'method',
    name: 'beginShape',
    params: [
      {
        name: 'kind',
        description:
          '<p>either POINTS, LINES, TRIANGLES, TRIANGLE_FAN\n                               TRIANGLE_STRIP, QUADS, QUAD_STRIP or TESS</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\nbeginShape();\nvertex(30, 20);\nvertex(85, 20);\nvertex(85, 75);\nvertex(30, 75);\nendShape(CLOSE);\n</code>\n</div>\n\n<div>\n<code>\nbeginShape(POINTS);\nvertex(30, 20);\nvertex(85, 20);\nvertex(85, 75);\nvertex(30, 75);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nbeginShape(LINES);\nvertex(30, 20);\nvertex(85, 20);\nvertex(85, 75);\nvertex(30, 75);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nnoFill();\nbeginShape();\nvertex(30, 20);\nvertex(85, 20);\nvertex(85, 75);\nvertex(30, 75);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nnoFill();\nbeginShape();\nvertex(30, 20);\nvertex(85, 20);\nvertex(85, 75);\nvertex(30, 75);\nendShape(CLOSE);\n</code>\n</div>\n\n<div>\n<code>\nbeginShape(TRIANGLES);\nvertex(30, 75);\nvertex(40, 20);\nvertex(50, 75);\nvertex(60, 20);\nvertex(70, 75);\nvertex(80, 20);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nbeginShape(TRIANGLE_STRIP);\nvertex(30, 75);\nvertex(40, 20);\nvertex(50, 75);\nvertex(60, 20);\nvertex(70, 75);\nvertex(80, 20);\nvertex(90, 75);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nbeginShape(TRIANGLE_FAN);\nvertex(57.5, 50);\nvertex(57.5, 15);\nvertex(92, 50);\nvertex(57.5, 85);\nvertex(22, 50);\nvertex(57.5, 15);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nbeginShape(QUADS);\nvertex(30, 20);\nvertex(30, 75);\nvertex(50, 75);\nvertex(50, 20);\nvertex(65, 20);\nvertex(65, 75);\nvertex(85, 75);\nvertex(85, 20);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nbeginShape(QUAD_STRIP);\nvertex(30, 20);\nvertex(30, 75);\nvertex(50, 20);\nvertex(50, 75);\nvertex(65, 20);\nvertex(65, 75);\nvertex(85, 20);\nvertex(85, 75);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nbeginShape(TESS);\nvertex(20, 20);\nvertex(80, 20);\nvertex(80, 40);\nvertex(40, 40);\nvertex(40, 60);\nvertex(80, 60);\nvertex(80, 80);\nvertex(20, 80);\nendShape(CLOSE);\n</code>\n</div>'
    ],
    alt: 'white square-shape with black outline in middle-right of canvas.\n4 black points in a square shape in middle-right of canvas.\n2 horizontal black lines. In the top-right and bottom-right of canvas.\n3 line shape with horizontal on top, vertical in middle and horizontal bottom.\nsquare line shape in middle-right of canvas.\n2 white triangle shapes mid-right canvas. left one pointing up and right down.\n5 horizontal interlocking and alternating white triangles in mid-right canvas.\n4 interlocking white triangles in 45 degree rotated square-shape.\n2 white rectangle shapes in mid-right canvas. Both 20x55.\n3 side-by-side white rectangles center rect is smaller in mid-right canvas.\nThick white l-shape with black outline mid-top-left of canvas.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Vertex'
  },
  {
    description:
      '<p>Specifies vertex coordinates for Bezier curves. Each call to\nbezierVertex() defines the position of two control points and\none anchor point of a Bezier curve, adding a new segment to a\nline or shape. For WebGL mode bezierVertex() can be used in 2D\nas well as 3D mode. 2D mode expects 6 parameters, while 3D mode\nexpects 9 parameters (including z coordinates).</p>\n<p>The first time bezierVertex() is used within a <a href="#/p5/beginShape">beginShape()</a>\ncall, it must be prefaced with a call to <a href="#/p5/vertex">vertex()</a> to set the first anchor\npoint. This function must be used between <a href="#/p5/beginShape">beginShape()</a> and <a href="#/p5/endShape">endShape()</a>\nand only when there is no MODE or POINTS parameter specified to\n<a href="#/p5/beginShape">beginShape()</a>.</p>\n',
    itemtype: 'method',
    name: 'bezierVertex',
    chainable: 1,
    example: [
      "\n<div>\n<code>\nnoFill();\nbeginShape();\nvertex(30, 20);\nbezierVertex(80, 0, 80, 75, 30, 75);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nbeginShape();\nvertex(30, 20);\nbezierVertex(80, 0, 80, 75, 30, 75);\nbezierVertex(50, 80, 60, 25, 30, 20);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  setAttributes('antialias', true);\n}\nfunction draw() {\n  orbitControl();\n  background(50);\n  strokeWeight(4);\n  stroke(255);\n  point(-25, 30);\n  point(25, 30);\n  point(25, -30);\n  point(-25, -30);\n\n  strokeWeight(1);\n  noFill();\n\n  beginShape();\n  vertex(-25, 30);\n  bezierVertex(25, 30, 25, -30, -25, -30);\n  endShape();\n\n  beginShape();\n  vertex(-25, 30, 20);\n  bezierVertex(25, 30, 20, 25, -30, 20, -25, -30, 20);\n  endShape();\n}\n</code>\n</div>"
    ],
    alt: 'crescent-shaped line in middle of canvas. Points facing left.\nwhite crescent shape in middle of canvas. Points facing left.\ncrescent shape in middle of canvas with another crescent shape on positive z-axis.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Vertex',
    overloads: [
      {
        line: 293,
        params: [
          { name: 'x2', description: '<p>x-coordinate for the first control point</p>\n', type: 'Number' },
          { name: 'y2', description: '<p>y-coordinate for the first control point</p>\n', type: 'Number' },
          { name: 'x3', description: '<p>x-coordinate for the second control point</p>\n', type: 'Number' },
          { name: 'y3', description: '<p>y-coordinate for the second control point</p>\n', type: 'Number' },
          { name: 'x4', description: '<p>x-coordinate for the anchor point</p>\n', type: 'Number' },
          { name: 'y4', description: '<p>y-coordinate for the anchor point</p>\n', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 375,
        params: [
          { name: 'x2', description: '', type: 'Number' },
          { name: 'y2', description: '', type: 'Number' },
          {
            name: 'z2',
            description: '<p>z-coordinate for the first control point (for WebGL mode)</p>\n',
            type: 'Number'
          },
          { name: 'x3', description: '', type: 'Number' },
          { name: 'y3', description: '', type: 'Number' },
          {
            name: 'z3',
            description: '<p>z-coordinate for the second control point (for WebGL mode)</p>\n',
            type: 'Number'
          },
          { name: 'x4', description: '', type: 'Number' },
          { name: 'y4', description: '', type: 'Number' },
          {
            name: 'z4',
            description: '<p>z-coordinate for the anchor point (for WebGL mode)</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Specifies vertex coordinates for curves. This function may only\nbe used between <a href="#/p5/beginShape">beginShape()</a> and <a href="#/p5/endShape">endShape()</a> and only when there\nis no MODE parameter specified to <a href="#/p5/beginShape">beginShape()</a>.\nFor WebGL mode curveVertex() can be used in 2D as well as 3D mode.\n2D mode expects 2 parameters, while 3D mode expects 3 parameters.</p>\n<p>The first and last points in a series of curveVertex() lines will be used to\nguide the beginning and end of a the curve. A minimum of four\npoints is required to draw a tiny curve between the second and\nthird points. Adding a fifth point with curveVertex() will draw\nthe curve between the second, third, and fourth points. The\ncurveVertex() function is an implementation of Catmull-Rom\nsplines.</p>\n',
    itemtype: 'method',
    name: 'curveVertex',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nstrokeWeight(5);\npoint(84, 91);\npoint(68, 19);\npoint(21, 17);\npoint(32, 91);\nstrokeWeight(1);\n\nnoFill();\nbeginShape();\ncurveVertex(84, 91);\ncurveVertex(84, 91);\ncurveVertex(68, 19);\ncurveVertex(21, 17);\ncurveVertex(32, 91);\ncurveVertex(32, 91);\nendShape();\n</code>\n</div>'
    ],
    alt: 'Upside-down u-shape line, mid canvas. left point extends beyond canvas view.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Vertex',
    overloads: [
      {
        line: 415,
        params: [
          { name: 'x', description: '<p>x-coordinate of the vertex</p>\n', type: 'Number' },
          { name: 'y', description: '<p>y-coordinate of the vertex</p>\n', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 460,
        params: [
          { name: 'x', description: '', type: 'Number' },
          { name: 'y', description: '', type: 'Number' },
          {
            name: 'z',
            description: '<p>z-coordinate of the vertex (for WebGL mode)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Use the <a href="#/p5/beginContour">beginContour()</a> and <a href="#/p5/endContour">endContour()</a> functions to create negative\nshapes within shapes such as the center of the letter \'O\'. <a href="#/p5/beginContour">beginContour()</a>\nbegins recording vertices for the shape and <a href="#/p5/endContour">endContour()</a> stops recording.\nThe vertices that define a negative shape must "wind" in the opposite\ndirection from the exterior shape. First draw vertices for the exterior\nclockwise order, then for internal shapes, draw vertices\nshape in counter-clockwise.</p>\n<p>These functions can only be used within a <a href="#/p5/beginShape">beginShape()</a>/<a href="#/p5/endShape">endShape()</a> pair and\ntransformations such as <a href="#/p5/translate">translate()</a>, <a href="#/p5/rotate">rotate()</a>, and <a href="#/p5/scale">scale()</a> do not work\nwithin a <a href="#/p5/beginContour">beginContour()</a>/<a href="#/p5/endContour">endContour()</a> pair. It is also not possible to use\nother shapes, such as <a href="#/p5/ellipse">ellipse()</a> or <a href="#/p5/rect">rect()</a> within.</p>\n',
    itemtype: 'method',
    name: 'endContour',
    chainable: 1,
    example: [
      '\n<div>\n<code>\ntranslate(50, 50);\nstroke(255, 0, 0);\nbeginShape();\n// Exterior part of shape, clockwise winding\nvertex(-40, -40);\nvertex(40, -40);\nvertex(40, 40);\nvertex(-40, 40);\n// Interior part of shape, counter-clockwise winding\nbeginContour();\nvertex(-20, -20);\nvertex(-20, 20);\nvertex(20, 20);\nvertex(20, -20);\nendContour();\nendShape(CLOSE);\n</code>\n</div>'
    ],
    alt: 'white rect and smaller grey rect with red outlines in center of canvas.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Vertex'
  },
  {
    description:
      '<p>The <a href="#/p5/endShape">endShape()</a> function is the companion to <a href="#/p5/beginShape">beginShape()</a> and may only be\ncalled after <a href="#/p5/beginShape">beginShape()</a>. When <a href="#/p5/endshape">endShape()</a> is called, all of image data\ndefined since the previous call to <a href="#/p5/beginShape">beginShape()</a> is written into the image\nbuffer. The constant CLOSE as the value for the MODE parameter to close\nthe shape (to connect the beginning and the end).</p>\n',
    itemtype: 'method',
    name: 'endShape',
    params: [
      { name: 'mode', description: '<p>use CLOSE to close the shape</p>\n', type: 'Constant', optional: true }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\nnoFill();\n\nbeginShape();\nvertex(20, 20);\nvertex(45, 20);\nvertex(45, 80);\nendShape(CLOSE);\n\nbeginShape();\nvertex(50, 20);\nvertex(75, 20);\nvertex(75, 80);\nendShape();\n</code>\n</div>'
    ],
    alt: 'Triangle line shape with smallest interior angle on bottom and upside-down L.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Vertex'
  },
  {
    description:
      '<p>Specifies vertex coordinates for quadratic Bezier curves. Each call to\nquadraticVertex() defines the position of one control points and one\nanchor point of a Bezier curve, adding a new segment to a line or shape.\nThe first time quadraticVertex() is used within a <a href="#/p5/beginShape">beginShape()</a> call, it\nmust be prefaced with a call to <a href="#/p5/vertex">vertex()</a> to set the first anchor point.\nFor WebGL mode quadraticVertex() can be used in 2D as well as 3D mode.\n2D mode expects 4 parameters, while 3D mode expects 6 parameters\n(including z coordinates).</p>\n<p>This function must be used between <a href="#/p5/beginShape">beginShape()</a> and <a href="#/p5/endShape">endShape()</a>\nand only when there is no MODE or POINTS parameter specified to\n<a href="#/p5/beginShape">beginShape()</a>.</p>\n',
    itemtype: 'method',
    name: 'quadraticVertex',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nstrokeWeight(5);\npoint(20, 20);\npoint(80, 20);\npoint(50, 50);\n\nnoFill();\nstrokeWeight(1);\nbeginShape();\nvertex(20, 20);\nquadraticVertex(80, 20, 50, 50);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nstrokeWeight(5);\npoint(20, 20);\npoint(80, 20);\npoint(50, 50);\n\npoint(20, 80);\npoint(80, 80);\npoint(80, 60);\n\nnoFill();\nstrokeWeight(1);\nbeginShape();\nvertex(20, 20);\nquadraticVertex(80, 20, 50, 50);\nquadraticVertex(20, 80, 80, 80);\nvertex(80, 60);\nendShape();\n</code>\n</div>'
    ],
    alt: 'arched-shaped black line with 4 pixel thick stroke weight.\nbackwards s-shaped black line with 4 pixel thick stroke weight.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Vertex',
    overloads: [
      {
        line: 668,
        params: [
          { name: 'cx', description: '<p>x-coordinate for the control point</p>\n', type: 'Number' },
          { name: 'cy', description: '<p>y-coordinate for the control point</p>\n', type: 'Number' },
          { name: 'x3', description: '<p>x-coordinate for the anchor point</p>\n', type: 'Number' },
          { name: 'y3', description: '<p>y-coordinate for the anchor point</p>\n', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 733,
        params: [
          { name: 'cx', description: '', type: 'Number' },
          { name: 'cy', description: '', type: 'Number' },
          {
            name: 'cz',
            description: '<p>z-coordinate for the control point (for WebGL mode)</p>\n',
            type: 'Number'
          },
          { name: 'x3', description: '', type: 'Number' },
          { name: 'y3', description: '', type: 'Number' },
          {
            name: 'z3',
            description: '<p>z-coordinate for the anchor point (for WebGL mode)</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>All shapes are constructed by connecting a series of vertices. <a href="#/p5/vertex">vertex()</a>\nis used to specify the vertex coordinates for points, lines, triangles,\nquads, and polygons. It is used exclusively within the <a href="#/p5/beginShape">beginShape()</a> and\n<a href="#/p5/endShape">endShape()</a> functions.</p>\n',
    itemtype: 'method',
    name: 'vertex',
    chainable: 1,
    example: [
      "\n<div>\n<code>\nstrokeWeight(3);\nbeginShape(POINTS);\nvertex(30, 20);\nvertex(85, 20);\nvertex(85, 75);\nvertex(30, 75);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\ncreateCanvas(100, 100, WEBGL);\nbackground(240, 240, 240);\nfill(237, 34, 93);\nnoStroke();\nbeginShape();\nvertex(0, 35);\nvertex(35, 0);\nvertex(0, -35);\nvertex(-35, 0);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\ncreateCanvas(100, 100, WEBGL);\nbackground(240, 240, 240);\nfill(237, 34, 93);\nnoStroke();\nbeginShape();\nvertex(-10, 10);\nvertex(0, 35);\nvertex(10, 10);\nvertex(35, 0);\nvertex(10, -8);\nvertex(0, -35);\nvertex(-10, -8);\nvertex(-35, 0);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\nstrokeWeight(3);\nstroke(237, 34, 93);\nbeginShape(LINES);\nvertex(10, 35);\nvertex(90, 35);\nvertex(10, 65);\nvertex(90, 65);\nvertex(35, 10);\nvertex(35, 90);\nvertex(65, 10);\nvertex(65, 90);\nendShape();\n</code>\n</div>\n\n<div>\n<code>\n// Click to change the number of sides.\n// In WebGL mode, custom shapes will only\n// display hollow fill sections when\n// all calls to vertex() use the same z-value.\n\nlet sides = 3;\nlet angle, px, py;\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  setAttributes('antialias', true);\n  fill(237, 34, 93);\n  strokeWeight(3);\n}\n\nfunction draw() {\n  background(200);\n  rotateX(frameCount * 0.01);\n  rotateZ(frameCount * 0.01);\n  ngon(sides, 0, 0, 80);\n}\n\nfunction mouseClicked() {\n  if (sides > 6) {\n    sides = 3;\n  } else {\n    sides++;\n  }\n}\n\nfunction ngon(n, x, y, d) {\n  beginShape(TESS);\n  for (let i = 0; i < n + 1; i++) {\n    angle = TWO_PI / n * i;\n    px = x + sin(angle) * d / 2;\n    py = y - cos(angle) * d / 2;\n    vertex(px, py, 0);\n  }\n  for (let i = 0; i < n + 1; i++) {\n    angle = TWO_PI / n * i;\n    px = x + sin(angle) * d / 4;\n    py = y - cos(angle) * d / 4;\n    vertex(px, py, 0);\n  }\n  endShape();\n}\n</code>\n</div>"
    ],
    alt: '4 black points in a square shape in middle-right of canvas.\n4 points making a diamond shape.\n8 points making a star.\n8 points making 4 lines.\nA rotating 3D shape with a hollow section in the middle.',
    class: 'p5',
    module: 'Shape',
    submodule: 'Vertex',
    overloads: [
      {
        line: 826,
        params: [
          { name: 'x', description: '<p>x-coordinate of the vertex</p>\n', type: 'Number' },
          { name: 'y', description: '<p>y-coordinate of the vertex</p>\n', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 957,
        params: [
          { name: 'x', description: '', type: 'Number' },
          { name: 'y', description: '', type: 'Number' },
          { name: 'z', description: '<p>z-coordinate of the vertex</p>\n', type: 'Number' },
          {
            name: 'u',
            description: "<p>the vertex's texture u-coordinate</p>\n",
            type: 'Number',
            optional: true
          },
          {
            name: 'v',
            description: "<p>the vertex's texture v-coordinate</p>\n",
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>The <a href="#/p5/print">print()</a> function writes to the console area of\nyour browser. This function is often helpful for looking at the data a program\nis producing. This function creates a new line of text for each call to\nthe function. Individual elements can be separated with quotes ("") and joined\nwith the addition operator (+).</p>\n<p>Note that calling print() without any arguments invokes the window.print()\nfunction which opens the browser\'s print dialog. To print a blank line\nto console you can write print(\'\\n\').</p>\n',
    itemtype: 'method',
    name: 'print',
    params: [
      {
        name: 'contents',
        description:
          '<p>any combination of Number, String, Object, Boolean,\n                      Array to print</p>\n',
        type: 'Any'
      }
    ],
    example: [
      "\n<div><code class='norender'>\nlet x = 10;\nprint('The value of x is ' + x);\n// prints \"The value of x is 10\"\n</code></div>"
    ],
    alt: 'default grey canvas',
    class: 'p5',
    module: 'Environment',
    submodule: 'Environment'
  },
  {
    description:
      '<p>Sets the cursor to a predefined symbol or an image, or makes it visible\nif already hidden. If you are trying to set an image as the cursor, the\nrecommended size is 16x16 or 32x32 pixels. The values for parameters x and y\nmust be less than the dimensions of the image.</p>\n',
    itemtype: 'method',
    name: 'cursor',
    params: [
      {
        name: 'type',
        description:
          "<p>Built-In: either ARROW, CROSS, HAND, MOVE, TEXT and WAIT\n                              Native CSS properties: 'grab', 'progress', 'cell' etc.\n                              External: path for cursor's images\n                              (Allowed File extensions: .cur, .gif, .jpg, .jpeg, .png)\n                              For more information on Native CSS cursors and url visit:\n                              <a href=\"https://developer.mozilla.org/en-US/docs/Web/CSS/cursor\">https://developer.mozilla.org/en-US/docs/Web/CSS/cursor</a></p>\n",
        type: 'String|Constant'
      },
      {
        name: 'x',
        description: '<p>the horizontal active spot of the cursor (must be less than 32)</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'y',
        description: '<p>the vertical active spot of the cursor (must be less than 32)</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    example: [
      "\n<div><code>\n// Move the mouse across the quadrants\n// to see the cursor change\nfunction draw() {\n  line(width / 2, 0, width / 2, height);\n  line(0, height / 2, width, height / 2);\n  if (mouseX < 50 && mouseY < 50) {\n    cursor(CROSS);\n  } else if (mouseX > 50 && mouseY < 50) {\n    cursor('progress');\n  } else if (mouseX > 50 && mouseY > 50) {\n    cursor('https://avatars0.githubusercontent.com/u/1617169?s=16');\n  } else {\n    cursor('grab');\n  }\n}\n</code></div>"
    ],
    alt: 'canvas is divided into four quadrants. cursor on first is a cross, second is a progress,\nthird is a custom cursor using path to the cursor and fourth is a grab.',
    class: 'p5',
    module: 'Environment',
    submodule: 'Environment'
  },
  {
    description:
      '<p>Specifies the number of frames to be displayed every second. For example,\nthe function call frameRate(30) will attempt to refresh 30 times a second.\nIf the processor is not fast enough to maintain the specified rate, the\nframe rate will not be achieved. Setting the frame rate within \n<a href="#/p5/setup">setup()</a> is recommended. The default frame rate is\nbased on the frame rate of the display (here also called "refresh rate"), \nwhich is set to 60 frames per second on most computers. A frame rate of 24\nframes per second (usual for movies) or above will be enough for smooth \nanimations. This is the same as setFrameRate(val).</p>\n<p>Calling <a href="#/p5/frameRate">frameRate()</a> with no arguments returns\nthe current framerate. The draw function must run at least once before it will\nreturn a value. This is the same as <a href="#/p5/getFrameRate">getFrameRate()</a>.</p>\n<p>Calling <a href="#/p5/frameRate">frameRate()</a> with arguments that are not\nof the type numbers or are non positive also returns current framerate.</p>\n',
    itemtype: 'method',
    name: 'frameRate',
    chainable: 1,
    example: [
      '\n\n<div><code>\nlet rectX = 0;\nlet fr = 30; //starting FPS\nlet clr;\n\nfunction setup() {\n  background(200);\n  frameRate(fr); // Attempt to refresh at starting FPS\n  clr = color(255, 0, 0);\n}\n\nfunction draw() {\n  background(200);\n  rectX = rectX += 1; // Move Rectangle\n\n  if (rectX >= width) {\n   // If you go off screen.\n    if (fr === 30) {\n      clr = color(0, 0, 255);\n      fr = 10;\n      frameRate(fr); // make frameRate 10 FPS\n    } else {\n      clr = color(255, 0, 0);\n      fr = 30;\n      frameRate(fr); // make frameRate 30 FPS\n    }\n    rectX = 0;\n  }\n  fill(clr);\n  rect(rectX, 40, 20, 20);\n}\n</code></div>'
    ],
    alt: 'blue rect moves left to right, followed by red rect moving faster. Loops.',
    class: 'p5',
    module: 'Environment',
    submodule: 'Environment',
    overloads: [
      {
        line: 228,
        params: [
          {
            name: 'fps',
            description: '<p>number of frames to be displayed every second</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      { line: 288, params: [], return: { description: 'current frameRate', type: 'Number' } }
    ]
  },
  {
    description: '<p>Hides the cursor from view.</p>\n',
    itemtype: 'method',
    name: 'noCursor',
    example: [
      '\n<div><code>\nfunction setup() {\n  noCursor();\n}\n\nfunction draw() {\n  background(200);\n  ellipse(mouseX, mouseY, 10, 10);\n}\n</code></div>'
    ],
    alt: 'cursor becomes 10x 10 white ellipse the moves with mouse x and y.',
    class: 'p5',
    module: 'Environment',
    submodule: 'Environment'
  },
  {
    description:
      '<p>The <a href="#/p5/windowResized">windowResized()</a> function is called once\nevery time the browser window is resized. This is a good place to resize the\ncanvas or do any other adjustments to accommodate the new window size.</p>\n',
    itemtype: 'method',
    name: 'windowResized',
    params: [
      {
        name: 'event',
        description: '<p>optional Event callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div class="norender"><code>\nfunction setup() {\n  createCanvas(windowWidth, windowHeight);\n}\n\nfunction draw() {\n  background(0, 100, 200);\n}\n\nfunction windowResized() {\n  resizeCanvas(windowWidth, windowHeight);\n}\n</code></div>'
    ],
    alt: 'This example does not render anything.',
    class: 'p5',
    module: 'Environment',
    submodule: 'Environment'
  },
  {
    description:
      '<p>If argument is given, sets the sketch to fullscreen or not based on the\nvalue of the argument. If no argument is given, returns the current\nfullscreen state. Note that due to browser restrictions this can only\nbe called on user input, for example, on mouse press like the example\nbelow.</p>\n',
    itemtype: 'method',
    name: 'fullscreen',
    params: [
      {
        name: 'val',
        description: '<p>whether the sketch should be in fullscreen mode\nor not</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    return: { description: 'current fullscreen state', type: 'Boolean' },
    example: [
      '\n<div>\n<code>\n// Clicking in the box toggles fullscreen on and off.\nfunction setup() {\n  background(200);\n}\nfunction mousePressed() {\n  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {\n    let fs = fullscreen();\n    fullscreen(!fs);\n  }\n}\n</code>\n</div>'
    ],
    alt: 'This example does not render anything.',
    class: 'p5',
    module: 'Environment',
    submodule: 'Environment'
  },
  {
    description:
      '<p>Sets the pixel scaling for high pixel density displays. By default\npixel density is set to match display density, call pixelDensity(1)\nto turn this off. Calling <a href="#/p5/pixelDensity">pixelDensity()</a> with no arguments returns\nthe current pixel density of the sketch.</p>\n',
    itemtype: 'method',
    name: 'pixelDensity',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  pixelDensity(1);\n  createCanvas(100, 100);\n  background(200);\n  ellipse(width / 2, height / 2, 50, 50);\n}\n</code>\n</div>\n\n<div>\n<code>\nfunction setup() {\n  pixelDensity(3.0);\n  createCanvas(100, 100);\n  background(200);\n  ellipse(width / 2, height / 2, 50, 50);\n}\n</code>\n</div>'
    ],
    alt: 'fuzzy 50x50 white ellipse with black outline in center of canvas.\nsharp 50x50 white ellipse with black outline in center of canvas.',
    class: 'p5',
    module: 'Environment',
    submodule: 'Environment',
    overloads: [
      {
        line: 550,
        params: [
          { name: 'val', description: '<p>whether or how much the sketch should scale</p>\n', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 586,
        params: [],
        return: { description: 'current pixel density of the sketch', type: 'Number' }
      }
    ]
  },
  {
    description: '<p>Returns the pixel density of the current display the sketch is running on.</p>\n',
    itemtype: 'method',
    name: 'displayDensity',
    return: { description: 'current pixel density of the display', type: 'Number' },
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  let density = displayDensity();\n  pixelDensity(density);\n  createCanvas(100, 100);\n  background(200);\n  ellipse(width / 2, height / 2, 50, 50);\n}\n</code>\n</div>'
    ],
    alt: '50x50 white ellipse with black outline in center of canvas.',
    class: 'p5',
    module: 'Environment',
    submodule: 'Environment'
  },
  {
    description:
      "<p>Gets the current URL. Note: when using the\np5 Editor, this will return an empty object because the sketch\nis embedded in an iframe. It will work correctly if you view the\nsketch using the editor's present or share URLs.</p>\n",
    itemtype: 'method',
    name: 'getURL',
    return: { description: 'url', type: 'String' },
    example: [
      '\n<div>\n<code>\nlet url;\nlet x = 100;\n\nfunction setup() {\n  fill(0);\n  noStroke();\n  url = getURL();\n}\n\nfunction draw() {\n  background(200);\n  text(url, x, height / 2);\n  x--;\n}\n</code>\n</div>'
    ],
    alt: 'current url (http://p5js.org/reference/#/p5/getURL) moves right to left.',
    class: 'p5',
    module: 'Environment',
    submodule: 'Environment'
  },
  {
    description:
      "<p>Gets the current URL path as an array. Note: when using the\np5 Editor, this will return an empty object because the sketch\nis embedded in an iframe. It will work correctly if you view the\nsketch using the editor's present or share URLs.</p>\n",
    itemtype: 'method',
    name: 'getURLPath',
    return: { description: 'path components', type: 'String[]' },
    example: [
      "\n<div class='norender'><code>\nfunction setup() {\n  let urlPath = getURLPath();\n  for (let i = 0; i < urlPath.length; i++) {\n    text(urlPath[i], 10, i * 20 + 20);\n  }\n}\n</code></div>"
    ],
    alt: 'This example does not render anything.',
    class: 'p5',
    module: 'Environment',
    submodule: 'Environment'
  },
  {
    description:
      "<p>Gets the current URL params as an Object. Note: when using the\np5 Editor, this will return an empty object because the sketch\nis embedded in an iframe. It will work correctly if you view the\nsketch using the editor's present or share URLs.</p>\n",
    itemtype: 'method',
    name: 'getURLParams',
    return: { description: 'URL params', type: 'Object' },
    example: [
      "\n<div class='norender notest'>\n<code>\n// Example: http://p5js.org?year=2014&month=May&day=15\n\nfunction setup() {\n  let params = getURLParams();\n  text(params.day, 10, 20);\n  text(params.month, 10, 40);\n  text(params.year, 10, 60);\n}\n</code>\n</div>"
    ],
    alt: 'This example does not render anything.',
    class: 'p5',
    module: 'Environment',
    submodule: 'Environment'
  },
  {
    description:
      '<p>Called directly before <a href="#/p5/setup">setup()</a>, the <a href="#/p5/preload">preload()</a> function is used to handle\nasynchronous loading of external files in a blocking way. If a preload\nfunction is defined, <a href="#/p5/setup">setup()</a> will wait until any load calls within have\nfinished. Nothing besides load calls (<a href="#/p5/loadImage">loadImage</a>, <a href="#/p5/loadJSON">loadJSON</a>, <a href="#/p5/loadFont">loadFont</a>,\n<a href="#/p5/loadStrings">loadStrings</a>, etc.) should be inside the preload function. If asynchronous\nloading is preferred, the load methods can instead be called in <a href="#/p5/setup">setup()</a>\nor anywhere else with the use of a callback parameter.</p>\n<p>By default the text "loading..." will be displayed. To make your own\nloading page, include an HTML element with id "p5_loading" in your\npage. More information <a href="http://bit.ly/2kQ6Nio">here</a>.</p>\n',
    itemtype: 'method',
    name: 'preload',
    example: [
      "\n<div><code>\nlet img;\nlet c;\nfunction preload() {\n  // preload() runs once\n  img = loadImage('assets/laDefense.jpg');\n}\n\nfunction setup() {\n  // setup() waits until preload() is done\n  img.loadPixels();\n  // get color of middle pixel\n  c = img.get(img.width / 2, img.height / 2);\n}\n\nfunction draw() {\n  background(c);\n  image(img, 25, 25, 50, 50);\n}\n</code></div>"
    ],
    alt: 'nothing displayed',
    class: 'p5',
    module: 'Structure',
    submodule: 'Structure'
  },
  {
    description:
      '<p>The <a href="#/p5/setup">setup()</a> function is called once when the program starts. It\'s used to\ndefine initial environment properties such as screen size and background\ncolor and to load media such as images and fonts as the program starts.\nThere can only be one <a href="#/p5/setup">setup()</a> function for each program and it shouldn\'t\nbe called again after its initial execution.</p>\n<p>Note: Variables declared within <a href="#/p5/setup">setup()</a> are not accessible within other\nfunctions, including <a href="#/p5/draw">draw()</a>.</p>\n',
    itemtype: 'method',
    name: 'setup',
    example: [
      '\n<div><code>\nlet a = 0;\n\nfunction setup() {\n  background(0);\n  noStroke();\n  fill(102);\n}\n\nfunction draw() {\n  rect(a++ % width, 10, 2, 80);\n}\n</code></div>'
    ],
    alt: 'nothing displayed',
    class: 'p5',
    module: 'Structure',
    submodule: 'Structure'
  },
  {
    description:
      '<p>Called directly after <a href="#/p5/setup">setup()</a>, the <a href="#/p5/draw">draw()</a> function continuously executes\nthe lines of code contained inside its block until the program is stopped\nor <a href="#/p5/noLoop">noLoop()</a> is called. Note if <a href="#/p5/noLoop">noLoop()</a> is called in <a href="#/p5/setup">setup()</a>, <a href="#/p5/draw">draw()</a> will\nstill be executed once before stopping. <a href="#/p5/draw">draw()</a> is called automatically and\nshould never be called explicitly.</p>\n<p>It should always be controlled with <a href="#/p5/noLoop">noLoop()</a>, <a href="#/p5/redraw">redraw()</a> and <a href="#/p5/loop">loop()</a>. After\n<a href="#/p5/noLoop">noLoop()</a> stops the code in <a href="#/p5/draw">draw()</a> from executing, <a href="#/p5/redraw">redraw()</a> causes the\ncode inside <a href="#/p5/draw">draw()</a> to execute once, and <a href="#/p5/loop">loop()</a> will cause the code\ninside <a href="#/p5/draw">draw()</a> to resume executing continuously.</p>\n<p>The number of times <a href="#/p5/draw">draw()</a> executes in each second may be controlled with\nthe <a href="#/p5/frameRate">frameRate()</a> function.</p>\n<p>There can only be one <a href="#/p5/draw">draw()</a> function for each sketch, and <a href="#/p5/draw">draw()</a> must\nexist if you want the code to run continuously, or to process events such\nas <a href="#/p5/mousePressed">mousePressed()</a>. Sometimes, you might have an empty call to <a href="#/p5/draw">draw()</a> in\nyour program, as shown in the above example.</p>\n<p>It is important to note that the drawing coordinate system will be reset\nat the beginning of each <a href="#/p5/draw">draw()</a> call. If any transformations are performed\nwithin <a href="#/p5/draw">draw()</a> (ex: scale, rotate, translate), their effects will be\nundone at the beginning of <a href="#/p5/draw">draw()</a>, so transformations will not accumulate\nover time. On the other hand, styling applied (ex: fill, stroke, etc) will\nremain in effect.</p>\n',
    itemtype: 'method',
    name: 'draw',
    example: [
      '\n<div><code>\nlet yPos = 0;\nfunction setup() {\n  // setup() runs once\n  frameRate(30);\n}\nfunction draw() {\n  // draw() loops forever, until stopped\n  background(204);\n  yPos = yPos - 1;\n  if (yPos < 0) {\n    yPos = height;\n  }\n  line(0, yPos, width, yPos);\n}\n</code></div>'
    ],
    alt: 'nothing displayed',
    class: 'p5',
    module: 'Structure',
    submodule: 'Structure'
  },
  {
    description:
      '<p>Removes the entire p5 sketch. This will remove the canvas and any\nelements created by p5.js. It will also stop the draw loop and unbind\nany properties or methods from the window global scope. It will\nleave a variable p5 in case you wanted to create a new p5 sketch.\nIf you like, you can set p5 = null to erase it. While all functions and\nvariables and objects created by the p5 library will be removed, any\nother global variables created by your code will remain.</p>\n',
    itemtype: 'method',
    name: 'remove',
    example: [
      "\n<div class='norender'><code>\nfunction draw() {\n  ellipse(50, 50, 10, 10);\n}\n\nfunction mousePressed() {\n  remove(); // remove whole sketch on mouse press\n}\n</code></div>"
    ],
    alt: 'nothing displayed',
    class: 'p5',
    module: 'Structure',
    submodule: 'Structure'
  },
  {
    description:
      '<p>The .<a href="#/p5.Element/mousePressed">mousePressed()</a> function is called\nonce after every time a mouse button is pressed over the element. Some mobile\nbrowsers may also trigger this event on a touch screen, if the user performs\na quick tap. This can be used to attach element specific event listeners.</p>\n',
    itemtype: 'method',
    name: 'mousePressed',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when mouse is\n                               pressed over the element.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    chainable: 1,
    example: [
      "\n<div class='norender'><code>\nlet cnv, d, g;\nfunction setup() {\n  cnv = createCanvas(100, 100);\n  cnv.mousePressed(changeGray); // attach listener for\n  // canvas click only\n  d = 10;\n  g = 100;\n}\n\nfunction draw() {\n  background(g);\n  ellipse(width / 2, height / 2, d, d);\n}\n\n// this function fires with any click anywhere\nfunction mousePressed() {\n  d = d + 10;\n}\n\n// this function fires only when cnv is clicked\nfunction changeGray() {\n  g = random(0, 255);\n}\n</code></div>"
    ],
    alt: 'no display.',
    class: 'p5.Element',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>The .<a href="#/p5.Element/doubleClicked">doubleClicked()</a> function is called once after every time a\nmouse button is pressed twice over the element. This can be used to\nattach element and action specific event listeners.</p>\n',
    itemtype: 'method',
    name: 'doubleClicked',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when mouse is\n                               double clicked over the element.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    return: { description: '', type: 'p5.Element' },
    example: [
      "\n<div class='norender'><code>\nlet cnv, d, g;\nfunction setup() {\n  cnv = createCanvas(100, 100);\n  cnv.doubleClicked(changeGray); // attach listener for\n  // canvas double click only\n  d = 10;\n  g = 100;\n}\n\nfunction draw() {\n  background(g);\n  ellipse(width / 2, height / 2, d, d);\n}\n\n// this function fires with any double click anywhere\nfunction doubleClicked() {\n  d = d + 10;\n}\n\n// this function fires only when cnv is double clicked\nfunction changeGray() {\n  g = random(0, 255);\n}\n</code></div>"
    ],
    alt: 'no display.',
    class: 'p5.Element',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>The <a href="#/p5.Element/mouseWheel">mouseWheel()</a> function is called\nonce after every time a mouse wheel is scrolled over the element. This can\nbe used to attach element specific event listeners.</p>\n<p>The function accepts a callback function as argument which will be executed\nwhen the <code>wheel</code> event is triggered on the element, the callback function is\npassed one argument <code>event</code>. The <code>event.deltaY</code> property returns negative\nvalues if the mouse wheel is rotated up or away from the user and positive\nin the other direction. The <code>event.deltaX</code> does the same as <code>event.deltaY</code>\nexcept it reads the horizontal wheel scroll of the mouse wheel.</p>\n<p>On OS X with "natural" scrolling enabled, the <code>event.deltaY</code> values are\nreversed.</p>\n',
    itemtype: 'method',
    name: 'mouseWheel',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when mouse is\n                               scrolled over the element.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    chainable: 1,
    example: [
      "\n<div class='norender'><code>\nlet cnv, d, g;\nfunction setup() {\n  cnv = createCanvas(100, 100);\n  cnv.mouseWheel(changeSize); // attach listener for\n  // activity on canvas only\n  d = 10;\n  g = 100;\n}\n\nfunction draw() {\n  background(g);\n  ellipse(width / 2, height / 2, d, d);\n}\n\n// this function fires with mousewheel movement\n// anywhere on screen\nfunction mouseWheel() {\n  g = g + 10;\n}\n\n// this function fires with mousewheel movement\n// over canvas only\nfunction changeSize(event) {\n  if (event.deltaY > 0) {\n    d = d + 10;\n  } else {\n    d = d - 10;\n  }\n}\n</code></div>"
    ],
    alt: 'no display.',
    class: 'p5.Element',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>The <a href="#/p5.Element/mouseReleased">mouseReleased()</a> function is\ncalled once after every time a mouse button is released over the element.\nSome mobile browsers may also trigger this event on a touch screen, if the\nuser performs a quick tap. This can be used to attach element specific event listeners.</p>\n',
    itemtype: 'method',
    name: 'mouseReleased',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when mouse is\n                               released over the element.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    chainable: 1,
    example: [
      "\n<div class='norender'><code>\nlet cnv, d, g;\nfunction setup() {\n  cnv = createCanvas(100, 100);\n  cnv.mouseReleased(changeGray); // attach listener for\n  // activity on canvas only\n  d = 10;\n  g = 100;\n}\n\nfunction draw() {\n  background(g);\n  ellipse(width / 2, height / 2, d, d);\n}\n\n// this function fires after the mouse has been\n// released\nfunction mouseReleased() {\n  d = d + 10;\n}\n\n// this function fires after the mouse has been\n// released while on canvas\nfunction changeGray() {\n  g = random(0, 255);\n}\n</code></div>"
    ],
    alt: 'no display.',
    class: 'p5.Element',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>The .<a href="#/p5.Element/mouseClicked">mouseClicked()</a> function is\ncalled once after a mouse button is pressed and released over the element.\nSome mobile browsers may also trigger this event on a touch screen, if the\nuser performs a quick tap.This can be used to attach element specific event listeners.</p>\n',
    itemtype: 'method',
    name: 'mouseClicked',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when mouse is\n                               clicked over the element.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    chainable: 1,
    example: [
      '\n<div class="norender">\n<code>\nlet cnv, d, g;\nfunction setup() {\n  cnv = createCanvas(100, 100);\n  cnv.mouseClicked(changeGray); // attach listener for\n  // activity on canvas only\n  d = 10;\n  g = 100;\n}\n\nfunction draw() {\n  background(g);\n  ellipse(width / 2, height / 2, d, d);\n}\n\n// this function fires after the mouse has been\n// clicked anywhere\nfunction mouseClicked() {\n  d = d + 10;\n}\n\n// this function fires after the mouse has been\n// clicked on canvas\nfunction changeGray() {\n  g = random(0, 255);\n}\n</code>\n</div>'
    ],
    alt: 'no display.',
    class: 'p5.Element',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>The .<a href="#/p5.Element/mouseMoved">mouseMoved()</a> function is called once every time a\nmouse moves over the element. This can be used to attach an\nelement specific event listener.</p>\n',
    itemtype: 'method',
    name: 'mouseMoved',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when a mouse moves\n                               over the element.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    chainable: 1,
    example: [
      "\n<div class='norender'><code>\nlet cnv;\nlet d = 30;\nlet g;\nfunction setup() {\n  cnv = createCanvas(100, 100);\n  cnv.mouseMoved(changeSize); // attach listener for\n  // activity on canvas only\n  d = 10;\n  g = 100;\n}\n\nfunction draw() {\n  background(g);\n  fill(200);\n  ellipse(width / 2, height / 2, d, d);\n}\n\n// this function fires when mouse moves anywhere on\n// page\nfunction mouseMoved() {\n  g = g + 5;\n  if (g > 255) {\n    g = 0;\n  }\n}\n\n// this function fires when mouse moves over canvas\nfunction changeSize() {\n  d = d + 2;\n  if (d > 100) {\n    d = 0;\n  }\n}\n</code></div>"
    ],
    alt: 'no display.',
    class: 'p5.Element',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>The .<a href="#/p5.Element/touchStarted">touchStarted()</a> function is called once after every time a touch is\nregistered. This can be used to attach element specific event listeners.</p>\n',
    itemtype: 'method',
    name: 'touchStarted',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when a touch\n                               starts over the element.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    chainable: 1,
    example: [
      "\n<div class='norender'><code>\nlet cnv;\nlet d;\nlet g;\nfunction setup() {\n  cnv = createCanvas(100, 100);\n  cnv.touchStarted(changeGray); // attach listener for\n  // canvas click only\n  d = 10;\n  g = 100;\n}\n\nfunction draw() {\n  background(g);\n  ellipse(width / 2, height / 2, d, d);\n}\n\n// this function fires with any touch anywhere\nfunction touchStarted() {\n  d = d + 10;\n}\n\n// this function fires only when cnv is clicked\nfunction changeGray() {\n  g = random(0, 255);\n}\n</code></div>"
    ],
    alt: 'no display.',
    class: 'p5.Element',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>The .<a href="#/p5.Element/touchMoved">touchMoved()</a> function is called once after every time a touch move is\nregistered. This can be used to attach element specific event listeners.</p>\n',
    itemtype: 'method',
    name: 'touchMoved',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when a touch moves over\n                               the element.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    chainable: 1,
    example: [
      "\n<div class='norender'><code>\nlet cnv;\nlet g;\nfunction setup() {\n  cnv = createCanvas(100, 100);\n  cnv.touchMoved(changeGray); // attach listener for\n  // canvas click only\n  g = 100;\n}\n\nfunction draw() {\n  background(g);\n}\n\n// this function fires only when cnv is clicked\nfunction changeGray() {\n  g = random(0, 255);\n}\n</code></div>"
    ],
    alt: 'no display.',
    class: 'p5.Element',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>The .<a href="#/p5.Element/touchEnded">touchEnded()</a> function is called once after every time a touch is\nregistered. This can be used to attach element specific event listeners.</p>\n',
    itemtype: 'method',
    name: 'touchEnded',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when a touch ends\n                               over the element.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    chainable: 1,
    example: [
      "\n<div class='norender'><code>\nlet cnv;\nlet d;\nlet g;\nfunction setup() {\n  cnv = createCanvas(100, 100);\n  cnv.touchEnded(changeGray); // attach listener for\n  // canvas click only\n  d = 10;\n  g = 100;\n}\n\nfunction draw() {\n  background(g);\n  ellipse(width / 2, height / 2, d, d);\n}\n\n// this function fires with any touch anywhere\nfunction touchEnded() {\n  d = d + 10;\n}\n\n// this function fires only when cnv is clicked\nfunction changeGray() {\n  g = random(0, 255);\n}\n</code></div>"
    ],
    alt: 'no display.',
    class: 'p5.Element',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Removes a Graphics object from the page and frees any resources\nassociated with it.</p>\n',
    itemtype: 'method',
    name: 'remove',
    example: [
      "\n<div class='norender'><code>\nlet bg;\nfunction setup() {\n  bg = createCanvas(100, 100);\n  bg.background(0);\n  image(bg, 0, 0);\n  bg.remove();\n}\n</code></div>\n\n<div><code>\nlet bg;\nfunction setup() {\n  pixelDensity(1);\n  createCanvas(100, 100);\n  stroke(255);\n  fill(0);\n\n  // create and draw the background image\n  bg = createGraphics(100, 100);\n  bg.background(200);\n  bg.ellipse(50, 50, 80, 80);\n}\nfunction draw() {\n  let t = millis() / 1000;\n  // draw the background\n  if (bg) {\n    image(bg, frameCount % 100, 0);\n    image(bg, frameCount % 100 - 100, 0);\n  }\n  // draw the foreground\n  let p = p5.Vector.fromAngle(t, 35).add(50, 50);\n  ellipse(p.x, p.y, 30);\n}\nfunction mouseClicked() {\n  // remove the background\n  if (bg) {\n    bg.remove();\n    bg = null;\n  }\n}\n</code></div>"
    ],
    alt: 'no image\na multi-colored circle moving back and forth over a scrolling background.',
    class: 'p5.Graphics',
    module: 'Rendering',
    submodule: 'Rendering'
  },
  {
    description:
      '<p>Prints a message to your browser\'s web console. When using p5, you can use <a href="#/p5/print">print</a>\nand <a href="#/p5/console/log">console.log</a> interchangeably.</p>\n<p>The console is opened differently depending on which browser you are using.\nHere are links on how to open the console in <a href="https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console">Firefox</a>\n, <a href="https://developers.google.com/web/tools/chrome-devtools/open">Chrome</a>, <a href="https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console">Edge</a>,\nand <a href="https://support.apple.com/en-ca/guide/safari/sfri20948/mac">Safari</a>.\nWith the <a href="https://editor.p5js.org/">online p5 editor</a> the console\nis embedded directly in the page underneath the code editor.</p>\n<p>From <a href="https://developer.mozilla.org/en-US/docs/Web/API/Console/log">the MDN entry</a>:\nThe Console method log() outputs a message to the web console. The message may\nbe a single <a href="#/p5/string">string</a> (with optional substitution values),\nor it may be any one or more JavaScript <a href="#/p5/object">objects</a>.</p>\n',
    itemtype: 'method',
    name: 'log',
    static: 1,
    params: [
      {
        name: 'message',
        description: '<p>:Message that you would like to print to the console</p>\n',
        type: 'String|Expression|Object'
      }
    ],
    example: [
      "\n<div class='norender'>\n<code>\nlet myNum = 5;\nconsole.log(myNum); // prints 5 to the console\nconsole.log(myNum + 12); // prints 17 to the console\n</code>\n</div>"
    ],
    alt: 'This example does not render anything',
    class: 'console',
    module: 'Foundation',
    submodule: 'Foundation'
  },
  {
    description:
      '<p>Creates a canvas element in the document, and sets the dimensions of it\nin pixels. This method should be called only once at the start of setup.\nCalling <a href="#/p5/createCanvas">createCanvas</a> more than once in a\nsketch will result in very unpredictable behavior. If you want more than\none drawing canvas you could use <a href="#/p5/createGraphics">createGraphics</a>\n(hidden by default but it can be shown).</p>\n<p>Important note: in 2D mode (i.e. when <code>p5.Renderer</code> is not set) the origin (0,0)\nis positioned at the top left of the screen. In 3D mode (i.e. when <code>p5.Renderer</code>\nis set to <code>WEBGL</code>), the origin is positioned at the center of the canvas.\nSee <a href="https://github.com/processing/p5.js/issues/1545">this issue</a> for more information.</p>\n<p>The system variables width and height are set by the parameters passed to this\nfunction. If <a href="#/p5/createCanvas">createCanvas()</a> is not used, the\nwindow will be given a default size of 100x100 pixels.</p>\n<p>For more ways to position the canvas, see the\n<a href=\'https://github.com/processing/p5.js/wiki/Positioning-your-canvas\'>\npositioning the canvas</a> wiki page.</p>\n',
    itemtype: 'method',
    name: 'createCanvas',
    params: [
      { name: 'w', description: '<p>width of the canvas</p>\n', type: 'Number' },
      { name: 'h', description: '<p>height of the canvas</p>\n', type: 'Number' },
      { name: 'renderer', description: '<p>either P2D or WEBGL</p>\n', type: 'Constant', optional: true }
    ],
    return: { description: '', type: 'p5.Renderer' },
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 50);\n  background(153);\n  line(0, 0, width, height);\n}\n</code>\n</div>'
    ],
    alt: 'Black line extending from top-left of canvas to bottom right.',
    class: 'p5',
    module: 'Rendering',
    submodule: 'Rendering'
  },
  {
    description:
      '<p>Resizes the canvas to given width and height. The canvas will be cleared\nand draw will be called immediately, allowing the sketch to re-render itself\nin the resized canvas.</p>\n',
    itemtype: 'method',
    name: 'resizeCanvas',
    params: [
      { name: 'w', description: '<p>width of the canvas</p>\n', type: 'Number' },
      { name: 'h', description: '<p>height of the canvas</p>\n', type: 'Number' },
      {
        name: 'noRedraw',
        description: "<p>don't redraw the canvas immediately</p>\n",
        type: 'Boolean',
        optional: true
      }
    ],
    example: [
      '\n<div class="norender"><code>\nfunction setup() {\n  createCanvas(windowWidth, windowHeight);\n}\n\nfunction draw() {\n  background(0, 100, 200);\n}\n\nfunction windowResized() {\n  resizeCanvas(windowWidth, windowHeight);\n}\n</code></div>'
    ],
    alt: 'No image displayed.',
    class: 'p5',
    module: 'Rendering',
    submodule: 'Rendering'
  },
  {
    description: "<p>Removes the default canvas for a p5 sketch that doesn't require a canvas</p>\n",
    itemtype: 'method',
    name: 'noCanvas',
    example: ['\n<div>\n<code>\nfunction setup() {\n  noCanvas();\n}\n</code>\n</div>'],
    alt: 'no image displayed',
    class: 'p5',
    module: 'Rendering',
    submodule: 'Rendering'
  },
  {
    description:
      '<p>Creates and returns a new p5.Renderer object. Use this class if you need\nto draw into an off-screen graphics buffer. The two parameters define the\nwidth and height in pixels.</p>\n',
    itemtype: 'method',
    name: 'createGraphics',
    params: [
      { name: 'w', description: '<p>width of the offscreen graphics buffer</p>\n', type: 'Number' },
      { name: 'h', description: '<p>height of the offscreen graphics buffer</p>\n', type: 'Number' },
      {
        name: 'renderer',
        description: '<p>either P2D or WEBGL\n                              undefined defaults to p2d</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    return: { description: 'offscreen graphics buffer', type: 'p5.Graphics' },
    example: [
      '\n<div>\n<code>\nlet pg;\nfunction setup() {\n  createCanvas(100, 100);\n  pg = createGraphics(100, 100);\n}\n\nfunction draw() {\n  background(200);\n  pg.background(100);\n  pg.noStroke();\n  pg.ellipse(pg.width / 2, pg.height / 2, 50, 50);\n  image(pg, 50, 50);\n  image(pg, 0, 0, 50, 50);\n}\n</code>\n</div>'
    ],
    alt: '4 grey squares alternating light and dark grey. White quarter circle mid-left.',
    class: 'p5',
    module: 'Rendering',
    submodule: 'Rendering'
  },
  {
    description:
      "<p>Blends the pixels in the display window according to the defined mode.\nThere is a choice of the following modes to blend the source pixels (A)\nwith the ones of pixels already in the display window (B):</p>\n<ul>\n<li><code>BLEND</code> - linear interpolation of colours: C =\nA*factor + B. <b>This is the default blending mode.</b></li>\n<li><code>ADD</code> - sum of A and B</li>\n<li><code>DARKEST</code> - only the darkest colour succeeds: C =\nmin(A*factor, B).</li>\n<li><code>LIGHTEST</code> - only the lightest colour succeeds: C =\nmax(A*factor, B).</li>\n<li><code>DIFFERENCE</code> - subtract colors from underlying image.</li>\n<li><code>EXCLUSION</code> - similar to <code>DIFFERENCE</code>, but less\nextreme.</li>\n<li><code>MULTIPLY</code> - multiply the colors, result will always be\ndarker.</li>\n<li><code>SCREEN</code> - opposite multiply, uses inverse values of the\ncolors.</li>\n<li><code>REPLACE</code> - the pixels entirely replace the others and\ndon't utilize alpha (transparency) values.</li>\n<li><code>REMOVE</code> - removes pixels from B with the alpha strength of A.</li>\n<li><code>OVERLAY</code> - mix of <code>MULTIPLY</code> and <code>SCREEN\n</code>. Multiplies dark values, and screens light values. <em>(2D)</em></li>\n<li><code>HARD_LIGHT</code> - <code>SCREEN</code> when greater than 50%\ngray, <code>MULTIPLY</code> when lower. <em>(2D)</em></li>\n<li><code>SOFT_LIGHT</code> - mix of <code>DARKEST</code> and\n<code>LIGHTEST</code>. Works like <code>OVERLAY</code>, but not as harsh. <em>(2D)</em>\n</li>\n<li><code>DODGE</code> - lightens light tones and increases contrast,\nignores darks. <em>(2D)</em></li>\n<li><code>BURN</code> - darker areas are applied, increasing contrast,\nignores lights. <em>(2D)</em></li>\n<li><code>SUBTRACT</code> - remainder of A and B <em>(3D)</em></li>\n</ul>\n\n<p><em>(2D)</em> indicates that this blend mode <b>only</b> works in the 2D renderer.<br>\n<em>(3D)</em> indicates that this blend mode <b>only</b> works in the WEBGL renderer.</p>\n",
    itemtype: 'method',
    name: 'blendMode',
    params: [
      {
        name: 'mode',
        description:
          '<p>blend mode to set for canvas.\n               either BLEND, DARKEST, LIGHTEST, DIFFERENCE, MULTIPLY,\n               EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT,\n               SOFT_LIGHT, DODGE, BURN, ADD, REMOVE or SUBTRACT</p>\n',
        type: 'Constant'
      }
    ],
    example: [
      '\n<div>\n<code>\nblendMode(LIGHTEST);\nstrokeWeight(30);\nstroke(80, 150, 255);\nline(25, 25, 75, 75);\nstroke(255, 50, 50);\nline(75, 25, 25, 75);\n</code>\n</div>\n\n<div>\n<code>\nblendMode(MULTIPLY);\nstrokeWeight(30);\nstroke(80, 150, 255);\nline(25, 25, 75, 75);\nstroke(255, 50, 50);\nline(75, 25, 25, 75);\n</code>\n</div>'
    ],
    alt: 'translucent image thick red & blue diagonal rounded lines intersecting center\nThick red & blue diagonal rounded lines intersecting center. dark at overlap',
    class: 'p5',
    module: 'Rendering',
    submodule: 'Rendering'
  },
  {
    description:
      '<p>Stops p5.js from continuously executing the code within <a href="#/p5/draw">draw()</a>.\nIf <a href="#/p5/loop">loop()</a> is called, the code in <a href="#/p5/draw">draw()</a>\nbegins to run continuously again. If using <a href="#/p5/noLoop">noLoop()</a>\nin <a href="#/p5/setup">setup()</a>, it should be the last line inside the block.</p>\n<p>When <a href="#/p5/noLoop">noLoop()</a> is used, it\'s not possible to manipulate\nor access the screen inside event handling functions such as\n<a href="#/p5/mousePressed">mousePressed()</a> or\n<a href="#/p5/keyPressed">keyPressed()</a>. Instead, use those functions to\ncall <a href="#/p5/redraw">redraw()</a> or <a href="#/p5/loop">loop()</a>,\nwhich will run <a href="#/p5/draw">draw()</a>, which can update the screen\nproperly. This means that when <a href="#/p5/noLoop">noLoop()</a> has been\ncalled, no drawing can happen, and functions like <a href="#/p5/saveFrames">saveFrames()</a>\nor <a href="#/p5/loadPixels">loadPixels()</a> may not be used.</p>\n<p>Note that if the sketch is resized, <a href="#/p5/redraw">redraw()</a> will\nbe called to update the sketch, even after <a href="#/p5/noLoop">noLoop()</a>\nhas been specified. Otherwise, the sketch would enter an odd state until\n<a href="#/p5/loop">loop()</a> was called.</p>\n<p>Use <a href="#/p5/isLooping">isLooping()</a> to check current state of loop().</p>\n',
    itemtype: 'method',
    name: 'noLoop',
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100);\n  background(200);\n  noLoop();\n}\n\nfunction draw() {\n  line(10, 10, 90, 90);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet x = 0;\nfunction setup() {\n  createCanvas(100, 100);\n}\n\nfunction draw() {\n  background(204);\n  x = x + 0.1;\n  if (x > width) {\n    x = 0;\n  }\n  line(x, 0, x, height);\n}\n\nfunction mousePressed() {\n  noLoop();\n}\n\nfunction mouseReleased() {\n  loop();\n}\n</code>\n</div>'
    ],
    alt: '113 pixel long line extending from top-left to bottom right of canvas.\nhorizontal line moves slowly from left. Loops but stops on mouse press.',
    class: 'p5',
    module: 'Structure',
    submodule: 'Structure'
  },
  {
    description:
      '<p>By default, p5.js loops through draw() continuously, executing the code within\nit. However, the <a href="#/p5/draw">draw()</a> loop may be stopped by calling\n<a href="#/p5/noLoop">noLoop()</a>. In that case, the <a href="#/p5/draw">draw()</a>\nloop can be resumed with loop().</p>\n<p>Avoid calling loop() from inside setup().</p>\n<p>Use <a href="#/p5/isLooping">isLooping()</a> to check current state of loop().</p>\n',
    itemtype: 'method',
    name: 'loop',
    example: [
      '\n<div>\n<code>\nlet x = 0;\nfunction setup() {\n  createCanvas(100, 100);\n  noLoop();\n}\n\nfunction draw() {\n  background(204);\n  x = x + 0.1;\n  if (x > width) {\n    x = 0;\n  }\n  line(x, 0, x, height);\n}\n\nfunction mousePressed() {\n  loop();\n}\n\nfunction mouseReleased() {\n  noLoop();\n}\n</code>\n</div>'
    ],
    alt: 'horizontal line moves slowly from left. Loops but stops on mouse press.',
    class: 'p5',
    module: 'Structure',
    submodule: 'Structure'
  },
  {
    description:
      '<p>The <a href="#/p5/push">push()</a> function saves the current drawing style\nsettings and transformations, while <a href="#/p5/pop">pop()</a> restores these\nsettings. Note that these functions are always used together. They allow you to\nchange the style and transformation settings and later return to what you had.\nWhen a new state is started with <a href="#/p5/push">push()</a>, it builds on\nthe current style and transform information. The <a href="#/p5/push">push()</a>\nand <a href="#/p5/pop">pop()</a> functions can be embedded to provide more\ncontrol. (See the second example for a demonstration.)</p>\n<p><a href="#/p5/push">push()</a> stores information related to the current transformation state\nand style settings controlled by the following functions:\n<a href="#/p5/fill">fill()</a>,\n<a href="#/p5/noFill">noFill()</a>,\n<a href="#/p5/noStroke">noStroke()</a>,\n<a href="#/p5/stroke">stroke()</a>,\n<a href="#/p5/tint">tint()</a>,\n<a href="#/p5/noTint">noTint()</a>,\n<a href="#/p5/strokeWeight">strokeWeight()</a>,\n<a href="#/p5/strokeCap">strokeCap()</a>,\n<a href="#/p5/strokeJoin">strokeJoin()</a>,\n<a href="#/p5/imageMode">imageMode()</a>,\n<a href="#/p5/rectMode">rectMode()</a>,\n<a href="#/p5/ellipseMode">ellipseMode()</a>,\n<a href="#/p5/colorMode">colorMode()</a>,\n<a href="#/p5/textAlign">textAlign()</a>,\n<a href="#/p5/textFont">textFont()</a>,\n<a href="#/p5/textSize">textSize()</a>,\n<a href="#/p5/textLeading">textLeading()</a>,\n<a href="#/p5/applyMatrix">applyMatrix()</a>,\n<a href="#/p5/resetMatrix">resetMatrix()</a>,\n<a href="#/p5/rotate">rotate()</a>,\n<a href="#/p5/scale">scale()</a>,\n<a href="#/p5/shearX">shearX()</a>,\n<a href="#/p5/shearY">shearY()</a>,\n<a href="#/p5/translate">translate()</a>,\n<a href="#/p5/noiseSeed">noiseSeed()</a>.</p>\n<p>In WEBGL mode additional style settings are stored. These are controlled by the\nfollowing functions: <a href="#/p5/setCamera">setCamera()</a>,\n<a href="#/p5/ambientLight">ambientLight()</a>,\n<a href="#/p5/directionalLight">directionalLight()</a>,\n<a href="#/p5/pointLight">pointLight()</a>, <a href="#/p5/texture">texture()</a>,\n<a href="#/p5/specularMaterial">specularMaterial()</a>,\n<a href="#/p5/shininess">shininess()</a>,\n<a href="#/p5/normalMaterial">normalMaterial()</a>\nand <a href="#/p5/shader">shader()</a>.</p>\n',
    itemtype: 'method',
    name: 'push',
    example: [
      '\n<div>\n<code>\nellipse(0, 50, 33, 33); // Left circle\n\npush(); // Start a new drawing state\nstrokeWeight(10);\nfill(204, 153, 0);\ntranslate(50, 0);\nellipse(0, 50, 33, 33); // Middle circle\npop(); // Restore original state\n\nellipse(100, 50, 33, 33); // Right circle\n</code>\n</div>\n\n<div>\n<code>\nellipse(0, 50, 33, 33); // Left circle\n\npush(); // Start a new drawing state\nstrokeWeight(10);\nfill(204, 153, 0);\nellipse(33, 50, 33, 33); // Left-middle circle\n\npush(); // Start another new drawing state\nstroke(0, 102, 153);\nellipse(66, 50, 33, 33); // Right-middle circle\npop(); // Restore previous state\n\npop(); // Restore original state\n\nellipse(100, 50, 33, 33); // Right circle\n</code>\n</div>'
    ],
    alt: 'Gold ellipse + thick black outline @center 2 white ellipses on left and right.\n2 Gold ellipses left black right blue stroke. 2 white ellipses on left+right.',
    class: 'p5',
    module: 'Structure',
    submodule: 'Structure'
  },
  {
    description:
      '<p>The <a href="#/p5/push">push()</a> function saves the current drawing style\nsettings and transformations, while <a href="#/p5/pop">pop()</a> restores\nthese settings. Note that these functions are always used together. They allow\nyou to change the style and transformation settings and later return to what\nyou had. When a new state is started with <a href="#/p5/push">push()</a>, it\nbuilds on the current style and transform information. The <a href="#/p5/push">push()</a>\nand <a href="#/p5/pop">pop()</a> functions can be embedded to provide more\ncontrol. (See the second example for a demonstration.)</p>\n<p><a href="#/p5/push">push()</a> stores information related to the current transformation state\nand style settings controlled by the following functions:\n<a href="#/p5/fill">fill()</a>,\n<a href="#/p5/noFill">noFill()</a>,\n<a href="#/p5/noStroke">noStroke()</a>,\n<a href="#/p5/stroke">stroke()</a>,\n<a href="#/p5/tint">tint()</a>,\n<a href="#/p5/noTint">noTint()</a>,\n<a href="#/p5/strokeWeight">strokeWeight()</a>,\n<a href="#/p5/strokeCap">strokeCap()</a>,\n<a href="#/p5/strokeJoin">strokeJoin()</a>,\n<a href="#/p5/imageMode">imageMode()</a>,\n<a href="#/p5/rectMode">rectMode()</a>,\n<a href="#/p5/ellipseMode">ellipseMode()</a>,\n<a href="#/p5/colorMode">colorMode()</a>,\n<a href="#/p5/textAlign">textAlign()</a>,\n<a href="#/p5/textFont">textFont()</a>,\n<a href="#/p5/textSize">textSize()</a>,\n<a href="#/p5/textLeading">textLeading()</a>,\n<a href="#/p5/applyMatrix">applyMatrix()</a>,\n<a href="#/p5/resetMatrix">resetMatrix()</a>,\n<a href="#/p5/rotate">rotate()</a>,\n<a href="#/p5/scale">scale()</a>,\n<a href="#/p5/shearX">shearX()</a>,\n<a href="#/p5/shearY">shearY()</a>,\n<a href="#/p5/translate">translate()</a>,\n<a href="#/p5/noiseSeed">noiseSeed()</a>.</p>\n<p>In WEBGL mode additional style settings are stored. These are controlled by\nthe following functions:\n<a href="#/p5/setCamera">setCamera()</a>,\n<a href="#/p5/ambientLight">ambientLight()</a>,\n<a href="#/p5/directionalLight">directionalLight()</a>,\n<a href="#/p5/pointLight">pointLight()</a>,\n<a href="#/p5/texture">texture()</a>,\n<a href="#/p5/specularMaterial">specularMaterial()</a>,\n<a href="#/p5/shininess">shininess()</a>,\n<a href="#/p5/normalMaterial">normalMaterial()</a> and\n<a href="#/p5/shader">shader()</a>.</p>\n',
    itemtype: 'method',
    name: 'pop',
    example: [
      '\n<div>\n<code>\nellipse(0, 50, 33, 33); // Left circle\n\npush(); // Start a new drawing state\ntranslate(50, 0);\nstrokeWeight(10);\nfill(204, 153, 0);\nellipse(0, 50, 33, 33); // Middle circle\npop(); // Restore original state\n\nellipse(100, 50, 33, 33); // Right circle\n</code>\n</div>\n\n<div>\n<code>\nellipse(0, 50, 33, 33); // Left circle\n\npush(); // Start a new drawing state\nstrokeWeight(10);\nfill(204, 153, 0);\nellipse(33, 50, 33, 33); // Left-middle circle\n\npush(); // Start another new drawing state\nstroke(0, 102, 153);\nellipse(66, 50, 33, 33); // Right-middle circle\npop(); // Restore previous state\n\npop(); // Restore original state\n\nellipse(100, 50, 33, 33); // Right circle\n</code>\n</div>'
    ],
    alt: 'Gold ellipse + thick black outline @center 2 white ellipses on left and right.\n2 Gold ellipses left black right blue stroke. 2 white ellipses on left+right.',
    class: 'p5',
    module: 'Structure',
    submodule: 'Structure'
  },
  {
    description:
      '<p>Executes the code within <a href="#/p5/draw">draw()</a> one time. This\nfunction allows the program to update the display window only when necessary,\nfor example when an event registered by <a href="#/p5/mousePressed">mousePressed()</a>\nor <a href="#/p5/keyPressed">keyPressed()</a> occurs.</p>\n<p>In structuring a program, it only makes sense to call <a href="#/p5/redraw">redraw()</a>\nwithin events such as <a href="#/p5/mousePressed">mousePressed()</a>. This\nis because <a href="#/p5/redraw">redraw()</a> does not run\n<a href="#/p5/draw">draw()</a> immediately (it only sets a flag that indicates\nan update is needed).</p>\n<p>The <a href="#/p5/redraw">redraw()</a> function does not work properly when\ncalled inside <a href="#/p5/draw">draw()</a>.To enable/disable animations,\nuse <a href="#/p5/loop">loop()</a> and <a href="#/p5/noLoop">noLoop()</a>.</p>\n<p>In addition you can set the number of redraws per method call. Just\nadd an integer as single parameter for the number of redraws.</p>\n',
    itemtype: 'method',
    name: 'redraw',
    params: [
      {
        name: 'n',
        description: '<p>Redraw for n-times. The default value is 1.</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    example: [
      "\n<div><code>\nlet x = 0;\n\nfunction setup() {\n  createCanvas(100, 100);\n  noLoop();\n}\n\nfunction draw() {\n  background(204);\n  line(x, 0, x, height);\n}\n\nfunction mousePressed() {\n  x += 1;\n  redraw();\n}\n</code>\n</div>\n\n<div class='norender'>\n<code>\nlet x = 0;\n\nfunction setup() {\n  createCanvas(100, 100);\n  noLoop();\n}\n\nfunction draw() {\n  background(204);\n  x += 1;\n  line(x, 0, x, height);\n}\n\nfunction mousePressed() {\n  redraw(5);\n}\n</code>\n</div>"
    ],
    alt: 'black line on far left of canvas\nblack line on far left of canvas',
    class: 'p5',
    module: 'Structure',
    submodule: 'Structure'
  },
  {
    description:
      '<p>The <code>p5()</code> constructor enables you to activate "instance mode" instead of normal\n"global mode". This is an advanced topic. A short description and example is\nincluded below. Please see\n<a target="blank" href="https://www.youtube.com/watch?v=Su792jEauZg&feature=youtu.be">\nDan Shiffman\'s Coding Train video tutorial</a> or this\n<a target="blank" href="https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace">tutorial page</a>\nfor more info.</p>\n<p>By default, all p5.js functions are in the global namespace (i.e. bound to the window\nobject), meaning you can call them simply <code>ellipse()</code>, <code>fill()</code>, etc. However, this\nmight be inconvenient if you are mixing with other JS libraries (synchronously or\nasynchronously) or writing long programs of your own. p5.js currently supports a\nway around this problem called "instance mode". In instance mode, all p5 functions\nare bound up in a single variable instead of polluting your global namespace.</p>\n<p>Optionally, you can specify a default container for the canvas and any other elements\nto append to with a second argument. You can give the ID of an element in your html,\nor an html node itself.</p>\n<p>Note that creating instances like this also allows you to have more than one p5 sketch on\na single web page, as they will each be wrapped up with their own set up variables. Of\ncourse, you could also use iframes to have multiple sketches in global mode.</p>\n',
    itemtype: 'method',
    name: 'p5',
    params: [
      { name: 'sketch', description: '<p>a function containing a p5.js sketch</p>\n', type: 'Object' },
      {
        name: 'node',
        description: '<p>ID or pointer to HTML DOM node to contain sketch in</p>\n',
        type: 'String|Object'
      }
    ],
    example: [
      "\n<div class='norender'><code>\nconst s = p => {\n  let x = 100;\n  let y = 100;\n\n  p.setup = function() {\n    p.createCanvas(700, 410);\n  };\n\n  p.draw = function() {\n    p.background(0);\n    p.fill(255);\n    p.rect(x, y, 50, 50);\n  };\n};\n\nnew p5(s); // invoke p5\n</code></div>"
    ],
    alt: 'white rectangle on black background',
    class: 'p5',
    module: 'Structure',
    submodule: 'Structure'
  },
  {
    description:
      '<p>Multiplies the current matrix by the one specified through the parameters.\nThis is a powerful operation that can perform the equivalent of translate,\nscale, shear and rotate all at once. You can learn more about transformation\nmatrices on <a href="https://en.wikipedia.org/wiki/Transformation_matrix">\nWikipedia</a>.</p>\n<p>The naming of the arguments here follows the naming of the <a href=\n"https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-transform">\nWHATWG specification</a> and corresponds to a\ntransformation matrix of the\nform:</p>\n<blockquote>\n<p><img style="max-width: 150px" src="assets/transformation-matrix.png"\nalt="The transformation matrix used when applyMatrix is called"/></p>\n</blockquote>\n',
    itemtype: 'method',
    name: 'applyMatrix',
    params: [
      {
        name: 'a',
        description: '<p>numbers which define the 2x3 matrix to be multiplied, or an array of numbers</p>\n',
        type: 'Number|Array'
      },
      {
        name: 'b',
        description: '<p>numbers which define the 2x3 matrix to be multiplied</p>\n',
        type: 'Number'
      },
      {
        name: 'c',
        description: '<p>numbers which define the 2x3 matrix to be multiplied</p>\n',
        type: 'Number'
      },
      {
        name: 'd',
        description: '<p>numbers which define the 2x3 matrix to be multiplied</p>\n',
        type: 'Number'
      },
      {
        name: 'e',
        description: '<p>numbers which define the 2x3 matrix to be multiplied</p>\n',
        type: 'Number'
      },
      {
        name: 'f',
        description: '<p>numbers which define the 2x3 matrix to be multiplied</p>\n',
        type: 'Number'
      }
    ],
    chainable: 1,
    example: [
      "\n<div>\n<code>\nfunction setup() {\n  frameRate(10);\n  rectMode(CENTER);\n}\n\nfunction draw() {\n  let step = frameCount % 20;\n  background(200);\n  // Equivalent to translate(x, y);\n  applyMatrix(1, 0, 0, 1, 40 + step, 50);\n  rect(0, 0, 50, 50);\n}\n</code>\n</div>\n\n<div>\n<code>\nfunction setup() {\n  frameRate(10);\n  rectMode(CENTER);\n}\n\nfunction draw() {\n  let step = frameCount % 20;\n  background(200);\n  translate(50, 50);\n  // Equivalent to scale(x, y);\n  applyMatrix(1 / step, 0, 0, 1 / step, 0, 0);\n  rect(0, 0, 50, 50);\n}\n</code>\n</div>\n\n<div>\n<code>\nfunction setup() {\n  frameRate(10);\n  rectMode(CENTER);\n}\n\nfunction draw() {\n  let step = frameCount % 20;\n  let angle = map(step, 0, 20, 0, TWO_PI);\n  let cos_a = cos(angle);\n  let sin_a = sin(angle);\n  background(200);\n  translate(50, 50);\n  // Equivalent to rotate(angle);\n  applyMatrix(cos_a, sin_a, -sin_a, cos_a, 0, 0);\n  rect(0, 0, 50, 50);\n}\n</code>\n</div>\n\n<div>\n<code>\nfunction setup() {\n  frameRate(10);\n  rectMode(CENTER);\n}\n\nfunction draw() {\n  let step = frameCount % 20;\n  let angle = map(step, 0, 20, -PI / 4, PI / 4);\n  background(200);\n  translate(50, 50);\n  // equivalent to shearX(angle);\n  let shear_factor = 1 / tan(PI / 2 - angle);\n  applyMatrix(1, 0, shear_factor, 1, 0, 0);\n  rect(0, 0, 50, 50);\n}\n</code>\n</div>\n\n<div modernizr='webgl'>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  noFill();\n}\n\nfunction draw() {\n  background(200);\n  rotateY(PI / 6);\n  stroke(153);\n  box(35);\n  let rad = millis() / 1000;\n  // Set rotation angles\n  let ct = cos(rad);\n  let st = sin(rad);\n  // Matrix for rotation around the Y axis\n  applyMatrix(  ct, 0.0,  st,  0.0,\n               0.0, 1.0, 0.0,  0.0,\n               -st, 0.0,  ct,  0.0,\n               0.0, 0.0, 0.0,  1.0);\n  stroke(255);\n  box(50);\n}\n</code>\n</div>\n\n<div>\n<code>\nfunction draw() {\n  background(200);\n  let testMatrix = [1, 0, 0, 1, 0, 0];\n  applyMatrix(testMatrix);\n  rect(0, 0, 50, 50);\n}\n</code>\n</div>"
    ],
    alt: 'A rectangle translating to the right\nA rectangle shrinking to the center\nA rectangle rotating clockwise about the center\nA rectangle shearing\nA rectangle in the upper left corner',
    class: 'p5',
    module: 'Transform',
    submodule: 'Transform'
  },
  {
    description: '<p>Replaces the current matrix with the identity matrix.</p>\n',
    itemtype: 'method',
    name: 'resetMatrix',
    chainable: 1,
    example: [
      '\n<div>\n<code>\ntranslate(50, 50);\napplyMatrix(0.5, 0.5, -0.5, 0.5, 0, 0);\nrect(0, 0, 20, 20);\n// Note that the translate is also reset.\nresetMatrix();\nrect(0, 0, 20, 20);\n</code>\n</div>'
    ],
    alt: 'A rotated rectangle in the center with another at the top left corner',
    class: 'p5',
    module: 'Transform',
    submodule: 'Transform'
  },
  {
    description:
      '<p>Rotates a shape by the amount specified by the angle parameter. This\nfunction accounts for <a href="#/p5/angleMode">angleMode</a>, so angles\ncan be entered in either RADIANS or DEGREES.</p>\n<p>Objects are always rotated around their relative position to the\norigin and positive numbers rotate objects in a clockwise direction.\nTransformations apply to everything that happens after and subsequent\ncalls to the function accumulates the effect. For example, calling\nrotate(HALF_PI) and then rotate(HALF_PI) is the same as rotate(PI).\nAll transformations are reset when <a href="#/p5/draw">draw()</a> begins again.</p>\n<p>Technically, <a href="#/p5/rotate">rotate()</a> multiplies the current transformation matrix\nby a rotation matrix. This function can be further controlled by\nthe <a href="#/p5/push">push()</a> and <a href="#/p5/pop">pop()</a>.</p>\n',
    itemtype: 'method',
    name: 'rotate',
    params: [
      {
        name: 'angle',
        description:
          '<p>the angle of rotation, specified in radians\n                       or degrees, depending on current angleMode</p>\n',
        type: 'Number'
      },
      {
        name: 'axis',
        description: '<p>(in 3d) the axis to rotate around</p>\n',
        type: 'p5.Vector|Number[]',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\ntranslate(width / 2, height / 2);\nrotate(PI / 3.0);\nrect(-26, -26, 52, 52);\n</code>\n</div>'
    ],
    alt: 'white 52x52 rect with black outline at center rotated counter 45 degrees',
    class: 'p5',
    module: 'Transform',
    submodule: 'Transform'
  },
  {
    description:
      '<p>Rotates a shape around X axis by the amount specified in angle parameter.\nThe angles can be entered in either RADIANS or DEGREES.</p>\n<p>Objects are always rotated around their relative position to the\norigin and positive numbers rotate objects in a clockwise direction.\nAll transformations are reset when <a href="#/p5/draw">draw()</a> begins again.</p>\n',
    itemtype: 'method',
    name: 'rotateX',
    params: [
      {
        name: 'angle',
        description:
          '<p>the angle of rotation, specified in radians\n                       or degrees, depending on current angleMode</p>\n',
        type: 'Number'
      }
    ],
    chainable: 1,
    example: [
      "\n<div modernizr='webgl'>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(255);\n  rotateX(millis() / 1000);\n  box();\n}\n</code>\n</div>"
    ],
    alt: '3d box rotating around the x axis.',
    class: 'p5',
    module: 'Transform',
    submodule: 'Transform'
  },
  {
    description:
      '<p>Rotates a shape around Y axis by the amount specified in angle parameter.\nThe angles can be entered in either RADIANS or DEGREES.</p>\n<p>Objects are always rotated around their relative position to the\norigin and positive numbers rotate objects in a clockwise direction.\nAll transformations are reset when <a href="#/p5/draw">draw()</a> begins again.</p>\n',
    itemtype: 'method',
    name: 'rotateY',
    params: [
      {
        name: 'angle',
        description:
          '<p>the angle of rotation, specified in radians\n                       or degrees, depending on current angleMode</p>\n',
        type: 'Number'
      }
    ],
    chainable: 1,
    example: [
      "\n<div modernizr='webgl'>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(255);\n  rotateY(millis() / 1000);\n  box();\n}\n</code>\n</div>"
    ],
    alt: '3d box rotating around the y axis.',
    class: 'p5',
    module: 'Transform',
    submodule: 'Transform'
  },
  {
    description:
      '<p>Rotates a shape around Z axis by the amount specified in angle parameter.\nThe angles can be entered in either RADIANS or DEGREES.</p>\n<p>This method works in WEBGL mode only.</p>\n<p>Objects are always rotated around their relative position to the\norigin and positive numbers rotate objects in a clockwise direction.\nAll transformations are reset when <a href="#/p5/draw">draw()</a> begins again.</p>\n',
    itemtype: 'method',
    name: 'rotateZ',
    params: [
      {
        name: 'angle',
        description:
          '<p>the angle of rotation, specified in radians\n                       or degrees, depending on current angleMode</p>\n',
        type: 'Number'
      }
    ],
    chainable: 1,
    example: [
      "\n<div modernizr='webgl'>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(255);\n  rotateZ(millis() / 1000);\n  box();\n}\n</code>\n</div>"
    ],
    alt: '3d box rotating around the z axis.',
    class: 'p5',
    module: 'Transform',
    submodule: 'Transform'
  },
  {
    description:
      '<p>Increases or decreases the size of a shape by expanding or contracting\nvertices. Objects always scale from their relative origin to the\ncoordinate system. Scale values are specified as decimal percentages.\nFor example, the function call scale(2.0) increases the dimension of a\nshape by 200%.</p>\n<p>Transformations apply to everything that happens after and subsequent\ncalls to the function multiply the effect. For example, calling scale(2.0)\nand then scale(1.5) is the same as scale(3.0). If <a href="#/p5/scale">scale()</a> is called\nwithin <a href="#/p5/draw">draw()</a>, the transformation is reset when the loop begins again.</p>\n<p>Using this function with the z parameter is only available in WEBGL mode.\nThis function can be further controlled with <a href="#/p5/push">push()</a> and <a href="#/p5/pop">pop()</a>.</p>\n',
    itemtype: 'method',
    name: 'scale',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nrect(30, 20, 50, 50);\nscale(0.5);\nrect(30, 20, 50, 50);\n</code>\n</div>\n\n<div>\n<code>\nrect(30, 20, 50, 50);\nscale(0.5, 1.3);\nrect(30, 20, 50, 50);\n</code>\n</div>'
    ],
    alt: 'white 52x52 rect with black outline at center rotated counter 45 degrees\n2 white rects with black outline- 1 50x50 at center. other 25x65 bottom left',
    class: 'p5',
    module: 'Transform',
    submodule: 'Transform',
    overloads: [
      {
        line: 342,
        params: [
          {
            name: 's',
            description:
              '<p>percent to scale the object, or percentage to\n                     scale the object in the x-axis if multiple arguments\n                     are given</p>\n',
            type: 'Number|p5.Vector|Number[]'
          },
          {
            name: 'y',
            description: '<p>percent to scale the object in the y-axis</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'z',
            description: '<p>percent to scale the object in the z-axis (webgl only)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        line: 386,
        params: [
          {
            name: 'scales',
            description: '<p>per-axis percents to scale the object</p>\n',
            type: 'p5.Vector|Number[]'
          }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Shears a shape around the x-axis by the amount specified by the angle\nparameter. Angles should be specified in the current angleMode.\nObjects are always sheared around their relative position to the origin\nand positive numbers shear objects in a clockwise direction.</p>\n<p>Transformations apply to everything that happens after and subsequent\ncalls to the function accumulates the effect. For example, calling\nshearX(PI/2) and then shearX(PI/2) is the same as shearX(PI).\nIf <a href="#/p5/shearX">shearX()</a> is called within the <a href="#/p5/draw">draw()</a>,\nthe transformation is reset when the loop begins again.</p>\n<p>Technically, <a href="#/p5/shearX">shearX()</a> multiplies the current\ntransformation matrix by a rotation matrix. This function can be further\ncontrolled by the <a href="#/p5/push">push()</a> and <a href="#/p5/pop">pop()</a> functions.</p>\n',
    itemtype: 'method',
    name: 'shearX',
    params: [
      {
        name: 'angle',
        description:
          '<p>angle of shear specified in radians or degrees,\n                       depending on current angleMode</p>\n',
        type: 'Number'
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\ntranslate(width / 4, height / 4);\nshearX(PI / 4.0);\nrect(0, 0, 30, 30);\n</code>\n</div>'
    ],
    alt: 'white irregular quadrilateral with black outline at top middle.',
    class: 'p5',
    module: 'Transform',
    submodule: 'Transform'
  },
  {
    description:
      '<p>Shears a shape around the y-axis the amount specified by the angle\nparameter. Angles should be specified in the current angleMode. Objects\nare always sheared around their relative position to the origin and\npositive numbers shear objects in a clockwise direction.</p>\n<p>Transformations apply to everything that happens after and subsequent\ncalls to the function accumulates the effect. For example, calling\nshearY(PI/2) and then shearY(PI/2) is the same as shearY(PI). If\n<a href="#/p5/shearY">shearY()</a> is called within the <a href="#/p5/draw">draw()</a>, the transformation is reset when\nthe loop begins again.</p>\n<p>Technically, <a href="#/p5/shearY">shearY()</a> multiplies the current transformation matrix by a\nrotation matrix. This function can be further controlled by the\n<a href="#/p5/push">push()</a> and <a href="#/p5/pop">pop()</a> functions.</p>\n',
    itemtype: 'method',
    name: 'shearY',
    params: [
      {
        name: 'angle',
        description:
          '<p>angle of shear specified in radians or degrees,\n                       depending on current angleMode</p>\n',
        type: 'Number'
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\ntranslate(width / 4, height / 4);\nshearY(PI / 4.0);\nrect(0, 0, 30, 30);\n</code>\n</div>'
    ],
    alt: 'white irregular quadrilateral with black outline at middle bottom.',
    class: 'p5',
    module: 'Transform',
    submodule: 'Transform'
  },
  {
    description:
      '<p>Specifies an amount to displace objects within the display window.\nThe x parameter specifies left/right translation, the y parameter\nspecifies up/down translation.</p>\n<p>Transformations are cumulative and apply to everything that happens after\nand subsequent calls to the function accumulates the effect. For example,\ncalling translate(50, 0) and then translate(20, 0) is the same as\ntranslate(70, 0). If <a href="#/p5/translate">translate()</a> is called within <a href="#/p5/draw">draw()</a>, the\ntransformation is reset when the loop begins again. This function can be\nfurther controlled by using <a href="#/p5/push">push()</a> and <a href="#/p5/pop">pop()</a>.</p>\n',
    itemtype: 'method',
    name: 'translate',
    chainable: 1,
    example: [
      '\n<div>\n<code>\ntranslate(30, 20);\nrect(0, 0, 55, 55);\n</code>\n</div>\n\n<div>\n<code>\nrect(0, 0, 55, 55); // Draw rect at original 0,0\ntranslate(30, 20);\nrect(0, 0, 55, 55); // Draw rect at new 0,0\ntranslate(14, 14);\nrect(0, 0, 55, 55); // Draw rect at new 0,0\n</code>\n</div>\n\n\n<div>\n<code>\nfunction draw() {\n  background(200);\n  rectMode(CENTER);\n  translate(width / 2, height / 2);\n  translate(p5.Vector.fromAngle(millis() / 1000, 40));\n  rect(0, 0, 20, 20);\n}\n</code>\n</div>'
    ],
    alt: 'white 55x55 rect with black outline at center right.\n3 white 55x55 rects with black outlines at top-l, center-r and bottom-r.\na 20x20 white rect moving in a circle around the canvas',
    class: 'p5',
    module: 'Transform',
    submodule: 'Transform',
    overloads: [
      {
        line: 494,
        params: [
          { name: 'x', description: '<p>left/right translation</p>\n', type: 'Number' },
          { name: 'y', description: '<p>up/down translation</p>\n', type: 'Number' },
          {
            name: 'z',
            description: '<p>forward/backward translation (webgl only)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        line: 547,
        params: [{ name: 'vector', description: '<p>the vector to translate by</p>\n', type: 'p5.Vector' }],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Stores a value in local storage under the key name.\n Local storage is saved in the browser and persists\n between browsing sessions and page reloads.\n The key can be the name of the variable but doesn\'t\n have to be. To retrieve stored items\n see <a href="#/p5/getItem">getItem</a>.\nSensitive data such as passwords or personal information\n should not be stored in local storage.</p>\n',
    itemtype: 'method',
    name: 'storeItem',
    params: [
      { name: 'key', description: '', type: 'String' },
      { name: 'value', description: '', type: 'String|Number|Object|Boolean|p5.Color|p5.Vector' }
    ],
    example: [
      "\n <div><code>\n // Type to change the letter in the\n // center of the canvas.\n // If you reload the page, it will\n // still display the last key you entered\nlet myText;\nfunction setup() {\n   createCanvas(100, 100);\n   myText = getItem('myText');\n   if (myText === null) {\n     myText = '';\n   }\n }\nfunction draw() {\n   textSize(40);\n   background(255);\n   text(myText, width / 2, height / 2);\n }\nfunction keyPressed() {\n   myText = key;\n   storeItem('myText', myText);\n }\n </code></div>"
    ],
    alt: 'When you type the key name is displayed as black text on white background.\n If you reload the page, the last letter typed is still displaying.',
    class: 'p5',
    module: 'Data',
    submodule: 'LocalStorage'
  },
  {
    description: '<p>Returns the value of an item that was stored in local storage\n using storeItem()</p>\n',
    itemtype: 'method',
    name: 'getItem',
    params: [
      {
        name: 'key',
        description: '<p>name that you wish to use to store in local storage</p>\n',
        type: 'String'
      }
    ],
    return: { description: 'Value of stored item', type: 'Number|Object|String|Boolean|p5.Color|p5.Vector' },
    example: [
      "\n <div><code>\n // Click the mouse to change\n // the color of the background\n // Once you have changed the color\n // it will stay changed even when you\n // reload the page.\nlet myColor;\nfunction setup() {\n   createCanvas(100, 100);\n   myColor = getItem('myColor');\n }\nfunction draw() {\n   if (myColor !== null) {\n     background(myColor);\n   }\n }\nfunction mousePressed() {\n   myColor = color(random(255), random(255), random(255));\n   storeItem('myColor', myColor);\n }\n </code></div>"
    ],
    alt: 'If you click, the canvas changes to a random color.\n If you reload the page, the canvas is still the color it\n was when the page was previously loaded.',
    class: 'p5',
    module: 'Data',
    submodule: 'LocalStorage'
  },
  {
    description: '<p>Clears all local storage items set with storeItem()\n for the current domain.</p>\n',
    itemtype: 'method',
    name: 'clearStorage',
    example: [
      "\n <div class=\"norender\">\n <code>\n function setup() {\n   let myNum = 10;\n   let myBool = false;\n   storeItem('myNum', myNum);\n   storeItem('myBool', myBool);\n   print(getItem('myNum')); // logs 10 to the console\n   print(getItem('myBool')); // logs false to the console\n   clearStorage();\n   print(getItem('myNum')); // logs null to the console\n   print(getItem('myBool')); // logs null to the console\n }\n </code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'LocalStorage'
  },
  {
    description: '<p>Removes an item that was stored with storeItem()</p>\n',
    itemtype: 'method',
    name: 'removeItem',
    params: [{ name: 'key', description: '', type: 'String' }],
    example: [
      "\n <div class=\"norender\">\n <code>\n function setup() {\n   let myVar = 10;\n   storeItem('myVar', myVar);\n   print(getItem('myVar')); // logs 10 to the console\n   removeItem('myVar');\n   print(getItem('myVar')); // logs null to the console\n }\n </code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'LocalStorage'
  },
  {
    description:
      '<p>Creates a new instance of p5.StringDict using the key-value pair\n or the object you provide.</p>\n',
    itemtype: 'method',
    name: 'createStringDict',
    return: { description: '', type: 'p5.StringDict' },
    example: [
      "\n <div class=\"norender\">\n <code>\n function setup() {\n   let myDictionary = createStringDict('p5', 'js');\n   print(myDictionary.hasKey('p5')); // logs true to console\n  let anotherDictionary = createStringDict({ happy: 'coding' });\n   print(anotherDictionary.hasKey('happy')); // logs true to console\n }\n </code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Dictionary',
    overloads: [
      {
        line: 14,
        params: [
          { name: 'key', description: '', type: 'String' },
          { name: 'value', description: '', type: 'String' }
        ],
        return: { description: '', type: 'p5.StringDict' }
      },
      {
        line: 37,
        params: [{ name: 'object', description: '<p>object</p>\n', type: 'Object' }],
        return: { description: '', type: 'p5.StringDict' }
      }
    ]
  },
  {
    description:
      '<p>Creates a new instance of <a href="#/p5.NumberDict">p5.NumberDict</a> using the key-value pair\n or object you provide.</p>\n',
    itemtype: 'method',
    name: 'createNumberDict',
    return: { description: '', type: 'p5.NumberDict' },
    example: [
      '\n <div class="norender">\n <code>\n function setup() {\n   let myDictionary = createNumberDict(100, 42);\n   print(myDictionary.hasKey(100)); // logs true to console\n  let anotherDictionary = createNumberDict({ 200: 84 });\n   print(anotherDictionary.hasKey(200)); // logs true to console\n }\n </code></div>'
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Dictionary',
    overloads: [
      {
        line: 48,
        params: [
          { name: 'key', description: '', type: 'Number' },
          { name: 'value', description: '', type: 'Number' }
        ],
        return: { description: '', type: 'p5.NumberDict' }
      },
      {
        line: 71,
        params: [{ name: 'object', description: '<p>object</p>\n', type: 'Object' }],
        return: { description: '', type: 'p5.NumberDict' }
      }
    ]
  },
  {
    description: '<p>Returns the value stored at the given key.</p>\n',
    itemtype: 'method',
    name: 'get',
    params: [{ name: 'the', description: '<p>key you want to access</p>\n', type: 'Number|String' }],
    return: { description: 'the value stored at that key', type: 'Number|String' },
    example: [
      "\n<div class=\"norender\">\n<code>\nfunction setup() {\n  let myDictionary = createStringDict('p5', 'js');\n  let myValue = myDictionary.get('p5');\n  print(myValue === 'js'); // logs true to console\n}\n</code></div>"
    ],
    class: 'p5.TypedDict',
    module: 'Data',
    submodule: 'Dictionary'
  },
  {
    description:
      '<p>Updates the value associated with the given key in case it already exists\nin the Dictionary. Otherwise a new key-value pair is added.</p>\n',
    itemtype: 'method',
    name: 'set',
    params: [
      { name: 'key', description: '', type: 'Number|String' },
      { name: 'value', description: '', type: 'Number|String' }
    ],
    example: [
      "\n<div class=\"norender\">\n<code>\nfunction setup() {\n  let myDictionary = createStringDict('p5', 'js');\n  myDictionary.set('p5', 'JS');\n  myDictionary.print(); // logs \"key: p5 - value: JS\" to console\n}\n</code></div>"
    ],
    class: 'p5.TypedDict',
    module: 'Data',
    submodule: 'Dictionary'
  },
  {
    description: '<p>Removes all previously stored key-value pairs from the Dictionary.</p>\n',
    itemtype: 'method',
    name: 'clear',
    example: [
      "\n<div class=\"norender\">\n<code>\nfunction setup() {\n  let myDictionary = createStringDict('p5', 'js');\n  print(myDictionary.hasKey('p5')); // prints 'true'\n  myDictionary.clear();\n  print(myDictionary.hasKey('p5')); // prints 'false'\n}\n</code>\n</div>"
    ],
    class: 'p5.TypedDict',
    module: 'Data',
    submodule: 'Dictionary'
  },
  {
    description: '<p>Removes the key-value pair stored at the given key from the Dictionary.</p>\n',
    itemtype: 'method',
    name: 'remove',
    params: [{ name: 'key', description: '<p>for the pair to remove</p>\n', type: 'Number|String' }],
    example: [
      "\n<div class=\"norender\">\n<code>\nfunction setup() {\n  let myDictionary = createStringDict('p5', 'js');\n  myDictionary.create('happy', 'coding');\n  myDictionary.print();\n  // above logs \"key: p5 - value: js, key: happy - value: coding\" to console\n  myDictionary.remove('p5');\n  myDictionary.print();\n  // above logs \"key: happy value: coding\" to console\n}\n</code></div>"
    ],
    class: 'p5.TypedDict',
    module: 'Data',
    submodule: 'Dictionary'
  },
  {
    description: '<p>Logs the set of items currently stored in the Dictionary to the console.</p>\n',
    itemtype: 'method',
    name: 'print',
    example: [
      "\n<div class=\"norender\">\n<code>\nfunction setup() {\n  let myDictionary = createStringDict('p5', 'js');\n  myDictionary.create('happy', 'coding');\n  myDictionary.print();\n  // above logs \"key: p5 - value: js, key: happy - value: coding\" to console\n}\n</code>\n</div>"
    ],
    class: 'p5.TypedDict',
    module: 'Data',
    submodule: 'Dictionary'
  },
  {
    description: '<p>Converts the Dictionary into a CSV file for local download.</p>\n',
    itemtype: 'method',
    name: 'saveTable',
    example: [
      "\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100);\n  background(200);\n  text('click here to save', 10, 10, 70, 80);\n}\n\nfunction mousePressed() {\n  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {\n    createStringDict({\n      john: 1940,\n      paul: 1942,\n      george: 1943,\n      ringo: 1940\n    }).saveTable('beatles');\n  }\n}\n</code>\n</div>"
    ],
    class: 'p5.TypedDict',
    module: 'Data',
    submodule: 'Dictionary'
  },
  {
    description: '<p>Converts the Dictionary into a JSON file for local download.</p>\n',
    itemtype: 'method',
    name: 'saveJSON',
    example: [
      "\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100);\n  background(200);\n  text('click here to save', 10, 10, 70, 80);\n}\n\nfunction mousePressed() {\n  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {\n    createStringDict({\n      john: 1940,\n      paul: 1942,\n      george: 1943,\n      ringo: 1940\n    }).saveJSON('beatles');\n  }\n}\n</code>\n</div>"
    ],
    class: 'p5.TypedDict',
    module: 'Data',
    submodule: 'Dictionary'
  },
  {
    description:
      '<p>Searches the page for the first element that matches the given CSS selector string (can be an\nID, class, tag name or a combination) and returns it as a <a href="#/p5.Element">p5.Element</a>.\nThe DOM node itself can be accessed with .elt.\nReturns null if none found. You can also specify a container to search within.</p>\n',
    itemtype: 'method',
    name: 'select',
    params: [
      {
        name: 'selectors',
        description: '<p>CSS selector string of element to search for</p>\n',
        type: 'String'
      },
      {
        name: 'container',
        description:
          '<p>CSS selector string, <a href="#/p5.Element">p5.Element</a>, or\n                                            HTML element to search within</p>\n',
        type: 'String|p5.Element|HTMLElement',
        optional: true
      }
    ],
    return: {
      description: '<a href="#/p5.Element">p5.Element</a> containing node found',
      type: 'p5.Element|null'
    },
    example: [
      "\n<div><code>\nfunction setup() {\n  createCanvas(50, 50);\n  background(30);\n  // move canvas down and right\n  select('canvas').position(10, 30);\n}\n</code></div>\n\n<div class=\"norender\"><code>\n// select using ID\nlet a = select('#container');\nlet b = select('#beep', '#container');\nlet c;\nif (a) {\n  // select using class\n  c = select('.boop', a);\n}\n// select using CSS selector string\nlet d = select('#container #bleep');\nlet e = select('#container p');\n[a, b, c, d, e]; // unused\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Searches the page for elements that match the given CSS selector string (can be an ID a class,\ntag name or a combination) and returns them as <a href="#/p5.Element">p5.Element</a>s in\nan array.\nThe DOM node itself can be accessed with .elt.\nReturns an empty array if none found.\nYou can also specify a container to search within.</p>\n',
    itemtype: 'method',
    name: 'selectAll',
    params: [
      {
        name: 'selectors',
        description: '<p>CSS selector string of elements to search for</p>\n',
        type: 'String'
      },
      {
        name: 'container',
        description:
          '<p>CSS selector string, <a href="#/p5.Element">p5.Element</a>\n                                            , or HTML element to search within</p>\n',
        type: 'String|p5.Element|HTMLElement',
        optional: true
      }
    ],
    return: {
      description: 'Array of <a href="#/p5.Element">p5.Element</a>s containing nodes found',
      type: 'p5.Element[]'
    },
    example: [
      "\n<div><code>\nfunction setup() {\n  createButton('btn');\n  createButton('2nd btn');\n  createButton('3rd btn');\n  let buttons = selectAll('button');\n\n  for (let i = 0; i < 3; i++) {\n    buttons[i].size(100);\n    buttons[i].position(0, i * 30);\n  }\n}\n</code></div>\n<div><code>\n// these are all valid calls to selectAll()\nlet a = selectAll('.beep');\na = selectAll('div');\na = selectAll('button', '#container');\n\nlet b = createDiv();\nb.id('container');\nlet c = select('#container');\na = selectAll('p', c);\na = selectAll('#container p');\n\nlet d = document.getElementById('container');\na = selectAll('.boop', d);\na = selectAll('#container .boop');\nconsole.log(a);\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Removes all elements created by p5, except any canvas / graphics\nelements created by <a href="#/p5/createCanvas">createCanvas</a> or <a href="#/p5/createGraphics">createGraphics</a>.\nEvent handlers are removed, and element is removed from the DOM.</p>\n',
    itemtype: 'method',
    name: 'removeElements',
    example: [
      "\n<div><code>\nfunction setup() {\n  createCanvas(100, 100);\n  background('grey');\n  let div = createDiv('this is some text');\n  let p = createP('this is a paragraph');\n  div.style('font-size', '16px');\n  p.style('font-size', '16px');\n}\nfunction mousePressed() {\n  removeElements(); // this will remove the div and p, not canvas\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>The .<a href="#/p5.Element/changed">changed()</a> function is called when the value of an\nelement changes.\nThis can be used to attach an element specific event listener.</p>\n',
    itemtype: 'method',
    name: 'changed',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when the value of\n                               an element changes.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    chainable: 1,
    example: [
      "\n<div><code>\nlet sel;\n\nfunction setup() {\n  textAlign(CENTER);\n  background(200);\n  sel = createSelect();\n  sel.position(10, 10);\n  sel.option('pear');\n  sel.option('kiwi');\n  sel.option('grape');\n  sel.changed(mySelectEvent);\n}\n\nfunction mySelectEvent() {\n  let item = sel.value();\n  background(200);\n  text(\"it's a \" + item + '!', 50, 50);\n}\n</code></div>\n\n<div><code>\nlet checkbox;\nlet cnv;\n\nfunction setup() {\n  checkbox = createCheckbox(' fill');\n  checkbox.changed(changeFill);\n  cnv = createCanvas(100, 100);\n  cnv.position(0, 30);\n  noFill();\n}\n\nfunction draw() {\n  background(200);\n  ellipse(50, 50, 50, 50);\n}\n\nfunction changeFill() {\n  if (checkbox.checked()) {\n    fill(0);\n  } else {\n    noFill();\n  }\n}\n</code></div>"
    ],
    alt: 'dropdown: pear, kiwi, grape. When selected text "its a" + selection shown.',
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>The .<a href="#/p5.Element/input">input()</a> function is called when any user input is\ndetected with an element. The input event is often used\nto detect keystrokes in a input element, or changes on a\nslider element. This can be used to attach an element specific\nevent listener.</p>\n',
    itemtype: 'method',
    name: 'input',
    params: [
      {
        name: 'fxn',
        description:
          '<p>function to be fired when any user input is\n                               detected within the element.\n                               if <code>false</code> is passed instead, the previously\n                               firing function will no longer fire.</p>\n',
        type: 'Function|Boolean'
      }
    ],
    chainable: 1,
    example: [
      "\n<div><code>\n// Open your console to see the output\nfunction setup() {\n  createCanvas(100, 100);\n  background('grey');\n  let inp = createInput('');\n  inp.position(0, 0);\n  inp.size(100);\n  inp.input(myInputEvent);\n}\n\nfunction myInputEvent() {\n  console.log('you are typing: ', this.value());\n}\n</code></div>"
    ],
    alt: 'no display.',
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Creates a <code>&lt;div&gt;&lt;/div&gt;</code> element in the DOM with given inner HTML.</p>\n',
    itemtype: 'method',
    name: 'createDiv',
    params: [
      { name: 'html', description: '<p>inner HTML for element created</p>\n', type: 'String', optional: true }
    ],
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nlet div = createDiv('this is some text');\ndiv.style('font-size', '16px');\ndiv.position(10, 0);\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Creates a <code>&lt;p&gt;&lt;/p&gt;</code> element in the DOM with given inner HTML. Used\nfor paragraph length text.</p>\n',
    itemtype: 'method',
    name: 'createP',
    params: [
      { name: 'html', description: '<p>inner HTML for element created</p>\n', type: 'String', optional: true }
    ],
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nlet p = createP('this is some text');\np.style('font-size', '16px');\np.position(10, 0);\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Creates a <code>&lt;span&gt;&lt;/span&gt;</code> element in the DOM with given inner HTML.</p>\n',
    itemtype: 'method',
    name: 'createSpan',
    params: [
      { name: 'html', description: '<p>inner HTML for element created</p>\n', type: 'String', optional: true }
    ],
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nlet span = createSpan('this is some text');\nspan.position(0, 0);\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Creates an <code>&lt;img&gt;</code> element in the DOM with given src and\nalternate text.</p>\n',
    itemtype: 'method',
    name: 'createImg',
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n <div><code>\nlet img = createImg(\n  'https://p5js.org/assets/img/asterisk-01.png',\n  'the p5 magenta asterisk'\n);\nimg.position(0, -10);\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM',
    overloads: [
      {
        line: 379,
        params: [
          { name: 'src', description: '<p>src path or url for image</p>\n', type: 'String' },
          {
            name: 'alt',
            description:
              '<p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#Attributes">alternate text</a> to be used if image does not load. You can use also an empty string (<code>""</code>) if that an image is not intended to be viewed.</p>\n',
            type: 'String'
          }
        ],
        return: {
          description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
          type: 'p5.Element'
        }
      },
      {
        line: 396,
        params: [
          { name: 'src', description: '', type: 'String' },
          { name: 'alt', description: '', type: 'String' },
          {
            name: 'crossOrigin',
            description:
              '<p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes">crossOrigin property</a> of the <code>img</code> element; use either \'anonymous\' or \'use-credentials\' to retrieve the image with cross-origin access (for later use with <code>canvas</code>. if an empty string(<code>""</code>) is passed, CORS is not used</p>\n',
            type: 'String'
          },
          {
            name: 'successCallback',
            description:
              '<p>callback to be called once image data is loaded with the <a href="#/p5.Element">p5.Element</a> as argument</p>\n',
            type: 'Function',
            optional: true
          }
        ],
        return: {
          description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
          type: 'p5.Element'
        }
      }
    ]
  },
  {
    description:
      '<p>Creates an <code>&lt;a&gt;&lt;/a&gt;</code> element in the DOM for including a hyperlink.</p>\n',
    itemtype: 'method',
    name: 'createA',
    params: [
      { name: 'href', description: '<p>url of page to link to</p>\n', type: 'String' },
      { name: 'html', description: '<p>inner html of link element to display</p>\n', type: 'String' },
      {
        name: 'target',
        description:
          '<p>target where new link should open,\n                            could be _blank, _self, _parent, _top.</p>\n',
        type: 'String',
        optional: true
      }
    ],
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nlet a = createA('http://p5js.org/', 'this is a link');\na.position(0, 0);\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Creates a slider <code>&lt;input&gt;&lt;/input&gt;</code> element in the DOM.\nUse .size() to set the display length of the slider.</p>\n',
    itemtype: 'method',
    name: 'createSlider',
    params: [
      { name: 'min', description: '<p>minimum value of the slider</p>\n', type: 'Number' },
      { name: 'max', description: '<p>maximum value of the slider</p>\n', type: 'Number' },
      { name: 'value', description: '<p>default value of the slider</p>\n', type: 'Number', optional: true },
      {
        name: 'step',
        description:
          '<p>step size for each tick of the slider (if step is set to 0, the slider will move continuously from the minimum to the maximum value)</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nlet slider;\nfunction setup() {\n  slider = createSlider(0, 255, 100);\n  slider.position(10, 10);\n  slider.style('width', '80px');\n}\n\nfunction draw() {\n  let val = slider.value();\n  background(val);\n}\n</code></div>\n\n<div><code>\nlet slider;\nfunction setup() {\n  colorMode(HSB);\n  slider = createSlider(0, 360, 60, 40);\n  slider.position(10, 10);\n  slider.style('width', '80px');\n}\n\nfunction draw() {\n  let val = slider.value();\n  background(val, 100, 100, 1);\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Creates a <code>&lt;button&gt;&lt;/button&gt;</code> element in the DOM.\nUse .size() to set the display size of the button.\nUse .mousePressed() to specify behavior on press.</p>\n',
    itemtype: 'method',
    name: 'createButton',
    params: [
      { name: 'label', description: '<p>label displayed on the button</p>\n', type: 'String' },
      { name: 'value', description: '<p>value of the button</p>\n', type: 'String', optional: true }
    ],
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nlet button;\nfunction setup() {\n  createCanvas(100, 100);\n  background(0);\n  button = createButton('click me');\n  button.position(0, 0);\n  button.mousePressed(changeBG);\n}\n\nfunction changeBG() {\n  let val = random(255);\n  background(val);\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Creates a checkbox <code>&lt;input&gt;&lt;/input&gt;</code> element in the DOM.\nCalling .checked() on a checkbox returns if it is checked or not</p>\n',
    itemtype: 'method',
    name: 'createCheckbox',
    params: [
      {
        name: 'label',
        description: '<p>label displayed after checkbox</p>\n',
        type: 'String',
        optional: true
      },
      {
        name: 'value',
        description: '<p>value of the checkbox; checked is true, unchecked is false</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nlet checkbox;\n\nfunction setup() {\n  checkbox = createCheckbox('label', false);\n  checkbox.changed(myCheckedEvent);\n}\n\nfunction myCheckedEvent() {\n  if (this.checked()) {\n    console.log('Checking!');\n  } else {\n    console.log('Unchecking!');\n  }\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Creates a dropdown menu <code>&lt;select&gt;&lt;/select&gt;</code> element in the DOM.\nIt also helps to assign select-box methods to <a href="#/p5.Element">p5.Element</a> when selecting existing select box.</p>\n<ul>\n<li><code>.option(name, [value])</code> can be used to set options for the select after it is created.</li>\n<li><code>.value()</code> will return the currently selected option.</li>\n<li><code>.selected()</code> will return current dropdown element which is an instance of <a href="#/p5.Element">p5.Element</a></li>\n<li><code>.selected(value)</code> can be used to make given option selected by default when the page first loads.</li>\n<li><code>.disable()</code> marks whole of dropdown element as disabled.</li>\n<li><code>.disable(value)</code> marks given option as disabled</li>\n</ul>\n',
    itemtype: 'method',
    name: 'createSelect',
    return: { description: '', type: 'p5.Element' },
    example: [
      "\n<div><code>\nlet sel;\n\nfunction setup() {\n  textAlign(CENTER);\n  background(200);\n  sel = createSelect();\n  sel.position(10, 10);\n  sel.option('pear');\n  sel.option('kiwi');\n  sel.option('grape');\n  sel.selected('kiwi');\n  sel.changed(mySelectEvent);\n}\n\nfunction mySelectEvent() {\n  let item = sel.value();\n  background(200);\n  text('It is a ' + item + '!', 50, 50);\n}\n</code></div>\n\n<div><code>\nlet sel;\n\nfunction setup() {\n  textAlign(CENTER);\n  background(200);\n  sel = createSelect();\n  sel.position(10, 10);\n  sel.option('oil');\n  sel.option('milk');\n  sel.option('bread');\n  sel.disable('milk');\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM',
    overloads: [
      {
        line: 609,
        params: [
          {
            name: 'multiple',
            description: '<p>true if dropdown should support multiple selections</p>\n',
            type: 'Boolean',
            optional: true
          }
        ],
        return: { description: '', type: 'p5.Element' }
      },
      {
        line: 660,
        params: [{ name: 'existing', description: '<p>DOM select element</p>\n', type: 'Object' }],
        return: { description: '', type: 'p5.Element' }
      }
    ]
  },
  {
    description:
      '<p>Creates a radio button element in the DOM.It also helps existing radio buttons\nassign methods of <a href="#/p5.Element/">p5.Element</a>.</p>\n<ul>\n<li><code>.option(value, [label])</code> can be used to create a new option for the\nelement. If an option with a value already exists, it will be returned.\nOptionally, a label can be provided as second argument for the option.</li>\n<li><code>.remove(value)</code> can be used to remove an option for the element.</li>\n<li><code>.value()</code> method will return the currently selected value.</li>\n<li><code>.selected()</code> method will return the currently selected input element.</li>\n<li><code>.selected(value)</code> method will select the option and return it.</li>\n<li><code>.disable(Boolean)</code> method will enable/disable the whole radio button element.</li>\n</ul>\n',
    itemtype: 'method',
    name: 'createRadio',
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nlet radio;\n\nfunction setup() {\n  radio = createRadio();\n  radio.option('black');\n  radio.option('white');\n  radio.option('gray');\n  radio.style('width', '60px');\n  textAlign(CENTER);\n  fill(255, 0, 0);\n}\n\nfunction draw() {\n  let val = radio.value();\n  background(val);\n  text(val, width / 2, height / 2);\n}\n</code></div>\n<div><code>\nlet radio;\n\nfunction setup() {\n  radio = createRadio();\n  radio.option(1, 'apple');\n  radio.option(2, 'bread');\n  radio.option(3, 'juice');\n  radio.style('width', '30px');\n  textAlign(CENTER);\n}\n\nfunction draw() {\n  background(200);\n  let val = radio.value();\n  if (val) {\n    text('item cost is $' + val, width / 2, height / 2);\n  }\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM',
    overloads: [
      {
        line: 757,
        params: [
          {
            name: 'containerElement',
            description:
              '<p>An container HTML Element either a div\nor span inside which all existing radio inputs will be considered as options.</p>\n',
            type: 'Object'
          },
          {
            name: 'name',
            description: '<p>A name parameter for each Input Element.</p>\n',
            type: 'String',
            optional: true
          }
        ],
        return: {
          description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
          type: 'p5.Element'
        }
      },
      {
        line: 815,
        params: [{ name: 'name', description: '', type: 'String' }],
        return: {
          description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
          type: 'p5.Element'
        }
      },
      {
        line: 820,
        params: [],
        return: {
          description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
          type: 'p5.Element'
        }
      }
    ]
  },
  {
    description:
      '<p>Creates a colorPicker element in the DOM for color input.\nThe .value() method will return a hex string (#rrggbb) of the color.\nThe .color() method will return a p5.Color object with the current chosen color.</p>\n',
    itemtype: 'method',
    name: 'createColorPicker',
    params: [
      {
        name: 'value',
        description: '<p>default color of element</p>\n',
        type: 'String|p5.Color',
        optional: true
      }
    ],
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nlet colorPicker;\nfunction setup() {\n  createCanvas(100, 100);\n  colorPicker = createColorPicker('#ed225d');\n  colorPicker.position(0, height + 5);\n}\n\nfunction draw() {\n  background(colorPicker.color());\n}\n</code></div>\n<div><code>\nlet inp1, inp2;\nfunction setup() {\n  createCanvas(100, 100);\n  background('grey');\n  inp1 = createColorPicker('#ff0000');\n  inp1.position(0, height + 5);\n  inp1.input(setShade1);\n  inp2 = createColorPicker(color('yellow'));\n  inp2.position(0, height + 30);\n  inp2.input(setShade2);\n  setMidShade();\n}\n\nfunction setMidShade() {\n  // Finding a shade between the two\n  let commonShade = lerpColor(inp1.color(), inp2.color(), 0.5);\n  fill(commonShade);\n  rect(20, 20, 60, 60);\n}\n\nfunction setShade1() {\n  setMidShade();\n  console.log('You are choosing shade 1 to be : ', this.value());\n}\nfunction setShade2() {\n  setMidShade();\n  console.log('You are choosing shade 2 to be : ', this.value());\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Creates an <code>&lt;input&gt;&lt;/input&gt;</code> element in the DOM for text input.\nUse .<a href="#/p5.Element/size">size()</a> to set the display length of the box.</p>\n',
    itemtype: 'method',
    name: 'createInput',
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nfunction setup() {\n  createCanvas(100, 100);\n  background('grey');\n  let inp = createInput('');\n  inp.position(0, 0);\n  inp.size(100);\n  inp.input(myInputEvent);\n}\n\nfunction myInputEvent() {\n  console.log('you are typing: ', this.value());\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM',
    overloads: [
      {
        line: 1023,
        params: [
          { name: 'value', description: '<p>default value of the input box</p>\n', type: 'String' },
          {
            name: 'type',
            description:
              '<p>type of text, ie text, password etc. Defaults to text.\n  Needs a value to be specified first.</p>\n',
            type: 'String',
            optional: true
          }
        ],
        return: {
          description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
          type: 'p5.Element'
        }
      },
      {
        line: 1048,
        params: [{ name: 'value', description: '', type: 'String', optional: true }],
        return: { description: '', type: 'p5.Element' }
      }
    ]
  },
  {
    description:
      "<p>Creates an <code>&lt;input&gt;&lt;/input&gt;</code> element in the DOM of type 'file'.\nThis allows users to select local files for use in a sketch.</p>\n",
    itemtype: 'method',
    name: 'createFileInput',
    params: [
      {
        name: 'callback',
        description: '<p>callback function for when a file is loaded</p>\n',
        type: 'Function'
      },
      {
        name: 'multiple',
        description: '<p>optional, to allow multiple files to be selected</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created DOM element',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nlet input;\nlet img;\n\nfunction setup() {\n  input = createFileInput(handleFile);\n  input.position(0, 0);\n}\n\nfunction draw() {\n  background(255);\n  if (img) {\n    image(img, 0, 0, width, height);\n  }\n}\n\nfunction handleFile(file) {\n  print(file);\n  if (file.type === 'image') {\n    img = createImg(file.data, '');\n    img.hide();\n  } else {\n    img = null;\n  }\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>Creates an HTML5 <code>&lt;video&gt;</code> element in the DOM for simple playback\nof audio/video. Shown by default, can be hidden with .<a href="#/p5.Element/hide">hide()</a>\nand drawn into canvas using <a href="#/p5/image">image()</a>. The first parameter\ncan be either a single string path to a video file, or an array of string\npaths to different formats of the same video. This is useful for ensuring\nthat your video can play across different browsers, as each supports\ndifferent formats. See <a href=\'https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats\'>this\npage</a> for further information about supported formats.</p>\n',
    itemtype: 'method',
    name: 'createVideo',
    params: [
      {
        name: 'src',
        description:
          '<p>path to a video file, or array of paths for\n                            supporting different browsers</p>\n',
        type: 'String|String[]'
      },
      {
        name: 'callback',
        description:
          "<p>callback function to be called upon\n                            'canplaythrough' event fire, that is, when the\n                            browser can play the media, and estimates that\n                            enough data has been loaded to play the media\n                            up to its end without having to stop for\n                            further buffering of content</p>\n",
        type: 'Function',
        optional: true
      }
    ],
    return: {
      description: 'pointer to video <a href="#/p5.Element">p5.Element</a>',
      type: 'p5.MediaElement'
    },
    example: [
      "\n<div><code>\nlet vid;\nfunction setup() {\n  noCanvas();\n\n  vid = createVideo(\n    ['assets/small.mp4', 'assets/small.ogv', 'assets/small.webm'],\n    vidLoad\n  );\n\n  vid.size(100, 100);\n}\n\n// This function is called when the video loads\nfunction vidLoad() {\n  vid.loop();\n  vid.volume(0);\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      "<p>Creates a hidden HTML5 <code>&lt;audio&gt;</code> element in the DOM for simple audio\nplayback. The first parameter can be either a single string path to a\naudio file, or an array of string paths to different formats of the same\naudio. This is useful for ensuring that your audio can play across\ndifferent browsers, as each supports different formats.\nSee <a href='https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats'>this\npage for further information about supported formats</a>.</p>\n",
    itemtype: 'method',
    name: 'createAudio',
    params: [
      {
        name: 'src',
        description:
          '<p>path to an audio file, or array of paths\n                            for supporting different browsers</p>\n',
        type: 'String|String[]',
        optional: true
      },
      {
        name: 'callback',
        description:
          "<p>callback function to be called upon\n                            'canplaythrough' event fire, that is, when the\n                            browser can play the media, and estimates that\n                            enough data has been loaded to play the media\n                            up to its end without having to stop for\n                            further buffering of content</p>\n",
        type: 'Function',
        optional: true
      }
    ],
    return: {
      description: 'pointer to audio <a href="#/p5.Element">p5.Element</a>',
      type: 'p5.MediaElement'
    },
    example: [
      "\n<div><code>\nlet ele;\nfunction setup() {\n  ele = createAudio('assets/beat.mp3');\n\n  // here we set the element to autoplay\n  // The element will play as soon\n  // as it is able to do so.\n  ele.autoplay(true);\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      "<p>Creates a new HTML5 <code>&lt;video&gt;</code> element that contains the audio/video feed\nfrom a webcam. The element is separate from the canvas and is displayed by\ndefault. The element can be hidden using .<a href=\"#/p5.Element/hide\">hide()</a>.\nThe feed can be drawn onto the canvas using <a href=\"#/p5/image\">image()</a>.\nThe loadedmetadata property can be used to detect when the element has fully\nloaded (see second example).</p>\n<p>More specific properties of the feed can be passing in a Constraints object.\nSee the <a href='http://w3c.github.io/mediacapture-main/getusermedia.html#media-track-constraints'>\nW3C spec</a> for possible properties. Note that not all of these are supported\nby all browsers.</p>\n<p><em>Security note</em>: A new browser security specification requires that\ngetUserMedia, which is behind <a href=\"#/p5/createCapture\">createCapture()</a>,\nonly works when you're running the code locally, or on HTTPS. Learn more\n<a href='http://stackoverflow.com/questions/34197653/getusermedia-in-chrome-47-without-using-https'>here</a>\nand <a href='https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia'>here</a>.</p>\n",
    itemtype: 'method',
    name: 'createCapture',
    params: [
      {
        name: 'type',
        description:
          '<p>type of capture, either VIDEO or\n                                  AUDIO if none specified, default both,\n                                  or a Constraints object</p>\n',
        type: 'String|Constant|Object'
      },
      {
        name: 'callback',
        description:
          '<p>function to be called once\n                                  stream has loaded</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    return: { description: 'capture video <a href="#/p5.Element">p5.Element</a>', type: 'p5.Element' },
    example: [
      "\n<div class='notest'>\n<code>\nlet capture;\n\nfunction setup() {\n  createCanvas(100, 100);\n  capture = createCapture(VIDEO);\n  capture.hide();\n}\n\nfunction draw() {\n  image(capture, 0, 0, width, width * capture.height / capture.width);\n  filter(INVERT);\n}\n</code>\n</div>\n\n<div class='notest norender'>\n<code>\nfunction setup() {\n  createCanvas(480, 120);\n  let constraints = {\n    video: {\n      mandatory: {\n        minWidth: 1280,\n        minHeight: 720\n      },\n      optional: [{ maxFrameRate: 10 }]\n    },\n    audio: true\n  };\n  createCapture(constraints, function(stream) {\n    console.log(stream);\n  });\n}\n</code>\n</div>\n<div class='notest norender'>\n<code>\nlet capture;\n\nfunction setup() {\n  createCanvas(640, 480);\n  capture = createCapture(VIDEO);\n}\nfunction draw() {\n  background(0);\n  if (capture.loadedmetadata) {\n    let c = capture.get(0, 0, 100, 100);\n    image(c, 0, 0);\n  }\n}\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description: '<p>Creates element with given tag in the DOM with given content.</p>\n',
    itemtype: 'method',
    name: 'createElement',
    params: [
      { name: 'tag', description: '<p>tag for the new element</p>\n', type: 'String' },
      {
        name: 'content',
        description: '<p>html content to be inserted into the element</p>\n',
        type: 'String',
        optional: true
      }
    ],
    return: {
      description: 'pointer to <a href="#/p5.Element">p5.Element</a> holding created node',
      type: 'p5.Element'
    },
    example: [
      "\n<div><code>\nlet h5 = createElement('h5', 'im an h5 p5.element!');\nh5.style('color', '#00a1d3');\nh5.position(0, 0);\n</code></div>"
    ],
    class: 'p5',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description: '<p>Removes the element, stops all media streams, and deregisters all listeners.</p>\n',
    itemtype: 'method',
    name: 'remove',
    example: [
      "\n<div class='norender'><code>\nlet myDiv = createDiv('this is some text');\nmyDiv.remove();\n</code></div>"
    ],
    class: 'p5.Element',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description: "<p>Set 'loop' to true for an HTML5 media element, and starts playing.</p>\n",
    itemtype: 'method',
    name: 'loop',
    chainable: 1,
    example: [
      "\n<div><code>\n//Clicking the canvas will loop\n//the audio sample until the user\n//clicks again to stop it\n\n//We will store the p5.MediaElement\n//object in here\nlet ele;\n\n//while our audio is playing,\n//this will be set to true\nlet sampleIsLooping = false;\n\nfunction setup() {\n  //Here we create a p5.MediaElement object\n  //using the createAudio() function.\n  ele = createAudio('assets/lucky_dragons.mp3');\n  background(200);\n  textAlign(CENTER);\n  text('Click to loop!', width / 2, height / 2);\n}\n\nfunction mouseClicked() {\n  //here we test if the mouse is over the\n  //canvas element when it's clicked\n  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {\n    background(200);\n\n    if (!sampleIsLooping) {\n      //loop our sound element until we\n      //call ele.stop() on it.\n      ele.loop();\n\n      sampleIsLooping = true;\n      text('Click to stop!', width / 2, height / 2);\n    } else {\n      ele.stop();\n\n      sampleIsLooping = false;\n      text('Click to loop!', width / 2, height / 2);\n    }\n  }\n}\n</code></div>"
    ],
    class: 'p5.MediaElement',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      "<p>Set 'loop' to false for an HTML5 media element. Element will stop\nwhen it reaches the end.</p>\n",
    itemtype: 'method',
    name: 'noLoop',
    chainable: 1,
    example: [
      "\n<div><code>\n//This example both starts\n//and stops loop of sound sample\n//when the user clicks the canvas\n\n//We will store the p5.MediaElement\n//object in here\nlet ele;\n//while our audio is playing,\n//this will be set to true\nlet sampleIsPlaying = false;\n\nfunction setup() {\n  //Here we create a p5.MediaElement object\n  //using the createAudio() function.\n  ele = createAudio('assets/beat.mp3');\n  background(200);\n  textAlign(CENTER);\n  text('Click to play!', width / 2, height / 2);\n}\n\nfunction mouseClicked() {\n  //here we test if the mouse is over the\n  //canvas element when it's clicked\n  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {\n    background(200);\n\n    if (sampleIsPlaying) {\n      ele.noLoop();\n      sampleIsPlaying = false;\n      text('No more Loops!', width / 2, height / 2);\n    } else {\n      ele.loop();\n      sampleIsPlaying = true;\n      text('Click to stop looping!', width / 2, height / 2);\n    }\n  }\n}\n</code></div>"
    ],
    class: 'p5.MediaElement',
    module: 'DOM',
    submodule: 'DOM'
  },
  {
    description:
      '<p>The <a href="#/p5/setMoveThreshold">setMoveThreshold()</a> function is used to set the movement threshold for\nthe <a href="#/p5/deviceMoved">deviceMoved()</a> function. The default threshold is set to 0.5.</p>\n',
    itemtype: 'method',
    name: 'setMoveThreshold',
    params: [{ name: 'value', description: '<p>The threshold value</p>\n', type: 'Number' }],
    example: [
      '\n<div class="norender">\n<code>\n// Run this example on a mobile device\n// You will need to move the device incrementally further\n// the closer the square\'s color gets to white in order to change the value.\n\nlet value = 0;\nlet threshold = 0.5;\nfunction setup() {\n  setMoveThreshold(threshold);\n}\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction deviceMoved() {\n  value = value + 5;\n  threshold = threshold + 0.1;\n  if (value > 255) {\n    value = 0;\n    threshold = 30;\n  }\n  setMoveThreshold(threshold);\n}\n</code>\n</div>'
    ],
    alt: '50x50 black rect in center of canvas. turns white on mobile when device moves',
    class: 'p5',
    module: 'Events',
    submodule: 'Acceleration'
  },
  {
    description:
      '<p>The <a href="#/p5/setShakeThreshold">setShakeThreshold()</a> function is used to set the movement threshold for\nthe <a href="#/p5/deviceShaken">deviceShaken()</a> function. The default threshold is set to 30.</p>\n',
    itemtype: 'method',
    name: 'setShakeThreshold',
    params: [{ name: 'value', description: '<p>The threshold value</p>\n', type: 'Number' }],
    example: [
      '\n<div class="norender">\n<code>\n// Run this example on a mobile device\n// You will need to shake the device more firmly\n// the closer the box\'s fill gets to white in order to change the value.\n\nlet value = 0;\nlet threshold = 30;\nfunction setup() {\n  setShakeThreshold(threshold);\n}\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction deviceMoved() {\n  value = value + 5;\n  threshold = threshold + 5;\n  if (value > 255) {\n    value = 0;\n    threshold = 30;\n  }\n  setShakeThreshold(threshold);\n}\n</code>\n</div>'
    ],
    alt: '50x50 black rect in center of canvas. turns white on mobile when device\nis being shaked',
    class: 'p5',
    module: 'Events',
    submodule: 'Acceleration'
  },
  {
    description:
      '<p>The <a href="#/p5/deviceMoved">deviceMoved()</a> function is called when the device is moved by more than\nthe threshold value along X, Y or Z axis. The default threshold is set to 0.5.\nThe threshold value can be changed using <a href="https://p5js.org/reference/#/p5/setMoveThreshold">setMoveThreshold()</a>.</p>\n',
    itemtype: 'method',
    name: 'deviceMoved',
    example: [
      '\n<div class="norender">\n<code>\n// Run this example on a mobile device\n// Move the device around\n// to change the value.\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction deviceMoved() {\n  value = value + 5;\n  if (value > 255) {\n    value = 0;\n  }\n}\n</code>\n</div>'
    ],
    alt: '50x50 black rect in center of canvas. turns white on mobile when device moves',
    class: 'p5',
    module: 'Events',
    submodule: 'Acceleration'
  },
  {
    description:
      '<p>The <a href="#/p5/deviceTurned">deviceTurned()</a> function is called when the device rotates by\nmore than 90 degrees continuously.</p>\n<p>The axis that triggers the <a href="#/p5/deviceTurned">deviceTurned()</a> method is stored in the turnAxis\nvariable. The <a href="#/p5/deviceTurned">deviceTurned()</a> method can be locked to trigger on any axis:\nX, Y or Z by comparing the turnAxis variable to \'X\', \'Y\' or \'Z\'.</p>\n',
    itemtype: 'method',
    name: 'deviceTurned',
    example: [
      '\n<div class="norender">\n<code>\n// Run this example on a mobile device\n// Rotate the device by 90 degrees\n// to change the value.\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction deviceTurned() {\n  if (value === 0) {\n    value = 255;\n  } else if (value === 255) {\n    value = 0;\n  }\n}\n</code>\n</div>\n<div>\n<code>\n// Run this example on a mobile device\n// Rotate the device by 90 degrees in the\n// X-axis to change the value.\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction deviceTurned() {\n  if (turnAxis === \'X\') {\n    if (value === 0) {\n      value = 255;\n    } else if (value === 255) {\n      value = 0;\n    }\n  }\n}\n</code>\n</div>'
    ],
    alt: '50x50 black rect in center of canvas. turns white on mobile when device turns\n50x50 black rect in center of canvas. turns white on mobile when x-axis turns',
    class: 'p5',
    module: 'Events',
    submodule: 'Acceleration'
  },
  {
    description:
      '<p>The <a href="#/p5/deviceShaken">deviceShaken()</a> function is called when the device total acceleration\nchanges of accelerationX and accelerationY values is more than\nthe threshold value. The default threshold is set to 30.\nThe threshold value can be changed using <a href="https://p5js.org/reference/#/p5/setShakeThreshold">setShakeThreshold()</a>.</p>\n',
    itemtype: 'method',
    name: 'deviceShaken',
    example: [
      '\n<div class="norender">\n<code>\n// Run this example on a mobile device\n// Shake the device to change the value.\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction deviceShaken() {\n  value = value + 5;\n  if (value > 255) {\n    value = 0;\n  }\n}\n</code>\n</div>'
    ],
    alt: '50x50 black rect in center of canvas. turns white on mobile when device shakes',
    class: 'p5',
    module: 'Events',
    submodule: 'Acceleration'
  },
  {
    description:
      '<p>The <a href="#/p5/keyPressed">keyPressed()</a> function is called once every time a key is pressed. The\nkeyCode for the key that was pressed is stored in the <a href="#/p5/keyCode">keyCode</a> variable.</p>\n<p>For non-ASCII keys, use the keyCode variable. You can check if the keyCode\nequals BACKSPACE, DELETE, ENTER, RETURN, TAB, ESCAPE, SHIFT, CONTROL,\nOPTION, ALT, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW.</p>\n<p>For ASCII keys, the key that was pressed is stored in the key variable. However, it\ndoes not distinguish between uppercase and lowercase. For this reason, it\nis recommended to use <a href="#/p5/keyTyped">keyTyped()</a> to read the key variable, in which the\ncase of the variable will be distinguished.</p>\n<p>Because of how operating systems handle key repeats, holding down a key\nmay cause multiple calls to <a href="#/p5/keyTyped">keyTyped()</a> (and <a href="#/p5/keyReleased">keyReleased()</a> as well). The\nrate of repeat is set by the operating system and how each computer is\nconfigured.<br><br>\nBrowsers may have different default\nbehaviors attached to various key events. To prevent any default\nbehavior for this event, add "return false" to the end of the method.</p>\n',
    itemtype: 'method',
    name: 'keyPressed',
    params: [
      {
        name: 'event',
        description: '<p>optional KeyboardEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction keyPressed() {\n  if (value === 0) {\n    value = 255;\n  } else {\n    value = 0;\n  }\n}\n</code>\n</div>\n<div>\n<code>\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction keyPressed() {\n  if (keyCode === LEFT_ARROW) {\n    value = 255;\n  } else if (keyCode === RIGHT_ARROW) {\n    value = 0;\n  }\n}\n</code>\n</div>\n<div class="norender">\n<code>\nfunction keyPressed() {\n  // Do something\n  return false; // prevent any default behaviour\n}\n</code>\n</div>'
    ],
    alt: 'black rect center. turns white when key pressed and black when released\nblack rect center. turns white when left arrow pressed and black when right.',
    class: 'p5',
    module: 'Events',
    submodule: 'Keyboard'
  },
  {
    description:
      '<p>The <a href="#/p5/keyReleased">keyReleased()</a> function is called once every time a key is released.\nSee <a href="#/p5/key">key</a> and <a href="#/p5/keyCode">keyCode</a> for more information.<br><br>\nBrowsers may have different default\nbehaviors attached to various key events. To prevent any default\nbehavior for this event, add "return false" to the end of the method.</p>\n',
    itemtype: 'method',
    name: 'keyReleased',
    params: [
      {
        name: 'event',
        description: '<p>optional KeyboardEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction keyReleased() {\n  if (value === 0) {\n    value = 255;\n  } else {\n    value = 0;\n  }\n  return false; // prevent any default behavior\n}\n</code>\n</div>'
    ],
    alt: 'black rect center. turns white when key pressed and black when pressed again',
    class: 'p5',
    module: 'Events',
    submodule: 'Keyboard'
  },
  {
    description:
      '<p>The <a href="#/p5/keyTyped">keyTyped()</a> function is called once every time a key is pressed, but\naction keys such as Backspace, Delete, Ctrl, Shift, and Alt are ignored. If you are trying to detect\na keyCode for one of these keys, use the <a href="#/p5/keyPressed">keyPressed()</a> function instead.\nThe most recent key typed will be stored in the key variable.</p>\n<p>Because of how operating systems handle key repeats, holding down a key\nwill cause multiple calls to <a href="#/p5/keyTyped">keyTyped()</a> (and <a href="#/p5/keyReleased">keyReleased()</a> as well). The\nrate of repeat is set by the operating system and how each computer is\nconfigured.<br><br>\nBrowsers may have different default behaviors attached to various key\nevents. To prevent any default behavior for this event, add "return false"\nto the end of the method.</p>\n',
    itemtype: 'method',
    name: 'keyTyped',
    params: [
      {
        name: 'event',
        description: '<p>optional KeyboardEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      "\n<div>\n<code>\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction keyTyped() {\n  if (key === 'a') {\n    value = 255;\n  } else if (key === 'b') {\n    value = 0;\n  }\n  // uncomment to prevent any default behavior\n  // return false;\n}\n</code>\n</div>"
    ],
    alt: "black rect center. turns white when 'a' key typed and black when 'b' pressed",
    class: 'p5',
    module: 'Events',
    submodule: 'Keyboard'
  },
  {
    description:
      '<p>The <a href="#/p5/keyIsDown">keyIsDown()</a> function checks if the key is currently down, i.e. pressed.\nIt can be used if you have an object that moves, and you want several keys\nto be able to affect its behaviour simultaneously, such as moving a\nsprite diagonally. You can put in any number representing the keyCode of\nthe key, or use any of the variable <a href="#/p5/keyCode">keyCode</a> names listed\n<a href="http://p5js.org/reference/#p5/keyCode">here</a>.</p>\n',
    itemtype: 'method',
    name: 'keyIsDown',
    params: [{ name: 'code', description: '<p>The key to check for.</p>\n', type: 'Number' }],
    return: { description: 'whether key is down or not', type: 'Boolean' },
    example: [
      '\n<div><code>\nlet x = 100;\nlet y = 100;\n\nfunction setup() {\n  createCanvas(512, 512);\n  fill(255, 0, 0);\n}\n\nfunction draw() {\n  if (keyIsDown(LEFT_ARROW)) {\n    x -= 5;\n  }\n\n  if (keyIsDown(RIGHT_ARROW)) {\n    x += 5;\n  }\n\n  if (keyIsDown(UP_ARROW)) {\n    y -= 5;\n  }\n\n  if (keyIsDown(DOWN_ARROW)) {\n    y += 5;\n  }\n\n  clear();\n  ellipse(x, y, 50, 50);\n}\n</code></div>\n\n<div><code>\nlet diameter = 50;\n\nfunction setup() {\n  createCanvas(512, 512);\n}\n\nfunction draw() {\n  // 107 and 187 are keyCodes for "+"\n  if (keyIsDown(107) || keyIsDown(187)) {\n    diameter += 1;\n  }\n\n  // 109 and 189 are keyCodes for "-"\n  if (keyIsDown(109) || keyIsDown(189)) {\n    diameter -= 1;\n  }\n\n  clear();\n  fill(255, 0, 0);\n  ellipse(50, 50, diameter, diameter);\n}\n</code></div>'
    ],
    alt: '50x50 red ellipse moves left, right, up and down with arrow presses.\n50x50 red ellipse gets bigger or smaller when + or - are pressed.',
    class: 'p5',
    module: 'Events',
    submodule: 'Keyboard'
  },
  {
    description:
      '<p>The <a href="#/p5/mouseMoved">mouseMoved()</a> function is called every time the mouse moves and a mouse\nbutton is not pressed.<br><br>\nBrowsers may have different default\nbehaviors attached to various mouse events. To prevent any default\nbehavior for this event, add "return false" to the end of the method.</p>\n',
    itemtype: 'method',
    name: 'mouseMoved',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\n// Move the mouse across the page\n// to change its value\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction mouseMoved() {\n  value = value + 5;\n  if (value > 255) {\n    value = 0;\n  }\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\nfunction mouseMoved() {\n  ellipse(mouseX, mouseY, 5, 5);\n  // prevent default\n  return false;\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\n// returns a MouseEvent object\n// as a callback argument\nfunction mouseMoved(event) {\n  console.log(event);\n}\n</code>\n</div>'
    ],
    alt: 'black 50x50 rect becomes lighter with mouse movements until white then resets\nno image displayed',
    class: 'p5',
    module: 'Events',
    submodule: 'Mouse'
  },
  {
    description:
      '<p>The <a href="#/p5/mouseDragged">mouseDragged()</a> function is called once every time the mouse moves and\na mouse button is pressed. If no <a href="#/p5/mouseDragged">mouseDragged()</a> function is defined, the\n<a href="#/p5/touchMoved">touchMoved()</a> function will be called instead if it is defined.<br><br>\nBrowsers may have different default\nbehaviors attached to various mouse events. To prevent any default\nbehavior for this event, add "return false" to the end of the method.</p>\n',
    itemtype: 'method',
    name: 'mouseDragged',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\n// Drag the mouse across the page\n// to change its value\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction mouseDragged() {\n  value = value + 5;\n  if (value > 255) {\n    value = 0;\n  }\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\nfunction mouseDragged() {\n  ellipse(mouseX, mouseY, 5, 5);\n  // prevent default\n  return false;\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\n// returns a MouseEvent object\n// as a callback argument\nfunction mouseDragged(event) {\n  console.log(event);\n}\n</code>\n</div>'
    ],
    alt: 'black 50x50 rect turns lighter with mouse click and drag until white, resets\nno image displayed',
    class: 'p5',
    module: 'Events',
    submodule: 'Mouse'
  },
  {
    description:
      '<p>The <a href="#/p5/mousePressed">mousePressed()</a> function is called once after every time a mouse button\nis pressed. The mouseButton variable (see the related reference entry)\ncan be used to determine which button has been pressed. If no\n<a href="#/p5/mousePressed">mousePressed()</a> function is defined, the <a href="#/p5/touchStarted">touchStarted()</a> function will be\ncalled instead if it is defined.<br><br>\nBrowsers may have different default\nbehaviors attached to various mouse events. To prevent any default\nbehavior for this event, add "return false" to the end of the method.</p>\n',
    itemtype: 'method',
    name: 'mousePressed',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\n// Click within the image to change\n// the value of the rectangle\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction mousePressed() {\n  if (value === 0) {\n    value = 255;\n  } else {\n    value = 0;\n  }\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\nfunction mousePressed() {\n  ellipse(mouseX, mouseY, 5, 5);\n  // prevent default\n  return false;\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\n// returns a MouseEvent object\n// as a callback argument\nfunction mousePressed(event) {\n  console.log(event);\n}\n</code>\n</div>'
    ],
    alt: 'black 50x50 rect turns white with mouse click/press.\nno image displayed',
    class: 'p5',
    module: 'Events',
    submodule: 'Mouse'
  },
  {
    description:
      '<p>The <a href="#/p5/mouseReleased">mouseReleased()</a> function is called every time a mouse button is\nreleased. If no <a href="#/p5/mouseReleased">mouseReleased()</a> function is defined, the <a href="#/p5/touchEnded">touchEnded()</a>\nfunction will be called instead if it is defined.<br><br>\nBrowsers may have different default\nbehaviors attached to various mouse events. To prevent any default\nbehavior for this event, add "return false" to the end of the method.</p>\n',
    itemtype: 'method',
    name: 'mouseReleased',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\n// Click within the image to change\n// the value of the rectangle\n// after the mouse has been clicked\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction mouseReleased() {\n  if (value === 0) {\n    value = 255;\n  } else {\n    value = 0;\n  }\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\nfunction mouseReleased() {\n  ellipse(mouseX, mouseY, 5, 5);\n  // prevent default\n  return false;\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\n// returns a MouseEvent object\n// as a callback argument\nfunction mouseReleased(event) {\n  console.log(event);\n}\n</code>\n</div>'
    ],
    alt: 'black 50x50 rect turns white with mouse click/press.\nno image displayed',
    class: 'p5',
    module: 'Events',
    submodule: 'Mouse'
  },
  {
    description:
      '<p>The <a href="#/p5/mouseClicked">mouseClicked()</a> function is called once after a mouse button has been\npressed and then released.<br><br>\nBrowsers handle clicks differently, so this function is only guaranteed to be\nrun when the left mouse button is clicked. To handle other mouse buttons\nbeing pressed or released, see <a href="#/p5/mousePressed">mousePressed()</a> or <a href="#/p5/mouseReleased">mouseReleased()</a>.<br><br>\nBrowsers may have different default\nbehaviors attached to various mouse events. To prevent any default\nbehavior for this event, add "return false" to the end of the method.</p>\n',
    itemtype: 'method',
    name: 'mouseClicked',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\n// Click within the image to change\n// the value of the rectangle\n// after the mouse has been clicked\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\n\nfunction mouseClicked() {\n  if (value === 0) {\n    value = 255;\n  } else {\n    value = 0;\n  }\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\nfunction mouseClicked() {\n  ellipse(mouseX, mouseY, 5, 5);\n  // prevent default\n  return false;\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\n// returns a MouseEvent object\n// as a callback argument\nfunction mouseClicked(event) {\n  console.log(event);\n}\n</code>\n</div>'
    ],
    alt: 'black 50x50 rect turns white with mouse click/press.\nno image displayed',
    class: 'p5',
    module: 'Events',
    submodule: 'Mouse'
  },
  {
    description:
      '<p>The <a href="#/p5/doubleClicked">doubleClicked()</a> function is executed every time a event\nlistener has detected a dblclick event which is a part of the\nDOM L3 specification. The doubleClicked event is fired when a\npointing device button (usually a mouse\'s primary button)\nis clicked twice on a single element. For more info on the\ndblclick event refer to mozilla\'s documentation here:\n<a href="https://developer.mozilla.org/en-US/docs/Web/Events/dblclick">https://developer.mozilla.org/en-US/docs/Web/Events/dblclick</a></p>\n',
    itemtype: 'method',
    name: 'doubleClicked',
    params: [
      {
        name: 'event',
        description: '<p>optional MouseEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\n// Click within the image to change\n// the value of the rectangle\n// after the mouse has been double clicked\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\n\nfunction doubleClicked() {\n  if (value === 0) {\n    value = 255;\n  } else {\n    value = 0;\n  }\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\nfunction doubleClicked() {\n  ellipse(mouseX, mouseY, 5, 5);\n  // prevent default\n  return false;\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\n// returns a MouseEvent object\n// as a callback argument\nfunction doubleClicked(event) {\n  console.log(event);\n}\n</code>\n</div>'
    ],
    alt: 'black 50x50 rect turns white with mouse doubleClick/press.\nno image displayed',
    class: 'p5',
    module: 'Events',
    submodule: 'Mouse'
  },
  {
    description:
      '<p>The function <a href="#/p5/mouseWheel">mouseWheel()</a> is executed every time a vertical mouse wheel\nevent is detected either triggered by an actual mouse wheel or by a\ntouchpad.<br><br>\nThe event.delta property returns the amount the mouse wheel\nhave scrolled. The values can be positive or negative depending on the\nscroll direction (on OS X with "natural" scrolling enabled, the signs\nare inverted).<br><br>\nBrowsers may have different default behaviors attached to various\nmouse events. To prevent any default behavior for this event, add\n"return false" to the end of the method.<br><br>\nDue to the current support of the "wheel" event on Safari, the function\nmay only work as expected if "return false" is included while using Safari.</p>\n',
    itemtype: 'method',
    name: 'mouseWheel',
    params: [
      {
        name: 'event',
        description: '<p>optional WheelEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\nlet pos = 25;\n\nfunction draw() {\n  background(237, 34, 93);\n  fill(0);\n  rect(25, pos, 50, 50);\n}\n\nfunction mouseWheel(event) {\n  print(event.delta);\n  //move the square according to the vertical scroll amount\n  pos += event.delta;\n  //uncomment to block page scrolling\n  //return false;\n}\n</code>\n</div>'
    ],
    alt: 'black 50x50 rect moves up and down with vertical scroll. fuchsia background',
    class: 'p5',
    module: 'Events',
    submodule: 'Mouse'
  },
  {
    description:
      '<p>The function <a href="#/p5/requestPointerLock">requestPointerLock()</a>\nlocks the pointer to its current position and makes it invisible.\nUse <a href="#/p5/movedX">movedX</a> and <a href="#/p5/movedY">movedY</a> to get the difference the mouse was moved since\nthe last call of draw.\nNote that not all browsers support this feature.\nThis enables you to create experiences that aren\'t limited by the mouse moving out of the screen\neven if it is repeatedly moved into one direction.\nFor example, a first person perspective experience.</p>\n',
    itemtype: 'method',
    name: 'requestPointerLock',
    example: [
      '\n<div class="notest">\n<code>\nlet cam;\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  requestPointerLock();\n  cam = createCamera();\n}\n\nfunction draw() {\n  background(255);\n  cam.pan(-movedX * 0.001);\n  cam.tilt(movedY * 0.001);\n  sphere(25);\n}\n</code>\n</div>'
    ],
    alt: '3D scene moves according to mouse mouse movement in a first person perspective',
    class: 'p5',
    module: 'Events',
    submodule: 'Mouse'
  },
  {
    description:
      '<p>The function <a href="#/p5/exitPointerLock">exitPointerLock()</a>\nexits a previously triggered <a href="#/p5/requestPointerLock">pointer Lock</a>\nfor example to make ui elements usable etc</p>\n',
    itemtype: 'method',
    name: 'exitPointerLock',
    example: [
      '\n<div class="notest">\n<code>\n//click the canvas to lock the pointer\n//click again to exit (otherwise escape)\nlet locked = false;\nfunction draw() {\n  background(237, 34, 93);\n}\nfunction mouseClicked() {\n  if (!locked) {\n    locked = true;\n    requestPointerLock();\n  } else {\n    exitPointerLock();\n    locked = false;\n  }\n}\n</code>\n</div>'
    ],
    alt: 'cursor gets locked / unlocked on mouse-click',
    class: 'p5',
    module: 'Events',
    submodule: 'Mouse'
  },
  {
    description:
      '<p>The touchStarted() function is called once after every time a touch is\nregistered. If no <a href="#/p5/touchStarted">touchStarted()</a> function is defined, the <a href="#/p5/mousePressed">mousePressed()</a>\nfunction will be called instead if it is defined.<br><br>\nBrowsers may have different default behaviors attached to various touch\nevents. To prevent any default behavior for this event, add "return false"\nto the end of the method.</p>\n',
    itemtype: 'method',
    name: 'touchStarted',
    params: [
      {
        name: 'event',
        description: '<p>optional TouchEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\n// Touch within the image to change\n// the value of the rectangle\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction touchStarted() {\n  if (value === 0) {\n    value = 255;\n  } else {\n    value = 0;\n  }\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\nfunction touchStarted() {\n  ellipse(mouseX, mouseY, 5, 5);\n  // prevent default\n  return false;\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\n// returns a TouchEvent object\n// as a callback argument\nfunction touchStarted(event) {\n  console.log(event);\n}\n</code>\n</div>'
    ],
    alt: '50x50 black rect turns white with touch event.\nno image displayed',
    class: 'p5',
    module: 'Events',
    submodule: 'Touch'
  },
  {
    description:
      '<p>The <a href="#/p5/touchMoved">touchMoved()</a> function is called every time a touch move is registered.\nIf no <a href="#/p5/touchMoved">touchMoved()</a> function is defined, the <a href="#/p5/mouseDragged">mouseDragged()</a> function will\nbe called instead if it is defined.<br><br>\nBrowsers may have different default behaviors attached to various touch\nevents. To prevent any default behavior for this event, add "return false"\nto the end of the method.</p>\n',
    itemtype: 'method',
    name: 'touchMoved',
    params: [
      {
        name: 'event',
        description: '<p>optional TouchEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\n// Move your finger across the page\n// to change its value\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction touchMoved() {\n  value = value + 5;\n  if (value > 255) {\n    value = 0;\n  }\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\nfunction touchMoved() {\n  ellipse(mouseX, mouseY, 5, 5);\n  // prevent default\n  return false;\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\n// returns a TouchEvent object\n// as a callback argument\nfunction touchMoved(event) {\n  console.log(event);\n}\n</code>\n</div>'
    ],
    alt: '50x50 black rect turns lighter with touch until white. resets\nno image displayed',
    class: 'p5',
    module: 'Events',
    submodule: 'Touch'
  },
  {
    description:
      '<p>The <a href="#/p5/touchEnded">touchEnded()</a> function is called every time a touch ends. If no\n<a href="#/p5/touchEnded">touchEnded()</a> function is defined, the <a href="#/p5/mouseReleased">mouseReleased()</a> function will be\ncalled instead if it is defined.<br><br>\nBrowsers may have different default behaviors attached to various touch\nevents. To prevent any default behavior for this event, add "return false"\nto the end of the method.</p>\n',
    itemtype: 'method',
    name: 'touchEnded',
    params: [
      {
        name: 'event',
        description: '<p>optional TouchEvent callback argument.</p>\n',
        type: 'Object',
        optional: true
      }
    ],
    example: [
      '\n<div>\n<code>\n// Release touch within the image to\n// change the value of the rectangle\n\nlet value = 0;\nfunction draw() {\n  fill(value);\n  rect(25, 25, 50, 50);\n}\nfunction touchEnded() {\n  if (value === 0) {\n    value = 255;\n  } else {\n    value = 0;\n  }\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\nfunction touchEnded() {\n  ellipse(mouseX, mouseY, 5, 5);\n  // prevent default\n  return false;\n}\n</code>\n</div>\n\n<div class="norender">\n<code>\n// returns a TouchEvent object\n// as a callback argument\nfunction touchEnded(event) {\n  console.log(event);\n}\n</code>\n</div>'
    ],
    alt: '50x50 black rect turns white with touch.\nno image displayed',
    class: 'p5',
    module: 'Events',
    submodule: 'Touch'
  },
  {
    description:
      '<p>Creates a new <a href="#/p5.Image">p5.Image</a> (the datatype for storing images). This provides a\nfresh buffer of pixels to play with. Set the size of the buffer with the\nwidth and height parameters.</p>\n<p>.<a href="#/p5.Image/pixels">pixels</a> gives access to an array containing the values for all the pixels\nin the display window.\nThese values are numbers. This array is the size (including an appropriate\nfactor for the <a href="#/p5/pixelDensity">pixelDensity</a>) of the display window x4,\nrepresenting the R, G, B, A values in order for each pixel, moving from\nleft to right across each row, then down each column. See .<a href="#/p5.Image/pixels">pixels</a> for\nmore info. It may also be simpler to use <a href="#/p5.Image/set">set()</a> or <a href="#/p5.Image/get">get()</a>.</p>\n<p>Before accessing the pixels of an image, the data must loaded with the\n<a href="#/p5.Image/loadPixels">loadPixels()</a> function. After the array data has been modified, the\n<a href="#/p5.Image/updatePixels">updatePixels()</a> function must be run to update the changes.</p>\n',
    itemtype: 'method',
    name: 'createImage',
    params: [
      { name: 'width', description: '<p>width in pixels</p>\n', type: 'Integer' },
      { name: 'height', description: '<p>height in pixels</p>\n', type: 'Integer' }
    ],
    return: { description: 'the <a href="#/p5.Image">p5.Image</a> object', type: 'p5.Image' },
    example: [
      '\n<div>\n<code>\nlet img = createImage(66, 66);\nimg.loadPixels();\nfor (let i = 0; i < img.width; i++) {\n  for (let j = 0; j < img.height; j++) {\n    img.set(i, j, color(0, 90, 102));\n  }\n}\nimg.updatePixels();\nimage(img, 17, 17);\n</code>\n</div>\n\n<div>\n<code>\nlet img = createImage(66, 66);\nimg.loadPixels();\nfor (let i = 0; i < img.width; i++) {\n  for (let j = 0; j < img.height; j++) {\n    img.set(i, j, color(0, 90, 102, (i % img.width) * 2));\n  }\n}\nimg.updatePixels();\nimage(img, 17, 17);\nimage(img, 34, 34);\n</code>\n</div>\n\n<div>\n<code>\nlet pink = color(255, 102, 204);\nlet img = createImage(66, 66);\nimg.loadPixels();\nlet d = pixelDensity();\nlet halfImage = 4 * (img.width * d) * (img.height / 2 * d);\nfor (let i = 0; i < halfImage; i += 4) {\n  img.pixels[i] = red(pink);\n  img.pixels[i + 1] = green(pink);\n  img.pixels[i + 2] = blue(pink);\n  img.pixels[i + 3] = alpha(pink);\n}\nimg.updatePixels();\nimage(img, 17, 17);\n</code>\n</div>'
    ],
    alt: '66x66 dark turquoise rect in center of canvas.\n2 gradated dark turquoise rects fade left. 1 center 1 bottom right of canvas\nno image displayed',
    class: 'p5',
    module: 'Image',
    submodule: 'Image'
  },
  {
    description:
      '<p>Save the current canvas as an image. The browser will either save the\nfile immediately, or prompt the user with a dialogue window.</p>\n',
    itemtype: 'method',
    name: 'saveCanvas',
    example: [
      "\n <div class='norender notest'><code>\n function setup() {\n let c = createCanvas(100, 100);\n background(255, 0, 0);\n saveCanvas(c, 'myCanvas', 'jpg');\n }\n </code></div>\n <div class='norender notest'><code>\n // note that this example has the same result as above\n // if no canvas is specified, defaults to main canvas\n function setup() {\n let c = createCanvas(100, 100);\n background(255, 0, 0);\n saveCanvas('myCanvas', 'jpg');\n\n // all of the following are valid\n saveCanvas(c, 'myCanvas', 'jpg');\n saveCanvas(c, 'myCanvas.jpg');\n saveCanvas(c, 'myCanvas');\n saveCanvas(c);\n saveCanvas('myCanvas', 'png');\n saveCanvas('myCanvas');\n saveCanvas();\n }\n </code></div>"
    ],
    alt: 'no image displayed\n no image displayed\n no image displayed',
    class: 'p5',
    module: 'Image',
    submodule: 'Image',
    overloads: [
      {
        line: 94,
        params: [
          {
            name: 'selectedCanvas',
            description:
              '<p>a variable\n                                representing a specific html5 canvas (optional)</p>\n',
            type: 'p5.Element|HTMLCanvasElement'
          },
          { name: 'filename', description: '', type: 'String', optional: true },
          { name: 'extension', description: "<p>'jpg' or 'png'</p>\n", type: 'String', optional: true }
        ]
      },
      {
        line: 136,
        params: [
          { name: 'filename', description: '', type: 'String', optional: true },
          { name: 'extension', description: '', type: 'String', optional: true }
        ]
      }
    ]
  },
  {
    description:
      '<p>Capture a sequence of frames that can be used to create a movie.\nAccepts a callback. For example, you may wish to send the frames\nto a server where they can be stored or converted into a movie.\nIf no callback is provided, the browser will pop up save dialogues in an\nattempt to download all of the images that have just been created. With the\ncallback provided the image data isn\'t saved by default but instead passed\nas an argument to the callback function as an array of objects, with the\nsize of array equal to the total number of frames.</p>\n<p>Note that <a href="#/p5.Image/saveFrames">saveFrames()</a> will only save the first 15 frames of an animation.\nTo export longer animations, you might look into a library like\n<a href="https://github.com/spite/ccapture.js/">ccapture.js</a>.</p>\n',
    itemtype: 'method',
    name: 'saveFrames',
    params: [
      { name: 'filename', description: '', type: 'String' },
      { name: 'extension', description: "<p>'jpg' or 'png'</p>\n", type: 'String' },
      {
        name: 'duration',
        description: '<p>Duration in seconds to save the frames for.</p>\n',
        type: 'Number'
      },
      { name: 'framerate', description: '<p>Framerate to save the frames in.</p>\n', type: 'Number' },
      {
        name: 'callback',
        description:
          '<p>A callback function that will be executed\n                                to handle the image data. This function\n                                should accept an array as argument. The\n                                array will contain the specified number of\n                                frames of objects. Each object has three\n                                properties: imageData - an\n                                image/octet-stream, filename and extension.</p>\n',
        type: 'Function(Array)',
        optional: true
      }
    ],
    example: [
      "\n<div><code>\n function draw() {\n background(mouseX);\n }\n\n function mousePressed() {\n saveFrames('out', 'png', 1, 25, data => {\n   print(data);\n });\n }\n</code></div>"
    ],
    alt: 'canvas background goes from light to dark with mouse x.',
    class: 'p5',
    module: 'Image',
    submodule: 'Image'
  },
  {
    description:
      '<p>Loads an image from a path and creates a <a href="#/p5.Image">p5.Image</a> from it.</p>\n<p>The image may not be immediately available for rendering.\nIf you want to ensure that the image is ready before doing\nanything with it, place the <a href="#/p5/loadImage">loadImage()</a> call in <a href="#/p5/preload">preload()</a>.\nYou may also supply a callback function to handle the image when it\'s ready.</p>\n<p>The path to the image should be relative to the HTML file\nthat links in your sketch. Loading an image from a URL or other\nremote location may be blocked due to your browser\'s built-in\nsecurity.</p>\n<p>You can also pass in a string of a base64 encoded image as an alternative to the file path.\nRemember to add "data:image/png;base64," in front of the string.</p>\n',
    itemtype: 'method',
    name: 'loadImage',
    params: [
      { name: 'path', description: '<p>Path of the image to be loaded</p>\n', type: 'String' },
      {
        name: 'successCallback',
        description:
          '<p>Function to be called once\n                               the image is loaded. Will be passed the\n                               <a href="#/p5.Image">p5.Image</a>.</p>\n',
        type: 'function(p5.Image)',
        optional: true
      },
      {
        name: 'failureCallback',
        description:
          '<p>called with event error if\n                               the image fails to load.</p>\n',
        type: 'Function(Event)',
        optional: true
      }
    ],
    return: { description: 'the <a href="#/p5.Image">p5.Image</a> object', type: 'p5.Image' },
    example: [
      "\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/laDefense.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n}\n</code>\n</div>\n<div>\n<code>\nfunction setup() {\n  // here we use a callback to display the image after loading\n  loadImage('assets/laDefense.jpg', img => {\n    image(img, 0, 0);\n  });\n}\n</code>\n</div>"
    ],
    alt: 'image of the underside of a white umbrella and grided ceililng above\nimage of the underside of a white umbrella and grided ceililng above',
    class: 'p5',
    module: 'Image',
    submodule: 'Loading & Displaying'
  },
  {
    description:
      '<p>Draw an image to the p5.js canvas.</p>\n<p>This function can be used with different numbers of parameters. The\nsimplest use requires only three parameters: img, x, and y—where (x, y) is\nthe position of the image. Two more parameters can optionally be added to\nspecify the width and height of the image.</p>\n<p>This function can also be used with all eight Number parameters. To\ndifferentiate between all these parameters, p5.js uses the language of\n"destination rectangle" (which corresponds to "dx", "dy", etc.) and "source\nimage" (which corresponds to "sx", "sy", etc.) below. Specifying the\n"source image" dimensions can be useful when you want to display a\nsubsection of the source image instead of the whole thing. Here\'s a diagram\nto explain further:\n<img src="assets/drawImage.png"></img></p>\n',
    itemtype: 'method',
    name: 'image',
    example: [
      "\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/laDefense.jpg');\n}\nfunction setup() {\n  // Top-left corner of the img is at (0, 0)\n  // Width and height are the img's original width and height\n  image(img, 0, 0);\n}\n</code>\n</div>\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/laDefense.jpg');\n}\nfunction setup() {\n  background(50);\n  // Top-left corner of the img is at (10, 10)\n  // Width and height are 50 x 50\n  image(img, 10, 10, 50, 50);\n}\n</code>\n</div>\n<div>\n<code>\nfunction setup() {\n  // Here, we use a callback to display the image after loading\n  loadImage('assets/laDefense.jpg', img => {\n    image(img, 0, 0);\n  });\n}\n</code>\n</div>\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/gradient.png');\n}\nfunction setup() {\n  // 1. Background image\n  // Top-left corner of the img is at (0, 0)\n  // Width and height are the img's original width and height, 100 x 100\n  image(img, 0, 0);\n  // 2. Top right image\n  // Top-left corner of destination rectangle is at (50, 0)\n  // Destination rectangle width and height are 40 x 20\n  // The next parameters are relative to the source image:\n  // - Starting at position (50, 50) on the source image, capture a 50 x 50\n  // subsection\n  // - Draw this subsection to fill the dimensions of the destination rectangle\n  image(img, 50, 0, 40, 20, 50, 50, 50, 50);\n}\n</code>\n</div>"
    ],
    alt: 'image of the underside of a white umbrella and gridded ceiling above\nimage of the underside of a white umbrella and gridded ceiling above',
    class: 'p5',
    module: 'Image',
    submodule: 'Loading & Displaying',
    overloads: [
      {
        line: 301,
        params: [
          { name: 'img', description: '<p>the image to display</p>\n', type: 'p5.Image|p5.Element' },
          {
            name: 'x',
            description: '<p>the x-coordinate of the top-left corner of the image</p>\n',
            type: 'Number'
          },
          {
            name: 'y',
            description: '<p>the y-coordinate of the top-left corner of the image</p>\n',
            type: 'Number'
          },
          {
            name: 'width',
            description: '<p>the width to draw the image</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'height',
            description: '<p>the height to draw the image</p>\n',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        line: 388,
        params: [
          { name: 'img', description: '', type: 'p5.Image|p5.Element' },
          {
            name: 'dx',
            description:
              '<p>the x-coordinate of the destination\n                          rectangle in which to draw the source image</p>\n',
            type: 'Number'
          },
          {
            name: 'dy',
            description:
              '<p>the y-coordinate of the destination\n                          rectangle in which to draw the source image</p>\n',
            type: 'Number'
          },
          { name: 'dWidth', description: '<p>the width of the destination rectangle</p>\n', type: 'Number' },
          {
            name: 'dHeight',
            description: '<p>the height of the destination rectangle</p>\n',
            type: 'Number'
          },
          {
            name: 'sx',
            description:
              '<p>the x-coordinate of the subsection of the source\nimage to draw into the destination rectangle</p>\n',
            type: 'Number'
          },
          {
            name: 'sy',
            description:
              '<p>the y-coordinate of the subsection of the source\nimage to draw into the destination rectangle</p>\n',
            type: 'Number'
          },
          {
            name: 'sWidth',
            description:
              '<p>the width of the subsection of the\n                          source image to draw into the destination\n                          rectangle</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'sHeight',
            description:
              '<p>the height of the subsection of the\n                           source image to draw into the destination rectangle</p>\n',
            type: 'Number',
            optional: true
          }
        ]
      }
    ]
  },
  {
    description:
      '<p>Sets the fill value for displaying images. Images can be tinted to\nspecified colors or made transparent by including an alpha value.</p>\n<p>To apply transparency to an image without affecting its color, use\nwhite as the tint color and specify an alpha value. For instance,\ntint(255, 128) will make an image 50% transparent (assuming the default\nalpha range of 0-255, which can be changed with <a href="#/p5/colorMode">colorMode()</a>).</p>\n<p>The value for the gray parameter must be less than or equal to the current\nmaximum value as specified by <a href="#/p5/colorMode">colorMode()</a>. The default maximum value is\n255.</p>\n',
    itemtype: 'method',
    name: 'tint',
    example: [
      "\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/laDefense.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  tint(0, 153, 204); // Tint blue\n  image(img, 50, 0);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/laDefense.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  tint(0, 153, 204, 126); // Tint blue and set transparency\n  image(img, 50, 0);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/laDefense.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  tint(255, 126); // Apply transparency without changing color\n  image(img, 50, 0);\n}\n</code>\n</div>"
    ],
    alt: '2 side by side images of umbrella and ceiling, one image with blue tint\nImages of umbrella and ceiling, one half of image with blue tint\n2 side by side images of umbrella and ceiling, one image translucent',
    class: 'p5',
    module: 'Image',
    submodule: 'Loading & Displaying',
    overloads: [
      {
        line: 471,
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          { name: 'alpha', description: '', type: 'Number', optional: true }
        ]
      },
      { line: 542, params: [{ name: 'value', description: '<p>a color string</p>\n', type: 'String' }] },
      {
        line: 547,
        params: [
          { name: 'gray', description: '<p>a gray value</p>\n', type: 'Number' },
          { name: 'alpha', description: '', type: 'Number', optional: true }
        ]
      },
      {
        line: 553,
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red,green,blue &\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ]
      },
      { line: 559, params: [{ name: 'color', description: '<p>the tint color</p>\n', type: 'p5.Color' }] }
    ]
  },
  {
    description:
      '<p>Removes the current fill value for displaying images and reverts to\ndisplaying images with their original hues.</p>\n',
    itemtype: 'method',
    name: 'noTint',
    example: [
      "\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  tint(0, 153, 204); // Tint blue\n  image(img, 0, 0);\n  noTint(); // Disable tint\n  image(img, 50, 0);\n}\n</code>\n</div>"
    ],
    alt: '2 side by side images of bricks, left image with blue tint',
    class: 'p5',
    module: 'Image',
    submodule: 'Loading & Displaying'
  },
  {
    description:
      '<p>Set image mode. Modifies the location from which images are drawn by\nchanging the way in which parameters given to <a href="#/p5/image">image()</a> are interpreted.\nThe default mode is imageMode(CORNER), which interprets the second and\nthird parameters of <a href="#/p5/image">image()</a> as the upper-left corner of the image. If\ntwo additional parameters are specified, they are used to set the image\'s\nwidth and height.</p>\n<p>imageMode(CORNERS) interprets the second and third parameters of <a href="#/p5/image">image()</a>\nas the location of one corner, and the fourth and fifth parameters as the\nopposite corner.</p>\n<p>imageMode(CENTER) interprets the second and third parameters of <a href="#/p5/image">image()</a>\nas the image\'s center point. If two additional parameters are specified,\nthey are used to set the image\'s width and height.</p>\n',
    itemtype: 'method',
    name: 'imageMode',
    params: [{ name: 'mode', description: '<p>either CORNER, CORNERS, or CENTER</p>\n', type: 'Constant' }],
    example: [
      "\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  imageMode(CORNER);\n  image(img, 10, 10, 50, 50);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  imageMode(CORNERS);\n  image(img, 10, 10, 90, 40);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  imageMode(CENTER);\n  image(img, 50, 50, 80, 80);\n}\n</code>\n</div>"
    ],
    alt: 'small square image of bricks\nhorizontal rectangle image of bricks\nlarge square image of bricks',
    class: 'p5',
    module: 'Image',
    submodule: 'Loading & Displaying'
  },
  {
    description: '<p>Loads the pixels data for this image into the [pixels] attribute.</p>\n',
    itemtype: 'method',
    name: 'loadPixels',
    example: [
      "\n<div><code>\nlet myImage;\nlet halfImage;\n\nfunction preload() {\n  myImage = loadImage('assets/rockies.jpg');\n}\n\nfunction setup() {\n  myImage.loadPixels();\n  halfImage = 4 * myImage.width * myImage.height / 2;\n  for (let i = 0; i < halfImage; i++) {\n    myImage.pixels[i + halfImage] = myImage.pixels[i];\n  }\n  myImage.updatePixels();\n}\n\nfunction draw() {\n  image(myImage, 0, 0, width, height);\n}\n</code></div>"
    ],
    alt: '2 images of rocky mountains vertically stacked',
    class: 'p5.Image',
    module: 'Image',
    submodule: 'Image'
  },
  {
    description:
      '<p>Updates the backing canvas for this image with the contents of\nthe [pixels] array.</p>\n<p>If this image is an animated GIF then the pixels will be updated\nin the frame that is currently displayed.</p>\n',
    itemtype: 'method',
    name: 'updatePixels',
    example: [
      "\n<div><code>\nlet myImage;\nlet halfImage;\n\nfunction preload() {\n  myImage = loadImage('assets/rockies.jpg');\n}\n\nfunction setup() {\n  myImage.loadPixels();\n  halfImage = 4 * myImage.width * myImage.height / 2;\n  for (let i = 0; i < halfImage; i++) {\n    myImage.pixels[i + halfImage] = myImage.pixels[i];\n  }\n  myImage.updatePixels();\n}\n\nfunction draw() {\n  image(myImage, 0, 0, width, height);\n}\n</code></div>"
    ],
    alt: '2 images of rocky mountains vertically stacked',
    class: 'p5.Image',
    module: 'Image',
    submodule: 'Image',
    overloads: [
      {
        line: 296,
        params: [
          {
            name: 'x',
            description:
              '<p>x-offset of the target update area for the\n                             underlying canvas</p>\n',
            type: 'Integer'
          },
          {
            name: 'y',
            description:
              '<p>y-offset of the target update area for the\n                             underlying canvas</p>\n',
            type: 'Integer'
          },
          {
            name: 'w',
            description:
              '<p>height of the target update area for the\n                             underlying canvas</p>\n',
            type: 'Integer'
          },
          {
            name: 'h',
            description:
              '<p>height of the target update area for the\n                             underlying canvas</p>\n',
            type: 'Integer'
          }
        ]
      },
      { line: 338, params: [] }
    ]
  },
  {
    description:
      '<p>Get a region of pixels from an image.</p>\n<p>If no params are passed, the whole image is returned.\nIf x and y are the only params passed a single pixel is extracted.\nIf all params are passed a rectangle region is extracted and a <a href="#/p5.Image">p5.Image</a>\nis returned.</p>\n',
    itemtype: 'method',
    name: 'get',
    return: { description: 'the rectangle <a href="#/p5.Image">p5.Image</a>', type: 'p5.Image' },
    example: [
      "\n<div><code>\nlet myImage;\nlet c;\n\nfunction preload() {\n  myImage = loadImage('assets/rockies.jpg');\n}\n\nfunction setup() {\n  background(myImage);\n  noStroke();\n  c = myImage.get(60, 90);\n  fill(c);\n  rect(25, 25, 50, 50);\n}\n\n//get() returns color here\n</code></div>"
    ],
    alt: 'image of rocky mountains with 50x50 green rect in front',
    class: 'p5.Image',
    module: 'Image',
    submodule: 'Image',
    overloads: [
      {
        line: 346,
        params: [
          { name: 'x', description: '<p>x-coordinate of the pixel</p>\n', type: 'Number' },
          { name: 'y', description: '<p>y-coordinate of the pixel</p>\n', type: 'Number' },
          { name: 'w', description: '<p>width</p>\n', type: 'Number' },
          { name: 'h', description: '<p>height</p>\n', type: 'Number' }
        ],
        return: { description: 'the rectangle <a href="#/p5.Image">p5.Image</a>', type: 'p5.Image' }
      },
      {
        line: 383,
        params: [],
        return: { description: 'the whole <a href="#/p5.Image">p5.Image</a>', type: 'p5.Image' }
      },
      {
        line: 387,
        params: [
          { name: 'x', description: '', type: 'Number' },
          { name: 'y', description: '', type: 'Number' }
        ],
        return: { description: 'color of pixel at x,y in array format [R, G, B, A]', type: 'Number[]' }
      }
    ]
  },
  {
    description:
      '<p>Set the color of a single pixel or write an image into\nthis <a href="#/p5.Image">p5.Image</a>.</p>\n<p>Note that for a large number of pixels this will\nbe slower than directly manipulating the pixels array\nand then calling <a href="#/p5.Image/updatePixels">updatePixels()</a>.</p>\n',
    itemtype: 'method',
    name: 'set',
    params: [
      { name: 'x', description: '<p>x-coordinate of the pixel</p>\n', type: 'Number' },
      { name: 'y', description: '<p>y-coordinate of the pixel</p>\n', type: 'Number' },
      {
        name: 'a',
        description:
          '<p>grayscale value | pixel array |\n                               a <a href="#/p5.Color">p5.Color</a> | image to copy</p>\n',
        type: 'Number|Number[]|Object'
      }
    ],
    example: [
      '\n<div>\n<code>\nlet img = createImage(66, 66);\nimg.loadPixels();\nfor (let i = 0; i < img.width; i++) {\n  for (let j = 0; j < img.height; j++) {\n    img.set(i, j, color(0, 90, 102, (i % img.width) * 2));\n  }\n}\nimg.updatePixels();\nimage(img, 17, 17);\nimage(img, 34, 34);\n</code>\n</div>'
    ],
    alt: '2 gradated dark turquoise rects fade left. 1 center 1 bottom right of canvas',
    class: 'p5.Image',
    module: 'Image',
    submodule: 'Image'
  },
  {
    description:
      "<p>Copies a region of pixels from one image to another. If no\nsrcImage is specified this is used as the source. If the source\nand destination regions aren't the same size, it will\nautomatically resize source pixels to fit the specified\ntarget region.</p>\n",
    itemtype: 'method',
    name: 'copy',
    example: [
      "\n<div><code>\nlet photo;\nlet bricks;\nlet x;\nlet y;\n\nfunction preload() {\n  photo = loadImage('assets/rockies.jpg');\n  bricks = loadImage('assets/bricks.jpg');\n}\n\nfunction setup() {\n  x = bricks.width / 2;\n  y = bricks.height / 2;\n  photo.copy(bricks, 0, 0, x, y, 0, 0, x, y);\n  image(photo, 0, 0);\n}\n</code></div>"
    ],
    alt: 'image of rocky mountains and smaller image on top of bricks at top left',
    class: 'p5.Image',
    module: 'Image',
    submodule: 'Image',
    overloads: [
      {
        line: 548,
        params: [
          { name: 'srcImage', description: '<p>source image</p>\n', type: 'p5.Image|p5.Element' },
          {
            name: 'sx',
            description: "<p>X coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'sy',
            description: "<p>Y coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          { name: 'sw', description: '<p>source image width</p>\n', type: 'Integer' },
          { name: 'sh', description: '<p>source image height</p>\n', type: 'Integer' },
          {
            name: 'dx',
            description: "<p>X coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'dy',
            description: "<p>Y coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          { name: 'dw', description: '<p>destination image width</p>\n', type: 'Integer' },
          { name: 'dh', description: '<p>destination image height</p>\n', type: 'Integer' }
        ]
      },
      {
        line: 588,
        params: [
          { name: 'sx', description: '', type: 'Integer' },
          { name: 'sy', description: '', type: 'Integer' },
          { name: 'sw', description: '', type: 'Integer' },
          { name: 'sh', description: '', type: 'Integer' },
          { name: 'dx', description: '', type: 'Integer' },
          { name: 'dy', description: '', type: 'Integer' },
          { name: 'dw', description: '', type: 'Integer' },
          { name: 'dh', description: '', type: 'Integer' }
        ]
      }
    ]
  },
  {
    description:
      '<p>Applies an image filter to a <a href="#/p5.Image">p5.Image</a></p>\n<p>THRESHOLD\nConverts the image to black and white pixels depending if they are above or\nbelow the threshold defined by the level parameter. The parameter must be\nbetween 0.0 (black) and 1.0 (white). If no level is specified, 0.5 is used.</p>\n<p>GRAY\nConverts any colors in the image to grayscale equivalents. No parameter\nis used.</p>\n<p>OPAQUE\nSets the alpha channel to entirely opaque. No parameter is used.</p>\n<p>INVERT\nSets each pixel to its inverse value. No parameter is used.</p>\n<p>POSTERIZE\nLimits each channel of the image to the number of colors specified as the\nparameter. The parameter can be set to values between 2 and 255, but\nresults are most noticeable in the lower ranges.</p>\n<p>BLUR\nExecutes a Gaussian blur with the level parameter specifying the extent\nof the blurring. If no parameter is used, the blur is equivalent to\nGaussian blur of radius 1. Larger values increase the blur.</p>\n<p>ERODE\nReduces the light areas. No parameter is used.</p>\n<p>DILATE\nIncreases the light areas. No parameter is used.</p>\n<p>filter() does not work in WEBGL mode.\nA similar effect can be achieved in WEBGL mode using custom\nshaders. Adam Ferriss has written\na <a href="https://github.com/aferriss/p5jsShaderExamples"\ntarget=\'_blank\'>selection of shader examples</a> that contains many\nof the effects present in the filter examples.</p>\n',
    itemtype: 'method',
    name: 'filter',
    params: [
      {
        name: 'filterType',
        description:
          '<p>either THRESHOLD, GRAY, OPAQUE, INVERT,\n                               POSTERIZE, ERODE, DILATE or BLUR.\n                               See Filters.js for docs on\n                               each available filter</p>\n',
        type: 'Constant'
      },
      {
        name: 'filterParam',
        description:
          '<p>an optional parameter unique\n                               to each filter, see above</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    example: [
      "\n<div><code>\nlet photo1;\nlet photo2;\n\nfunction preload() {\n  photo1 = loadImage('assets/rockies.jpg');\n  photo2 = loadImage('assets/rockies.jpg');\n}\n\nfunction setup() {\n  photo2.filter(GRAY);\n  image(photo1, 0, 0);\n  image(photo2, width / 2, 0);\n}\n</code></div>"
    ],
    alt: '2 images of rocky mountains left one in color, right in black and white',
    class: 'p5.Image',
    module: 'Image',
    submodule: 'Image'
  },
  {
    description:
      '<p>Copies a region of pixels from one image to another, using a specified\nblend mode to do the operation.</p>\n',
    itemtype: 'method',
    name: 'blend',
    example: [
      "\n<div><code>\nlet mountains;\nlet bricks;\n\nfunction preload() {\n  mountains = loadImage('assets/rockies.jpg');\n  bricks = loadImage('assets/bricks_third.jpg');\n}\n\nfunction setup() {\n  mountains.blend(bricks, 0, 0, 33, 100, 67, 0, 33, 100, ADD);\n  image(mountains, 0, 0);\n  image(bricks, 0, 0);\n}\n</code></div>\n<div><code>\nlet mountains;\nlet bricks;\n\nfunction preload() {\n  mountains = loadImage('assets/rockies.jpg');\n  bricks = loadImage('assets/bricks_third.jpg');\n}\n\nfunction setup() {\n  mountains.blend(bricks, 0, 0, 33, 100, 67, 0, 33, 100, DARKEST);\n  image(mountains, 0, 0);\n  image(bricks, 0, 0);\n}\n</code></div>\n<div><code>\nlet mountains;\nlet bricks;\n\nfunction preload() {\n  mountains = loadImage('assets/rockies.jpg');\n  bricks = loadImage('assets/bricks_third.jpg');\n}\n\nfunction setup() {\n  mountains.blend(bricks, 0, 0, 33, 100, 67, 0, 33, 100, LIGHTEST);\n  image(mountains, 0, 0);\n  image(bricks, 0, 0);\n}\n</code></div>"
    ],
    alt: 'image of rocky mountains. Brick images on left and right. Right overexposed\nimage of rockies. Brickwall images on left and right. Right mortar transparent\nimage of rockies. Brickwall images on left and right. Right translucent',
    class: 'p5.Image',
    module: 'Image',
    submodule: 'Image',
    overloads: [
      {
        line: 738,
        params: [
          { name: 'srcImage', description: '<p>source image</p>\n', type: 'p5.Image' },
          {
            name: 'sx',
            description: "<p>X coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'sy',
            description: "<p>Y coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          { name: 'sw', description: '<p>source image width</p>\n', type: 'Integer' },
          { name: 'sh', description: '<p>source image height</p>\n', type: 'Integer' },
          {
            name: 'dx',
            description: "<p>X coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'dy',
            description: "<p>Y coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          { name: 'dw', description: '<p>destination image width</p>\n', type: 'Integer' },
          { name: 'dh', description: '<p>destination image height</p>\n', type: 'Integer' },
          {
            name: 'blendMode',
            description:
              '<p>the blend mode. either\n    BLEND, DARKEST, LIGHTEST, DIFFERENCE,\n    MULTIPLY, EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT,\n    SOFT_LIGHT, DODGE, BURN, ADD or NORMAL.</p>\n<p>Available blend modes are: normal | multiply | screen | overlay |\n           darken | lighten | color-dodge | color-burn | hard-light |\n           soft-light | difference | exclusion | hue | saturation |\n           color | luminosity</p>\n<p><a href="http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/">http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/</a></p>\n',
            type: 'Constant'
          }
        ]
      },
      {
        line: 815,
        params: [
          { name: 'sx', description: '', type: 'Integer' },
          { name: 'sy', description: '', type: 'Integer' },
          { name: 'sw', description: '', type: 'Integer' },
          { name: 'sh', description: '', type: 'Integer' },
          { name: 'dx', description: '', type: 'Integer' },
          { name: 'dy', description: '', type: 'Integer' },
          { name: 'dw', description: '', type: 'Integer' },
          { name: 'dh', description: '', type: 'Integer' },
          { name: 'blendMode', description: '', type: 'Constant' }
        ]
      }
    ]
  },
  {
    description:
      '<p>Saves the image to a file and force the browser to download it.\nAccepts two strings for filename and file extension\nSupports png (default), jpg, and gif\n<br><br>\nNote that the file will only be downloaded as an animated GIF\nif the p5.Image was loaded from a GIF file.</p>\n',
    itemtype: 'method',
    name: 'save',
    params: [
      { name: 'filename', description: '<p>give your file a name</p>\n', type: 'String' },
      { name: 'extension', description: "<p>'png' or 'jpg'</p>\n", type: 'String' }
    ],
    example: [
      "\n<div><code>\nlet photo;\n\nfunction preload() {\n  photo = loadImage('assets/rockies.jpg');\n}\n\nfunction draw() {\n  image(photo, 0, 0);\n}\n\nfunction keyTyped() {\n  if (key === 's') {\n    photo.save('photo', 'png');\n  }\n}\n</code></div>"
    ],
    alt: 'image of rocky mountains.',
    class: 'p5.Image',
    module: 'Image',
    submodule: 'Image'
  },
  {
    description:
      '<p>Copies a region of pixels from one image to another, using a specified\nblend mode to do the operation.</p>\n',
    itemtype: 'method',
    name: 'blend',
    example: [
      "\n<div><code>\nlet img0;\nlet img1;\n\nfunction preload() {\n  img0 = loadImage('assets/rockies.jpg');\n  img1 = loadImage('assets/bricks_third.jpg');\n}\n\nfunction setup() {\n  background(img0);\n  image(img1, 0, 0);\n  blend(img1, 0, 0, 33, 100, 67, 0, 33, 100, LIGHTEST);\n}\n</code></div>\n<div><code>\nlet img0;\nlet img1;\n\nfunction preload() {\n  img0 = loadImage('assets/rockies.jpg');\n  img1 = loadImage('assets/bricks_third.jpg');\n}\n\nfunction setup() {\n  background(img0);\n  image(img1, 0, 0);\n  blend(img1, 0, 0, 33, 100, 67, 0, 33, 100, DARKEST);\n}\n</code></div>\n<div><code>\nlet img0;\nlet img1;\n\nfunction preload() {\n  img0 = loadImage('assets/rockies.jpg');\n  img1 = loadImage('assets/bricks_third.jpg');\n}\n\nfunction setup() {\n  background(img0);\n  image(img1, 0, 0);\n  blend(img1, 0, 0, 33, 100, 67, 0, 33, 100, ADD);\n}\n</code></div>"
    ],
    alt: 'image of rocky mountains. Brick images on left and right. Right overexposed\nimage of rockies. Brickwall images on left and right. Right mortar transparent\nimage of rockies. Brickwall images on left and right. Right translucent',
    class: 'p5',
    module: 'Image',
    submodule: 'Pixels',
    overloads: [
      {
        line: 80,
        params: [
          { name: 'srcImage', description: '<p>source image</p>\n', type: 'p5.Image' },
          {
            name: 'sx',
            description: "<p>X coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'sy',
            description: "<p>Y coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          { name: 'sw', description: '<p>source image width</p>\n', type: 'Integer' },
          { name: 'sh', description: '<p>source image height</p>\n', type: 'Integer' },
          {
            name: 'dx',
            description: "<p>X coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'dy',
            description: "<p>Y coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          { name: 'dw', description: '<p>destination image width</p>\n', type: 'Integer' },
          { name: 'dh', description: '<p>destination image height</p>\n', type: 'Integer' },
          {
            name: 'blendMode',
            description:
              '<p>the blend mode. either\n    BLEND, DARKEST, LIGHTEST, DIFFERENCE,\n    MULTIPLY, EXCLUSION, SCREEN, REPLACE, OVERLAY, HARD_LIGHT,\n    SOFT_LIGHT, DODGE, BURN, ADD or NORMAL.</p>\n',
            type: 'Constant'
          }
        ]
      },
      {
        line: 152,
        params: [
          { name: 'sx', description: '', type: 'Integer' },
          { name: 'sy', description: '', type: 'Integer' },
          { name: 'sw', description: '', type: 'Integer' },
          { name: 'sh', description: '', type: 'Integer' },
          { name: 'dx', description: '', type: 'Integer' },
          { name: 'dy', description: '', type: 'Integer' },
          { name: 'dw', description: '', type: 'Integer' },
          { name: 'dh', description: '', type: 'Integer' },
          { name: 'blendMode', description: '', type: 'Constant' }
        ]
      }
    ]
  },
  {
    description:
      "<p>Copies a region of the canvas to another region of the canvas\nand copies a region of pixels from an image used as the srcImg parameter\ninto the canvas srcImage is specified this is used as the source. If\nthe source and destination regions aren't the same size, it will\nautomatically resize source pixels to fit the specified\ntarget region.</p>\n",
    itemtype: 'method',
    name: 'copy',
    example: [
      "\n<div><code>\nlet img;\n\nfunction preload() {\n  img = loadImage('assets/rockies.jpg');\n}\n\nfunction setup() {\n  background(img);\n  copy(img, 7, 22, 10, 10, 35, 25, 50, 50);\n  stroke(255);\n  noFill();\n  // Rectangle shows area being copied\n  rect(7, 22, 10, 10);\n}\n</code></div>"
    ],
    alt: 'image of rocky mountains. Brick images on left and right. Right overexposed\nimage of rockies. Brickwall images on left and right. Right mortar transparent\nimage of rockies. Brickwall images on left and right. Right translucent',
    class: 'p5',
    module: 'Image',
    submodule: 'Pixels',
    overloads: [
      {
        line: 173,
        params: [
          { name: 'srcImage', description: '<p>source image</p>\n', type: 'p5.Image|p5.Element' },
          {
            name: 'sx',
            description: "<p>X coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'sy',
            description: "<p>Y coordinate of the source's upper left corner</p>\n",
            type: 'Integer'
          },
          { name: 'sw', description: '<p>source image width</p>\n', type: 'Integer' },
          { name: 'sh', description: '<p>source image height</p>\n', type: 'Integer' },
          {
            name: 'dx',
            description: "<p>X coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          {
            name: 'dy',
            description: "<p>Y coordinate of the destination's upper left corner</p>\n",
            type: 'Integer'
          },
          { name: 'dw', description: '<p>destination image width</p>\n', type: 'Integer' },
          { name: 'dh', description: '<p>destination image height</p>\n', type: 'Integer' }
        ]
      },
      {
        line: 215,
        params: [
          { name: 'sx', description: '', type: 'Integer' },
          { name: 'sy', description: '', type: 'Integer' },
          { name: 'sw', description: '', type: 'Integer' },
          { name: 'sh', description: '', type: 'Integer' },
          { name: 'dx', description: '', type: 'Integer' },
          { name: 'dy', description: '', type: 'Integer' },
          { name: 'dw', description: '', type: 'Integer' },
          { name: 'dh', description: '', type: 'Integer' }
        ]
      }
    ]
  },
  {
    description:
      '<p>Applies a filter to the canvas. The presets options are:</p>\n<p>THRESHOLD\nConverts the image to black and white pixels depending if they are above or\nbelow the threshold defined by the level parameter. The parameter must be\nbetween 0.0 (black) and 1.0 (white). If no level is specified, 0.5 is used.</p>\n<p>GRAY\nConverts any colors in the image to grayscale equivalents. No parameter\nis used.</p>\n<p>OPAQUE\nSets the alpha channel to entirely opaque. No parameter is used.</p>\n<p>INVERT\nSets each pixel to its inverse value. No parameter is used.</p>\n<p>POSTERIZE\nLimits each channel of the image to the number of colors specified as the\nparameter. The parameter can be set to values between 2 and 255, but\nresults are most noticeable in the lower ranges.</p>\n<p>BLUR\nExecutes a Gaussian blur with the level parameter specifying the extent\nof the blurring. If no parameter is used, the blur is equivalent to\nGaussian blur of radius 1. Larger values increase the blur.</p>\n<p>ERODE\nReduces the light areas. No parameter is used.</p>\n<p>DILATE\nIncreases the light areas. No parameter is used.</p>\n<p>filter() does not work in WEBGL mode.\nA similar effect can be achieved in WEBGL mode using custom\nshaders. Adam Ferriss has written\na <a href="https://github.com/aferriss/p5jsShaderExamples"\ntarget=\'_blank\'>selection of shader examples</a> that contains many\nof the effects present in the filter examples.</p>\n',
    itemtype: 'method',
    name: 'filter',
    params: [
      {
        name: 'filterType',
        description:
          '<p>either THRESHOLD, GRAY, OPAQUE, INVERT,\n                               POSTERIZE, BLUR, ERODE, DILATE or BLUR.\n                               See Filters.js for docs on\n                               each available filter</p>\n',
        type: 'Constant'
      },
      {
        name: 'filterParam',
        description:
          '<p>an optional parameter unique\n                               to each filter, see above</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    example: [
      "\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  filter(THRESHOLD);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  filter(GRAY);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  filter(OPAQUE);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  filter(INVERT);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  filter(POSTERIZE, 3);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  filter(DILATE);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  filter(BLUR, 3);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/bricks.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  filter(ERODE);\n}\n</code>\n</div>"
    ],
    alt: 'black and white image of a brick wall.\ngreyscale image of a brickwall\nimage of a brickwall\njade colored image of a brickwall\nred and pink image of a brickwall\nimage of a brickwall\nblurry image of a brickwall\nimage of a brickwall\nimage of a brickwall with less detail',
    class: 'p5',
    module: 'Image',
    submodule: 'Pixels'
  },
  {
    description:
      '<p>Get a region of pixels, or a single pixel, from the canvas.</p>\n<p>Returns an array of [R,G,B,A] values for any pixel or grabs a section of\nan image. If no parameters are specified, the entire image is returned.\nUse the x and y parameters to get the value of one pixel. Get a section of\nthe display window by specifying additional w and h parameters. When\ngetting an image, the x and y parameters define the coordinates for the\nupper-left corner of the image, regardless of the current <a href="#/p5/imageMode">imageMode()</a>.</p>\n<p>Getting the color of a single pixel with get(x, y) is easy, but not as fast\nas grabbing the data directly from <a href="#/p5/pixels">pixels[]</a>. The equivalent statement to\nget(x, y) using <a href="#/p5/pixels">pixels[]</a> with pixel density d is</p>\n<pre><code class="language-javascript">let x, y, d; // set these to the coordinates\nlet off = (y * width + x) * d * 4;\nlet components = [\n  pixels[off],\n  pixels[off + 1],\n  pixels[off + 2],\n  pixels[off + 3]\n];\nprint(components);</code></pre>\n<p>See the reference for <a href="#/p5/pixels">pixels[]</a> for more information.</p>\n<p>If you want to extract an array of colors or a subimage from an p5.Image object,\ntake a look at <a href="#/p5.Image/get">p5.Image.get()</a></p>\n',
    itemtype: 'method',
    name: 'get',
    return: { description: 'the rectangle <a href="#/p5.Image">p5.Image</a>', type: 'p5.Image' },
    example: [
      "\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/rockies.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  let c = get();\n  image(c, width / 2, 0);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/rockies.jpg');\n}\nfunction setup() {\n  image(img, 0, 0);\n  let c = get(50, 90);\n  fill(c);\n  noStroke();\n  rect(25, 25, 50, 50);\n}\n</code>\n</div>"
    ],
    alt: '2 images of the rocky mountains, side-by-side\nImage of the rocky mountains with 50x50 green rect in center of canvas',
    class: 'p5',
    module: 'Image',
    submodule: 'Pixels',
    overloads: [
      {
        line: 481,
        params: [
          { name: 'x', description: '<p>x-coordinate of the pixel</p>\n', type: 'Number' },
          { name: 'y', description: '<p>y-coordinate of the pixel</p>\n', type: 'Number' },
          { name: 'w', description: '<p>width</p>\n', type: 'Number' },
          { name: 'h', description: '<p>height</p>\n', type: 'Number' }
        ],
        return: { description: 'the rectangle <a href="#/p5.Image">p5.Image</a>', type: 'p5.Image' }
      },
      {
        line: 551,
        params: [],
        return: { description: 'the whole <a href="#/p5.Image">p5.Image</a>', type: 'p5.Image' }
      },
      {
        line: 555,
        params: [
          { name: 'x', description: '', type: 'Number' },
          { name: 'y', description: '', type: 'Number' }
        ],
        return: { description: 'color of pixel at x,y in array format [R, G, B, A]', type: 'Number[]' }
      }
    ]
  },
  {
    description:
      '<p>Loads the pixel data for the display window into the <a href="#/p5/pixels">pixels[]</a> array. This\nfunction must always be called before reading from or writing to <a href="#/p5/pixels">pixels[]</a>.\nNote that only changes made with <a href="#/p5/set">set()</a> or direct manipulation of <a href="#/p5/pixels">pixels[]</a>\nwill occur.</p>\n',
    itemtype: 'method',
    name: 'loadPixels',
    example: [
      "\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/rockies.jpg');\n}\n\nfunction setup() {\n  image(img, 0, 0, width, height);\n  let d = pixelDensity();\n  let halfImage = 4 * (width * d) * (height * d / 2);\n  loadPixels();\n  for (let i = 0; i < halfImage; i++) {\n    pixels[i + halfImage] = pixels[i];\n  }\n  updatePixels();\n}\n</code>\n</div>"
    ],
    alt: 'two images of the rocky mountains. one on top, one on bottom of canvas.',
    class: 'p5',
    module: 'Image',
    submodule: 'Pixels'
  },
  {
    description:
      '<p>Changes the color of any pixel, or writes an image directly to the\ndisplay window.\nThe x and y parameters specify the pixel to change and the c parameter\nspecifies the color value. This can be a <a href="#/p5.Color">p5.Color</a> object, or [R, G, B, A]\npixel array. It can also be a single grayscale value.\nWhen setting an image, the x and y parameters define the coordinates for\nthe upper-left corner of the image, regardless of the current <a href="#/p5/imageMode">imageMode()</a>.</p>\n<p>After using <a href="#/p5/set">set()</a>, you must call <a href="#/p5/updatePixels">updatePixels()</a> for your changes to appear.\nThis should be called once all pixels have been set, and must be called before\ncalling .<a href="#/p5/get">get()</a> or drawing the image.</p>\n<p>Setting the color of a single pixel with set(x, y) is easy, but not as\nfast as putting the data directly into <a href="#/p5/pixels">pixels[]</a>. Setting the <a href="#/p5/pixels">pixels[]</a>\nvalues directly may be complicated when working with a retina display,\nbut will perform better when lots of pixels need to be set directly on\nevery loop. See the reference for <a href="#/p5/pixels">pixels[]</a> for more information.</p>\n',
    itemtype: 'method',
    name: 'set',
    params: [
      { name: 'x', description: '<p>x-coordinate of the pixel</p>\n', type: 'Number' },
      { name: 'y', description: '<p>y-coordinate of the pixel</p>\n', type: 'Number' },
      {
        name: 'c',
        description:
          '<p>insert a grayscale value | a pixel array |\n                               a <a href="#/p5.Color">p5.Color</a> object | a <a href="#/p5.Image">p5.Image</a> to copy</p>\n',
        type: 'Number|Number[]|Object'
      }
    ],
    example: [
      "\n<div>\n<code>\nlet black = color(0);\nset(30, 20, black);\nset(85, 20, black);\nset(85, 75, black);\nset(30, 75, black);\nupdatePixels();\n</code>\n</div>\n\n<div>\n<code>\nfor (let i = 30; i < width - 15; i++) {\n  for (let j = 20; j < height - 25; j++) {\n    let c = color(204 - j, 153 - i, 0);\n    set(i, j, c);\n  }\n}\nupdatePixels();\n</code>\n</div>\n\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/rockies.jpg');\n}\n\nfunction setup() {\n  set(0, 0, img);\n  updatePixels();\n  line(0, 0, width, height);\n  line(0, height, width, 0);\n}\n</code>\n</div>"
    ],
    alt: "4 black points in the shape of a square middle-right of canvas.\nsquare with orangey-brown gradient lightening at bottom right.\nimage of the rocky mountains. with lines like an 'x' through the center.",
    class: 'p5',
    module: 'Image',
    submodule: 'Pixels'
  },
  {
    description:
      '<p>Updates the display window with the data in the <a href="#/p5/pixels">pixels[]</a> array.\nUse in conjunction with <a href="#/p5/loadPixels">loadPixels()</a>. If you\'re only reading pixels from\nthe array, there\'s no need to call <a href="#/p5/updatePixels">updatePixels()</a> — updating is only\nnecessary to apply changes. <a href="#/p5/updatePixels">updatePixels()</a> should be called anytime the\npixels array is manipulated or <a href="#/p5/set">set()</a> is called, and only changes made with\n<a href="#/p5/set">set()</a> or direct changes to <a href="#/p5/pixels">pixels[]</a> will occur.</p>\n',
    itemtype: 'method',
    name: 'updatePixels',
    params: [
      {
        name: 'x',
        description:
          '<p>x-coordinate of the upper-left corner of region\n                        to update</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'y',
        description:
          '<p>y-coordinate of the upper-left corner of region\n                        to update</p>\n',
        type: 'Number',
        optional: true
      },
      { name: 'w', description: '<p>width of region to update</p>\n', type: 'Number', optional: true },
      { name: 'h', description: '<p>height of region to update</p>\n', type: 'Number', optional: true }
    ],
    example: [
      "\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/rockies.jpg');\n}\n\nfunction setup() {\n  image(img, 0, 0, width, height);\n  let d = pixelDensity();\n  let halfImage = 4 * (width * d) * (height * d / 2);\n  loadPixels();\n  for (let i = 0; i < halfImage; i++) {\n    pixels[i + halfImage] = pixels[i];\n  }\n  updatePixels();\n}\n</code>\n</div>"
    ],
    alt: 'two images of the rocky mountains. one on top, one on bottom of canvas.',
    class: 'p5',
    module: 'Image',
    submodule: 'Pixels'
  },
  {
    description:
      '<p>Loads a JSON file from a file or a URL, and returns an Object.\nNote that even if the JSON file contains an Array, an Object will be\nreturned with index numbers as keys.</p>\n<p>This method is asynchronous, meaning it may not finish before the next\nline in your sketch is executed. JSONP is supported via a polyfill and you\ncan pass in as the second argument an object with definitions of the json\ncallback following the syntax specified <a href="https://github.com/camsong/\nfetch-jsonp">here</a>.</p>\n<p>This method is suitable for fetching files up to size of 64MB.</p>\n',
    itemtype: 'method',
    name: 'loadJSON',
    return: { description: 'JSON data', type: 'Object|Array' },
    example: [
      '\n\nCalling <a href="#/p5/loadJSON">loadJSON()</a> inside <a href="#/p5/preload">preload()</a> guarantees to complete the\noperation before <a href="#/p5/setup">setup()</a> and <a href="#/p5/draw">draw()</a> are called.\n\n<div><code>\n// Examples use USGS Earthquake API:\n//   https://earthquake.usgs.gov/fdsnws/event/1/#methods\nlet earthquakes;\nfunction preload() {\n  // Get the most recent earthquake in the database\n  let url =\n   \'https://earthquake.usgs.gov/earthquakes/feed/v1.0/\' +\n    \'summary/all_day.geojson\';\n  earthquakes = loadJSON(url);\n}\n\nfunction setup() {\n  noLoop();\n}\n\nfunction draw() {\n  background(200);\n  // Get the magnitude and name of the earthquake out of the loaded JSON\n  let earthquakeMag = earthquakes.features[0].properties.mag;\n  let earthquakeName = earthquakes.features[0].properties.place;\n  ellipse(width / 2, height / 2, earthquakeMag * 10, earthquakeMag * 10);\n  textAlign(CENTER);\n  text(earthquakeName, 0, height - 30, width, 30);\n}\n</code></div>\n\nOutside of preload(), you may supply a callback function to handle the\nobject:\n<div><code>\nfunction setup() {\n  noLoop();\n  let url =\n   \'https://earthquake.usgs.gov/earthquakes/feed/v1.0/\' +\n    \'summary/all_day.geojson\';\n  loadJSON(url, drawEarthquake);\n}\n\nfunction draw() {\n  background(200);\n}\n\nfunction drawEarthquake(earthquakes) {\n  // Get the magnitude and name of the earthquake out of the loaded JSON\n  let earthquakeMag = earthquakes.features[0].properties.mag;\n  let earthquakeName = earthquakes.features[0].properties.place;\n  ellipse(width / 2, height / 2, earthquakeMag * 10, earthquakeMag * 10);\n  textAlign(CENTER);\n  text(earthquakeName, 0, height - 30, width, 30);\n}\n</code></div>'
    ],
    alt: '50x50 ellipse that changes from black to white depending on the current humidity\n50x50 ellipse that changes from black to white depending on the current humidity',
    class: 'p5',
    module: 'IO',
    submodule: 'Input',
    overloads: [
      {
        line: 20,
        params: [
          { name: 'path', description: '<p>name of the file or url to load</p>\n', type: 'String' },
          {
            name: 'jsonpOptions',
            description: '<p>options object for jsonp related settings</p>\n',
            type: 'Object',
            optional: true
          },
          { name: 'datatype', description: '<p>"json" or "jsonp"</p>\n', type: 'String', optional: true },
          {
            name: 'callback',
            description:
              '<p>function to be executed after\n                                   <a href="#/p5/loadJSON">loadJSON()</a> completes, data is passed\n                                   in as first argument</p>\n',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description:
              '<p>function to be executed if\n                                   there is an error, response is passed\n                                   in as first argument</p>\n',
            type: 'Function',
            optional: true
          }
        ],
        return: { description: 'JSON data', type: 'Object|Array' }
      },
      {
        line: 104,
        params: [
          { name: 'path', description: '', type: 'String' },
          { name: 'datatype', description: '', type: 'String' },
          { name: 'callback', description: '', type: 'Function', optional: true },
          { name: 'errorCallback', description: '', type: 'Function', optional: true }
        ],
        return: { description: '', type: 'Object|Array' }
      },
      {
        line: 112,
        params: [
          { name: 'path', description: '', type: 'String' },
          { name: 'callback', description: '', type: 'Function' },
          { name: 'errorCallback', description: '', type: 'Function', optional: true }
        ],
        return: { description: '', type: 'Object|Array' }
      }
    ]
  },
  {
    description:
      '<p>Reads the contents of a file and creates a String array of its individual\nlines. If the name of the file is used as the parameter, as in the above\nexample, the file must be located in the sketch directory/folder.</p>\n<p>Alternatively, the file maybe be loaded from anywhere on the local\ncomputer using an absolute path (something that starts with / on Unix and\nLinux, or a drive letter on Windows), or the filename parameter can be a\nURL for a file found on a network.</p>\n<p>This method is asynchronous, meaning it may not finish before the next\nline in your sketch is executed.</p>\n<p>This method is suitable for fetching files up to size of 64MB.</p>\n',
    itemtype: 'method',
    name: 'loadStrings',
    params: [
      { name: 'filename', description: '<p>name of the file or url to load</p>\n', type: 'String' },
      {
        name: 'callback',
        description:
          '<p>function to be executed after <a href="#/p5/loadStrings">loadStrings()</a>\n                              completes, Array is passed in as first\n                              argument</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>function to be executed if\n                              there is an error, response is passed\n                              in as first argument</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    return: { description: 'Array of Strings', type: 'String[]' },
    example: [
      '\n\nCalling loadStrings() inside <a href="#/p5/preload">preload()</a> guarantees to complete the\noperation before <a href="#/p5/setup">setup()</a> and <a href="#/p5/draw">draw()</a> are called.\n\n<div><code>\nlet result;\nfunction preload() {\n  result = loadStrings(\'assets/test.txt\');\n}\n\nfunction setup() {\n  background(200);\n  text(random(result), 10, 10, 80, 80);\n}\n</code></div>\n\nOutside of preload(), you may supply a callback function to handle the\nobject:\n\n<div><code>\nfunction setup() {\n  loadStrings(\'assets/test.txt\', pickString);\n}\n\nfunction pickString(result) {\n  background(200);\n  text(random(result), 10, 10, 80, 80);\n}\n</code></div>'
    ],
    alt: 'randomly generated text from a file, for example "i smell like butter"\nrandomly generated text from a file, for example "i have three feet"',
    class: 'p5',
    module: 'IO',
    submodule: 'Input'
  },
  {
    description:
      '<p>Reads the contents of a file or URL and creates a <a href="#/p5.Table">p5.Table</a> object with\nits values. If a file is specified, it must be located in the sketch\'s\n"data" folder. The filename parameter can also be a URL to a file found\nonline. By default, the file is assumed to be comma-separated (in CSV\nformat). Table only looks for a header row if the \'header\' option is\nincluded.</p>\n<p>This method is asynchronous, meaning it may not finish before the next\nline in your sketch is executed. Calling <a href="#/p5/loadTable">loadTable()</a> inside <a href="#/p5/preload">preload()</a>\nguarantees to complete the operation before <a href="#/p5/setup">setup()</a> and <a href="#/p5/draw">draw()</a> are called.\nOutside of <a href="#/p5/preload">preload()</a>, you may supply a callback function to handle the\nobject:</p>\n<p>All files loaded and saved use UTF-8 encoding. This method is suitable for fetching files up to size of 64MB.</p>\n',
    itemtype: 'method',
    name: 'loadTable',
    params: [
      { name: 'filename', description: '<p>name of the file or URL to load</p>\n', type: 'String' },
      {
        name: 'extension',
        description:
          '<p>parse the table by comma-separated values "csv", semicolon-separated\n                                     values "ssv", or tab-separated values "tsv"</p>\n',
        type: 'String',
        optional: true
      },
      {
        name: 'header',
        description: '<p>"header" to indicate table has header row</p>\n',
        type: 'String',
        optional: true
      },
      {
        name: 'callback',
        description:
          '<p>function to be executed after\n                                     <a href="#/p5/loadTable">loadTable()</a> completes. On success, the\n                                     <a href="#/p5.Table">Table</a> object is passed in as the\n                                     first argument.</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>function to be executed if\n                                     there is an error, response is passed\n                                     in as first argument</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    return: { description: '<a href="#/p5.Table">Table</a> object containing data', type: 'Object' },
    example: [
      '\n<div class=\'norender\'>\n<code>\n// Given the following CSV file called "mammals.csv"\n// located in the project\'s "assets" folder:\n//\n// id,species,name\n// 0,Capra hircus,Goat\n// 1,Panthera pardus,Leopard\n// 2,Equus zebra,Zebra\n\nlet table;\n\nfunction preload() {\n  //my table is comma separated value "csv"\n  //and has a header specifying the columns labels\n  table = loadTable(\'assets/mammals.csv\', \'csv\', \'header\');\n  //the file can be remote\n  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",\n  //                  "csv", "header");\n}\n\nfunction setup() {\n  //count the columns\n  print(table.getRowCount() + \' total rows in table\');\n  print(table.getColumnCount() + \' total columns in table\');\n\n  print(table.getColumn(\'name\'));\n  //["Goat", "Leopard", "Zebra"]\n\n  //cycle through the table\n  for (let r = 0; r < table.getRowCount(); r++)\n    for (let c = 0; c < table.getColumnCount(); c++) {\n      print(table.getString(r, c));\n    }\n}\n</code>\n</div>'
    ],
    alt: 'randomly generated text from a file, for example "i smell like butter"\nrandomly generated text from a file, for example "i have three feet"',
    class: 'p5',
    module: 'IO',
    submodule: 'Input'
  },
  {
    description:
      '<p>Reads the contents of a file and creates an XML object with its values.\nIf the name of the file is used as the parameter, as in the above example,\nthe file must be located in the sketch directory/folder.</p>\n<p>Alternatively, the file maybe be loaded from anywhere on the local\ncomputer using an absolute path (something that starts with / on Unix and\nLinux, or a drive letter on Windows), or the filename parameter can be a\nURL for a file found on a network.</p>\n<p>This method is asynchronous, meaning it may not finish before the next\nline in your sketch is executed. Calling <a href="#/p5/loadXML">loadXML()</a> inside <a href="#/p5/preload">preload()</a>\nguarantees to complete the operation before <a href="#/p5/setup">setup()</a> and <a href="#/p5/draw">draw()</a> are called.</p>\n<p>Outside of <a href="#/p5/preload">preload()</a>, you may supply a callback function to handle the\nobject.</p>\n<p>This method is suitable for fetching files up to size of 64MB.</p>\n',
    itemtype: 'method',
    name: 'loadXML',
    params: [
      { name: 'filename', description: '<p>name of the file or URL to load</p>\n', type: 'String' },
      {
        name: 'callback',
        description:
          '<p>function to be executed after <a href="#/p5/loadXML">loadXML()</a>\n                              completes, XML object is passed in as\n                              first argument</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>function to be executed if\n                              there is an error, response is passed\n                              in as first argument</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    return: { description: 'XML object containing data', type: 'Object' },
    example: [
      '\n<div class=\'norender\'><code>\n// The following short XML file called "mammals.xml" is parsed\n// in the code below.\n//\n// <?xml version="1.0"?>\n// &lt;mammals&gt;\n//   &lt;animal id="0" species="Capra hircus">Goat&lt;/animal&gt;\n//   &lt;animal id="1" species="Panthera pardus">Leopard&lt;/animal&gt;\n//   &lt;animal id="2" species="Equus zebra">Zebra&lt;/animal&gt;\n// &lt;/mammals&gt;\n\nlet xml;\n\nfunction preload() {\n  xml = loadXML(\'assets/mammals.xml\');\n}\n\nfunction setup() {\n  let children = xml.getChildren(\'animal\');\n\n  for (let i = 0; i < children.length; i++) {\n    let id = children[i].getNum(\'id\');\n    let coloring = children[i].getString(\'species\');\n    let name = children[i].getContent();\n    print(id + \', \' + coloring + \', \' + name);\n  }\n}\n\n// Sketch prints:\n// 0, Capra hircus, Goat\n// 1, Panthera pardus, Leopard\n// 2, Equus zebra, Zebra\n</code></div>'
    ],
    alt: 'no image displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Input'
  },
  {
    description: '<p>This method is suitable for fetching files up to size of 64MB.</p>\n',
    itemtype: 'method',
    name: 'loadBytes',
    params: [
      { name: 'file', description: '<p>name of the file or URL to load</p>\n', type: 'String' },
      {
        name: 'callback',
        description:
          '<p>function to be executed after <a href="#/p5/loadBytes">loadBytes()</a>\n                                   completes</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>function to be executed if there\n                                   is an error</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    return: { description: "an object whose 'bytes' property will be the loaded buffer", type: 'Object' },
    example: [
      "\n<div class='norender'><code>\nlet data;\n\nfunction preload() {\n  data = loadBytes('assets/mammals.xml');\n}\n\nfunction setup() {\n  for (let i = 0; i < 5; i++) {\n    console.log(data.bytes[i].toString(16));\n  }\n}\n</code></div>"
    ],
    alt: 'no image displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Input'
  },
  {
    description:
      "<p>Method for executing an HTTP GET request. If data type is not specified,\np5 will try to guess based on the URL, defaulting to text. This is equivalent to\ncalling <code>httpDo(path, 'GET')</code>. The 'binary' datatype will return\na Blob object, and the 'arrayBuffer' datatype will return an ArrayBuffer\nwhich can be used to initialize typed arrays (such as Uint8Array).</p>\n",
    itemtype: 'method',
    name: 'httpGet',
    return: {
      description:
        'A promise that resolves with the data when the operation\n                  completes successfully or rejects with the error after\n                  one occurs.',
      type: 'Promise'
    },
    example: [
      "\n<div class='norender'><code>\n// Examples use USGS Earthquake API:\n//   https://earthquake.usgs.gov/fdsnws/event/1/#methods\nlet earthquakes;\nfunction preload() {\n  // Get the most recent earthquake in the database\n  let url =\n   'https://earthquake.usgs.gov/fdsnws/event/1/query?' +\n    'format=geojson&limit=1&orderby=time';\n  httpGet(url, 'jsonp', false, function(response) {\n    // when the HTTP request completes, populate the variable that holds the\n    // earthquake data used in the visualization.\n    earthquakes = response;\n  });\n}\n\nfunction draw() {\n  if (!earthquakes) {\n    // Wait until the earthquake data has loaded before drawing.\n    return;\n  }\n  background(200);\n  // Get the magnitude and name of the earthquake out of the loaded JSON\n  let earthquakeMag = earthquakes.features[0].properties.mag;\n  let earthquakeName = earthquakes.features[0].properties.place;\n  ellipse(width / 2, height / 2, earthquakeMag * 10, earthquakeMag * 10);\n  textAlign(CENTER);\n  text(earthquakeName, 0, height - 30, width, 30);\n  noLoop();\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'IO',
    submodule: 'Input',
    overloads: [
      {
        line: 752,
        params: [
          { name: 'path', description: '<p>name of the file or url to load</p>\n', type: 'String' },
          {
            name: 'datatype',
            description:
              '<p>"json", "jsonp", "binary", "arrayBuffer",\n                                   "xml", or "text"</p>\n',
            type: 'String',
            optional: true
          },
          {
            name: 'data',
            description: '<p>param data passed sent with request</p>\n',
            type: 'Object|Boolean',
            optional: true
          },
          {
            name: 'callback',
            description:
              '<p>function to be executed after\n                                   <a href="#/p5/httpGet">httpGet()</a> completes, data is passed in\n                                   as first argument</p>\n',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description:
              '<p>function to be executed if\n                                   there is an error, response is passed\n                                   in as first argument</p>\n',
            type: 'Function',
            optional: true
          }
        ],
        return: {
          description:
            'A promise that resolves with the data when the operation\n                  completes successfully or rejects with the error after\n                  one occurs.',
          type: 'Promise'
        }
      },
      {
        line: 806,
        params: [
          { name: 'path', description: '', type: 'String' },
          { name: 'data', description: '', type: 'Object|Boolean' },
          { name: 'callback', description: '', type: 'Function', optional: true },
          { name: 'errorCallback', description: '', type: 'Function', optional: true }
        ],
        return: { description: '', type: 'Promise' }
      },
      {
        line: 814,
        params: [
          { name: 'path', description: '', type: 'String' },
          { name: 'callback', description: '', type: 'Function' },
          { name: 'errorCallback', description: '', type: 'Function', optional: true }
        ],
        return: { description: '', type: 'Promise' }
      }
    ]
  },
  {
    description:
      "<p>Method for executing an HTTP POST request. If data type is not specified,\np5 will try to guess based on the URL, defaulting to text. This is equivalent to\ncalling <code>httpDo(path, 'POST')</code>.</p>\n",
    itemtype: 'method',
    name: 'httpPost',
    return: {
      description:
        'A promise that resolves with the data when the operation\n                  completes successfully or rejects with the error after\n                  one occurs.',
      type: 'Promise'
    },
    example: [
      "\n<div>\n<code>\n// Examples use jsonplaceholder.typicode.com for a Mock Data API\n\nlet url = 'https://jsonplaceholder.typicode.com/posts';\nlet postData = { userId: 1, title: 'p5 Clicked!', body: 'p5.js is very cool.' };\n\nfunction setup() {\n  createCanvas(100, 100);\n  background(200);\n}\n\nfunction mousePressed() {\n  httpPost(url, 'json', postData, function(result) {\n    strokeWeight(2);\n    text(result.body, mouseX, mouseY);\n  });\n}\n</code>\n</div>\n\n<div><code>\nlet url = 'ttps://invalidURL'; // A bad URL that will cause errors\nlet postData = { title: 'p5 Clicked!', body: 'p5.js is very cool.' };\n\nfunction setup() {\n  createCanvas(100, 100);\n  background(200);\n}\n\nfunction mousePressed() {\n  httpPost(\n    url,\n    'json',\n    postData,\n    function(result) {\n      // ... won't be called\n    },\n    function(error) {\n      strokeWeight(2);\n      text(error.toString(), mouseX, mouseY);\n    }\n  );\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'IO',
    submodule: 'Input',
    overloads: [
      {
        line: 829,
        params: [
          { name: 'path', description: '<p>name of the file or url to load</p>\n', type: 'String' },
          {
            name: 'datatype',
            description:
              '<p>"json", "jsonp", "xml", or "text".\n                                   If omitted, <a href="#/p5/httpPost">httpPost()</a> will guess.</p>\n',
            type: 'String',
            optional: true
          },
          {
            name: 'data',
            description: '<p>param data passed sent with request</p>\n',
            type: 'Object|Boolean',
            optional: true
          },
          {
            name: 'callback',
            description:
              '<p>function to be executed after\n                                   <a href="#/p5/httpPost">httpPost()</a> completes, data is passed in\n                                   as first argument</p>\n',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description:
              '<p>function to be executed if\n                                   there is an error, response is passed\n                                   in as first argument</p>\n',
            type: 'Function',
            optional: true
          }
        ],
        return: {
          description:
            'A promise that resolves with the data when the operation\n                  completes successfully or rejects with the error after\n                  one occurs.',
          type: 'Promise'
        }
      },
      {
        line: 896,
        params: [
          { name: 'path', description: '', type: 'String' },
          { name: 'data', description: '', type: 'Object|Boolean' },
          { name: 'callback', description: '', type: 'Function', optional: true },
          { name: 'errorCallback', description: '', type: 'Function', optional: true }
        ],
        return: { description: '', type: 'Promise' }
      },
      {
        line: 904,
        params: [
          { name: 'path', description: '', type: 'String' },
          { name: 'callback', description: '', type: 'Function' },
          { name: 'errorCallback', description: '', type: 'Function', optional: true }
        ],
        return: { description: '', type: 'Promise' }
      }
    ]
  },
  {
    description:
      '<p>Method for executing an HTTP request. If data type is not specified,\np5 will try to guess based on the URL, defaulting to text.<br><br>\nFor more advanced use, you may also pass in the path as the first argument\nand a object as the second argument, the signature follows the one specified\nin the Fetch API specification.\nThis method is suitable for fetching files up to size of 64MB when "GET" is used.</p>\n',
    itemtype: 'method',
    name: 'httpDo',
    return: {
      description:
        'A promise that resolves with the data when the operation\n                  completes successfully or rejects with the error after\n                  one occurs.',
      type: 'Promise'
    },
    example: [
      "\n<div>\n<code>\n// Examples use USGS Earthquake API:\n// https://earthquake.usgs.gov/fdsnws/event/1/#methods\n\n// displays an animation of all USGS earthquakes\nlet earthquakes;\nlet eqFeatureIndex = 0;\n\nfunction preload() {\n  let url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';\n  httpDo(\n    url,\n    {\n      method: 'GET',\n      // Other Request options, like special headers for apis\n      headers: { authorization: 'Bearer secretKey' }\n    },\n    function(res) {\n      earthquakes = res;\n    }\n  );\n}\n\nfunction draw() {\n  // wait until the data is loaded\n  if (!earthquakes || !earthquakes.features[eqFeatureIndex]) {\n    return;\n  }\n  clear();\n\n  let feature = earthquakes.features[eqFeatureIndex];\n  let mag = feature.properties.mag;\n  let rad = mag / 11 * ((width + height) / 2);\n  fill(255, 0, 0, 100);\n  ellipse(width / 2 + random(-2, 2), height / 2 + random(-2, 2), rad, rad);\n\n  if (eqFeatureIndex >= earthquakes.features.length) {\n    eqFeatureIndex = 0;\n  } else {\n    eqFeatureIndex += 1;\n  }\n}\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'IO',
    submodule: 'Input',
    overloads: [
      {
        line: 919,
        params: [
          { name: 'path', description: '<p>name of the file or url to load</p>\n', type: 'String' },
          {
            name: 'method',
            description:
              '<p>either "GET", "POST", or "PUT",\n                                   defaults to "GET"</p>\n',
            type: 'String',
            optional: true
          },
          {
            name: 'datatype',
            description: '<p>"json", "jsonp", "xml", or "text"</p>\n',
            type: 'String',
            optional: true
          },
          {
            name: 'data',
            description: '<p>param data passed sent with request</p>\n',
            type: 'Object',
            optional: true
          },
          {
            name: 'callback',
            description:
              '<p>function to be executed after\n                                   <a href="#/p5/httpGet">httpGet()</a> completes, data is passed in\n                                   as first argument</p>\n',
            type: 'Function',
            optional: true
          },
          {
            name: 'errorCallback',
            description:
              '<p>function to be executed if\n                                   there is an error, response is passed\n                                   in as first argument</p>\n',
            type: 'Function',
            optional: true
          }
        ],
        return: {
          description:
            'A promise that resolves with the data when the operation\n                  completes successfully or rejects with the error after\n                  one occurs.',
          type: 'Promise'
        }
      },
      {
        line: 990,
        params: [
          { name: 'path', description: '', type: 'String' },
          {
            name: 'options',
            description:
              '<p>Request object options as documented in the\n                                   "fetch" API\n<a href="https://developer.mozilla.org/en/docs/Web/API/Fetch_API">reference</a></p>\n',
            type: 'Object'
          },
          { name: 'callback', description: '', type: 'Function', optional: true },
          { name: 'errorCallback', description: '', type: 'Function', optional: true }
        ],
        return: { description: '', type: 'Promise' }
      }
    ]
  },
  {
    itemtype: 'method',
    name: 'createWriter',
    params: [
      { name: 'name', description: '<p>name of the file to be created</p>\n', type: 'String' },
      { name: 'extension', description: '', type: 'String', optional: true }
    ],
    return: { description: '', type: 'p5.PrintWriter' },
    example: [
      "\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100);\n  background(200);\n  text('click here to save', 10, 10, 70, 80);\n}\n\nfunction mousePressed() {\n  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {\n    const writer = createWriter('squares.txt');\n    for (let i = 0; i < 10; i++) {\n      writer.print(i * i);\n    }\n    writer.close();\n    writer.clear();\n  }\n}\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'IO',
    submodule: 'Output'
  },
  {
    description: '<p>Writes data to the PrintWriter stream, and adds a new line at the end</p>\n',
    itemtype: 'method',
    name: 'print',
    params: [
      { name: 'data', description: '<p>all data to be printed by the PrintWriter</p>\n', type: 'Array' }
    ],
    example: [
      "\n<div class='norender notest'>\n<code>\n// creates a file called 'newFile.txt'\nlet writer = createWriter('newFile.txt');\n// creates a file containing\n//  My name is:\n//  Teddy\nwriter.print('My name is:');\nwriter.print('Teddy');\n// close the PrintWriter and save the file\nwriter.close();\n</code>\n</div>\n<div class='norender notest'>\n<code>\nlet writer;\n\nfunction setup() {\n  createCanvas(400, 400);\n  // create a PrintWriter\n  writer = createWriter('newFile.txt');\n}\n\nfunction draw() {\n  writer.print([mouseX, mouseY]);\n}\n\nfunction mouseClicked() {\n  writer.close();\n}\n</code>\n</div>"
    ],
    class: 'p5.PrintWriter',
    module: 'IO',
    submodule: 'Output'
  },
  {
    description: '<p>Clears the data already written to the PrintWriter object</p>\n',
    itemtype: 'method',
    name: 'clear',
    example: [
      "\n<div class =\"norender notest\"><code>\n// create writer object\nlet writer = createWriter('newFile.txt');\nwriter.write(['clear me']);\n// clear writer object here\nwriter.clear();\n// close writer\nwriter.close();\n</code></div>\n<div>\n<code>\nfunction setup() {\n  button = createButton('CLEAR ME');\n  button.position(21, 40);\n  button.mousePressed(createFile);\n}\n\nfunction createFile() {\n  let writer = createWriter('newFile.txt');\n  writer.write(['clear me']);\n  writer.clear();\n  writer.close();\n}\n</code>\n</div>\n"
    ],
    class: 'p5.PrintWriter',
    module: 'IO',
    submodule: 'Output'
  },
  {
    description:
      '<p>Saves a given element(image, text, json, csv, wav, or html) to the client\'s\ncomputer. The first parameter can be a pointer to element we want to save.\nThe element can be one of <a href="#/p5.Element">p5.Element</a>,an Array of\nStrings, an Array of JSON, a JSON object, a <a href="#/p5.Table">p5.Table\n</a>, a <a href="#/p5.Image">p5.Image</a>, or a p5.SoundFile (requires\np5.sound). The second parameter is a filename (including extension).The\nthird parameter is for options specific to this type of object. This method\nwill save a file that fits the given parameters.\nIf it is called without specifying an element, by default it will save the\nwhole canvas as an image file. You can optionally specify a filename as\nthe first parameter in such a case.\n<strong>Note that it is not recommended to\ncall this method within draw, as it will open a new save dialog on every\nrender.</strong></p>\n',
    itemtype: 'method',
    name: 'save',
    params: [
      {
        name: 'objectOrFilename',
        description:
          '<p>If filename is provided, will\n                                           save canvas as an image with\n                                           either png or jpg extension\n                                           depending on the filename.\n                                           If object is provided, will\n                                           save depending on the object\n                                           and filename (see examples\n                                           above).</p>\n',
        type: 'Object|String',
        optional: true
      },
      {
        name: 'filename',
        description:
          '<p>If an object is provided as the first\n                             parameter, then the second parameter\n                             indicates the filename,\n                             and should include an appropriate\n                             file extension (see examples above).</p>\n',
        type: 'String',
        optional: true
      },
      {
        name: 'options',
        description:
          '<p>Additional options depend on\n                          filetype. For example, when saving JSON,\n                          <code>true</code> indicates that the\n                          output will be optimized for filesize,\n                          rather than readability.</p>\n',
        type: 'Boolean|String',
        optional: true
      }
    ],
    example: [
      "\n <div class=\"norender\"><code>\n // Saves the canvas as an image\n cnv = createCanvas(300, 300);\n save(cnv, 'myCanvas.jpg');\n\n // Saves the canvas as an image by default\n save('myCanvas.jpg');\n </code></div>\n\n<div class=\"norender\"><code>\n // Saves p5.Image as an image\n img = createImage(10, 10);\n save(img, 'myImage.png');\n </code></div>\n\n <div class=\"norender\"><code>\n // Saves p5.Renderer object as an image\n obj = createGraphics(100, 100);\n save(obj, 'myObject.png');\n </code></div>\n\n <div class=\"norender\"><code>\n let myTable = new p5.Table();\n // Saves table as html file\n save(myTable, 'myTable.html');\n\n // Comma Separated Values\n save(myTable, 'myTable.csv');\n\n // Tab Separated Values\n save(myTable, 'myTable.tsv');\n </code></div>\n\n <div class=\"norender\"><code>\n let myJSON = { a: 1, b: true };\n\n // Saves pretty JSON\n save(myJSON, 'my.json');\n\n // Optimizes JSON filesize\n save(myJSON, 'my.json', true);\n </code></div>\n\n <div class=\"norender\"><code>\n // Saves array of strings to text file with line breaks after each item\n let arrayOfStrings = ['a', 'b'];\n save(arrayOfStrings, 'my.txt');\n </code></div>"
    ],
    alt: 'An example for saving a canvas as an image.\n An example for saving a p5.Image element as an image.\n An example for saving a p5.Renderer element.\n An example showing how to save a table in formats of HTML, CSV and TSV.\n An example for saving JSON to a txt file with some extra arguments.\n An example for saving an array of strings to text file with line breaks.',
    class: 'p5',
    module: 'IO',
    submodule: 'Output'
  },
  {
    description:
      '<p>Writes the contents of an Array or a JSON object to a .json file.\nThe file saving process and location of the saved file will\nvary between web browsers.</p>\n',
    itemtype: 'method',
    name: 'saveJSON',
    params: [
      { name: 'json', description: '', type: 'Array|Object' },
      { name: 'filename', description: '', type: 'String' },
      {
        name: 'optimize',
        description:
          '<p>If true, removes line breaks\n                               and spaces from the output\n                               file to optimize filesize\n                               (but not readability).</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    example: [
      '\n <div><code>\n let json = {}; // new  JSON Object\n\n json.id = 0;\n json.species = \'Panthera leo\';\n json.name = \'Lion\';\n\n function setup() {\n createCanvas(100, 100);\n background(200);\n text(\'click here to save\', 10, 10, 70, 80);\n }\n\n function mousePressed() {\n if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {\n   saveJSON(json, \'lion.json\');\n }\n }\n\n // saves the following to a file called "lion.json":\n // {\n //   "id": 0,\n //   "species": "Panthera leo",\n //   "name": "Lion"\n // }\n </code></div>'
    ],
    alt: 'no image displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Output'
  },
  {
    description:
      '<p>Writes an array of Strings to a text file, one line per String.\nThe file saving process and location of the saved file will\nvary between web browsers.</p>\n',
    itemtype: 'method',
    name: 'saveStrings',
    params: [
      { name: 'list', description: '<p>string array to be written</p>\n', type: 'String[]' },
      { name: 'filename', description: '<p>filename for output</p>\n', type: 'String' },
      { name: 'extension', description: "<p>the filename's extension</p>\n", type: 'String', optional: true },
      {
        name: 'isCRLF',
        description: '<p>if true, change line-break to CRLF</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    example: [
      "\n <div><code>\n let words = 'apple bear cat dog';\n\n // .split() outputs an Array\n let list = split(words, ' ');\n\n function setup() {\n createCanvas(100, 100);\n background(200);\n text('click here to save', 10, 10, 70, 80);\n }\n\n function mousePressed() {\n if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {\n   saveStrings(list, 'nouns.txt');\n }\n }\n\n // Saves the following to a file called 'nouns.txt':\n //\n // apple\n // bear\n // cat\n // dog\n </code></div>"
    ],
    alt: 'no image displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Output'
  },
  {
    description:
      "<p>Writes the contents of a <a href=\"#/p5.Table\">Table</a> object to a file. Defaults to a\ntext file with comma-separated-values ('csv') but can also\nuse tab separation ('tsv'), or generate an HTML table ('html').\nThe file saving process and location of the saved file will\nvary between web browsers.</p>\n",
    itemtype: 'method',
    name: 'saveTable',
    params: [
      {
        name: 'Table',
        description: '<p>the <a href="#/p5.Table">Table</a> object to save to a file</p>\n',
        type: 'p5.Table'
      },
      {
        name: 'filename',
        description: '<p>the filename to which the Table should be saved</p>\n',
        type: 'String'
      },
      {
        name: 'options',
        description: '<p>can be one of "tsv", "csv", or "html"</p>\n',
        type: 'String',
        optional: true
      }
    ],
    example: [
      "\n<div><code>\n let table;\n\n function setup() {\n table = new p5.Table();\n\n table.addColumn('id');\n table.addColumn('species');\n table.addColumn('name');\n\n let newRow = table.addRow();\n newRow.setNum('id', table.getRowCount() - 1);\n newRow.setString('species', 'Panthera leo');\n newRow.setString('name', 'Lion');\n\n // To save, un-comment next line then click 'run'\n // saveTable(table, 'new.csv');\n }\n\n // Saves the following to a file called 'new.csv':\n // id,species,name\n // 0,Panthera leo,Lion\n </code></div>"
    ],
    alt: 'no image displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Output'
  },
  {
    description:
      '<p>Trims leading and trailing whitespace, such as spaces and tabs,\nfrom String table values. If no column is specified, then the\nvalues in all columns and rows are trimmed. A specific column\nmay be referenced by either its ID or title.</p>\n',
    itemtype: 'method',
    name: 'trim',
    params: [
      {
        name: 'column',
        description: '<p>Column ID (number)\n                                 or name (string)</p>\n',
        type: 'String|Integer',
        optional: true
      }
    ],
    example: [
      "\n <div class=\"norender\"><code>\n function setup() {\n let table = new p5.Table();\n\n table.addColumn('name');\n table.addColumn('type');\n\n let newRow = table.addRow();\n newRow.setString('name', '   Lion  ,');\n newRow.setString('type', ' Mammal  ');\n\n newRow = table.addRow();\n newRow.setString('name', '  Snake  ');\n newRow.setString('type', '  Reptile  ');\n\n table.trim();\n print(table.getArray());\n }\n\n // prints:\n //  0  \"Lion\"   \"Mamal\"\n //  1  \"Snake\"  \"Reptile\"\n </code></div>"
    ],
    class: 'p5.Table',
    module: 'IO',
    submodule: 'Table'
  },
  {
    description:
      "<p>Stores a value in the Table's specified row and column.\nThe row is specified by its ID, while the column may be specified\nby either its ID or title.</p>\n",
    itemtype: 'method',
    name: 'set',
    params: [
      { name: 'row', description: '<p>row ID</p>\n', type: 'Integer' },
      {
        name: 'column',
        description: '<p>column ID (Number)\n                              or title (String)</p>\n',
        type: 'String|Integer'
      },
      { name: 'value', description: '<p>value to assign</p>\n', type: 'String|Number' }
    ],
    example: [
      "\n<div class=\"norender\">\n<code>\n// Given the CSV file \"mammals.csv\"\n// in the project's \"assets\" folder:\n//\n// id,species,name\n// 0,Capra hircus,Goat\n// 1,Panthera pardus,Leopard\n// 2,Equus zebra,Zebra\n\nlet table;\n\nfunction preload() {\n  //my table is comma separated value \"csv\"\n  //and has a header specifying the columns labels\n  table = loadTable('assets/mammals.csv', 'csv', 'header');\n}\n\nfunction setup() {\n  table.set(0, 'species', 'Canis Lupus');\n  table.set(0, 'name', 'Wolf');\n\n  //print the results\n  for (let r = 0; r < table.getRowCount(); r++)\n    for (let c = 0; c < table.getColumnCount(); c++)\n      print(table.getString(r, c));\n}\n</code>\n</div>"
    ],
    alt: 'no image displayed',
    class: 'p5.Table',
    module: 'IO',
    submodule: 'Table'
  },
  {
    description:
      "<p>Retrieves a value from the Table's specified row and column.\nThe row is specified by its ID, while the column may be specified by\neither its ID or title.</p>\n",
    itemtype: 'method',
    name: 'get',
    params: [
      { name: 'row', description: '<p>row ID</p>\n', type: 'Integer' },
      {
        name: 'column',
        description: '<p>columnName (string) or\n                                  ID (number)</p>\n',
        type: 'String|Integer'
      }
    ],
    return: { description: '', type: 'String|Number' },
    example: [
      "\n<div class=\"norender\">\n<code>\n// Given the CSV file \"mammals.csv\"\n// in the project's \"assets\" folder:\n//\n// id,species,name\n// 0,Capra hircus,Goat\n// 1,Panthera pardus,Leopard\n// 2,Equus zebra,Zebra\n\nlet table;\n\nfunction preload() {\n  //my table is comma separated value \"csv\"\n  //and has a header specifying the columns labels\n  table = loadTable('assets/mammals.csv', 'csv', 'header');\n}\n\nfunction setup() {\n  print(table.get(0, 1));\n  //Capra hircus\n  print(table.get(0, 'species'));\n  //Capra hircus\n}\n</code>\n</div>"
    ],
    alt: 'no image displayed',
    class: 'p5.Table',
    module: 'IO',
    submodule: 'Table'
  },
  {
    description:
      "<p>Stores a value in the TableRow's specified column.\nThe column may be specified by either its ID or title.</p>\n",
    itemtype: 'method',
    name: 'set',
    params: [
      {
        name: 'column',
        description: '<p>Column ID (Number)\n                              or Title (String)</p>\n',
        type: 'String|Integer'
      },
      { name: 'value', description: '<p>The value to be stored</p>\n', type: 'String|Number' }
    ],
    example: [
      "\n <div class=\"norender\"><code>\n // Given the CSV file \"mammals.csv\" in the project's \"assets\" folder:\n //\n // id,species,name\n // 0,Capra hircus,Goat\n // 1,Panthera pardus,Leopard\n // 2,Equus zebra,Zebra\n\n let table;\n\n function preload() {\n //my table is comma separated value \"csv\"\n //and has a header specifying the columns labels\n table = loadTable('assets/mammals.csv', 'csv', 'header');\n }\n\n function setup() {\n let rows = table.getRows();\n for (let r = 0; r < rows.length; r++) {\n   rows[r].set('name', 'Unicorn');\n }\n\n //print the results\n print(table.getArray());\n }\n </code></div>"
    ],
    alt: 'no image displayed',
    class: 'p5.TableRow',
    module: 'IO',
    submodule: 'Table'
  },
  {
    description:
      "<p>Retrieves a value from the TableRow's specified column.\nThe column may be specified by either its ID or title.</p>\n",
    itemtype: 'method',
    name: 'get',
    params: [
      {
        name: 'column',
        description: '<p>columnName (string) or\n                                 ID (number)</p>\n',
        type: 'String|Integer'
      }
    ],
    return: { description: '', type: 'String|Number' },
    example: [
      "\n <div class=\"norender\"><code>\n // Given the CSV file \"mammals.csv\" in the project's \"assets\" folder:\n //\n // id,species,name\n // 0,Capra hircus,Goat\n // 1,Panthera pardus,Leopard\n // 2,Equus zebra,Zebra\n\n let table;\n\n function preload() {\n //my table is comma separated value \"csv\"\n //and has a header specifying the columns labels\n table = loadTable('assets/mammals.csv', 'csv', 'header');\n }\n\n function setup() {\n let names = [];\n let rows = table.getRows();\n for (let r = 0; r < rows.length; r++) {\n   names.push(rows[r].get('name'));\n }\n\n print(names);\n }\n </code></div>"
    ],
    alt: 'no image displayed',
    class: 'p5.TableRow',
    module: 'IO',
    submodule: 'Table'
  },
  {
    description:
      '<p>Calculates the absolute value (magnitude) of a number. Maps to Math.abs().\nThe absolute value of a number is always positive.</p>\n',
    itemtype: 'method',
    name: 'abs',
    params: [{ name: 'n', description: '<p>number to compute</p>\n', type: 'Number' }],
    return: { description: 'absolute value of given number', type: 'Number' },
    example: [
      '\n<div class = "norender"><code>\nfunction setup() {\n  let x = -3;\n  let y = abs(x);\n\n  print(x); // -3\n  print(y); // 3\n}\n</code></div>'
    ],
    alt: 'no image displayed',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Calculates the closest int value that is greater than or equal to the\nvalue of the parameter. Maps to Math.ceil(). For example, ceil(9.03)\nreturns the value 10.</p>\n',
    itemtype: 'method',
    name: 'ceil',
    params: [{ name: 'n', description: '<p>number to round up</p>\n', type: 'Number' }],
    return: { description: 'rounded up number', type: 'Integer' },
    example: [
      '\n<div><code>\nfunction draw() {\n  background(200);\n  // map, mouseX between 0 and 5.\n  let ax = map(mouseX, 0, 100, 0, 5);\n  let ay = 66;\n\n  //Get the ceiling of the mapped number.\n  let bx = ceil(map(mouseX, 0, 100, 0, 5));\n  let by = 33;\n\n  // Multiply the mapped numbers by 20 to more easily\n  // see the changes.\n  stroke(0);\n  fill(0);\n  line(0, ay, ax * 20, ay);\n  line(0, by, bx * 20, by);\n\n  // Reformat the float returned by map and draw it.\n  noStroke();\n  text(nfc(ax, 2), ax, ay - 5);\n  text(nfc(bx, 1), bx, by - 5);\n}\n</code></div>'
    ],
    alt: '2 horizontal lines & number sets. increase with mouse x. bottom to 2 decimals',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description: '<p>Constrains a value between a minimum and maximum value.</p>\n',
    itemtype: 'method',
    name: 'constrain',
    params: [
      { name: 'n', description: '<p>number to constrain</p>\n', type: 'Number' },
      { name: 'low', description: '<p>minimum limit</p>\n', type: 'Number' },
      { name: 'high', description: '<p>maximum limit</p>\n', type: 'Number' }
    ],
    return: { description: 'constrained number', type: 'Number' },
    example: [
      '\n<div><code>\nfunction draw() {\n  background(200);\n\n  let leftWall = 25;\n  let rightWall = 75;\n\n  // xm is just the mouseX, while\n  // xc is the mouseX, but constrained\n  // between the leftWall and rightWall!\n  let xm = mouseX;\n  let xc = constrain(mouseX, leftWall, rightWall);\n\n  // Draw the walls.\n  stroke(150);\n  line(leftWall, 0, leftWall, height);\n  line(rightWall, 0, rightWall, height);\n\n  // Draw xm and xc as circles.\n  noStroke();\n  fill(150);\n  ellipse(xm, 33, 9, 9); // Not Constrained\n  fill(0);\n  ellipse(xc, 66, 9, 9); // Constrained\n}\n</code></div>'
    ],
    alt: '2 vertical lines. 2 ellipses move with mouse X 1 does not move passed lines',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Calculates the distance between two points, in either two or three dimensions.\nIf you looking for distance between two vectors see <a herf="#/p5.Vector/dist">dist()</a></p>\n',
    itemtype: 'method',
    name: 'dist',
    return: { description: 'distance between the two points', type: 'Number' },
    example: [
      "\n<div><code>\n// Move your mouse inside the canvas to see the\n// change in distance between two points!\nfunction draw() {\n  background(200);\n  fill(0);\n\n  let x1 = 10;\n  let y1 = 90;\n  let x2 = mouseX;\n  let y2 = mouseY;\n\n  line(x1, y1, x2, y2);\n  ellipse(x1, y1, 7, 7);\n  ellipse(x2, y2, 7, 7);\n\n  // d is the length of the line\n  // the distance from point 1 to point 2.\n  let d = dist(x1, y1, x2, y2);\n\n  // Let's write d along the line we are drawing!\n  push();\n  translate((x1 + x2) / 2, (y1 + y2) / 2);\n  rotate(atan2(y2 - y1, x2 - x1));\n  text(nfc(d, 1), 0, -5);\n  pop();\n  // Fancy!\n}\n</code></div>"
    ],
    alt: '2 ellipses joined by line. 1 ellipse moves with mouse X&Y. Distance displayed.',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation',
    overloads: [
      {
        line: 116,
        params: [
          { name: 'x1', description: '<p>x-coordinate of the first point</p>\n', type: 'Number' },
          { name: 'y1', description: '<p>y-coordinate of the first point</p>\n', type: 'Number' },
          { name: 'x2', description: '<p>x-coordinate of the second point</p>\n', type: 'Number' },
          { name: 'y2', description: '<p>y-coordinate of the second point</p>\n', type: 'Number' }
        ],
        return: { description: 'distance between the two points', type: 'Number' }
      },
      {
        line: 161,
        params: [
          { name: 'x1', description: '', type: 'Number' },
          { name: 'y1', description: '', type: 'Number' },
          { name: 'z1', description: '<p>z-coordinate of the first point</p>\n', type: 'Number' },
          { name: 'x2', description: '', type: 'Number' },
          { name: 'y2', description: '', type: 'Number' },
          { name: 'z2', description: '<p>z-coordinate of the second point</p>\n', type: 'Number' }
        ],
        return: { description: 'distance between the two points', type: 'Number' }
      }
    ]
  },
  {
    description:
      "<p>Returns Euler's number e (2.71828...) raised to the power of the n\nparameter. Maps to Math.exp().</p>\n",
    itemtype: 'method',
    name: 'exp',
    params: [{ name: 'n', description: '<p>exponent to raise</p>\n', type: 'Number' }],
    return: { description: 'e^n', type: 'Number' },
    example: [
      "\n<div><code>\nfunction draw() {\n  background(200);\n\n  // Compute the exp() function with a value between 0 and 2\n  let xValue = map(mouseX, 0, width, 0, 2);\n  let yValue = exp(xValue);\n\n  let y = map(yValue, 0, 8, height, 0);\n\n  let legend = 'exp (' + nfc(xValue, 3) + ')\\n= ' + nf(yValue, 1, 4);\n  stroke(150);\n  line(mouseX, y, mouseX, height);\n  fill(0);\n  text(legend, 5, 15);\n  noStroke();\n  ellipse(mouseX, y, 7, 7);\n\n  // Draw the exp(x) curve,\n  // over the domain of x from 0 to 2\n  noFill();\n  stroke(0);\n  beginShape();\n  for (let x = 0; x < width; x++) {\n    xValue = map(x, 0, width, 0, 2);\n    yValue = exp(xValue);\n    y = map(yValue, 0, 8, height, 0);\n    vertex(x, y);\n  }\n\n  endShape();\n  line(0, 0, 0, height);\n  line(0, height - 1, width, height - 1);\n}\n</code></div>"
    ],
    alt: 'ellipse moves along a curve with mouse x. e^n displayed.',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Calculates the closest int value that is less than or equal to the\nvalue of the parameter. Maps to Math.floor().</p>\n',
    itemtype: 'method',
    name: 'floor',
    params: [{ name: 'n', description: '<p>number to round down</p>\n', type: 'Number' }],
    return: { description: 'rounded down number', type: 'Integer' },
    example: [
      '\n<div><code>\nfunction draw() {\n  background(200);\n  //map, mouseX between 0 and 5.\n  let ax = map(mouseX, 0, 100, 0, 5);\n  let ay = 66;\n\n  //Get the floor of the mapped number.\n  let bx = floor(map(mouseX, 0, 100, 0, 5));\n  let by = 33;\n\n  // Multiply the mapped numbers by 20 to more easily\n  // see the changes.\n  stroke(0);\n  fill(0);\n  line(0, ay, ax * 20, ay);\n  line(0, by, bx * 20, by);\n\n  // Reformat the float returned by map and draw it.\n  noStroke();\n  text(nfc(ax, 2), ax, ay - 5);\n  text(nfc(bx, 1), bx, by - 5);\n}\n</code></div>'
    ],
    alt: '2 horizontal lines & number sets. increase with mouse x. bottom to 2 decimals',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Calculates a number between two numbers at a specific increment. The amt\nparameter is the amount to interpolate between the two values where 0.0\nequal to the first point, 0.1 is very near the first point, 0.5 is\nhalf-way in between, and 1.0 is equal to the second point. If the\nvalue of amt is more than 1.0 or less than 0.0, the number will be\ncalculated accordingly in the ratio of the two given numbers. The lerp\nfunction is convenient for creating motion along a straight\npath and for drawing dotted lines.</p>\n',
    itemtype: 'method',
    name: 'lerp',
    params: [
      { name: 'start', description: '<p>first value</p>\n', type: 'Number' },
      { name: 'stop', description: '<p>second value</p>\n', type: 'Number' },
      { name: 'amt', description: '<p>number</p>\n', type: 'Number' }
    ],
    return: { description: 'lerped value', type: 'Number' },
    example: [
      '\n<div><code>\nfunction setup() {\n  background(200);\n  let a = 20;\n  let b = 80;\n  let c = lerp(a, b, 0.2);\n  let d = lerp(a, b, 0.5);\n  let e = lerp(a, b, 0.8);\n\n  let y = 50;\n\n  strokeWeight(5);\n  stroke(0); // Draw the original points in black\n  point(a, y);\n  point(b, y);\n\n  stroke(100); // Draw the lerp points in gray\n  point(c, y);\n  point(d, y);\n  point(e, y);\n}\n</code></div>'
    ],
    alt: '5 points horizontally staggered mid-canvas. mid 3 are grey, outer black',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Calculates the natural logarithm (the base-e logarithm) of a number. This\nfunction expects the n parameter to be a value greater than 0.0. Maps to\nMath.log().</p>\n',
    itemtype: 'method',
    name: 'log',
    params: [{ name: 'n', description: '<p>number greater than 0</p>\n', type: 'Number' }],
    return: { description: 'natural logarithm of n', type: 'Number' },
    example: [
      "\n<div><code>\nfunction draw() {\n  background(200);\n  let maxX = 2.8;\n  let maxY = 1.5;\n\n  // Compute the natural log of a value between 0 and maxX\n  let xValue = map(mouseX, 0, width, 0, maxX);\n  let yValue, y;\n  if (xValue > 0) {\n   // Cannot take the log of a negative number.\n    yValue = log(xValue);\n    y = map(yValue, -maxY, maxY, height, 0);\n\n    // Display the calculation occurring.\n    let legend = 'log(' + nf(xValue, 1, 2) + ')\\n= ' + nf(yValue, 1, 3);\n    stroke(150);\n    line(mouseX, y, mouseX, height);\n    fill(0);\n    text(legend, 5, 15);\n    noStroke();\n    ellipse(mouseX, y, 7, 7);\n  }\n\n  // Draw the log(x) curve,\n  // over the domain of x from 0 to maxX\n  noFill();\n  stroke(0);\n  beginShape();\n  for (let x = 0; x < width; x++) {\n    xValue = map(x, 0, width, 0, maxX);\n    yValue = log(xValue);\n    y = map(yValue, -maxY, maxY, height, 0);\n    vertex(x, y);\n  }\n  endShape();\n  line(0, 0, 0, height);\n  line(0, height / 2, width, height / 2);\n}\n</code></div>"
    ],
    alt: 'ellipse moves along a curve with mouse x. natural logarithm of n displayed.',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Calculates the magnitude (or length) of a vector. A vector is a direction\nin space commonly used in computer graphics and linear algebra. Because it\nhas no "start" position, the magnitude of a vector can be thought of as\nthe distance from the coordinate 0,0 to its x,y value. Therefore, <a href="#/p5/mag">mag()</a> is\na shortcut for writing dist(0, 0, x, y).</p>\n',
    itemtype: 'method',
    name: 'mag',
    params: [
      { name: 'a', description: '<p>first value</p>\n', type: 'Number' },
      { name: 'b', description: '<p>second value</p>\n', type: 'Number' }
    ],
    return: { description: 'magnitude of vector from (0,0) to (a,b)', type: 'Number' },
    example: [
      '\n<div><code>\nfunction setup() {\n  let x1 = 20;\n  let x2 = 80;\n  let y1 = 30;\n  let y2 = 70;\n\n  line(0, 0, x1, y1);\n  print(mag(x1, y1)); // Prints "36.05551275463989"\n  line(0, 0, x2, y1);\n  print(mag(x2, y1)); // Prints "85.44003745317531"\n  line(0, 0, x1, y2);\n  print(mag(x1, y2)); // Prints "72.80109889280519"\n  line(0, 0, x2, y2);\n  print(mag(x2, y2)); // Prints "106.3014581273465"\n}\n</code></div>'
    ],
    alt: '4 lines of different length radiate from top left of canvas.',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Re-maps a number from one range to another.</p>\n<p>In the first example above, the number 25 is converted from a value in the\nrange of 0 to 100 into a value that ranges from the left edge of the\nwindow (0) to the right edge (width).</p>\n',
    itemtype: 'method',
    name: 'map',
    params: [
      { name: 'value', description: '<p>the incoming value to be converted</p>\n', type: 'Number' },
      { name: 'start1', description: "<p>lower bound of the value's current range</p>\n", type: 'Number' },
      { name: 'stop1', description: "<p>upper bound of the value's current range</p>\n", type: 'Number' },
      { name: 'start2', description: "<p>lower bound of the value's target range</p>\n", type: 'Number' },
      { name: 'stop2', description: "<p>upper bound of the value's target range</p>\n", type: 'Number' },
      {
        name: 'withinBounds',
        description: '<p>constrain the value to the newly mapped range</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    return: { description: 'remapped number', type: 'Number' },
    example: [
      '\n  <div><code>\nlet value = 25;\nlet m = map(value, 0, 100, 0, width);\nellipse(m, 50, 10, 10);\n</code></div>\n\n  <div><code>\nfunction setup() {\n  noStroke();\n}\n\nfunction draw() {\n  background(204);\n  let x1 = map(mouseX, 0, width, 25, 75);\n  ellipse(x1, 25, 25, 25);\n  //This ellipse is constrained to the 0-100 range\n  //after setting withinBounds to true\n  let x2 = map(mouseX, 0, width, 0, 100, true);\n  ellipse(x2, 75, 25, 25);\n}\n</code></div>'
    ],
    alt: '10 by 10 white ellipse with in mid left canvas\n2 25 by 25 white ellipses move with mouse x. Bottom has more range from X',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Determines the largest value in a sequence of numbers, and then returns\nthat value. <a href="#/p5/max">max()</a> accepts any number of Number parameters, or an Array\nof any length.</p>\n',
    itemtype: 'method',
    name: 'max',
    return: { description: 'maximum Number', type: 'Number' },
    example: [
      "\n<div><code>\nfunction setup() {\n  // Change the elements in the array and run the sketch\n  // to show how max() works!\n  let numArray = [2, 1, 5, 4, 8, 9];\n  fill(0);\n  noStroke();\n  text('Array Elements', 0, 10);\n  // Draw all numbers in the array\n  let spacing = 15;\n  let elemsY = 25;\n  for (let i = 0; i < numArray.length; i++) {\n    text(numArray[i], i * spacing, elemsY);\n  }\n  let maxX = 33;\n  let maxY = 80;\n  // Draw the Maximum value in the array.\n  textSize(32);\n  text(max(numArray), maxX, maxY);\n}\n</code></div>"
    ],
    alt: 'Small text at top reads: Array Elements 2 1 5 4 8 9. Large text at center: 9',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation',
    overloads: [
      {
        line: 464,
        params: [
          { name: 'n0', description: '<p>Number to compare</p>\n', type: 'Number' },
          { name: 'n1', description: '<p>Number to compare</p>\n', type: 'Number' }
        ],
        return: { description: 'maximum Number', type: 'Number' }
      },
      {
        line: 499,
        params: [{ name: 'nums', description: '<p>Numbers to compare</p>\n', type: 'Number[]' }],
        return: { description: '', type: 'Number' }
      }
    ]
  },
  {
    description:
      '<p>Determines the smallest value in a sequence of numbers, and then returns\nthat value. <a href="#/p5/min">min()</a> accepts any number of Number parameters, or an Array\nof any length.</p>\n',
    itemtype: 'method',
    name: 'min',
    return: { description: 'minimum Number', type: 'Number' },
    example: [
      "\n<div><code>\nfunction setup() {\n  // Change the elements in the array and run the sketch\n  // to show how min() works!\n  let numArray = [2, 1, 5, 4, 8, 9];\n  fill(0);\n  noStroke();\n  text('Array Elements', 0, 10);\n  // Draw all numbers in the array\n  let spacing = 15;\n  let elemsY = 25;\n  for (let i = 0; i < numArray.length; i++) {\n    text(numArray[i], i * spacing, elemsY);\n  }\n  let maxX = 33;\n  let maxY = 80;\n  // Draw the Minimum value in the array.\n  textSize(32);\n  text(min(numArray), maxX, maxY);\n}\n</code></div>"
    ],
    alt: 'Small text at top reads: Array Elements 2 1 5 4 8 9. Large text at center: 1',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation',
    overloads: [
      {
        line: 512,
        params: [
          { name: 'n0', description: '<p>Number to compare</p>\n', type: 'Number' },
          { name: 'n1', description: '<p>Number to compare</p>\n', type: 'Number' }
        ],
        return: { description: 'minimum Number', type: 'Number' }
      },
      {
        line: 547,
        params: [{ name: 'nums', description: '<p>Numbers to compare</p>\n', type: 'Number[]' }],
        return: { description: '', type: 'Number' }
      }
    ]
  },
  {
    description:
      '<p>Normalizes a number from another range into a value between 0 and 1.\nIdentical to map(value, low, high, 0, 1).\nNumbers outside of the range are not clamped to 0 and 1, because\nout-of-range values are often intentional and useful. (See the example above.)</p>\n',
    itemtype: 'method',
    name: 'norm',
    params: [
      { name: 'value', description: '<p>incoming value to be normalized</p>\n', type: 'Number' },
      { name: 'start', description: "<p>lower bound of the value's current range</p>\n", type: 'Number' },
      { name: 'stop', description: "<p>upper bound of the value's current range</p>\n", type: 'Number' }
    ],
    return: { description: 'normalized number', type: 'Number' },
    example: [
      "\n<div><code>\nfunction draw() {\n  background(200);\n  let currentNum = mouseX;\n  let lowerBound = 0;\n  let upperBound = width; //100;\n  let normalized = norm(currentNum, lowerBound, upperBound);\n  let lineY = 70;\n  stroke(3);\n  line(0, lineY, width, lineY);\n  //Draw an ellipse mapped to the non-normalized value.\n  noStroke();\n  fill(50);\n  let s = 7; // ellipse size\n  ellipse(currentNum, lineY, s, s);\n\n  // Draw the guide\n  let guideY = lineY + 15;\n  text('0', 0, guideY);\n  textAlign(RIGHT);\n  text('100', width, guideY);\n\n  // Draw the normalized value\n  textAlign(LEFT);\n  fill(0);\n  textSize(32);\n  let normalY = 40;\n  let normalX = 20;\n  text(normalized, normalX, normalY);\n}\n</code></div>"
    ],
    alt: 'ellipse moves with mouse. 0 shown left & 100 right and updating values center',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Facilitates exponential expressions. The <a href="#/p5/pow">pow()</a> function is an efficient\nway of multiplying numbers by themselves (or their reciprocals) in large\nquantities. For example, pow(3, 5) is equivalent to the expression\n3 × 3 × 3 × 3 × 3 and pow(3, -5) is equivalent to 1 /\n3 × 3 × 3 × 3 × 3. Maps to\nMath.pow().</p>\n',
    itemtype: 'method',
    name: 'pow',
    params: [
      { name: 'n', description: '<p>base of the exponential expression</p>\n', type: 'Number' },
      { name: 'e', description: '<p>power by which to raise the base</p>\n', type: 'Number' }
    ],
    return: { description: 'n^e', type: 'Number' },
    example: [
      '\n<div><code>\nfunction setup() {\n  //Exponentially increase the size of an ellipse.\n  let eSize = 3; // Original Size\n  let eLoc = 10; // Original Location\n\n  ellipse(eLoc, eLoc, eSize, eSize);\n\n  ellipse(eLoc * 2, eLoc * 2, pow(eSize, 2), pow(eSize, 2));\n\n  ellipse(eLoc * 4, eLoc * 4, pow(eSize, 3), pow(eSize, 3));\n\n  ellipse(eLoc * 8, eLoc * 8, pow(eSize, 4), pow(eSize, 4));\n}\n</code></div>'
    ],
    alt: 'small to large ellipses radiating from top left of canvas',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Calculates the integer closest to the n parameter. For example,\nround(133.8) returns the value 134. Maps to Math.round().</p>\n',
    itemtype: 'method',
    name: 'round',
    params: [
      { name: 'n', description: '<p>number to round</p>\n', type: 'Number' },
      {
        name: 'decimals',
        description: '<p>number of decimal places to round to, default is 0</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    return: { description: 'rounded number', type: 'Integer' },
    example: [
      '\n<div><code>\nlet x = round(3.7);\ntext(x, width / 2, height / 2);\n</code></div>\n<div><code>\nlet x = round(12.782383, 2);\ntext(x, width / 2, height / 2);\n</code></div>\n<div><code>\nfunction draw() {\n  background(200);\n  //map, mouseX between 0 and 5.\n  let ax = map(mouseX, 0, 100, 0, 5);\n  let ay = 66;\n\n  // Round the mapped number.\n  let bx = round(map(mouseX, 0, 100, 0, 5));\n  let by = 33;\n\n  // Multiply the mapped numbers by 20 to more easily\n  // see the changes.\n  stroke(0);\n  fill(0);\n  line(0, ay, ax * 20, ay);\n  line(0, by, bx * 20, by);\n\n  // Reformat the float returned by map and draw it.\n  noStroke();\n  text(nfc(ax, 2), ax, ay - 5);\n  text(nfc(bx, 1), bx, by - 5);\n}\n</code></div>'
    ],
    alt: '"4" written in middle of canvas\n"12.78" written in middle of canvas\ntwo horizontal lines rounded values displayed on top.',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Squares a number (multiplies a number by itself). The result is always a\npositive number, as multiplying two negative numbers always yields a\npositive result. For example, -1 * -1 = 1.</p>\n',
    itemtype: 'method',
    name: 'sq',
    params: [{ name: 'n', description: '<p>number to square</p>\n', type: 'Number' }],
    return: { description: 'squared number', type: 'Number' },
    example: [
      "\n<div><code>\nfunction draw() {\n  background(200);\n  let eSize = 7;\n  let x1 = map(mouseX, 0, width, 0, 10);\n  let y1 = 80;\n  let x2 = sq(x1);\n  let y2 = 20;\n\n  // Draw the non-squared.\n  line(0, y1, width, y1);\n  ellipse(x1, y1, eSize, eSize);\n\n  // Draw the squared.\n  line(0, y2, width, y2);\n  ellipse(x2, y2, eSize, eSize);\n\n  // Draw dividing line.\n  stroke(100);\n  line(0, height / 2, width, height / 2);\n\n  // Draw text.\n  let spacing = 15;\n  noStroke();\n  fill(0);\n  text('x = ' + x1, 0, y1 + spacing);\n  text('sq(x) = ' + x2, 0, y2 + spacing);\n}\n</code></div>"
    ],
    alt: 'horizontal center line squared values displayed on top and regular on bottom.',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Calculates the square root of a number. The square root of a number is\nalways positive, even though there may be a valid negative root. The\nsquare root s of number a is such that s*s = a. It is the opposite of\nsquaring. Maps to Math.sqrt().</p>\n',
    itemtype: 'method',
    name: 'sqrt',
    params: [{ name: 'n', description: '<p>non-negative number to square root</p>\n', type: 'Number' }],
    return: { description: 'square root of number', type: 'Number' },
    example: [
      "\n<div><code>\nfunction draw() {\n  background(200);\n  let eSize = 7;\n  let x1 = mouseX;\n  let y1 = 80;\n  let x2 = sqrt(x1);\n  let y2 = 20;\n\n  // Draw the non-squared.\n  line(0, y1, width, y1);\n  ellipse(x1, y1, eSize, eSize);\n\n  // Draw the squared.\n  line(0, y2, width, y2);\n  ellipse(x2, y2, eSize, eSize);\n\n  // Draw dividing line.\n  stroke(100);\n  line(0, height / 2, width, height / 2);\n\n  // Draw text.\n  noStroke();\n  fill(0);\n  let spacing = 15;\n  text('x = ' + x1, 0, y1 + spacing);\n  text('sqrt(x) = ' + x2, 0, y2 + spacing);\n}\n</code></div>"
    ],
    alt: 'horizontal center line squareroot values displayed on top and regular on bottom.',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description: '<p>Calculates the fractional part of a number.</p>\n',
    itemtype: 'method',
    name: 'fract',
    params: [
      {
        name: 'num',
        description: '<p>Number whose fractional part needs to be found out</p>\n',
        type: 'Number'
      }
    ],
    return: { description: 'fractional part of x, i.e, {x}', type: 'Number' },
    example: [
      '\n<div><code>\ntext(7345.73472742, 10, 25);\ntext(fract(7345.73472742), 10, 75);\n</code></div>\n\n<div><code>\ntext(1.4215e-15, 10, 25);\ntext(fract(1.4215e-15), 10, 75);\n</code></div>'
    ],
    alt: 'first row having a number and the second having the fractional part of the number\nfirst row having a number expressed in scientific notation and the second having the fractional part of the number',
    class: 'p5',
    module: 'Math',
    submodule: 'Calculation'
  },
  {
    description:
      '<p>Creates a new <a href="#/p5.Vector">p5.Vector</a> (the datatype for storing vectors). This provides a\ntwo or three dimensional vector, specifically a Euclidean (also known as\ngeometric) vector. A vector is an entity that has both magnitude and\ndirection.</p>\n',
    itemtype: 'method',
    name: 'createVector',
    params: [
      { name: 'x', description: '<p>x component of the vector</p>\n', type: 'Number', optional: true },
      { name: 'y', description: '<p>y component of the vector</p>\n', type: 'Number', optional: true },
      { name: 'z', description: '<p>z component of the vector</p>\n', type: 'Number', optional: true }
    ],
    return: { description: '', type: 'p5.Vector' },
    example: [
      '\n<div><code>\nlet v1;\nfunction setup() {\n  createCanvas(100, 100);\n  stroke(255, 0, 255);\n  v1 = createVector(width / 2, height / 2);\n}\n\nfunction draw() {\n  background(255);\n  line(v1.x, v1.y, mouseX, mouseY);\n}\n</code></div>'
    ],
    alt: 'draws a line from center of canvas to mouse pointer position.',
    class: 'p5',
    module: 'Math',
    submodule: 'Vector'
  },
  {
    description:
      '<p>Returns the Perlin noise value at specified coordinates. Perlin noise is\na random sequence generator producing a more naturally ordered, harmonic\nsuccession of numbers compared to the standard <b>random()</b> function.\nIt was invented by Ken Perlin in the 1980s and been used since in\ngraphical applications to produce procedural textures, natural motion,\nshapes, terrains etc.<br /><br /> The main difference to the\n<b>random()</b> function is that Perlin noise is defined in an infinite\nn-dimensional space where each pair of coordinates corresponds to a\nfixed semi-random value (fixed only for the lifespan of the program; see\nthe <a href="#/p5/noiseSeed">noiseSeed()</a> function). p5.js can compute 1D, 2D and 3D noise,\ndepending on the number of coordinates given. The resulting value will\nalways be between 0.0 and 1.0. The noise value can be animated by moving\nthrough the noise space as demonstrated in the example above. The 2nd\nand 3rd dimension can also be interpreted as time.<br /><br />The actual\nnoise is structured similar to an audio signal, in respect to the\nfunction\'s use of frequencies. Similar to the concept of harmonics in\nphysics, perlin noise is computed over several octaves which are added\ntogether for the final result. <br /><br />Another way to adjust the\ncharacter of the resulting sequence is the scale of the input\ncoordinates. As the function works within an infinite space the value of\nthe coordinates doesn\'t matter as such, only the distance between\nsuccessive coordinates does (eg. when using <b>noise()</b> within a\nloop). As a general rule the smaller the difference between coordinates,\nthe smoother the resulting noise sequence will be. Steps of 0.005-0.03\nwork best for most applications, but this will differ depending on use.</p>\n',
    itemtype: 'method',
    name: 'noise',
    params: [
      { name: 'x', description: '<p>x-coordinate in noise space</p>\n', type: 'Number' },
      { name: 'y', description: '<p>y-coordinate in noise space</p>\n', type: 'Number', optional: true },
      { name: 'z', description: '<p>z-coordinate in noise space</p>\n', type: 'Number', optional: true }
    ],
    return: {
      description: 'Perlin noise value (between 0 and 1) at specified\n                     coordinates',
      type: 'Number'
    },
    example: [
      '\n<div>\n<code>\nlet xoff = 0.0;\n\nfunction draw() {\n  background(204);\n  xoff = xoff + 0.01;\n  let n = noise(xoff) * width;\n  line(n, 0, n, height);\n}\n</code>\n</div>\n<div>\n<code>let noiseScale=0.02;\n\nfunction draw() {\n  background(0);\n  for (let x=0; x < width; x++) {\n    let noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);\n    stroke(noiseVal*255);\n    line(x, mouseY+noiseVal*80, x, height);\n  }\n}\n</code>\n</div>'
    ],
    alt: 'vertical line moves left to right with updating noise values.\nhorizontal wave pattern effected by mouse x-position & updating noise values.',
    class: 'p5',
    module: 'Math',
    submodule: 'Noise'
  },
  {
    description:
      '<p>Adjusts the character and level of detail produced by the Perlin noise\n function. Similar to harmonics in physics, noise is computed over\n several octaves. Lower octaves contribute more to the output signal and\n as such define the overall intensity of the noise, whereas higher octaves\n create finer grained details in the noise sequence.\nBy default, noise is computed over 4 octaves with each octave contributing\n exactly half than its predecessor, starting at 50% strength for the 1st\n octave. This falloff amount can be changed by adding an additional function\n parameter. Eg. a falloff factor of 0.75 means each octave will now have\n 75% impact (25% less) of the previous lower octave. Any value between\n 0.0 and 1.0 is valid, however note that values greater than 0.5 might\n result in greater than 1.0 values returned by <b>noise()</b>.\nBy changing these parameters, the signal created by the <b>noise()</b>\n function can be adapted to fit very specific needs and characteristics.</p>\n',
    itemtype: 'method',
    name: 'noiseDetail',
    params: [
      { name: 'lod', description: '<p>number of octaves to be used by the noise</p>\n', type: 'Number' },
      { name: 'falloff', description: '<p>falloff factor for each octave</p>\n', type: 'Number' }
    ],
    example: [
      '\n <div>\n <code>\n let noiseVal;\n let noiseScale = 0.02;\nfunction setup() {\n   createCanvas(100, 100);\n }\nfunction draw() {\n   background(0);\n   for (let y = 0; y < height; y++) {\n     for (let x = 0; x < width / 2; x++) {\n       noiseDetail(2, 0.2);\n       noiseVal = noise((mouseX + x) * noiseScale, (mouseY + y) * noiseScale);\n       stroke(noiseVal * 255);\n       point(x, y);\n       noiseDetail(8, 0.65);\n       noiseVal = noise(\n         (mouseX + x + width / 2) * noiseScale,\n         (mouseY + y) * noiseScale\n       );\n       stroke(noiseVal * 255);\n       point(x + width / 2, y);\n     }\n   }\n }\n </code>\n </div>'
    ],
    alt: '2 vertical grey smokey patterns affected my mouse x-position and noise.',
    class: 'p5',
    module: 'Math',
    submodule: 'Noise'
  },
  {
    description:
      '<p>Sets the seed value for <b>noise()</b>. By default, <b>noise()</b>\nproduces different results each time the program is run. Set the\n<b>value</b> parameter to a constant to return the same pseudo-random\nnumbers each time the software is run.</p>\n',
    itemtype: 'method',
    name: 'noiseSeed',
    params: [{ name: 'seed', description: '<p>the seed value</p>\n', type: 'Number' }],
    example: [
      '\n<div>\n<code>let xoff = 0.0;\n\nfunction setup() {\n  noiseSeed(99);\n  stroke(0, 10);\n}\n\nfunction draw() {\n  xoff = xoff + .01;\n  let n = noise(xoff) * width;\n  line(n, 0, n, height);\n}\n</code>\n</div>'
    ],
    alt: 'vertical grey lines drawing in pattern affected by noise.',
    class: 'p5',
    module: 'Math',
    submodule: 'Noise'
  },
  {
    description:
      '<p>Sets the x, y, and z component of the vector using two or three separate\nvariables, the data from a <a href="#/p5.Vector">p5.Vector</a>, or the values from a float array.</p>\n',
    itemtype: 'method',
    name: 'set',
    chainable: 1,
    example: [
      "\n<div class=\"norender\">\n<code>\nfunction setup() {\n  let v = createVector(1, 2, 3);\n  v.set(4, 5, 6); // Sets vector to [4, 5, 6]\n\n  let v1 = createVector(0, 0, 0);\n  let arr = [1, 2, 3];\n  v1.set(arr); // Sets vector to [1, 2, 3]\n}\n</code>\n</div>\n\n<div>\n<code>\nlet v0, v1;\nfunction setup() {\n  createCanvas(100, 100);\n\n  v0 = createVector(0, 0);\n  v1 = createVector(50, 50);\n}\n\nfunction draw() {\n  background(240);\n\n  drawArrow(v0, v1, 'black');\n  v1.set(v1.x + random(-1, 1), v1.y + random(-1, 1));\n\n  noStroke();\n  text('x: ' + round(v1.x) + ' y: ' + round(v1.y), 20, 90);\n}\n\n// draw an arrow for a vector at a given base position\nfunction drawArrow(base, vec, myColor) {\n  push();\n  stroke(myColor);\n  strokeWeight(3);\n  fill(myColor);\n  translate(base.x, base.y);\n  line(0, 0, vec.x, vec.y);\n  rotate(vec.heading());\n  let arrowSize = 7;\n  translate(vec.mag() - arrowSize, 0);\n  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);\n  pop();\n}\n</code>\n</div>"
    ],
    class: 'p5.Vector',
    module: 'Math',
    submodule: 'Vector',
    overloads: [
      {
        line: 132,
        params: [
          {
            name: 'x',
            description: '<p>the x component of the vector</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'y',
            description: '<p>the y component of the vector</p>\n',
            type: 'Number',
            optional: true
          },
          { name: 'z', description: '<p>the z component of the vector</p>\n', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 191,
        params: [{ name: 'value', description: '<p>the vector to set</p>\n', type: 'p5.Vector|Number[]' }],
        chainable: 1
      }
    ]
  },
  {
    description: '<p>Gets a copy of the vector, returns a <a href="#/p5.Vector">p5.Vector</a> object.</p>\n',
    itemtype: 'method',
    name: 'copy',
    return: { description: 'the copy of the <a href="#/p5.Vector">p5.Vector</a> object', type: 'p5.Vector' },
    example: [
      '\n<div class="norender">\n<code>\nlet v1 = createVector(1, 2, 3);\nlet v2 = v1.copy();\nprint(v1.x === v2.x && v1.y === v2.y && v1.z === v2.z);\n// Prints "true"\n</code>\n</div>'
    ],
    class: 'p5.Vector',
    module: 'Math',
    submodule: 'Vector'
  },
  {
    description:
      '<p>Calculates the magnitude (length) of the vector and returns the result as\na float (this is simply the equation sqrt(x*x + y*y + z*z).)</p>\n',
    itemtype: 'method',
    name: 'mag',
    return: { description: 'magnitude of the vector', type: 'Number' },
    example: [
      '\n<div>\n<code>\nfunction draw() {\n  background(240);\n\n  let v0 = createVector(0, 0);\n  let v1 = createVector(mouseX, mouseY);\n  drawArrow(v0, v1, \'black\');\n\n  noStroke();\n  text(\'vector length: \' + v1.mag().toFixed(2), 10, 70, 90, 30);\n}\n\n// draw an arrow for a vector at a given base position\nfunction drawArrow(base, vec, myColor) {\n  push();\n  stroke(myColor);\n  strokeWeight(3);\n  fill(myColor);\n  translate(base.x, base.y);\n  line(0, 0, vec.x, vec.y);\n  rotate(vec.heading());\n  let arrowSize = 7;\n  translate(vec.mag() - arrowSize, 0);\n  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);\n  pop();\n}\n</code>\n</div>\n<div class="norender">\n<code>\nlet v = createVector(20.0, 30.0, 40.0);\nlet m = v.mag();\nprint(m); // Prints "53.85164807134504"\n</code>\n</div>'
    ],
    class: 'p5.Vector',
    module: 'Math',
    submodule: 'Vector',
    overloads: [
      { line: 944, params: [], return: { description: 'magnitude of the vector', type: 'Number' } },
      {
        line: 2328,
        params: [
          { name: 'vecT', description: '<p>the vector to return the magnitude of</p>\n', type: 'p5.Vector' }
        ],
        static: 1,
        return: { description: 'the magnitude of vecT', type: 'Number' }
      }
    ]
  },
  {
    description:
      '<p>Calculates the Euclidean distance between two points (considering a\npoint as a vector object).\nIf you are looking to calculate distance with 2 points see <a href="#/p5/dist">dist()</a></p>\n',
    itemtype: 'method',
    name: 'dist',
    return: { description: 'the distance', type: 'Number' },
    example: [
      "\n<div class=\"norender\">\n<code>\nlet v1 = createVector(1, 0, 0);\nlet v2 = createVector(0, 1, 0);\n\nlet distance = v1.dist(v2); // distance is 1.4142...\nprint(distance);\n</code>\n</div>\n\n<div class=\"norender\">\n<code>\n// Static method\nlet v1 = createVector(1, 0, 0);\nlet v2 = createVector(0, 1, 0);\n\nlet distance = p5.Vector.dist(v1, v2);\n// distance is 1.4142...\nprint(distance);\n</code>\n</div>\n\n<div>\n<code>\nfunction draw() {\n  background(240);\n\n  let v0 = createVector(0, 0);\n\n  let v1 = createVector(70, 50);\n  drawArrow(v0, v1, 'red');\n\n  let v2 = createVector(mouseX, mouseY);\n  drawArrow(v0, v2, 'blue');\n\n  noStroke();\n  text('distance between vectors: ' + v2.dist(v1).toFixed(2), 5, 50, 95, 50);\n}\n\n// draw an arrow for a vector at a given base position\nfunction drawArrow(base, vec, myColor) {\n  push();\n  stroke(myColor);\n  strokeWeight(3);\n  fill(myColor);\n  translate(base.x, base.y);\n  line(0, 0, vec.x, vec.y);\n  rotate(vec.heading());\n  let arrowSize = 7;\n  translate(vec.mag() - arrowSize, 0);\n  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);\n  pop();\n}\n</code>\n</div>"
    ],
    class: 'p5.Vector',
    module: 'Math',
    submodule: 'Vector',
    overloads: [
      {
        line: 1130,
        params: [
          {
            name: 'v',
            description: '<p>the x, y, and z coordinates of a <a href="#/p5.Vector">p5.Vector</a></p>\n',
            type: 'p5.Vector'
          }
        ],
        return: { description: 'the distance', type: 'Number' }
      },
      {
        line: 2284,
        params: [
          {
            name: 'v1',
            description: '<p>the first <a href="#/p5.Vector">p5.Vector</a></p>\n',
            type: 'p5.Vector'
          },
          {
            name: 'v2',
            description: '<p>the second <a href="#/p5.Vector">p5.Vector</a></p>\n',
            type: 'p5.Vector'
          }
        ],
        static: 1,
        return: { description: 'the distance', type: 'Number' }
      }
    ]
  },
  {
    description: '<p>Rotate the vector by an angle (only 2D vectors), magnitude remains the\nsame</p>\n',
    itemtype: 'method',
    name: 'rotate',
    chainable: 1,
    example: [
      "\n<div class=\"norender\">\n<code>\nlet v = createVector(10.0, 20.0);\n// v has components [10.0, 20.0, 0.0]\nv.rotate(HALF_PI);\n// v's components are set to [-20.0, 9.999999, 0.0]\n</code>\n</div>\n\n<div class=\"norender\">\n<code>\n// static function implementation\nlet v = createVector(10.0, 20.0);\n// v has components [10.0, 20.0, 0.0]\nlet rotated_v = p5.Vector.rotate(v, HALF_PI);\nconsole.log(rotated_v);\n// rotated_v's components are set to [-20.0, 9.999999, 0.0]\nconsole.log(v);\n// v's components remains the same (i.e, [10.0, 20.0, 0.0])\n</code>\n</div>\n\n<div>\n<code>\nlet angle = 0;\nfunction draw() {\n  background(240);\n\n  let v0 = createVector(50, 50);\n  let v1 = createVector(50, 0);\n\n  drawArrow(v0, v1.rotate(angle), 'black');\n  angle += 0.01;\n}\n\n// draw an arrow for a vector at a given base position\nfunction drawArrow(base, vec, myColor) {\n  push();\n  stroke(myColor);\n  strokeWeight(3);\n  fill(myColor);\n  translate(base.x, base.y);\n  line(0, 0, vec.x, vec.y);\n  rotate(vec.heading());\n  let arrowSize = 7;\n  translate(vec.mag() - arrowSize, 0);\n  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);\n  pop();\n}\n</code>\n</div>"
    ],
    class: 'p5.Vector',
    module: 'Math',
    submodule: 'Vector',
    overloads: [
      {
        line: 1483,
        params: [{ name: 'angle', description: '<p>the angle of rotation</p>\n', type: 'Number' }],
        chainable: 1
      },
      {
        line: 2176,
        params: [
          { name: 'v', description: '', type: 'p5.Vector' },
          { name: 'angle', description: '', type: 'Number' },
          {
            name: 'target',
            description: '<p>the vector to receive the result</p>\n',
            type: 'p5.Vector',
            optional: true
          }
        ],
        static: 1
      }
    ]
  },
  {
    description: '<p>Linear interpolate the vector to another vector</p>\n',
    itemtype: 'method',
    name: 'lerp',
    chainable: 1,
    example: [
      "\n<div class=\"norender\">\n<code>\nlet v = createVector(1, 1, 0);\n\nv.lerp(3, 3, 0, 0.5); // v now has components [2,2,0]\n</code>\n</div>\n\n<div class=\"norender\">\n<code>\nlet v1 = createVector(0, 0, 0);\nlet v2 = createVector(100, 100, 0);\n\nlet v3 = p5.Vector.lerp(v1, v2, 0.5);\n// v3 has components [50,50,0]\nprint(v3);\n</code>\n</div>\n\n<div>\n<code>\nlet step = 0.01;\nlet amount = 0;\n\nfunction draw() {\n  background(240);\n  let v0 = createVector(0, 0);\n\n  let v1 = createVector(mouseX, mouseY);\n  drawArrow(v0, v1, 'red');\n\n  let v2 = createVector(90, 90);\n  drawArrow(v0, v2, 'blue');\n\n  if (amount > 1 || amount < 0) {\n    step *= -1;\n  }\n  amount += step;\n  let v3 = p5.Vector.lerp(v1, v2, amount);\n\n  drawArrow(v0, v3, 'purple');\n}\n\n// draw an arrow for a vector at a given base position\nfunction drawArrow(base, vec, myColor) {\n  push();\n  stroke(myColor);\n  strokeWeight(3);\n  fill(myColor);\n  translate(base.x, base.y);\n  line(0, 0, vec.x, vec.y);\n  rotate(vec.heading());\n  let arrowSize = 7;\n  translate(vec.mag() - arrowSize, 0);\n  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);\n  pop();\n}\n</code>\n</div>"
    ],
    class: 'p5.Vector',
    module: 'Math',
    submodule: 'Vector',
    overloads: [
      {
        line: 1632,
        params: [
          { name: 'x', description: '<p>the x component</p>\n', type: 'Number' },
          { name: 'y', description: '<p>the y component</p>\n', type: 'Number' },
          { name: 'z', description: '<p>the z component</p>\n', type: 'Number' },
          {
            name: 'amt',
            description:
              '<p>the amount of interpolation; some value between 0.0\n                        (old vector) and 1.0 (new vector). 0.9 is very near\n                        the new vector. 0.5 is halfway in between.</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        line: 1705,
        params: [
          {
            name: 'v',
            description: '<p>the <a href="#/p5.Vector">p5.Vector</a> to lerp to</p>\n',
            type: 'p5.Vector'
          },
          { name: 'amt', description: '', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 2299,
        params: [
          { name: 'v1', description: '', type: 'p5.Vector' },
          { name: 'v2', description: '', type: 'p5.Vector' },
          { name: 'amt', description: '', type: 'Number' },
          {
            name: 'target',
            description: '<p>the vector to receive the result</p>\n',
            type: 'p5.Vector',
            optional: true
          }
        ],
        static: 1,
        return: { description: 'the lerped value', type: 'p5.Vector' }
      }
    ]
  },
  {
    description:
      '<p>Sets the seed value for <a href="#/p5/random">random()</a>.</p>\n<p>By default, <a href="#/p5/random">random()</a> produces different results each time the program\nis run. Set the seed parameter to a constant to return the same\npseudo-random numbers each time the software is run.</p>\n',
    itemtype: 'method',
    name: 'randomSeed',
    params: [{ name: 'seed', description: '<p>the seed value</p>\n', type: 'Number' }],
    example: [
      '\n<div>\n<code>\nrandomSeed(99);\nfor (let i = 0; i < 100; i++) {\n  let r = random(0, 255);\n  stroke(r);\n  line(i, 0, i, 100);\n}\n</code>\n</div>'
    ],
    alt: 'many vertical lines drawn in white, black or grey.',
    class: 'p5',
    module: 'Math',
    submodule: 'Random'
  },
  {
    description:
      '<p>Return a random floating-point number.</p>\n<p>Takes either 0, 1 or 2 arguments.</p>\n<p>If no argument is given, returns a random number from 0\nup to (but not including) 1.</p>\n<p>If one argument is given and it is a number, returns a random number from 0\nup to (but not including) the number.</p>\n<p>If one argument is given and it is an array, returns a random element from\nthat array.</p>\n<p>If two arguments are given, returns a random number from the\nfirst argument up to (but not including) the second argument.</p>\n',
    itemtype: 'method',
    name: 'random',
    return: { description: 'the random number', type: 'Number' },
    example: [
      "\n<div>\n<code>\nfor (let i = 0; i < 100; i++) {\n  let r = random(50);\n  stroke(r * 5);\n  line(50, i, 50 + r, i);\n}\n</code>\n</div>\n<div>\n<code>\nfor (let i = 0; i < 100; i++) {\n  let r = random(-50, 50);\n  line(50, i, 50 + r, i);\n}\n</code>\n</div>\n<div>\n<code>\n// Get a random element from an array using the random(Array) syntax\nlet words = ['apple', 'bear', 'cat', 'dog'];\nlet word = random(words); // select random word\ntext(word, 10, 50); // draw the word\n</code>\n</div>"
    ],
    alt: '100 horizontal lines from center canvas to right. size+fill change each time\n100 horizontal lines from center of canvas. height & side change each render\nword displayed at random. Either apple, bear, cat, or dog',
    class: 'p5',
    module: 'Math',
    submodule: 'Random',
    overloads: [
      {
        line: 66,
        params: [
          {
            name: 'min',
            description: '<p>the lower bound (inclusive)</p>\n',
            type: 'Number',
            optional: true
          },
          { name: 'max', description: '<p>the upper bound (exclusive)</p>\n', type: 'Number', optional: true }
        ],
        return: { description: 'the random number', type: 'Number' }
      },
      {
        line: 119,
        params: [{ name: 'choices', description: '<p>the array to choose from</p>\n', type: 'Array' }],
        return: { description: 'the random element from the array', type: '*' }
      }
    ]
  },
  {
    description:
      '<p>Returns a random number fitting a Gaussian, or\n normal, distribution. There is theoretically no minimum or maximum\n value that <a href="#/p5/randomGaussian">randomGaussian()</a> might return. Rather, there is\n just a very low probability that values far from the mean will be\n returned; and a higher probability that numbers near the mean will\n be returned.\nTakes either 0, 1 or 2 arguments.<br>\n If no args, returns a mean of 0 and standard deviation of 1.<br>\n If one arg, that arg is the mean (standard deviation is 1).<br>\n If two args, first is mean, second is standard deviation.</p>\n',
    itemtype: 'method',
    name: 'randomGaussian',
    params: [
      { name: 'mean', description: '<p>the mean</p>\n', type: 'Number', optional: true },
      { name: 'sd', description: '<p>the standard deviation</p>\n', type: 'Number', optional: true }
    ],
    return: { description: 'the random number', type: 'Number' },
    example: [
      '\n <div>\n <code>\n for (let y = 0; y < 100; y++) {\n   let x = randomGaussian(50, 15);\n   line(50, y, x, y);\n }\n </code>\n </div>\n <div>\n <code>\n let distribution = new Array(360);\nfunction setup() {\n   createCanvas(100, 100);\n   for (let i = 0; i < distribution.length; i++) {\n     distribution[i] = floor(randomGaussian(0, 15));\n   }\n }\nfunction draw() {\n   background(204);\n  translate(width / 2, width / 2);\n  for (let i = 0; i < distribution.length; i++) {\n     rotate(TWO_PI / distribution.length);\n     stroke(0);\n     let dist = abs(distribution[i]);\n     line(0, 0, dist, 0);\n   }\n }\n </code>\n </div>'
    ],
    alt: '100 horizontal lines from center of canvas. height & side change each render\n black lines radiate from center of canvas. size determined each render',
    class: 'p5',
    module: 'Math',
    submodule: 'Random'
  },
  {
    description:
      '<p>The inverse of <a href="#/p5/cos">cos()</a>, returns the arc cosine of a value.\nThis function expects the values in the range of -1 to 1 and values are returned in\nthe range 0 to PI (3.1415927) if the angleMode is RADIANS or 0 to 180 if the\nangle mode is DEGREES.</p>\n',
    itemtype: 'method',
    name: 'acos',
    params: [
      { name: 'value', description: '<p>the value whose arc cosine is to be returned</p>\n', type: 'Number' }
    ],
    return: { description: 'the arc cosine of the given value', type: 'Number' },
    example: [
      "\n<div class= “norender\">\n<code>\nlet a = PI;\nlet c = cos(a);\nlet ac = acos(c);\n// Prints: \"3.1415927 : -1.0 : 3.1415927\"\nprint(a + ' : ' + c + ' : ' + ac);\n</code>\n</div>\n\n<div class= “norender\">\n<code>\nlet a = PI + PI / 4.0;\nlet c = cos(a);\nlet ac = acos(c);\n// Prints: \"3.926991 : -0.70710665 : 2.3561943\"\nprint(a + ' : ' + c + ' : ' + ac);\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Math',
    submodule: 'Trigonometry'
  },
  {
    description:
      '<p>The inverse of <a href="#/p5/sin">sin()</a>, returns the arc sine of a value.\nThis function expects the values in the range of -1 to 1 and values are returned\nin the range -PI/2 to PI/2 if the angleMode is RADIANS or -90 to 90 if the angle\nmode is DEGREES.</p>\n',
    itemtype: 'method',
    name: 'asin',
    params: [
      { name: 'value', description: '<p>the value whose arc sine is to be returned</p>\n', type: 'Number' }
    ],
    return: { description: 'the arc sine of the given value', type: 'Number' },
    example: [
      "\n<div class= “norender\">\n<code>\nlet a = PI / 3.0;\nlet s = sin(a);\nlet as = asin(s);\n// Prints: \"1.0471975 : 0.86602540 : 1.0471975\"\nprint(a + ' : ' + s + ' : ' + as);\n</code>\n</div>\n\n<div class= “norender\">\n<code>\nlet a = PI + PI / 3.0;\nlet s = sin(a);\nlet as = asin(s);\n// Prints: \"4.1887902 : -0.86602540 : -1.0471975\"\nprint(a + ' : ' + s + ' : ' + as);\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Math',
    submodule: 'Trigonometry'
  },
  {
    description:
      '<p>The inverse of <a href="#/p5/tan">tan()</a>, returns the arc tangent of a value.\nThis function expects the values in the range of -Infinity to Infinity (exclusive) and\nvalues are returned in the range -PI/2 to PI/2 if the angleMode is RADIANS or\n-90 to 90 if the angle mode is DEGREES.</p>\n',
    itemtype: 'method',
    name: 'atan',
    params: [
      { name: 'value', description: '<p>the value whose arc tangent is to be returned</p>\n', type: 'Number' }
    ],
    return: { description: 'the arc tangent of the given value', type: 'Number' },
    example: [
      "\n<div class= “norender\">\n<code>\nlet a = PI / 3.0;\nlet t = tan(a);\nlet at = atan(t);\n// Prints: \"1.0471975 : 1.7320508 : 1.0471975\"\nprint(a + ' : ' + t + ' : ' + at);\n</code>\n</div>\n\n<div class= “norender\">\n<code>\nlet a = PI + PI / 3.0;\nlet t = tan(a);\nlet at = atan(t);\n// Prints: \"4.1887902 : 1.7320508 : 1.0471975\"\nprint(a + ' : ' + t + ' : ' + at);\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Math',
    submodule: 'Trigonometry'
  },
  {
    description:
      '<p>Calculates the angle (in radians) from a specified point to the coordinate\norigin as measured from the positive x-axis. Values are returned as a\nfloat in the range from PI to -PI if the angleMode is RADIANS or 180 to\n-180 if the angleMode is DEGREES. The atan2<a href="#/p5/">()</a> function is\nmost often used for orienting geometry to the position of the cursor.</p>\n<p>Note: The y-coordinate of the point is the first parameter, and the\nx-coordinate is the second parameter, due the the structure of calculating\nthe tangent.</p>\n',
    itemtype: 'method',
    name: 'atan2',
    params: [
      { name: 'y', description: '<p>y-coordinate of the point</p>\n', type: 'Number' },
      { name: 'x', description: '<p>x-coordinate of the point</p>\n', type: 'Number' }
    ],
    return: { description: 'the arc tangent of the given point', type: 'Number' },
    example: [
      '\n<div>\n<code>\nfunction draw() {\n  background(204);\n  translate(width / 2, height / 2);\n  let a = atan2(mouseY - height / 2, mouseX - width / 2);\n  rotate(a);\n  rect(-30, -5, 60, 10);\n}\n</code>\n</div>'
    ],
    alt: '60 by 10 rect at center of canvas rotates with mouse movements',
    class: 'p5',
    module: 'Math',
    submodule: 'Trigonometry'
  },
  {
    description:
      '<p>Calculates the cosine of an angle. This function takes into account the\ncurrent <a href="#/p5/angleMode">angleMode</a>. Values are returned in the range -1 to 1.</p>\n',
    itemtype: 'method',
    name: 'cos',
    params: [{ name: 'angle', description: '<p>the angle</p>\n', type: 'Number' }],
    return: { description: 'the cosine of the angle', type: 'Number' },
    example: [
      '\n<div>\n<code>\nlet a = 0.0;\nlet inc = TWO_PI / 25.0;\nfor (let i = 0; i < 25; i++) {\n  line(i * 4, 50, i * 4, 50 + cos(a) * 40.0);\n  a = a + inc;\n}\n</code>\n</div>'
    ],
    alt: 'vertical black lines form wave patterns, extend-down on left and right side',
    class: 'p5',
    module: 'Math',
    submodule: 'Trigonometry'
  },
  {
    description:
      '<p>Calculates the sine of an angle. This function takes into account the\ncurrent <a href="#/p5/angleMode">angleMode</a>. Values are returned in the range -1 to 1.</p>\n',
    itemtype: 'method',
    name: 'sin',
    params: [{ name: 'angle', description: '<p>the angle</p>\n', type: 'Number' }],
    return: { description: 'the sine of the angle', type: 'Number' },
    example: [
      '\n<div>\n<code>\nlet a = 0.0;\nlet inc = TWO_PI / 25.0;\nfor (let i = 0; i < 25; i++) {\n  line(i * 4, 50, i * 4, 50 + sin(a) * 40.0);\n  a = a + inc;\n}\n</code>\n</div>'
    ],
    alt: 'vertical black lines extend down and up from center to form wave pattern',
    class: 'p5',
    module: 'Math',
    submodule: 'Trigonometry'
  },
  {
    description:
      '<p>Calculates the tangent of an angle. This function takes into account\nthe current <a href="#/p5/angleMode">angleMode</a>. Values are returned in the range of all real numbers.</p>\n',
    itemtype: 'method',
    name: 'tan',
    params: [{ name: 'angle', description: '<p>the angle</p>\n', type: 'Number' }],
    return: { description: 'the tangent of the angle', type: 'Number' },
    example: [
      '\n<div>\n<code>\nlet a = 0.0;\nlet inc = TWO_PI / 50.0;\nfor (let i = 0; i < 100; i = i + 2) {\n  line(i, 50, i, 50 + tan(a) * 2.0);\n  a = a + inc;\n}\n</code>'
    ],
    alt: 'vertical black lines end down and up from center to form spike pattern',
    class: 'p5',
    module: 'Math',
    submodule: 'Trigonometry'
  },
  {
    description:
      '<p>Converts a radian measurement to its corresponding value in degrees.\nRadians and degrees are two ways of measuring the same thing. There are\n360 degrees in a circle and 2*PI radians in a circle. For example,\n90° = PI/2 = 1.5707964. This function does not take into account the\ncurrent <a href="#/p5/angleMode">angleMode</a>.</p>\n',
    itemtype: 'method',
    name: 'degrees',
    params: [
      { name: 'radians', description: '<p>the radians value to convert to degrees</p>\n', type: 'Number' }
    ],
    return: { description: 'the converted angle', type: 'Number' },
    example: [
      "\n<div class= “norender\">\n<code>\nlet rad = PI / 4;\nlet deg = degrees(rad);\nprint(rad + ' radians is ' + deg + ' degrees');\n// Prints: 0.7853981633974483 radians is 45 degrees\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Math',
    submodule: 'Trigonometry'
  },
  {
    description:
      '<p>Converts a degree measurement to its corresponding value in radians.\nRadians and degrees are two ways of measuring the same thing. There are\n360 degrees in a circle and 2*PI radians in a circle. For example,\n90° = PI/2 = 1.5707964. This function does not take into account the\ncurrent <a href="#/p5/angleMode">angleMode</a>.</p>\n',
    itemtype: 'method',
    name: 'radians',
    params: [
      { name: 'degrees', description: '<p>the degree value to convert to radians</p>\n', type: 'Number' }
    ],
    return: { description: 'the converted angle', type: 'Number' },
    example: [
      "\n<div class= “norender\">\n<code>\nlet deg = 45.0;\nlet rad = radians(deg);\nprint(deg + ' degrees is ' + rad + ' radians');\n// Prints: 45 degrees is 0.7853981633974483 radians\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Math',
    submodule: 'Trigonometry'
  },
  {
    description: '<p>Sets the current mode of p5 to given mode. Default mode is RADIANS.</p>\n',
    itemtype: 'method',
    name: 'angleMode',
    params: [{ name: 'mode', description: '<p>either RADIANS or DEGREES</p>\n', type: 'Constant' }],
    example: [
      '\n<div>\n<code>\nfunction draw() {\n  background(204);\n  angleMode(DEGREES); // Change the mode to DEGREES\n  let a = atan2(mouseY - height / 2, mouseX - width / 2);\n  translate(width / 2, height / 2);\n  push();\n  rotate(a);\n  rect(-20, -5, 40, 10); // Larger rectangle is rotating in degrees\n  pop();\n  angleMode(RADIANS); // Change the mode to RADIANS\n  rotate(a); // variable a stays the same\n  rect(-40, -5, 20, 10); // Smaller rectangle is rotating in radians\n}\n</code>\n</div>'
    ],
    alt: '40 by 10 rect in center rotates with mouse moves. 20 by 10 rect moves faster.',
    class: 'p5',
    module: 'Math',
    submodule: 'Trigonometry'
  },
  {
    description:
      '<p>Sets the current alignment for drawing text. Accepts two\narguments: horizAlign (LEFT, CENTER, or RIGHT) and\nvertAlign (TOP, BOTTOM, CENTER, or BASELINE).</p>\n<p>The horizAlign parameter is in reference to the x value\nof the <a href="#/p5/text">text()</a> function, while the vertAlign parameter\nis in reference to the y value.</p>\n<p>So if you write textAlign(LEFT), you are aligning the left\nedge of your text to the x value you give in <a href="#/p5/text">text()</a>.\nIf you write textAlign(RIGHT, TOP), you are aligning the right edge\nof your text to the x value and the top of edge of the text\nto the y value.</p>\n',
    itemtype: 'method',
    name: 'textAlign',
    chainable: 1,
    example: [
      "\n<div>\n<code>\ntextSize(16);\ntextAlign(RIGHT);\ntext('ABCD', 50, 30);\ntextAlign(CENTER);\ntext('EFGH', 50, 50);\ntextAlign(LEFT);\ntext('IJKL', 50, 70);\n</code>\n</div>\n\n<div>\n<code>\ntextSize(16);\nstrokeWeight(0.5);\n\nline(0, 12, width, 12);\ntextAlign(CENTER, TOP);\ntext('TOP', 0, 12, width);\n\nline(0, 37, width, 37);\ntextAlign(CENTER, CENTER);\ntext('CENTER', 0, 37, width);\n\nline(0, 62, width, 62);\ntextAlign(CENTER, BASELINE);\ntext('BASELINE', 0, 62, width);\n\nline(0, 87, width, 87);\ntextAlign(CENTER, BOTTOM);\ntext('BOTTOM', 0, 87, width);\n</code>\n</div>"
    ],
    alt: "Letters ABCD displayed at top left, EFGH at center and IJKL at bottom right.\nThe names of the four vertical alignments (TOP, CENTER, BASELINE & BOTTOM) rendered each showing that alignment's placement relative to a horizontal line.",
    class: 'p5',
    module: 'Typography',
    submodule: 'Attributes',
    overloads: [
      {
        line: 11,
        params: [
          {
            name: 'horizAlign',
            description:
              '<p>horizontal alignment, either LEFT,\n                           CENTER, or RIGHT</p>\n',
            type: 'Constant'
          },
          {
            name: 'vertAlign',
            description:
              '<p>vertical alignment, either TOP,\n                           BOTTOM, CENTER, or BASELINE</p>\n',
            type: 'Constant',
            optional: true
          }
        ],
        chainable: 1
      },
      { line: 72, params: [], return: { description: '', type: 'Object' } }
    ]
  },
  {
    description:
      '<p>Sets/gets the spacing, in pixels, between lines of text. This setting will be\nused in all subsequent calls to the <a href="#/p5/text">text()</a> function.</p>\n',
    itemtype: 'method',
    name: 'textLeading',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nlet lines = \'L1\\nL2\\nL3\'; // "\\n" is a "new line" character\ntextSize(12);\n\ntextLeading(10);\ntext(lines, 10, 25);\n\ntextLeading(20);\ntext(lines, 40, 25);\n\ntextLeading(30);\ntext(lines, 70, 25);\n</code>\n</div>'
    ],
    alt: 'A set of L1 L2 & L3 displayed vertically 3 times. spacing increases for each set',
    class: 'p5',
    module: 'Typography',
    submodule: 'Attributes',
    overloads: [
      {
        line: 81,
        params: [
          {
            name: 'leading',
            description: '<p>the size in pixels for spacing between lines</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      { line: 109, params: [], return: { description: '', type: 'Number' } }
    ]
  },
  {
    description:
      '<p>Sets/gets the current font size. This size will be used in all subsequent\ncalls to the <a href="#/p5/text">text()</a> function. Font size is measured in pixels.</p>\n',
    itemtype: 'method',
    name: 'textSize',
    chainable: 1,
    example: [
      "\n<div>\n<code>\ntextSize(12);\ntext('Font Size 12', 10, 30);\ntextSize(14);\ntext('Font Size 14', 10, 60);\ntextSize(16);\ntext('Font Size 16', 10, 90);\n</code>\n</div>"
    ],
    alt: "'Font Size 12' displayed small, 'Font Size 14' medium & 'Font Size 16' large",
    class: 'p5',
    module: 'Typography',
    submodule: 'Attributes',
    overloads: [
      {
        line: 118,
        params: [
          {
            name: 'theSize',
            description: '<p>the size of the letters in units of pixels</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      { line: 141, params: [], return: { description: '', type: 'Number' } }
    ]
  },
  {
    description:
      '<p>Sets/gets the style of the text for system fonts to NORMAL, ITALIC, BOLD or BOLDITALIC.\nNote: this may be is overridden by CSS styling. For non-system fonts\n(opentype, truetype, etc.) please load styled fonts instead.</p>\n',
    itemtype: 'method',
    name: 'textStyle',
    chainable: 1,
    example: [
      "\n<div>\n<code>\nstrokeWeight(0);\ntextSize(12);\ntextStyle(NORMAL);\ntext('Font Style Normal', 10, 15);\ntextStyle(ITALIC);\ntext('Font Style Italic', 10, 40);\ntextStyle(BOLD);\ntext('Font Style Bold', 10, 65);\ntextStyle(BOLDITALIC);\ntext('Font Style Bold Italic', 10, 90);\n</code>\n</div>"
    ],
    alt: 'Words Font Style Normal displayed normally, Italic in italic, bold in bold and bold italic in bold italics.',
    class: 'p5',
    module: 'Typography',
    submodule: 'Attributes',
    overloads: [
      {
        line: 150,
        params: [
          {
            name: 'theStyle',
            description:
              '<p>styling for text, either NORMAL,\n                           ITALIC, BOLD or BOLDITALIC</p>\n',
            type: 'Constant'
          }
        ],
        chainable: 1
      },
      { line: 178, params: [], return: { description: '', type: 'String' } }
    ]
  },
  {
    description: '<p>Calculates and returns the width of any character or text string.</p>\n',
    itemtype: 'method',
    name: 'textWidth',
    params: [
      { name: 'theText', description: '<p>the String of characters to measure</p>\n', type: 'String' }
    ],
    return: { description: 'the calculated width', type: 'Number' },
    example: [
      "\n<div>\n<code>\ntextSize(28);\n\nlet aChar = 'P';\nlet cWidth = textWidth(aChar);\ntext(aChar, 0, 40);\nline(cWidth, 0, cWidth, 50);\n\nlet aString = 'p5.js';\nlet sWidth = textWidth(aString);\ntext(aString, 0, 85);\nline(sWidth, 50, sWidth, 100);\n</code>\n</div>"
    ],
    alt: 'Letter P and p5.js are displayed with vertical lines at end.',
    class: 'p5',
    module: 'Typography',
    submodule: 'Attributes'
  },
  {
    description:
      '<p>Returns the ascent of the current font at its current size. The ascent\nrepresents the distance, in pixels, of the tallest character above\nthe baseline.</p>\n',
    itemtype: 'method',
    name: 'textAscent',
    return: { description: '', type: 'Number' },
    example: [
      "\n<div>\n<code>\nlet base = height * 0.75;\nlet scalar = 0.8; // Different for each font\n\ntextSize(32); // Set initial text size\nlet asc = textAscent() * scalar; // Calc ascent\nline(0, base - asc, width, base - asc);\ntext('dp', 0, base); // Draw text on baseline\n\ntextSize(64); // Increase text size\nasc = textAscent() * scalar; // Recalc ascent\nline(40, base - asc, width, base - asc);\ntext('dp', 40, base); // Draw text on baseline\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Typography',
    submodule: 'Attributes'
  },
  {
    description:
      '<p>Returns the descent of the current font at its current size. The descent\nrepresents the distance, in pixels, of the character with the longest\ndescender below the baseline.</p>\n',
    itemtype: 'method',
    name: 'textDescent',
    return: { description: '', type: 'Number' },
    example: [
      "\n<div>\n<code>\nlet base = height * 0.75;\nlet scalar = 0.8; // Different for each font\n\ntextSize(32); // Set initial text size\nlet desc = textDescent() * scalar; // Calc descent\nline(0, base + desc, width, base + desc);\ntext('dp', 0, base); // Draw text on baseline\n\ntextSize(64); // Increase text size\ndesc = textDescent() * scalar; // Recalc descent\nline(40, base + desc, width, base + desc);\ntext('dp', 40, base); // Draw text on baseline\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Typography',
    submodule: 'Attributes'
  },
  {
    description:
      "<p>Loads an opentype font file (.otf, .ttf) from a file or a URL,\nand returns a PFont Object. This method is asynchronous,\nmeaning it may not finish before the next line in your sketch\nis executed.</p>\n<p>The path to the font should be relative to the HTML file\nthat links in your sketch. Loading fonts from a URL or other\nremote location may be blocked due to your browser's built-in\nsecurity.</p>\n",
    itemtype: 'method',
    name: 'loadFont',
    params: [
      { name: 'path', description: '<p>name of the file or url to load</p>\n', type: 'String' },
      {
        name: 'callback',
        description:
          '<p>function to be executed after\n                                   <a href="#/p5/loadFont">loadFont()</a> completes</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'onError',
        description:
          '<p>function to be executed if\n                                   an error occurs</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    return: { description: '<a href="#/p5.Font">p5.Font</a> object', type: 'p5.Font' },
    example: [
      "\n\nCalling loadFont() inside <a href=\"#/p5/preload\">preload()</a> guarantees\nthat the load operation will have completed before <a href=\"#/p5/setup\">setup()</a>\nand <a href=\"#/p5/draw\">draw()</a> are called.\n\n<div><code>\nlet myFont;\nfunction preload() {\n  myFont = loadFont('assets/inconsolata.otf');\n}\n\nfunction setup() {\n  fill('#ED225D');\n  textFont(myFont);\n  textSize(36);\n  text('p5*js', 10, 50);\n}\n</code></div>\n\nOutside of <a href=\"#/p5/preload\">preload()</a>, you may supply a\ncallback function to handle the object:\n\n<div><code>\nfunction setup() {\n  loadFont('assets/inconsolata.otf', drawText);\n}\n\nfunction drawText(font) {\n  fill('#ED225D');\n  textFont(font, 36);\n  text('p5*js', 10, 50);\n}\n</code></div>\n\nYou can also use the font filename string (without the file extension) to\nstyle other HTML elements.\n\n<div><code>\nfunction preload() {\n  loadFont('assets/inconsolata.otf');\n}\n\nfunction setup() {\n  let myDiv = createDiv('hello there');\n  myDiv.style('font-family', 'Inconsolata');\n}\n</code></div>"
    ],
    alt: "p5*js in p5's theme dark pink\np5*js in p5's theme dark pink",
    class: 'p5',
    module: 'Typography',
    submodule: 'Loading & Displaying'
  },
  {
    description:
      '<p>Draws text to the screen. Displays the information specified in the first\nparameter on the screen in the position specified by the additional\nparameters. A default font will be used unless a font is set with the\n<a href="#/p5/textFont">textFont()</a> function and a default size will be\nused unless a font is set with <a href="#/p5/textSize">textSize()</a>. Change\nthe color of the text with the <a href="#/p5/fill">fill()</a> function. Change\nthe outline of the text with the <a href="#/p5/stroke">stroke()</a> and\n<a href="#/p5/strokeWeight">strokeWeight()</a> functions.</p>\n<p>The text displays in relation to the <a href="#/p5/textAlign">textAlign()</a>\nfunction, which gives the option to draw to the left, right, and center of the\ncoordinates.</p>\n<p>The x2 and y2 parameters define a rectangular area to display within and\nmay only be used with string data. When these parameters are specified,\nthey are interpreted based on the current <a href="#/p5/rectMode">rectMode()</a>\nsetting. Text that does not fit completely within the rectangle specified will\nnot be drawn to the screen. If x2 and y2 are not specified, the baseline\nalignment is the default, which means that the text will be drawn upwards\nfrom x and y.</p>\n<p><b>WEBGL</b>: Only opentype/truetype fonts are supported. You must load a font\nusing the <a href="#/p5/loadFont">loadFont()</a> method (see the example above).\n<a href="#/p5/stroke">stroke()</a> currently has no effect in webgl mode.</p>\n',
    itemtype: 'method',
    name: 'text',
    params: [
      {
        name: 'str',
        description:
          '<p>the alphanumeric\n                                            symbols to be displayed</p>\n',
        type: 'String|Object|Array|Number|Boolean'
      },
      { name: 'x', description: '<p>x-coordinate of text</p>\n', type: 'Number' },
      { name: 'y', description: '<p>y-coordinate of text</p>\n', type: 'Number' },
      {
        name: 'x2',
        description:
          '<p>by default, the width of the text box,\n                    see <a href="#/p5/rectMode">rectMode()</a> for more info</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'y2',
        description:
          '<p>by default, the height of the text box,\n                    see <a href="#/p5/rectMode">rectMode()</a> for more info</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      "\n<div>\n<code>\ntextSize(32);\ntext('word', 10, 30);\nfill(0, 102, 153);\ntext('word', 10, 60);\nfill(0, 102, 153, 51);\ntext('word', 10, 90);\n</code>\n</div>\n<div>\n<code>\nlet s = 'The quick brown fox jumped over the lazy dog.';\nfill(50);\ntext(s, 10, 10, 70, 80); // Text wraps within text box\n</code>\n</div>\n\n<div modernizr='webgl'>\n<code>\nlet inconsolata;\nfunction preload() {\n  inconsolata = loadFont('assets/inconsolata.otf');\n}\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  textFont(inconsolata);\n  textSize(width / 3);\n  textAlign(CENTER, CENTER);\n}\nfunction draw() {\n  background(0);\n  let time = millis();\n  rotateX(time / 1000);\n  rotateZ(time / 1234);\n  text('p5.js', 0, 0);\n}\n</code>\n</div>"
    ],
    alt: "'word' displayed 3 times going from black, blue to translucent blue\nThe text 'The quick brown fox jumped over the lazy dog' displayed.\nThe text 'p5.js' spinning in 3d",
    class: 'p5',
    module: 'Typography',
    submodule: 'Loading & Displaying'
  },
  {
    description:
      '<p>Sets the current font that will be drawn with the <a href="#/p5/text">text()</a> function.\nIf textFont() is called without any argument, it will return the current font if one has\nbeen set already. If not, it will return the name of the default font as a string.\nIf textFont() is called with a font to use, it will return the p5 object.</p>\n<p><b>WEBGL</b>: Only fonts loaded via <a href="#/p5/loadFont">loadFont()</a> are supported.</p>\n',
    itemtype: 'method',
    name: 'textFont',
    return: { description: 'the current font / p5 Object', type: 'Object' },
    example: [
      "\n<div>\n<code>\nfill(0);\ntextSize(12);\ntextFont('Georgia');\ntext('Georgia', 12, 30);\ntextFont('Helvetica');\ntext('Helvetica', 12, 60);\n</code>\n</div>\n<div>\n<code>\nlet fontRegular, fontItalic, fontBold;\nfunction preload() {\n  fontRegular = loadFont('assets/Regular.otf');\n  fontItalic = loadFont('assets/Italic.ttf');\n  fontBold = loadFont('assets/Bold.ttf');\n}\nfunction setup() {\n  background(210);\n  fill(0)\n   .strokeWeight(0)\n   .textSize(10);\n  textFont(fontRegular);\n  text('Font Style Normal', 10, 30);\n  textFont(fontItalic);\n  text('Font Style Italic', 10, 50);\n  textFont(fontBold);\n  text('Font Style Bold', 10, 70);\n}\n</code>\n</div>"
    ],
    alt: "word 'Georgia' displayed in font Georgia and 'Helvetica' in font Helvetica\nwords Font Style Normal displayed normally, Italic in italic and bold in bold",
    class: 'p5',
    module: 'Typography',
    submodule: 'Loading & Displaying',
    overloads: [
      { line: 229, params: [], return: { description: 'the current font / p5 Object', type: 'Object' } },
      {
        line: 278,
        params: [
          {
            name: 'font',
            description:
              '<p>a font loaded via <a href="#/p5/loadFont">loadFont()</a>,\nor a String representing a <a href="https://mzl.la/2dOw8WD">web safe font</a>\n(a font that is generally available across all systems)</p>\n',
            type: 'Object|String'
          },
          { name: 'size', description: '<p>the font size to use</p>\n', type: 'Number', optional: true }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Adds a value to the end of an array. Extends the length of\nthe array by one. Maps to Array.push().</p>\n',
    itemtype: 'method',
    name: 'append',
    deprecated: true,
    deprecationMessage:
      'Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push">array.push(value)</a> instead.',
    params: [
      { name: 'array', description: '<p>Array to append</p>\n', type: 'Array' },
      { name: 'value', description: '<p>to be added to the Array</p>\n', type: 'Any' }
    ],
    return: { description: 'the array that was appended to', type: 'Array' },
    example: [
      "\n<div class='norender'><code>\nfunction setup() {\n  let myArray = ['Mango', 'Apple', 'Papaya'];\n  print(myArray); // ['Mango', 'Apple', 'Papaya']\n\n  append(myArray, 'Peach');\n  print(myArray); // ['Mango', 'Apple', 'Papaya', 'Peach']\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Array Functions'
  },
  {
    description:
      '<p>Copies an array (or part of an array) to another array. The src array is\ncopied to the dst array, beginning at the position specified by\nsrcPosition and into the position specified by dstPosition. The number of\nelements to copy is determined by length. Note that copying values\noverwrites existing values in the destination array. To append values\ninstead of overwriting them, use <a href="#/p5/concat">concat()</a>.</p>\n<p>The simplified version with only two arguments, arrayCopy(src, dst),\ncopies an entire array to another of the same size. It is equivalent to\narrayCopy(src, 0, dst, 0, src.length).</p>\n<p>Using this function is far more efficient for copying array data than\niterating through a for() loop and copying each element individually.</p>\n',
    itemtype: 'method',
    name: 'arrayCopy',
    deprecated: true,
    deprecationMessage:
      'Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin">arr1.copyWithin(arr2)</a> instead.',
    example: [
      "\n<div class='norender'><code>\nlet src = ['A', 'B', 'C'];\nlet dst = [1, 2, 3];\nlet srcPosition = 1;\nlet dstPosition = 0;\nlet length = 2;\n\nprint(src); // ['A', 'B', 'C']\nprint(dst); // [ 1 ,  2 ,  3 ]\n\narrayCopy(src, srcPosition, dst, dstPosition, length);\nprint(dst); // ['B', 'C', 3]\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Array Functions',
    overloads: [
      {
        line: 35,
        params: [
          { name: 'src', description: '<p>the source Array</p>\n', type: 'Array' },
          {
            name: 'srcPosition',
            description: '<p>starting position in the source Array</p>\n',
            type: 'Integer'
          },
          { name: 'dst', description: '<p>the destination Array</p>\n', type: 'Array' },
          {
            name: 'dstPosition',
            description: '<p>starting position in the destination Array</p>\n',
            type: 'Integer'
          },
          { name: 'length', description: '<p>number of Array elements to be copied</p>\n', type: 'Integer' }
        ]
      },
      {
        line: 73,
        params: [
          { name: 'src', description: '', type: 'Array' },
          { name: 'dst', description: '', type: 'Array' },
          { name: 'length', description: '', type: 'Integer', optional: true }
        ]
      }
    ]
  },
  {
    description:
      '<p>Concatenates two arrays, maps to Array.concat(). Does not modify the\ninput arrays.</p>\n',
    itemtype: 'method',
    name: 'concat',
    deprecated: true,
    deprecationMessage:
      'Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat">arr1.concat(arr2)</a> instead.',
    params: [
      { name: 'a', description: '<p>first Array to concatenate</p>\n', type: 'Array' },
      { name: 'b', description: '<p>second Array to concatenate</p>\n', type: 'Array' }
    ],
    return: { description: 'concatenated array', type: 'Array' },
    example: [
      "\n<div class = 'norender'><code>\nfunction setup() {\n  let arr1 = ['A', 'B', 'C'];\n  let arr2 = [1, 2, 3];\n\n  print(arr1); // ['A','B','C']\n  print(arr2); // [1,2,3]\n\n  let arr3 = concat(arr1, arr2);\n\n  print(arr1); // ['A','B','C']\n  print(arr2); // [1, 2, 3]\n  print(arr3); // ['A','B','C', 1, 2, 3]\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Array Functions'
  },
  {
    description: '<p>Reverses the order of an array, maps to Array.reverse()</p>\n',
    itemtype: 'method',
    name: 'reverse',
    deprecated: true,
    deprecationMessage:
      'Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse">array.reverse()</a> instead.',
    params: [{ name: 'list', description: '<p>Array to reverse</p>\n', type: 'Array' }],
    return: { description: 'the reversed list', type: 'Array' },
    example: [
      "\n<div class='norender'><code>\nfunction setup() {\n  let myArray = ['A', 'B', 'C'];\n  print(myArray); // ['A','B','C']\n\n  reverse(myArray);\n  print(myArray); // ['C','B','A']\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Array Functions'
  },
  {
    description:
      '<p>Decreases an array by one element and returns the shortened array,\nmaps to Array.pop().</p>\n',
    itemtype: 'method',
    name: 'shorten',
    deprecated: true,
    deprecationMessage:
      'Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop">array.pop()</a> instead.',
    params: [{ name: 'list', description: '<p>Array to shorten</p>\n', type: 'Array' }],
    return: { description: 'shortened Array', type: 'Array' },
    example: [
      "\n<div class = 'norender'><code>\nfunction setup() {\n  let myArray = ['A', 'B', 'C'];\n  print(myArray); // ['A', 'B', 'C']\n  let newArray = shorten(myArray);\n  print(myArray); // ['A','B','C']\n  print(newArray); // ['A','B']\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Array Functions'
  },
  {
    description:
      "<p>Randomizes the order of the elements of an array. Implements\n<a href='http://Bost.Ocks.org/mike/shuffle/' target=_blank>\nFisher-Yates Shuffle Algorithm</a>.</p>\n",
    itemtype: 'method',
    name: 'shuffle',
    params: [
      { name: 'array', description: '<p>Array to shuffle</p>\n', type: 'Array' },
      { name: 'bool', description: '<p>modify passed array</p>\n', type: 'Boolean', optional: true }
    ],
    return: { description: 'shuffled Array', type: 'Array' },
    example: [
      "\n<div><code>\nfunction setup() {\n  let regularArr = ['ABC', 'def', createVector(), TAU, Math.E];\n  print(regularArr);\n  shuffle(regularArr, true); // force modifications to passed array\n  print(regularArr);\n\n  // By default shuffle() returns a shuffled cloned array:\n  let newArr = shuffle(regularArr);\n  print(regularArr);\n  print(newArr);\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Array Functions'
  },
  {
    description:
      '<p>Sorts an array of numbers from smallest to largest, or puts an array of\nwords in alphabetical order. The original array is not modified; a\nre-ordered array is returned. The count parameter states the number of\nelements to sort. For example, if there are 12 elements in an array and\ncount is set to 5, only the first 5 elements in the array will be sorted.</p>\n',
    itemtype: 'method',
    name: 'sort',
    deprecated: true,
    deprecationMessage:
      'Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort">array.sort()</a> instead.',
    params: [
      { name: 'list', description: '<p>Array to sort</p>\n', type: 'Array' },
      {
        name: 'count',
        description: '<p>number of elements to sort, starting from 0</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    return: { description: 'the sorted list', type: 'Array' },
    example: [
      "\n<div class = 'norender'><code>\nfunction setup() {\n  let words = ['banana', 'apple', 'pear', 'lime'];\n  print(words); // ['banana', 'apple', 'pear', 'lime']\n  let count = 4; // length of array\n\n  words = sort(words, count);\n  print(words); // ['apple', 'banana', 'lime', 'pear']\n}\n</code></div>\n<div class = 'norender'><code>\nfunction setup() {\n  let numbers = [2, 6, 1, 5, 14, 9, 8, 12];\n  print(numbers); // [2, 6, 1, 5, 14, 9, 8, 12]\n  let count = 5; // Less than the length of the array\n\n  numbers = sort(numbers, count);\n  print(numbers); // [1,2,5,6,14,9,8,12]\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Array Functions'
  },
  {
    description:
      '<p>Inserts a value or an array of values into an existing array. The first\nparameter specifies the initial array to be modified, and the second\nparameter defines the data to be inserted. The third parameter is an index\nvalue which specifies the array position from which to insert data.\n(Remember that array index numbering starts at zero, so the first position\nis 0, the second position is 1, and so on.)</p>\n',
    itemtype: 'method',
    name: 'splice',
    deprecated: true,
    deprecationMessage:
      'Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice">array.splice()</a> instead.',
    params: [
      { name: 'list', description: '<p>Array to splice into</p>\n', type: 'Array' },
      { name: 'value', description: '<p>value to be spliced in</p>\n', type: 'Any' },
      { name: 'position', description: '<p>in the array from which to insert data</p>\n', type: 'Integer' }
    ],
    return: { description: 'the list', type: 'Array' },
    example: [
      "\n<div class = 'norender'><code>\nfunction setup() {\n  let myArray = [0, 1, 2, 3, 4];\n  let insArray = ['A', 'B', 'C'];\n  print(myArray); // [0, 1, 2, 3, 4]\n  print(insArray); // ['A','B','C']\n\n  splice(myArray, insArray, 3);\n  print(myArray); // [0,1,2,'A','B','C',3,4]\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Array Functions'
  },
  {
    description:
      '<p>Extracts an array of elements from an existing array. The list parameter\ndefines the array from which the elements will be copied, and the start\nand count parameters specify which elements to extract. If no count is\ngiven, elements will be extracted from the start to the end of the array.\nWhen specifying the start, remember that the first array element is 0.\nThis function does not change the source array.</p>\n',
    itemtype: 'method',
    name: 'subset',
    deprecated: true,
    deprecationMessage:
      'Use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice">array.slice()</a> instead.',
    params: [
      { name: 'list', description: '<p>Array to extract from</p>\n', type: 'Array' },
      { name: 'start', description: '<p>position to begin</p>\n', type: 'Integer' },
      { name: 'count', description: '<p>number of values to extract</p>\n', type: 'Integer', optional: true }
    ],
    return: { description: 'Array of extracted elements', type: 'Array' },
    example: [
      "\n<div class = 'norender'><code>\nfunction setup() {\n  let myArray = [1, 2, 3, 4, 5];\n  print(myArray); // [1, 2, 3, 4, 5]\n\n  let sub1 = subset(myArray, 0, 3);\n  let sub2 = subset(myArray, 2, 2);\n  print(sub1); // [1,2,3]\n  print(sub2); // [3,4]\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Array Functions'
  },
  {
    description:
      '<p>Converts a string to its floating point representation. The contents of a\nstring must resemble a number, or NaN (not a number) will be returned.\nFor example, float("1234.56") evaluates to 1234.56, but float("giraffe")\nwill return NaN.</p>\n<p>When an array of values is passed in, then an array of floats of the same\nlength is returned.</p>\n',
    itemtype: 'method',
    name: 'float',
    params: [{ name: 'str', description: '<p>float string to parse</p>\n', type: 'String' }],
    return: { description: 'floating point representation of string', type: 'Number' },
    example: [
      "\n<div><code>\nlet str = '20';\nlet diameter = float(str);\nellipse(width / 2, height / 2, diameter, diameter);\n</code></div>\n<div class='norender'><code>\nprint(float('10.31')); // 10.31\nprint(float('Infinity')); // Infinity\nprint(float('-Infinity')); // -Infinity\n</code></div>"
    ],
    alt: '20 by 20 white ellipse in the center of the canvas',
    class: 'p5',
    module: 'Data',
    submodule: 'Conversion'
  },
  {
    description:
      '<p>Converts a boolean, string, or float to its integer representation.\nWhen an array of values is passed in, then an int array of the same length\nis returned.</p>\n',
    itemtype: 'method',
    name: 'int',
    return: { description: 'integer representation of value', type: 'Number' },
    example: [
      "\n<div class='norender'><code>\nprint(int('10')); // 10\nprint(int(10.31)); // 10\nprint(int(-10)); // -10\nprint(int(true)); // 1\nprint(int(false)); // 0\nprint(int([false, true, '10.3', 9.8])); // [0, 1, 10, 9]\nprint(int(Infinity)); // Infinity\nprint(int('-Infinity')); // -Infinity\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Conversion',
    overloads: [
      {
        line: 44,
        params: [
          { name: 'n', description: '<p>value to parse</p>\n', type: 'String|Boolean|Number' },
          {
            name: 'radix',
            description: '<p>the radix to convert to (default: 10)</p>\n',
            type: 'Integer',
            optional: true
          }
        ],
        return: { description: 'integer representation of value', type: 'Number' }
      },
      {
        line: 66,
        params: [
          { name: 'ns', description: '<p>values to parse</p>\n', type: 'Array' },
          { name: 'radix', description: '', type: 'Integer', optional: true }
        ],
        return: { description: 'integer representation of values', type: 'Number[]' }
      }
    ]
  },
  {
    description:
      '<p>Converts a boolean, string or number to its string representation.\nWhen an array of values is passed in, then an array of strings of the same\nlength is returned.</p>\n',
    itemtype: 'method',
    name: 'str',
    params: [{ name: 'n', description: '<p>value to parse</p>\n', type: 'String|Boolean|Number|Array' }],
    return: { description: 'string representation of value', type: 'String' },
    example: [
      '\n<div class=\'norender\'><code>\nprint(str(\'10\')); // "10"\nprint(str(10.31)); // "10.31"\nprint(str(-10)); // "-10"\nprint(str(true)); // "true"\nprint(str(false)); // "false"\nprint(str([true, \'10.3\', 9.8])); // [ "true", "10.3", "9.8" ]\n</code></div>'
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Conversion'
  },
  {
    description:
      '<p>Converts a number or string to its boolean representation.\nFor a number, any non-zero value (positive or negative) evaluates to true,\nwhile zero evaluates to false. For a string, the value "true" evaluates to\ntrue, while any other value evaluates to false. When an array of number or\nstring values is passed in, then a array of booleans of the same length is\nreturned.</p>\n',
    itemtype: 'method',
    name: 'boolean',
    params: [{ name: 'n', description: '<p>value to parse</p>\n', type: 'String|Boolean|Number|Array' }],
    return: { description: 'boolean representation of value', type: 'Boolean' },
    example: [
      "\n<div class='norender'><code>\nprint(boolean(0)); // false\nprint(boolean(1)); // true\nprint(boolean('true')); // true\nprint(boolean('abcd')); // false\nprint(boolean([0, 12, 'true'])); // [false, true, true]\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Conversion'
  },
  {
    description:
      '<p>Converts a number, string representation of a number, or boolean to its byte\nrepresentation. A byte can be only a whole number between -128 and 127, so\nwhen a value outside of this range is converted, it wraps around to the\ncorresponding byte representation. When an array of number, string or boolean\nvalues is passed in, then an array of bytes the same length is returned.</p>\n',
    itemtype: 'method',
    name: 'byte',
    return: { description: 'byte representation of value', type: 'Number' },
    example: [
      "\n<div class='norender'><code>\nprint(byte(127)); // 127\nprint(byte(128)); // -128\nprint(byte(23.4)); // 23\nprint(byte('23.4')); // 23\nprint(byte('hello')); // NaN\nprint(byte(true)); // 1\nprint(byte([0, 255, '100'])); // [0, -1, 100]\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Conversion',
    overloads: [
      {
        line: 146,
        params: [{ name: 'n', description: '<p>value to parse</p>\n', type: 'String|Boolean|Number' }],
        return: { description: 'byte representation of value', type: 'Number' }
      },
      {
        line: 168,
        params: [{ name: 'ns', description: '<p>values to parse</p>\n', type: 'Array' }],
        return: { description: 'array of byte representation of values', type: 'Number[]' }
      }
    ]
  },
  {
    description:
      '<p>Converts a number or string to its corresponding single-character\nstring representation. If a string parameter is provided, it is first\nparsed as an integer and then translated into a single-character string.\nWhen an array of number or string values is passed in, then an array of\nsingle-character strings of the same length is returned.</p>\n',
    itemtype: 'method',
    name: 'char',
    return: { description: 'string representation of value', type: 'String' },
    example: [
      '\n<div class=\'norender\'><code>\nprint(char(65)); // "A"\nprint(char(\'65\')); // "A"\nprint(char([65, 66, 67])); // [ "A", "B", "C" ]\nprint(join(char([65, 66, 67]), \'\')); // "ABC"\n</code></div>'
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Conversion',
    overloads: [
      {
        line: 182,
        params: [{ name: 'n', description: '<p>value to parse</p>\n', type: 'String|Number' }],
        return: { description: 'string representation of value', type: 'String' }
      },
      {
        line: 201,
        params: [{ name: 'ns', description: '<p>values to parse</p>\n', type: 'Array' }],
        return: { description: 'array of string representation of values', type: 'String[]' }
      }
    ]
  },
  {
    description:
      '<p>Converts a single-character string to its corresponding integer\nrepresentation. When an array of single-character string values is passed\nin, then an array of integers of the same length is returned.</p>\n',
    itemtype: 'method',
    name: 'unchar',
    return: { description: 'integer representation of value', type: 'Number' },
    example: [
      "\n<div class='norender'><code>\nprint(unchar('A')); // 65\nprint(unchar(['A', 'B', 'C'])); // [ 65, 66, 67 ]\nprint(unchar(split('ABC', ''))); // [ 65, 66, 67 ]\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Conversion',
    overloads: [
      {
        line: 216,
        params: [{ name: 'n', description: '<p>value to parse</p>\n', type: 'String' }],
        return: { description: 'integer representation of value', type: 'Number' }
      },
      {
        line: 232,
        params: [{ name: 'ns', description: '<p>values to parse</p>\n', type: 'Array' }],
        return: { description: 'integer representation of values', type: 'Number[]' }
      }
    ]
  },
  {
    description:
      '<p>Converts a number to a string in its equivalent hexadecimal notation. If a\nsecond parameter is passed, it is used to set the number of characters to\ngenerate in the hexadecimal notation. When an array is passed in, an\narray of strings in hexadecimal notation of the same length is returned.</p>\n',
    itemtype: 'method',
    name: 'hex',
    return: { description: 'hexadecimal string representation of value', type: 'String' },
    example: [
      '\n<div class=\'norender\'><code>\nprint(hex(255)); // "000000FF"\nprint(hex(255, 6)); // "0000FF"\nprint(hex([0, 127, 255], 6)); // [ "000000", "00007F", "0000FF" ]\nprint(Infinity); // "FFFFFFFF"\nprint(-Infinity); // "00000000"\n</code></div>'
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Conversion',
    overloads: [
      {
        line: 245,
        params: [
          { name: 'n', description: '<p>value to parse</p>\n', type: 'Number' },
          { name: 'digits', description: '', type: 'Number', optional: true }
        ],
        return: { description: 'hexadecimal string representation of value', type: 'String' }
      },
      {
        line: 265,
        params: [
          { name: 'ns', description: '<p>array of values to parse</p>\n', type: 'Number[]' },
          { name: 'digits', description: '', type: 'Number', optional: true }
        ],
        return: { description: 'hexadecimal string representation of values', type: 'String[]' }
      }
    ]
  },
  {
    description:
      '<p>Converts a string representation of a hexadecimal number to its equivalent\ninteger value. When an array of strings in hexadecimal notation is passed\nin, an array of integers of the same length is returned.</p>\n',
    itemtype: 'method',
    name: 'unhex',
    return: { description: 'integer representation of hexadecimal value', type: 'Number' },
    example: [
      "\n<div class='norender'><code>\nprint(unhex('A')); // 10\nprint(unhex('FF')); // 255\nprint(unhex(['FF', 'AA', '00'])); // [ 255, 170, 0 ]\n</code></div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'Conversion',
    overloads: [
      {
        line: 295,
        params: [{ name: 'n', description: '<p>value to parse</p>\n', type: 'String' }],
        return: { description: 'integer representation of hexadecimal value', type: 'Number' }
      },
      {
        line: 311,
        params: [{ name: 'ns', description: '<p>values to parse</p>\n', type: 'Array' }],
        return: { description: 'integer representations of hexadecimal value', type: 'Number[]' }
      }
    ]
  },
  {
    description:
      '<p>Combines an array of Strings into one String, each separated by the\ncharacter(s) used for the separator parameter. To join arrays of ints or\nfloats, it\'s necessary to first convert them to Strings using <a href="#/p5/nf">nf()</a> or\nnfs().</p>\n',
    itemtype: 'method',
    name: 'join',
    params: [
      { name: 'list', description: '<p>array of Strings to be joined</p>\n', type: 'Array' },
      { name: 'separator', description: '<p>String to be placed between each item</p>\n', type: 'String' }
    ],
    return: { description: 'joined String', type: 'String' },
    example: [
      "\n<div>\n<code>\nlet array = ['Hello', 'world!'];\nlet separator = ' ';\nlet message = join(array, separator);\ntext(message, 5, 50);\n</code>\n</div>"
    ],
    alt: '"hello world!" displayed middle left of canvas.',
    class: 'p5',
    module: 'Data',
    submodule: 'String Functions'
  },
  {
    description:
      '<p>This function is used to apply a regular expression to a piece of text,\nand return matching groups (elements found inside parentheses) as a\nString array. If there are no matches, a null value will be returned.\nIf no groups are specified in the regular expression, but the sequence\nmatches, an array of length 1 (with the matched text as the first element\nof the array) will be returned.</p>\n<p>To use the function, first check to see if the result is null. If the\nresult is null, then the sequence did not match at all. If the sequence\ndid match, an array is returned.</p>\n<p>If there are groups (specified by sets of parentheses) in the regular\nexpression, then the contents of each will be returned in the array.\nElement [0] of a regular expression match returns the entire matching\nstring, and the match groups start at element [1] (the first group is [1],\nthe second [2], and so on).</p>\n',
    itemtype: 'method',
    name: 'match',
    params: [
      { name: 'str', description: '<p>the String to be searched</p>\n', type: 'String' },
      { name: 'regexp', description: '<p>the regexp to be used for matching</p>\n', type: 'String' }
    ],
    return: { description: 'Array of Strings found', type: 'String[]' },
    example: [
      "\n<div>\n<code>\nlet string = 'Hello p5js*!';\nlet regexp = 'p5js\\\\*';\nlet m = match(string, regexp);\ntext(m, 5, 50);\n</code>\n</div>"
    ],
    alt: '"p5js*" displayed middle left of canvas.',
    class: 'p5',
    module: 'Data',
    submodule: 'String Functions'
  },
  {
    description:
      '<p>This function is used to apply a regular expression to a piece of text,\nand return a list of matching groups (elements found inside parentheses)\nas a two-dimensional String array. If there are no matches, a null value\nwill be returned. If no groups are specified in the regular expression,\nbut the sequence matches, a two dimensional array is still returned, but\nthe second dimension is only of length one.</p>\n<p>To use the function, first check to see if the result is null. If the\nresult is null, then the sequence did not match at all. If the sequence\ndid match, a 2D array is returned.</p>\n<p>If there are groups (specified by sets of parentheses) in the regular\nexpression, then the contents of each will be returned in the array.\nAssuming a loop with counter variable i, element [i][0] of a regular\nexpression match returns the entire matching string, and the match groups\nstart at element [i][1] (the first group is [i][1], the second [i][2],\nand so on).</p>\n',
    itemtype: 'method',
    name: 'matchAll',
    params: [
      { name: 'str', description: '<p>the String to be searched</p>\n', type: 'String' },
      { name: 'regexp', description: '<p>the regexp to be used for matching</p>\n', type: 'String' }
    ],
    return: { description: '2d Array of Strings found', type: 'String[]' },
    example: [
      "\n<div class=\"norender\">\n<code>\nlet string = 'Hello p5js*! Hello world!';\nlet regexp = 'Hello';\nmatchAll(string, regexp);\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'String Functions'
  },
  {
    description:
      "<p>Utility function for formatting numbers into strings. There are two\nversions: one for formatting floats, and one for formatting ints.\nThe values for the digits, left, and right parameters should always\nbe positive integers.\n(NOTE): Be cautious when using left and right parameters as it prepends numbers of 0's if the parameter\nif greater than the current length of the number.\nFor example if number is 123.2 and left parameter passed is 4 which is greater than length of 123\n(integer part) i.e 3 than result will be 0123.2. Same case for right parameter i.e. if right is 3 than\nthe result will be 123.200.</p>\n",
    itemtype: 'method',
    name: 'nf',
    return: { description: 'formatted String', type: 'String' },
    example: [
      "\n<div>\n<code>\nlet myFont;\nfunction preload() {\n  myFont = loadFont('assets/fonts/inconsolata.ttf');\n}\nfunction setup() {\n  background(200);\n  let num1 = 321;\n  let num2 = -1321;\n\n  noStroke();\n  fill(0);\n  textFont(myFont);\n  textSize(22);\n\n  text(nf(num1, 4, 2), 10, 30);\n  text(nf(num2, 4, 2), 10, 80);\n  // Draw dividing line\n  stroke(120);\n  line(0, 50, width, 50);\n}\n</code>\n</div>"
    ],
    alt: '"0321.00" middle top, -1321.00" middle bottom canvas',
    class: 'p5',
    module: 'Data',
    submodule: 'String Functions',
    overloads: [
      {
        line: 130,
        params: [
          { name: 'num', description: '<p>the Number to format</p>\n', type: 'Number|String' },
          {
            name: 'left',
            description:
              '<p>number of digits to the left of the\n                               decimal point</p>\n',
            type: 'Integer|String',
            optional: true
          },
          {
            name: 'right',
            description:
              '<p>number of digits to the right of the\n                               decimal point</p>\n',
            type: 'Integer|String',
            optional: true
          }
        ],
        return: { description: 'formatted String', type: 'String' }
      },
      {
        line: 178,
        params: [
          { name: 'nums', description: '<p>the Numbers to format</p>\n', type: 'Array' },
          { name: 'left', description: '', type: 'Integer|String', optional: true },
          { name: 'right', description: '', type: 'Integer|String', optional: true }
        ],
        return: { description: 'formatted Strings', type: 'String[]' }
      }
    ]
  },
  {
    description:
      '<p>Utility function for formatting numbers into strings and placing\nappropriate commas to mark units of 1000. There are two versions: one\nfor formatting ints, and one for formatting an array of ints. The value\nfor the right parameter should always be a positive integer.</p>\n',
    itemtype: 'method',
    name: 'nfc',
    return: { description: 'formatted String', type: 'String' },
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  background(200);\n  let num = 11253106.115;\n  let numArr = [1, 1, 2];\n\n  noStroke();\n  fill(0);\n  textSize(12);\n\n  // Draw formatted numbers\n  text(nfc(num, 4), 10, 30);\n  text(nfc(numArr, 2), 10, 80);\n\n  // Draw dividing line\n  stroke(120);\n  line(0, 50, width, 50);\n}\n</code>\n</div>'
    ],
    alt: '"11,253,106.115" top middle and "1.00,1.00,2.00" displayed bottom mid',
    class: 'p5',
    module: 'Data',
    submodule: 'String Functions',
    overloads: [
      {
        line: 239,
        params: [
          { name: 'num', description: '<p>the Number to format</p>\n', type: 'Number|String' },
          {
            name: 'right',
            description:
              '<p>number of digits to the right of the\n                                 decimal point</p>\n',
            type: 'Integer|String',
            optional: true
          }
        ],
        return: { description: 'formatted String', type: 'String' }
      },
      {
        line: 277,
        params: [
          { name: 'nums', description: '<p>the Numbers to format</p>\n', type: 'Array' },
          { name: 'right', description: '', type: 'Integer|String', optional: true }
        ],
        return: { description: 'formatted Strings', type: 'String[]' }
      }
    ]
  },
  {
    description:
      '<p>Utility function for formatting numbers into strings. Similar to <a href="#/p5/nf">nf()</a> but\nputs a "+" in front of positive numbers and a "-" in front of negative\nnumbers. There are two versions: one for formatting floats, and one for\nformatting ints. The values for left, and right parameters\nshould always be positive integers.</p>\n',
    itemtype: 'method',
    name: 'nfp',
    return: { description: 'formatted String', type: 'String' },
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  background(200);\n  let num1 = 11253106.115;\n  let num2 = -11253106.115;\n\n  noStroke();\n  fill(0);\n  textSize(12);\n\n  // Draw formatted numbers\n  text(nfp(num1, 4, 2), 10, 30);\n  text(nfp(num2, 4, 2), 10, 80);\n\n  // Draw dividing line\n  stroke(120);\n  line(0, 50, width, 50);\n}\n</code>\n</div>'
    ],
    alt: '"+11253106.11" top middle and "-11253106.11" displayed bottom middle',
    class: 'p5',
    module: 'Data',
    submodule: 'String Functions',
    overloads: [
      {
        line: 313,
        params: [
          { name: 'num', description: '<p>the Number to format</p>\n', type: 'Number' },
          {
            name: 'left',
            description:
              '<p>number of digits to the left of the decimal\n                               point</p>\n',
            type: 'Integer',
            optional: true
          },
          {
            name: 'right',
            description:
              '<p>number of digits to the right of the\n                               decimal point</p>\n',
            type: 'Integer',
            optional: true
          }
        ],
        return: { description: 'formatted String', type: 'String' }
      },
      {
        line: 354,
        params: [
          { name: 'nums', description: '<p>the Numbers to format</p>\n', type: 'Number[]' },
          { name: 'left', description: '', type: 'Integer', optional: true },
          { name: 'right', description: '', type: 'Integer', optional: true }
        ],
        return: { description: 'formatted Strings', type: 'String[]' }
      }
    ]
  },
  {
    description:
      '<p>Utility function for formatting numbers into strings. Similar to <a href="#/p5/nf">nf()</a> but\nputs an additional "_" (space) in front of positive numbers just in case to align it with negative\nnumbers which includes "-" (minus) sign.\nThe main usecase of nfs() can be seen when one wants to align the digits (place values) of a non-negative\nnumber with some negative number (See the example to get a clear picture).\nThere are two versions: one for formatting float, and one for formatting int.\nThe values for the digits, left, and right parameters should always be positive integers.\n(IMP): The result on the canvas basically the expected alignment can vary based on the typeface you are using.\n(NOTE): Be cautious when using left and right parameters as it prepends numbers of 0\'s if the parameter\nif greater than the current length of the number.\nFor example if number is 123.2 and left parameter passed is 4 which is greater than length of 123\n(integer part) i.e 3 than result will be 0123.2. Same case for right parameter i.e. if right is 3 than\nthe result will be 123.200.</p>\n',
    itemtype: 'method',
    name: 'nfs',
    return: { description: 'formatted String', type: 'String' },
    example: [
      "\n<div>\n<code>\nlet myFont;\nfunction preload() {\n  myFont = loadFont('assets/fonts/inconsolata.ttf');\n}\nfunction setup() {\n  background(200);\n  let num1 = 321;\n  let num2 = -1321;\n\n  noStroke();\n  fill(0);\n  textFont(myFont);\n  textSize(22);\n\n  // nfs() aligns num1 (positive number) with num2 (negative number) by\n  // adding a blank space in front of the num1 (positive number)\n  // [left = 4] in num1 add one 0 in front, to align the digits with num2\n  // [right = 2] in num1 and num2 adds two 0's after both numbers\n  // To see the differences check the example of nf() too.\n  text(nfs(num1, 4, 2), 10, 30);\n  text(nfs(num2, 4, 2), 10, 80);\n  // Draw dividing line\n  stroke(120);\n  line(0, 50, width, 50);\n}\n</code>\n</div>"
    ],
    alt: '"0321.00" top middle and "-1321.00" displayed bottom middle',
    class: 'p5',
    module: 'Data',
    submodule: 'String Functions',
    overloads: [
      {
        line: 375,
        params: [
          { name: 'num', description: '<p>the Number to format</p>\n', type: 'Number' },
          {
            name: 'left',
            description:
              '<p>number of digits to the left of the decimal\n                               point</p>\n',
            type: 'Integer',
            optional: true
          },
          {
            name: 'right',
            description:
              '<p>number of digits to the right of the\n                               decimal point</p>\n',
            type: 'Integer',
            optional: true
          }
        ],
        return: { description: 'formatted String', type: 'String' }
      },
      {
        line: 432,
        params: [
          { name: 'nums', description: '<p>the Numbers to format</p>\n', type: 'Array' },
          { name: 'left', description: '', type: 'Integer', optional: true },
          { name: 'right', description: '', type: 'Integer', optional: true }
        ],
        return: { description: 'formatted Strings', type: 'String[]' }
      }
    ]
  },
  {
    description:
      '<p>The <a href="#/p5/split">split()</a> function maps to String.split(), it breaks a String into\npieces using a character or string as the delimiter. The delim parameter\nspecifies the character or characters that mark the boundaries between\neach piece. A String[] array is returned that contains each of the pieces.</p>\n<p>The <a href="#/p5/splitTokens">splitTokens()</a> function works in a similar fashion, except that it\nsplits using a range of characters instead of a specific character or\nsequence.</p>\n',
    itemtype: 'method',
    name: 'split',
    params: [
      { name: 'value', description: '<p>the String to be split</p>\n', type: 'String' },
      { name: 'delim', description: '<p>the String used to separate the data</p>\n', type: 'String' }
    ],
    return: { description: 'Array of Strings', type: 'String[]' },
    example: [
      "\n<div>\n<code>\nlet names = 'Pat,Xio,Alex';\nlet splitString = split(names, ',');\ntext(splitString[0], 5, 30);\ntext(splitString[1], 5, 50);\ntext(splitString[2], 5, 70);\n</code>\n</div>"
    ],
    alt: '"pat" top left, "Xio" mid left and "Alex" displayed bottom left',
    class: 'p5',
    module: 'Data',
    submodule: 'String Functions'
  },
  {
    description:
      '<p>The <a href="#/p5/splitTokens">splitTokens()</a> function splits a String at one or many character\ndelimiters or "tokens." The delim parameter specifies the character or\ncharacters to be used as a boundary.</p>\n<p>If no delim characters are specified, any whitespace character is used to\nsplit. Whitespace characters include tab (\\t), line feed (\\n), carriage\nreturn (\\r), form feed (\\f), and space.</p>\n',
    itemtype: 'method',
    name: 'splitTokens',
    params: [
      { name: 'value', description: '<p>the String to be split</p>\n', type: 'String' },
      {
        name: 'delim',
        description:
          '<p>list of individual Strings that will be used as\n                         separators</p>\n',
        type: 'String',
        optional: true
      }
    ],
    return: { description: 'Array of Strings', type: 'String[]' },
    example: [
      '\n<div class = "norender">\n<code>\nfunction setup() {\n  let myStr = \'Mango, Banana, Lime\';\n  let myStrArr = splitTokens(myStr, \',\');\n\n  print(myStrArr); // prints : ["Mango"," Banana"," Lime"]\n}\n</code>\n</div>'
    ],
    class: 'p5',
    module: 'Data',
    submodule: 'String Functions'
  },
  {
    description:
      '<p>Removes whitespace characters from the beginning and end of a String. In\naddition to standard whitespace characters such as space, carriage return,\nand tab, this function also removes the Unicode "nbsp" character.</p>\n',
    itemtype: 'method',
    name: 'trim',
    return: { description: 'a trimmed String', type: 'String' },
    example: [
      "\n<div>\n<code>\nlet string = trim('  No new lines\\n   ');\ntext(string + ' here', 2, 50);\n</code>\n</div>"
    ],
    alt: '"No new lines here" displayed center canvas',
    class: 'p5',
    module: 'Data',
    submodule: 'String Functions',
    overloads: [
      {
        line: 539,
        params: [{ name: 'str', description: '<p>a String to be trimmed</p>\n', type: 'String' }],
        return: { description: 'a trimmed String', type: 'String' }
      },
      {
        line: 559,
        params: [{ name: 'strs', description: '<p>an Array of Strings to be trimmed</p>\n', type: 'Array' }],
        return: { description: 'an Array of trimmed Strings', type: 'String[]' }
      }
    ]
  },
  {
    description:
      '<p>p5.js communicates with the clock on your computer. The <a href="#/p5/day">day()</a> function\nreturns the current day as a value from 1 - 31.</p>\n',
    itemtype: 'method',
    name: 'day',
    return: { description: 'the current day', type: 'Integer' },
    example: ["\n<div>\n<code>\nlet d = day();\ntext('Current day: \\n' + d, 5, 50);\n</code>\n</div>"],
    alt: 'Current day is displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Time & Date'
  },
  {
    description:
      '<p>p5.js communicates with the clock on your computer. The <a href="#/p5/hour">hour()</a> function\nreturns the current hour as a value from 0 - 23.</p>\n',
    itemtype: 'method',
    name: 'hour',
    return: { description: 'the current hour', type: 'Integer' },
    example: ["\n<div>\n<code>\nlet h = hour();\ntext('Current hour:\\n' + h, 5, 50);\n</code>\n</div>"],
    alt: 'Current hour is displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Time & Date'
  },
  {
    description:
      '<p>p5.js communicates with the clock on your computer. The <a href="#/p5/minute">minute()</a> function\nreturns the current minute as a value from 0 - 59.</p>\n',
    itemtype: 'method',
    name: 'minute',
    return: { description: 'the current minute', type: 'Integer' },
    example: ["\n<div>\n<code>\nlet m = minute();\ntext('Current minute: \\n' + m, 5, 50);\n</code>\n</div>"],
    alt: 'Current minute is displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Time & Date'
  },
  {
    description:
      '<p>Returns the number of milliseconds (thousandths of a second) since\nstarting the sketch (when <code>setup()</code> is called). This information is often\nused for timing events and animation sequences.</p>\n',
    itemtype: 'method',
    name: 'millis',
    return: { description: 'the number of milliseconds since starting the sketch', type: 'Number' },
    example: [
      "\n<div>\n<code>\nlet millisecond = millis();\ntext('Milliseconds \\nrunning: \\n' + millisecond, 5, 40);\n</code>\n</div>"
    ],
    alt: 'number of milliseconds since sketch has started displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Time & Date'
  },
  {
    description:
      '<p>p5.js communicates with the clock on your computer. The <a href="#/p5/month">month()</a> function\nreturns the current month as a value from 1 - 12.</p>\n',
    itemtype: 'method',
    name: 'month',
    return: { description: 'the current month', type: 'Integer' },
    example: ["\n<div>\n<code>\nlet m = month();\ntext('Current month: \\n' + m, 5, 50);\n</code>\n</div>"],
    alt: 'Current month is displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Time & Date'
  },
  {
    description:
      '<p>p5.js communicates with the clock on your computer. The <a href="#/p5/second">second()</a> function\nreturns the current second as a value from 0 - 59.</p>\n',
    itemtype: 'method',
    name: 'second',
    return: { description: 'the current second', type: 'Integer' },
    example: ["\n<div>\n<code>\nlet s = second();\ntext('Current second: \\n' + s, 5, 50);\n</code>\n</div>"],
    alt: 'Current second is displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Time & Date'
  },
  {
    description:
      '<p>p5.js communicates with the clock on your computer. The <a href="#/p5/year">year()</a> function\nreturns the current year as an integer (2014, 2015, 2016, etc).</p>\n',
    itemtype: 'method',
    name: 'year',
    return: { description: 'the current year', type: 'Integer' },
    example: ["\n<div>\n<code>\nlet y = year();\ntext('Current year: \\n' + y, 5, 50);\n</code>\n</div>"],
    alt: 'Current year is displayed',
    class: 'p5',
    module: 'IO',
    submodule: 'Time & Date'
  },
  {
    description: '<p>Draw a plane with given a width and height</p>\n',
    itemtype: 'method',
    name: 'plane',
    params: [
      { name: 'width', description: '<p>width of the plane</p>\n', type: 'Number', optional: true },
      { name: 'height', description: '<p>height of the plane</p>\n', type: 'Number', optional: true },
      {
        name: 'detailX',
        description:
          '<p>Optional number of triangle\n                            subdivisions in x-dimension</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>Optional number of triangle\n                            subdivisions in y-dimension</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// draw a plane\n// with width 50 and height 50\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(200);\n  plane(50, 50);\n}\n</code>\n</div>'
    ],
    alt: 'Nothing displayed on canvas\nRotating interior view of a box with sides that change color.\n3d red and green gradient.\nRotating interior view of a cylinder with sides that change color.\nRotating view of a cylinder with sides that change color.\n3d red and green gradient.\nrotating view of a multi-colored cylinder with concave sides.',
    class: 'p5',
    module: 'Shape',
    submodule: '3D Primitives'
  },
  {
    description: '<p>Draw a box with given width, height and depth</p>\n',
    itemtype: 'method',
    name: 'box',
    params: [
      { name: 'width', description: '<p>width of the box</p>\n', type: 'Number', optional: true },
      { name: 'Height', description: '<p>height of the box</p>\n', type: 'Number', optional: true },
      { name: 'depth', description: '<p>depth of the box</p>\n', type: 'Number', optional: true },
      {
        name: 'detailX',
        description:
          '<p>Optional number of triangle\n                           subdivisions in x-dimension</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>Optional number of triangle\n                           subdivisions in y-dimension</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// draw a spinning box\n// with width, height and depth of 50\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(200);\n  rotateX(frameCount * 0.01);\n  rotateY(frameCount * 0.01);\n  box(50);\n}\n</code>\n</div>'
    ],
    class: 'p5',
    module: 'Shape',
    submodule: '3D Primitives'
  },
  {
    description:
      '<p>Draw a sphere with given radius.</p>\n<p>DetailX and detailY determines the number of subdivisions in the x-dimension\nand the y-dimension of a sphere. More subdivisions make the sphere seem\nsmoother. The recommended maximum values are both 24. Using a value greater\nthan 24 may cause a warning or slow down the browser.</p>\n',
    itemtype: 'method',
    name: 'sphere',
    params: [
      { name: 'radius', description: '<p>radius of circle</p>\n', type: 'Number', optional: true },
      {
        name: 'detailX',
        description: '<p>optional number of subdivisions in x-dimension</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description: '<p>optional number of subdivisions in y-dimension</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// draw a sphere with radius 40\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(205, 102, 94);\n  sphere(40);\n}\n</code>\n</div>',
      "\n<div>\n<code>\nlet detailX;\n// slide to see how detailX works\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  detailX = createSlider(3, 24, 3);\n  detailX.position(10, height + 5);\n  detailX.style('width', '80px');\n}\n\nfunction draw() {\n  background(205, 105, 94);\n  rotateY(millis() / 1000);\n  sphere(40, detailX.value(), 16);\n}\n</code>\n</div>",
      "\n<div>\n<code>\nlet detailY;\n// slide to see how detailY works\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  detailY = createSlider(3, 16, 3);\n  detailY.position(10, height + 5);\n  detailY.style('width', '80px');\n}\n\nfunction draw() {\n  background(205, 105, 94);\n  rotateY(millis() / 1000);\n  sphere(40, 16, detailY.value());\n}\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Shape',
    submodule: '3D Primitives'
  },
  {
    description:
      '<p>Draw a cylinder with given radius and height</p>\n<p>DetailX and detailY determines the number of subdivisions in the x-dimension\nand the y-dimension of a cylinder. More subdivisions make the cylinder seem smoother.\nThe recommended maximum value for detailX is 24. Using a value greater than 24\nmay cause a warning or slow down the browser.</p>\n',
    itemtype: 'method',
    name: 'cylinder',
    params: [
      { name: 'radius', description: '<p>radius of the surface</p>\n', type: 'Number', optional: true },
      { name: 'height', description: '<p>height of the cylinder</p>\n', type: 'Number', optional: true },
      {
        name: 'detailX',
        description:
          '<p>number of subdivisions in x-dimension;\n                              default is 24</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>number of subdivisions in y-dimension;\n                              default is 1</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'bottomCap',
        description: '<p>whether to draw the bottom of the cylinder</p>\n',
        type: 'Boolean',
        optional: true
      },
      {
        name: 'topCap',
        description: '<p>whether to draw the top of the cylinder</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// draw a spinning cylinder\n// with radius 20 and height 50\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(205, 105, 94);\n  rotateX(frameCount * 0.01);\n  rotateZ(frameCount * 0.01);\n  cylinder(20, 50);\n}\n</code>\n</div>',
      "\n<div>\n<code>\n// slide to see how detailX works\nlet detailX;\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  detailX = createSlider(3, 24, 3);\n  detailX.position(10, height + 5);\n  detailX.style('width', '80px');\n}\n\nfunction draw() {\n  background(205, 105, 94);\n  rotateY(millis() / 1000);\n  cylinder(20, 75, detailX.value(), 1);\n}\n</code>\n</div>",
      "\n<div>\n<code>\n// slide to see how detailY works\nlet detailY;\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  detailY = createSlider(1, 16, 1);\n  detailY.position(10, height + 5);\n  detailY.style('width', '80px');\n}\n\nfunction draw() {\n  background(205, 105, 94);\n  rotateY(millis() / 1000);\n  cylinder(20, 75, 16, detailY.value());\n}\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Shape',
    submodule: '3D Primitives'
  },
  {
    description:
      '<p>Draw a cone with given radius and height</p>\n<p>DetailX and detailY determine the number of subdivisions in the x-dimension and\nthe y-dimension of a cone. More subdivisions make the cone seem smoother. The\nrecommended maximum value for detailX is 24. Using a value greater than 24\nmay cause a warning or slow down the browser.</p>\n',
    itemtype: 'method',
    name: 'cone',
    params: [
      {
        name: 'radius',
        description: '<p>radius of the bottom surface</p>\n',
        type: 'Number',
        optional: true
      },
      { name: 'height', description: '<p>height of the cone</p>\n', type: 'Number', optional: true },
      {
        name: 'detailX',
        description:
          '<p>number of segments,\n                            the more segments the smoother geometry\n                            default is 24</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>number of segments,\n                            the more segments the smoother geometry\n                            default is 1</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'cap',
        description: '<p>whether to draw the base of the cone</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// draw a spinning cone\n// with radius 40 and height 70\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(200);\n  rotateX(frameCount * 0.01);\n  rotateZ(frameCount * 0.01);\n  cone(40, 70);\n}\n</code>\n</div>',
      "\n<div>\n<code>\n// slide to see how detailx works\nlet detailX;\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  detailX = createSlider(3, 16, 3);\n  detailX.position(10, height + 5);\n  detailX.style('width', '80px');\n}\n\nfunction draw() {\n  background(205, 102, 94);\n  rotateY(millis() / 1000);\n  cone(30, 65, detailX.value(), 16);\n}\n</code>\n</div>",
      "\n<div>\n<code>\n// slide to see how detailY works\nlet detailY;\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  detailY = createSlider(3, 16, 3);\n  detailY.position(10, height + 5);\n  detailY.style('width', '80px');\n}\n\nfunction draw() {\n  background(205, 102, 94);\n  rotateY(millis() / 1000);\n  cone(30, 65, 16, detailY.value());\n}\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Shape',
    submodule: '3D Primitives'
  },
  {
    description:
      '<p>Draw an ellipsoid with given radius</p>\n<p>DetailX and detailY determine the number of subdivisions in the x-dimension and\nthe y-dimension of a cone. More subdivisions make the ellipsoid appear to be smoother.\nAvoid detail number above 150, it may crash the browser.</p>\n',
    itemtype: 'method',
    name: 'ellipsoid',
    params: [
      { name: 'radiusx', description: '<p>x-radius of ellipsoid</p>\n', type: 'Number', optional: true },
      { name: 'radiusy', description: '<p>y-radius of ellipsoid</p>\n', type: 'Number', optional: true },
      { name: 'radiusz', description: '<p>z-radius of ellipsoid</p>\n', type: 'Number', optional: true },
      {
        name: 'detailX',
        description:
          '<p>number of segments,\n                                   the more segments the smoother geometry\n                                   default is 24. Avoid detail number above\n                                   150, it may crash the browser.</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>number of segments,\n                                   the more segments the smoother geometry\n                                   default is 16. Avoid detail number above\n                                   150, it may crash the browser.</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// draw an ellipsoid\n// with radius 30, 40 and 40.\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(205, 105, 94);\n  ellipsoid(30, 40, 40);\n}\n</code>\n</div>',
      "\n<div>\n<code>\n// slide to see how detailX works\nlet detailX;\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  detailX = createSlider(2, 24, 12);\n  detailX.position(10, height + 5);\n  detailX.style('width', '80px');\n}\n\nfunction draw() {\n  background(205, 105, 94);\n  rotateY(millis() / 1000);\n  ellipsoid(30, 40, 40, detailX.value(), 8);\n}\n</code>\n</div>",
      "\n<div>\n<code>\n// slide to see how detailY works\nlet detailY;\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  detailY = createSlider(2, 24, 6);\n  detailY.position(10, height + 5);\n  detailY.style('width', '80px');\n}\n\nfunction draw() {\n  background(205, 105, 9);\n  rotateY(millis() / 1000);\n  ellipsoid(30, 40, 40, 12, detailY.value());\n}\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Shape',
    submodule: '3D Primitives'
  },
  {
    description:
      '<p>Draw a torus with given radius and tube radius</p>\n<p>DetailX and detailY determine the number of subdivisions in the x-dimension and\nthe y-dimension of a torus. More subdivisions make the torus appear to be smoother.\nThe default and maximum values for detailX and detailY are 24 and 16, respectively.\nSetting them to relatively small values like 4 and 6 allows you to create new\nshapes other than a torus.</p>\n',
    itemtype: 'method',
    name: 'torus',
    params: [
      { name: 'radius', description: '<p>radius of the whole ring</p>\n', type: 'Number', optional: true },
      { name: 'tubeRadius', description: '<p>radius of the tube</p>\n', type: 'Number', optional: true },
      {
        name: 'detailX',
        description:
          '<p>number of segments in x-dimension,\n                               the more segments the smoother geometry\n                               default is 24</p>\n',
        type: 'Integer',
        optional: true
      },
      {
        name: 'detailY',
        description:
          '<p>number of segments in y-dimension,\n                               the more segments the smoother geometry\n                               default is 16</p>\n',
        type: 'Integer',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n// draw a spinning torus\n// with ring radius 30 and tube radius 15\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(205, 102, 94);\n  rotateX(frameCount * 0.01);\n  rotateY(frameCount * 0.01);\n  torus(30, 15);\n}\n</code>\n</div>',
      "\n<div>\n<code>\n// slide to see how detailX works\nlet detailX;\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  detailX = createSlider(3, 24, 3);\n  detailX.position(10, height + 5);\n  detailX.style('width', '80px');\n}\n\nfunction draw() {\n  background(205, 102, 94);\n  rotateY(millis() / 1000);\n  torus(30, 15, detailX.value(), 12);\n}\n</code>\n</div>",
      "\n<div>\n<code>\n// slide to see how detailY works\nlet detailY;\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  detailY = createSlider(3, 16, 3);\n  detailY.position(10, height + 5);\n  detailY.style('width', '80px');\n}\n\nfunction draw() {\n  background(205, 102, 94);\n  rotateY(millis() / 1000);\n  torus(30, 15, 16, detailY.value());\n}\n</code>\n</div>"
    ],
    class: 'p5',
    module: 'Shape',
    submodule: '3D Primitives'
  },
  {
    description:
      '<p>Allows movement around a 3D sketch using a mouse or trackpad.  Left-clicking\nand dragging will rotate the camera position about the center of the sketch,\nright-clicking and dragging will pan the camera position without rotation,\nand using the mouse wheel (scrolling) will move the camera closer or further\nfrom the center of the sketch. This function can be called with parameters\ndictating sensitivity to mouse movement along the X and Y axes.  Calling\nthis function without parameters is equivalent to calling orbitControl(1,1).\nTo reverse direction of movement in either axis, enter a negative number\nfor sensitivity.</p>\n',
    itemtype: 'method',
    name: 'orbitControl',
    params: [
      {
        name: 'sensitivityX',
        description: '<p>sensitivity to mouse movement along X axis</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'sensitivityY',
        description: '<p>sensitivity to mouse movement along Y axis</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'sensitivityZ',
        description: '<p>sensitivity to scroll movement along Z axis</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  normalMaterial();\n}\nfunction draw() {\n  background(200);\n  orbitControl();\n  rotateY(0.5);\n  box(30, 50);\n}\n</code>\n</div>'
    ],
    alt: 'Camera orbits around a box when mouse is hold-clicked & then moved.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Interaction'
  },
  {
    description:
      '<p>debugMode() helps visualize 3D space by adding a grid to indicate where the\n‘ground’ is in a sketch and an axes icon which indicates the +X, +Y, and +Z\ndirections. This function can be called without parameters to create a\ndefault grid and axes icon, or it can be called according to the examples\nabove to customize the size and position of the grid and/or axes icon.  The\ngrid is drawn using the most recently set stroke color and weight.  To\nspecify these parameters, add a call to stroke() and strokeWeight()\njust before the end of the draw() loop.</p>\n<p>By default, the grid will run through the origin (0,0,0) of the sketch\nalong the XZ plane\nand the axes icon will be offset from the origin.  Both the grid and axes\nicon will be sized according to the current canvas size.  Note that because the\ngrid runs parallel to the default camera view, it is often helpful to use\ndebugMode along with orbitControl to allow full view of the grid.</p>\n',
    itemtype: 'method',
    name: 'debugMode',
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  camera(0, -30, 100, 0, 0, 0, 0, 1, 0);\n  normalMaterial();\n  debugMode();\n}\n\nfunction draw() {\n  background(200);\n  orbitControl();\n  box(15, 30);\n  // Press the spacebar to turn debugMode off!\n  if (keyIsDown(32)) {\n    noDebugMode();\n  }\n}\n</code>\n</div>',
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  camera(0, -30, 100, 0, 0, 0, 0, 1, 0);\n  normalMaterial();\n  debugMode(GRID);\n}\n\nfunction draw() {\n  background(200);\n  orbitControl();\n  box(15, 30);\n}\n</code>\n</div>',
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  camera(0, -30, 100, 0, 0, 0, 0, 1, 0);\n  normalMaterial();\n  debugMode(AXES);\n}\n\nfunction draw() {\n  background(200);\n  orbitControl();\n  box(15, 30);\n}\n</code>\n</div>',
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  camera(0, -30, 100, 0, 0, 0, 0, 1, 0);\n  normalMaterial();\n  debugMode(GRID, 100, 10, 0, 0, 0);\n}\n\nfunction draw() {\n  background(200);\n  orbitControl();\n  box(15, 30);\n}\n</code>\n</div>',
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  camera(0, -30, 100, 0, 0, 0, 0, 1, 0);\n  normalMaterial();\n  debugMode(100, 10, 0, 0, 0, 20, 0, -40, 0);\n}\n\nfunction draw() {\n  noStroke();\n  background(200);\n  orbitControl();\n  box(15, 30);\n  // set the stroke color and weight for the grid!\n  stroke(255, 0, 150);\n  strokeWeight(0.8);\n}\n</code>\n</div>'
    ],
    alt: 'a 3D box is centered on a grid in a 3D sketch. an icon\nindicates the direction of each axis: a red line points +X,\na green line +Y, and a blue line +Z.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Interaction',
    overloads: [
      { line: 145, params: [] },
      {
        line: 278,
        params: [{ name: 'mode', description: '<p>either GRID or AXES</p>\n', type: 'Constant' }]
      },
      {
        line: 283,
        params: [
          { name: 'mode', description: '', type: 'Constant' },
          {
            name: 'gridSize',
            description: '<p>size of one side of the grid</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'gridDivisions',
            description: '<p>number of divisions in the grid</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'xOff',
            description: '<p>X axis offset from origin (0,0,0)</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'yOff',
            description: '<p>Y axis offset from origin (0,0,0)</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'zOff',
            description: '<p>Z axis offset from origin (0,0,0)</p>\n',
            type: 'Number',
            optional: true
          }
        ]
      },
      {
        line: 293,
        params: [
          { name: 'mode', description: '', type: 'Constant' },
          { name: 'axesSize', description: '<p>size of axes icon</p>\n', type: 'Number', optional: true },
          { name: 'xOff', description: '', type: 'Number', optional: true },
          { name: 'yOff', description: '', type: 'Number', optional: true },
          { name: 'zOff', description: '', type: 'Number', optional: true }
        ]
      },
      {
        line: 302,
        params: [
          { name: 'gridSize', description: '', type: 'Number', optional: true },
          { name: 'gridDivisions', description: '', type: 'Number', optional: true },
          { name: 'gridXOff', description: '', type: 'Number', optional: true },
          { name: 'gridYOff', description: '', type: 'Number', optional: true },
          { name: 'gridZOff', description: '', type: 'Number', optional: true },
          { name: 'axesSize', description: '', type: 'Number', optional: true },
          { name: 'axesXOff', description: '', type: 'Number', optional: true },
          { name: 'axesYOff', description: '', type: 'Number', optional: true },
          { name: 'axesZOff', description: '', type: 'Number', optional: true }
        ]
      }
    ]
  },
  {
    description: '<p>Turns off debugMode() in a 3D sketch.</p>\n',
    itemtype: 'method',
    name: 'noDebugMode',
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  camera(0, -30, 100, 0, 0, 0, 0, 1, 0);\n  normalMaterial();\n  debugMode();\n}\n\nfunction draw() {\n  background(200);\n  orbitControl();\n  box(15, 30);\n  // Press the spacebar to turn debugMode off!\n  if (keyIsDown(32)) {\n    noDebugMode();\n  }\n}\n</code>\n</div>'
    ],
    alt: 'a 3D box is centered on a grid in a 3D sketch. an icon\nindicates the direction of each axis: a red line points +X,\na green line +Y, and a blue line +Z. the grid and icon disappear when the\nspacebar is pressed.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Interaction'
  },
  {
    description:
      '<p>Creates an ambient light with a color. Ambient light is light that comes from everywhere on the canvas.\nIt has no particular source.</p>\n',
    itemtype: 'method',
    name: 'ambientLight',
    chainable: 1,
    example: [
      '\n<div>\n<code>\ncreateCanvas(100, 100, WEBGL);\nambientLight(0);\nambientMaterial(250);\nsphere(40);\n</code>\n</div>\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(51);\n  ambientLight(100); // white light\n  ambientMaterial(255, 102, 94); // magenta material\n  box(30);\n}\n</code>\n</div>'
    ],
    alt: 'evenly distributed light across a sphere\nevenly distributed light across a rotating sphere',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Lights',
    overloads: [
      {
        line: 11,
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          { name: 'alpha', description: '<p>the alpha value</p>\n', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 51,
        params: [{ name: 'value', description: '<p>a color string</p>\n', type: 'String' }],
        chainable: 1
      },
      {
        line: 57,
        params: [
          { name: 'gray', description: '<p>a gray value</p>\n', type: 'Number' },
          { name: 'alpha', description: '', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 64,
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red,green,blue &\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ],
        chainable: 1
      },
      {
        line: 71,
        params: [{ name: 'color', description: '<p>the ambient light color</p>\n', type: 'p5.Color' }],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Set\'s the color of the specular highlight when using a specular material and\nspecular light.</p>\n<p>This method can be combined with specularMaterial() and shininess()\nfunctions to set specular highlights. The default color is white, ie\n(255, 255, 255), which is used if this method is not called before\nspecularMaterial(). If this method is called without specularMaterial(),\nThere will be no effect.</p>\n<p>Note: specularColor is equivalent to the processing function\n<a href="https://processing.org/reference/lightSpecular_.html">lightSpecular</a>.</p>\n',
    itemtype: 'method',
    name: 'specularColor',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  noStroke();\n}\n\nfunction draw() {\n  background(0);\n  shininess(20);\n  ambientLight(50);\n  specularColor(255, 0, 0);\n  pointLight(255, 0, 0, 0, -50, 50);\n  specularColor(0, 255, 0);\n  pointLight(0, 255, 0, 0, 50, 50);\n  specularMaterial(255);\n  sphere(40);\n}\n</code>\n</div>'
    ],
    alt: 'different specular light sources from top and bottom of canvas',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Lights',
    overloads: [
      {
        line: 92,
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          }
        ],
        chainable: 1
      },
      {
        line: 139,
        params: [{ name: 'value', description: '<p>a color string</p>\n', type: 'String' }],
        chainable: 1
      },
      {
        line: 145,
        params: [{ name: 'gray', description: '<p>a gray value</p>\n', type: 'Number' }],
        chainable: 1
      },
      {
        line: 151,
        params: [
          {
            name: 'values',
            description:
              '<p>an array containing the red,green,blue &\n                                and alpha components of the color</p>\n',
            type: 'Number[]'
          }
        ],
        chainable: 1
      },
      {
        line: 158,
        params: [{ name: 'color', description: '<p>the ambient light color</p>\n', type: 'p5.Color' }],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Creates a directional light with a color and a direction</p>\n<p>A maximum of 5 directionalLight can be active at one time</p>\n',
    itemtype: 'method',
    name: 'directionalLight',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(0);\n  //move your mouse to change light direction\n  let dirX = (mouseX / width - 0.5) * 2;\n  let dirY = (mouseY / height - 0.5) * 2;\n  directionalLight(250, 250, 250, -dirX, -dirY, -1);\n  noStroke();\n  sphere(40);\n}\n</code>\n</div>'
    ],
    alt: 'light source on canvas changeable with mouse position',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Lights',
    overloads: [
      {
        line: 177,
        params: [
          {
            name: 'v1',
            description: '<p>red or hue value (depending on the current\ncolor mode),</p>\n',
            type: 'Number'
          },
          { name: 'v2', description: '<p>green or saturation value</p>\n', type: 'Number' },
          { name: 'v3', description: '<p>blue or brightness value</p>\n', type: 'Number' },
          { name: 'position', description: '<p>the direction of the light</p>\n', type: 'p5.Vector' }
        ],
        chainable: 1
      },
      {
        line: 210,
        params: [
          {
            name: 'color',
            description:
              '<p>color Array, CSS color string,\n                                            or <a href="#/p5.Color">p5.Color</a> value</p>\n',
            type: 'Number[]|String|p5.Color'
          },
          { name: 'x', description: '<p>x axis direction</p>\n', type: 'Number' },
          { name: 'y', description: '<p>y axis direction</p>\n', type: 'Number' },
          { name: 'z', description: '<p>z axis direction</p>\n', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 220,
        params: [
          { name: 'color', description: '', type: 'Number[]|String|p5.Color' },
          { name: 'position', description: '', type: 'p5.Vector' }
        ],
        chainable: 1
      },
      {
        line: 227,
        params: [
          { name: 'v1', description: '', type: 'Number' },
          { name: 'v2', description: '', type: 'Number' },
          { name: 'v3', description: '', type: 'Number' },
          { name: 'x', description: '', type: 'Number' },
          { name: 'y', description: '', type: 'Number' },
          { name: 'z', description: '', type: 'Number' }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Creates a point light with a color and a light position</p>\n<p>A maximum of 5 pointLight can be active at one time</p>\n',
    itemtype: 'method',
    name: 'pointLight',
    chainable: 1,
    example: [
      "\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(0);\n  //move your mouse to change light position\n  let locX = mouseX - width / 2;\n  let locY = mouseY - height / 2;\n  // to set the light position,\n  // think of the world's coordinate as:\n  // -width/2,-height/2 -------- width/2,-height/2\n  //                |            |\n  //                |     0,0    |\n  //                |            |\n  // -width/2,height/2--------width/2,height/2\n  pointLight(250, 250, 250, locX, locY, 50);\n  noStroke();\n  sphere(40);\n}\n</code>\n</div>"
    ],
    alt: 'spot light on canvas changes position with mouse',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Lights',
    overloads: [
      {
        line: 280,
        params: [
          {
            name: 'v1',
            description: '<p>red or hue value (depending on the current\ncolor mode),</p>\n',
            type: 'Number'
          },
          { name: 'v2', description: '<p>green or saturation value</p>\n', type: 'Number' },
          { name: 'v3', description: '<p>blue or brightness value</p>\n', type: 'Number' },
          { name: 'x', description: '<p>x axis position</p>\n', type: 'Number' },
          { name: 'y', description: '<p>y axis position</p>\n', type: 'Number' },
          { name: 'z', description: '<p>z axis position</p>\n', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 322,
        params: [
          { name: 'v1', description: '', type: 'Number' },
          { name: 'v2', description: '', type: 'Number' },
          { name: 'v3', description: '', type: 'Number' },
          { name: 'position', description: '<p>the position of the light</p>\n', type: 'p5.Vector' }
        ],
        chainable: 1
      },
      {
        line: 331,
        params: [
          {
            name: 'color',
            description:
              '<p>color Array, CSS color string,\nor <a href="#/p5.Color">p5.Color</a> value</p>\n',
            type: 'Number[]|String|p5.Color'
          },
          { name: 'x', description: '', type: 'Number' },
          { name: 'y', description: '', type: 'Number' },
          { name: 'z', description: '', type: 'Number' }
        ],
        chainable: 1
      },
      {
        line: 341,
        params: [
          { name: 'color', description: '', type: 'Number[]|String|p5.Color' },
          { name: 'position', description: '', type: 'p5.Vector' }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Sets the default ambient and directional light. The defaults are <a href="#/p5/ambientLight">ambientLight(128, 128, 128)</a> and <a href="#/p5/directionalLight">directionalLight(128, 128, 128, 0, 0, -1)</a>. Lights need to be included in the <a href="#/p5/draw">draw()</a> to remain persistent in a looping program. Placing them in the <a href="#/p5/setup">setup()</a> of a looping program will cause them to only have an effect the first time through the loop.</p>\n',
    itemtype: 'method',
    name: 'lights',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(0);\n  lights();\n  rotateX(millis() / 1000);\n  rotateY(millis() / 1000);\n  rotateZ(millis() / 1000);\n  box();\n}\n</code>\n</div>'
    ],
    alt: 'the light is partially ambient and partially directional',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Lights'
  },
  {
    description:
      '<p>Sets the falloff rates for point lights. It affects only the elements which are created after it in the code.\nThe default value is lightFalloff(1.0, 0.0, 0.0), and the parameters are used to calculate the falloff with the following equation:</p>\n<p>d = distance from light position to vertex position</p>\n<p>falloff = 1 / (CONSTANT + d * LINEAR + ( d * d ) * QUADRATIC)</p>\n',
    itemtype: 'method',
    name: 'lightFalloff',
    params: [
      { name: 'constant', description: '<p>constant value for determining falloff</p>\n', type: 'Number' },
      { name: 'linear', description: '<p>linear value for determining falloff</p>\n', type: 'Number' },
      { name: 'quadratic', description: '<p>quadratic value for determining falloff</p>\n', type: 'Number' }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  noStroke();\n}\nfunction draw() {\n  background(0);\n  let locX = mouseX - width / 2;\n  let locY = mouseY - height / 2;\n  translate(-25, 0, 0);\n  lightFalloff(1, 0, 0);\n  pointLight(250, 250, 250, locX, locY, 50);\n  sphere(20);\n  translate(50, 0, 0);\n  lightFalloff(0.9, 0.01, 0);\n  pointLight(250, 250, 250, locX, locY, 50);\n  sphere(20);\n}\n</code>\n</div>'
    ],
    alt: 'Two spheres with different falloff values show different intensity of light',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Lights'
  },
  {
    description:
      '<p>Creates a spotlight with a given color, position, direction of light,\nangle and concentration. Here, angle refers to the opening or aperture\nof the cone of the spotlight, and concentration is used to focus the\nlight towards the center. Both angle and concentration are optional, but if\nyou want to provide concentration, you will also have to specify the angle.</p>\n<p>A maximum of 5 spotLight can be active at one time</p>\n',
    itemtype: 'method',
    name: 'spotLight',
    chainable: 1,
    example: [
      "\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(0);\n  //move your mouse to change light position\n  let locX = mouseX - width / 2;\n  let locY = mouseY - height / 2;\n  // to set the light position,\n  // think of the world's coordinate as:\n  // -width/2,-height/2 -------- width/2,-height/2\n  //                |            |\n  //                |     0,0    |\n  //                |            |\n  // -width/2,height/2--------width/2,height/2\n  ambientLight(50);\n  spotLight(0, 250, 0, locX, locY, 100, 0, 0, -1, Math.PI / 16);\n  noStroke();\n  sphere(40);\n}\n</code>\n</div>"
    ],
    alt: 'Spot light on a sphere which changes position with mouse',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Lights',
    overloads: [
      {
        line: 510,
        params: [
          {
            name: 'v1',
            description: '<p>red or hue value (depending on the current\ncolor mode),</p>\n',
            type: 'Number'
          },
          { name: 'v2', description: '<p>green or saturation value</p>\n', type: 'Number' },
          { name: 'v3', description: '<p>blue or brightness value</p>\n', type: 'Number' },
          { name: 'x', description: '<p>x axis position</p>\n', type: 'Number' },
          { name: 'y', description: '<p>y axis position</p>\n', type: 'Number' },
          { name: 'z', description: '<p>z axis position</p>\n', type: 'Number' },
          { name: 'rx', description: '<p>x axis direction of light</p>\n', type: 'Number' },
          { name: 'ry', description: '<p>y axis direction of light</p>\n', type: 'Number' },
          { name: 'rz', description: '<p>z axis direction of light</p>\n', type: 'Number' },
          {
            name: 'angle',
            description: '<p>optional parameter for angle. Defaults to PI/3</p>\n',
            type: 'Number',
            optional: true
          },
          {
            name: 'conc',
            description: '<p>optional parameter for concentration. Defaults to 100</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        line: 562,
        params: [
          {
            name: 'color',
            description:
              '<p>color Array, CSS color string,\nor <a href="#/p5.Color">p5.Color</a> value</p>\n',
            type: 'Number[]|String|p5.Color'
          },
          { name: 'position', description: '<p>the position of the light</p>\n', type: 'p5.Vector' },
          { name: 'direction', description: '<p>the direction of the light</p>\n', type: 'p5.Vector' },
          { name: 'angle', description: '', type: 'Number', optional: true },
          { name: 'conc', description: '', type: 'Number', optional: true }
        ]
      },
      {
        line: 571,
        params: [
          { name: 'v1', description: '', type: 'Number' },
          { name: 'v2', description: '', type: 'Number' },
          { name: 'v3', description: '', type: 'Number' },
          { name: 'position', description: '', type: 'p5.Vector' },
          { name: 'direction', description: '', type: 'p5.Vector' },
          { name: 'angle', description: '', type: 'Number', optional: true },
          { name: 'conc', description: '', type: 'Number', optional: true }
        ]
      },
      {
        line: 581,
        params: [
          { name: 'color', description: '', type: 'Number[]|String|p5.Color' },
          { name: 'x', description: '', type: 'Number' },
          { name: 'y', description: '', type: 'Number' },
          { name: 'z', description: '', type: 'Number' },
          { name: 'direction', description: '', type: 'p5.Vector' },
          { name: 'angle', description: '', type: 'Number', optional: true },
          { name: 'conc', description: '', type: 'Number', optional: true }
        ]
      },
      {
        line: 591,
        params: [
          { name: 'color', description: '', type: 'Number[]|String|p5.Color' },
          { name: 'position', description: '', type: 'p5.Vector' },
          { name: 'rx', description: '', type: 'Number' },
          { name: 'ry', description: '', type: 'Number' },
          { name: 'rz', description: '', type: 'Number' },
          { name: 'angle', description: '', type: 'Number', optional: true },
          { name: 'conc', description: '', type: 'Number', optional: true }
        ]
      },
      {
        line: 601,
        params: [
          { name: 'v1', description: '', type: 'Number' },
          { name: 'v2', description: '', type: 'Number' },
          { name: 'v3', description: '', type: 'Number' },
          { name: 'x', description: '', type: 'Number' },
          { name: 'y', description: '', type: 'Number' },
          { name: 'z', description: '', type: 'Number' },
          { name: 'direction', description: '', type: 'p5.Vector' },
          { name: 'angle', description: '', type: 'Number', optional: true },
          { name: 'conc', description: '', type: 'Number', optional: true }
        ]
      },
      {
        line: 613,
        params: [
          { name: 'v1', description: '', type: 'Number' },
          { name: 'v2', description: '', type: 'Number' },
          { name: 'v3', description: '', type: 'Number' },
          { name: 'position', description: '', type: 'p5.Vector' },
          { name: 'rx', description: '', type: 'Number' },
          { name: 'ry', description: '', type: 'Number' },
          { name: 'rz', description: '', type: 'Number' },
          { name: 'angle', description: '', type: 'Number', optional: true },
          { name: 'conc', description: '', type: 'Number', optional: true }
        ]
      },
      {
        line: 625,
        params: [
          { name: 'color', description: '', type: 'Number[]|String|p5.Color' },
          { name: 'x', description: '', type: 'Number' },
          { name: 'y', description: '', type: 'Number' },
          { name: 'z', description: '', type: 'Number' },
          { name: 'rx', description: '', type: 'Number' },
          { name: 'ry', description: '', type: 'Number' },
          { name: 'rz', description: '', type: 'Number' },
          { name: 'angle', description: '', type: 'Number', optional: true },
          { name: 'conc', description: '', type: 'Number', optional: true }
        ]
      }
    ]
  },
  {
    description:
      '<p>This function will remove all the lights from the sketch for the\nsubsequent materials rendered. It affects all the subsequent methods.\nCalls to lighting methods made after noLights() will re-enable lights\nin the sketch.</p>\n',
    itemtype: 'method',
    name: 'noLights',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(0);\n  noStroke();\n\n  ambientLight(150, 0, 0);\n  translate(-25, 0, 0);\n  ambientMaterial(250);\n  sphere(20);\n\n  noLights();\n  ambientLight(0, 150, 0);\n  translate(50, 0, 0);\n  ambientMaterial(250);\n  sphere(20);\n}\n</code>\n</div>'
    ],
    alt: 'Two spheres showing different colors',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Lights'
  },
  {
    description:
      '<p>Load a 3d model from an OBJ or STL file.</p>\n<p><a href="#/p5/loadModel">loadModel()</a> should be placed inside of <a href="#/p5/preload">preload()</a>.\nThis allows the model to load fully before the rest of your code is run.</p>\n<p>One of the limitations of the OBJ and STL format is that it doesn\'t have a built-in\nsense of scale. This means that models exported from different programs might\nbe very different sizes. If your model isn\'t displaying, try calling\n<a href="#/p5/loadModel">loadModel()</a> with the normalized parameter set to true. This will resize the\nmodel to a scale appropriate for p5. You can also make additional changes to\nthe final size of your model with the <a href="#/p5/scale">scale()</a> function.</p>\n<p>Also, the support for colored STL files is not present. STL files with color will be\nrendered without color properties.</p>\n',
    itemtype: 'method',
    name: 'loadModel',
    return: { description: 'the <a href="#/p5.Geometry">p5.Geometry</a> object', type: 'p5.Geometry' },
    example: [
      "\n<div>\n<code>\n//draw a spinning octahedron\nlet octahedron;\n\nfunction preload() {\n  octahedron = loadModel('assets/octahedron.obj');\n}\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(200);\n  rotateX(frameCount * 0.01);\n  rotateY(frameCount * 0.01);\n  model(octahedron);\n}\n</code>\n</div>",
      "\n<div>\n<code>\n//draw a spinning teapot\nlet teapot;\n\nfunction preload() {\n  // Load model with normalise parameter set to true\n  teapot = loadModel('assets/teapot.obj', true);\n}\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(200);\n  scale(0.4); // Scaled to make model fit into canvas\n  rotateX(frameCount * 0.01);\n  rotateY(frameCount * 0.01);\n  normalMaterial(); // For effect\n  model(teapot);\n}\n</code>\n</div>"
    ],
    alt: 'Vertically rotating 3-d teapot with red, green and blue gradient.',
    class: 'p5',
    module: 'Shape',
    submodule: '3D Models',
    overloads: [
      {
        line: 12,
        params: [
          { name: 'path', description: '<p>Path of the model to be loaded</p>\n', type: 'String' },
          {
            name: 'normalize',
            description:
              '<p>If true, scale the model to a\n                                     standardized size when loading</p>\n',
            type: 'Boolean'
          },
          {
            name: 'successCallback',
            description:
              '<p>Function to be called\n                                    once the model is loaded. Will be passed\n                                    the 3D model object.</p>\n',
            type: 'function(p5.Geometry)',
            optional: true
          },
          {
            name: 'failureCallback',
            description:
              '<p>called with event error if\n                                        the model fails to load.</p>\n',
            type: 'Function(Event)',
            optional: true
          },
          {
            name: 'fileType',
            description:
              '<p>The file extension of the model\n                                     (<code>.stl</code>, <code>.obj</code>).</p>\n',
            type: 'String',
            optional: true
          }
        ],
        return: { description: 'the <a href="#/p5.Geometry">p5.Geometry</a> object', type: 'p5.Geometry' }
      },
      {
        line: 96,
        params: [
          { name: 'path', description: '', type: 'String' },
          { name: 'successCallback', description: '', type: 'function(p5.Geometry)', optional: true },
          { name: 'failureCallback', description: '', type: 'Function(Event)', optional: true },
          { name: 'fileType', description: '', type: 'String', optional: true }
        ],
        return: { description: 'the <a href="#/p5.Geometry">p5.Geometry</a> object', type: 'p5.Geometry' }
      }
    ]
  },
  {
    description: '<p>Render a 3d model to the screen.</p>\n',
    itemtype: 'method',
    name: 'model',
    params: [{ name: 'model', description: '<p>Loaded 3d model to be rendered</p>\n', type: 'p5.Geometry' }],
    example: [
      "\n<div>\n<code>\n//draw a spinning octahedron\nlet octahedron;\n\nfunction preload() {\n  octahedron = loadModel('assets/octahedron.obj');\n}\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(200);\n  rotateX(frameCount * 0.01);\n  rotateY(frameCount * 0.01);\n  model(octahedron);\n}\n</code>\n</div>"
    ],
    alt: 'Vertically rotating 3-d octahedron.',
    class: 'p5',
    module: 'Shape',
    submodule: '3D Models'
  },
  {
    description:
      '<p>Loads a custom shader from the provided vertex and fragment\nshader paths. The shader files are loaded asynchronously in the\nbackground, so this method should be used in <a href="#/p5/preload">preload()</a>.</p>\n<p>For now, there are three main types of shaders. p5 will automatically\nsupply appropriate vertices, normals, colors, and lighting attributes\nif the parameters defined in the shader match the names.</p>\n',
    itemtype: 'method',
    name: 'loadShader',
    params: [
      {
        name: 'vertFilename',
        description: '<p>path to file containing vertex shader\nsource code</p>\n',
        type: 'String'
      },
      {
        name: 'fragFilename',
        description: '<p>path to file containing fragment shader\nsource code</p>\n',
        type: 'String'
      },
      {
        name: 'callback',
        description:
          '<p>callback to be executed after loadShader\ncompletes. On success, the Shader object is passed as the first argument.</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>callback to be executed when an error\noccurs inside loadShader. On error, the error is passed as the first\nargument.</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    return: {
      description: 'a shader object created from the provided\nvertex and fragment shader files.',
      type: 'p5.Shader'
    },
    example: [
      "\n<div modernizr='webgl'>\n<code>\nlet mandel;\nfunction preload() {\n  // load the shader definitions from files\n  mandel = loadShader('assets/shader.vert', 'assets/shader.frag');\n}\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  // use the shader\n  shader(mandel);\n  noStroke();\n  mandel.setUniform('p', [-0.74364388703, 0.13182590421]);\n}\n\nfunction draw() {\n  mandel.setUniform('r', 1.5 * exp(-6.5 * (1 + sin(millis() / 2000))));\n  quad(-1, -1, 1, -1, 1, 1, -1, 1);\n}\n</code>\n</div>"
    ],
    alt: 'zooming Mandelbrot set. a colorful, infinitely detailed fractal.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material'
  },
  {
    itemtype: 'method',
    name: 'createShader',
    params: [
      { name: 'vertSrc', description: '<p>source code for the vertex shader</p>\n', type: 'String' },
      { name: 'fragSrc', description: '<p>source code for the fragment shader</p>\n', type: 'String' }
    ],
    return: {
      description: 'a shader object created from the provided\nvertex and fragment shaders.',
      type: 'p5.Shader'
    },
    example: [
      "\n<div modernizr='webgl'>\n<code>\n// the 'varying's are shared between both vertex & fragment shaders\nlet varying = 'precision highp float; varying vec2 vPos;';\n\n// the vertex shader is called for each vertex\nlet vs =\n  varying +\n  'attribute vec3 aPosition;' +\n  'void main() { vPos = (gl_Position = vec4(aPosition,1.0)).xy; }';\n\n// the fragment shader is called for each pixel\nlet fs =\n  varying +\n  'uniform vec2 p;' +\n  'uniform float r;' +\n  'const int I = 500;' +\n  'void main() {' +\n  '  vec2 c = p + vPos * r, z = c;' +\n  '  float n = 0.0;' +\n  '  for (int i = I; i > 0; i --) {' +\n  '    if(z.x*z.x+z.y*z.y > 4.0) {' +\n  '      n = float(i)/float(I);' +\n  '      break;' +\n  '    }' +\n  '    z = vec2(z.x*z.x-z.y*z.y, 2.0*z.x*z.y) + c;' +\n  '  }' +\n  '  gl_FragColor = vec4(0.5-cos(n*17.0)/2.0,0.5-cos(n*13.0)/2.0,0.5-cos(n*23.0)/2.0,1.0);' +\n  '}';\n\nlet mandel;\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n\n  // create and initialize the shader\n  mandel = createShader(vs, fs);\n  shader(mandel);\n  noStroke();\n\n  // 'p' is the center point of the Mandelbrot image\n  mandel.setUniform('p', [-0.74364388703, 0.13182590421]);\n}\n\nfunction draw() {\n  // 'r' is the size of the image in Mandelbrot-space\n  mandel.setUniform('r', 1.5 * exp(-6.5 * (1 + sin(millis() / 2000))));\n  quad(-1, -1, 1, -1, 1, 1, -1, 1);\n}\n</code>\n</div>"
    ],
    alt: 'zooming Mandelbrot set. a colorful, infinitely detailed fractal.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material'
  },
  {
    description:
      '<p>The <a href="#/p5/shader">shader()</a> function lets the user provide a custom shader\nto fill in shapes in WEBGL mode. Users can create their\nown shaders by loading vertex and fragment shaders with\n<a href="#/p5/loadShader">loadShader()</a>.</p>\n',
    itemtype: 'method',
    name: 'shader',
    chainable: 1,
    params: [
      {
        name: 's',
        description: '<p>the desired <a href="#/p5.Shader">p5.Shader</a> to use for rendering\nshapes.</p>\n',
        type: 'p5.Shader',
        optional: true
      }
    ],
    example: [
      "\n<div modernizr='webgl'>\n<code>\n// Click within the image to toggle\n// the shader used by the quad shape\n// Note: for an alternative approach to the same example,\n// involving changing uniforms please refer to:\n// https://p5js.org/reference/#/p5.Shader/setUniform\n\nlet redGreen;\nlet orangeBlue;\nlet showRedGreen = false;\n\nfunction preload() {\n  // note that we are using two instances\n  // of the same vertex and fragment shaders\n  redGreen = loadShader('assets/shader.vert', 'assets/shader-gradient.frag');\n  orangeBlue = loadShader('assets/shader.vert', 'assets/shader-gradient.frag');\n}\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n\n  // initialize the colors for redGreen shader\n  shader(redGreen);\n  redGreen.setUniform('colorCenter', [1.0, 0.0, 0.0]);\n  redGreen.setUniform('colorBackground', [0.0, 1.0, 0.0]);\n\n  // initialize the colors for orangeBlue shader\n  shader(orangeBlue);\n  orangeBlue.setUniform('colorCenter', [1.0, 0.5, 0.0]);\n  orangeBlue.setUniform('colorBackground', [0.226, 0.0, 0.615]);\n\n  noStroke();\n}\n\nfunction draw() {\n  // update the offset values for each shader,\n  // moving orangeBlue in vertical and redGreen\n  // in horizontal direction\n  orangeBlue.setUniform('offset', [0, sin(millis() / 2000) + 1]);\n  redGreen.setUniform('offset', [sin(millis() / 2000), 1]);\n\n  if (showRedGreen === true) {\n    shader(redGreen);\n  } else {\n    shader(orangeBlue);\n  }\n  quad(-1, -1, 1, -1, 1, 1, -1, 1);\n}\n\nfunction mouseClicked() {\n  showRedGreen = !showRedGreen;\n}\n</code>\n</div>"
    ],
    alt: 'canvas toggles between a circular gradient of orange and blue vertically. and a circular gradient of red and green moving horizontally when mouse is clicked/pressed.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material'
  },
  {
    description:
      '<p>This function restores the default shaders in WEBGL mode. Code that runs\nafter resetShader() will not be affected by previously defined\nshaders. Should be run after <a href="#/p5/shader">shader()</a>.</p>\n',
    itemtype: 'method',
    name: 'resetShader',
    chainable: 1,
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material'
  },
  {
    description:
      '<p>Texture for geometry.  You can view other possible materials in this\n<a href="https://p5js.org/examples/3d-materials.html">example</a>.</p>\n',
    itemtype: 'method',
    name: 'texture',
    params: [
      {
        name: 'tex',
        description: '<p>2-dimensional graphics\n                   to render as texture</p>\n',
        type: 'p5.Image|p5.MediaElement|p5.Graphics'
      }
    ],
    chainable: 1,
    example: [
      "\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/laDefense.jpg');\n}\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(0);\n  rotateZ(frameCount * 0.01);\n  rotateX(frameCount * 0.01);\n  rotateY(frameCount * 0.01);\n  //pass image as texture\n  texture(img);\n  box(width / 2);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet pg;\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  pg = createGraphics(200, 200);\n  pg.textSize(75);\n}\n\nfunction draw() {\n  background(0);\n  pg.background(255);\n  pg.text('hello!', 0, 100);\n  //pass image as texture\n  texture(pg);\n  rotateX(0.5);\n  noStroke();\n  plane(50);\n}\n</code>\n</div>\n\n<div>\n<code>\nlet vid;\nfunction preload() {\n  vid = createVideo('assets/fingers.mov');\n  vid.hide();\n}\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(0);\n  //pass video frame as texture\n  texture(vid);\n  rect(-40, -40, 80, 80);\n}\n\nfunction mousePressed() {\n  vid.loop();\n}\n</code>\n</div>"
    ],
    alt: 'Rotating view of many images umbrella and grid roof on a 3d plane\nblack canvas\nblack canvas',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material'
  },
  {
    description:
      '<p>Sets the coordinate space for texture mapping. The default mode is IMAGE\nwhich refers to the actual coordinates of the image.\nNORMAL refers to a normalized space of values ranging from 0 to 1.\nThis function only works in WEBGL mode.</p>\n<p>With IMAGE, if an image is 100 x 200 pixels, mapping the image onto the entire\nsize of a quad would require the points (0,0) (100, 0) (100,200) (0,200).\nThe same mapping in NORMAL is (0,0) (1,0) (1,1) (0,1).</p>\n',
    itemtype: 'method',
    name: 'textureMode',
    params: [{ name: 'mode', description: '<p>either IMAGE or NORMAL</p>\n', type: 'Constant' }],
    example: [
      "\n<div>\n<code>\nlet img;\n\nfunction preload() {\n  img = loadImage('assets/laDefense.jpg');\n}\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  texture(img);\n  textureMode(NORMAL);\n  beginShape();\n  vertex(-50, -50, 0, 0);\n  vertex(50, -50, 1, 0);\n  vertex(50, 50, 1, 1);\n  vertex(-50, 50, 0, 1);\n  endShape();\n}\n</code>\n</div>"
    ],
    alt: 'the underside of a white umbrella and gridded ceiling above',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material'
  },
  {
    description:
      "<p>Sets the global texture wrapping mode. This controls how textures behave\nwhen their uv's go outside of the 0 - 1 range. There are three options:\nCLAMP, REPEAT, and MIRROR.</p>\n<p>CLAMP causes the pixels at the edge of the texture to extend to the bounds\nREPEAT causes the texture to tile repeatedly until reaching the bounds\nMIRROR works similarly to REPEAT but it flips the texture with every new tile</p>\n<p>REPEAT & MIRROR are only available if the texture\nis a power of two size (128, 256, 512, 1024, etc.).</p>\n<p>This method will affect all textures in your sketch until a subsequent\ntextureWrap call is made.</p>\n<p>If only one argument is provided, it will be applied to both the\nhorizontal and vertical axes.</p>\n",
    itemtype: 'method',
    name: 'textureWrap',
    params: [
      { name: 'wrapX', description: '<p>either CLAMP, REPEAT, or MIRROR</p>\n', type: 'Constant' },
      {
        name: 'wrapY',
        description: '<p>either CLAMP, REPEAT, or MIRROR</p>\n',
        type: 'Constant',
        optional: true
      }
    ],
    example: [
      "\n<div>\n<code>\nlet img;\nfunction preload() {\n  img = loadImage('assets/rockies128.jpg');\n}\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  textureWrap(MIRROR);\n}\n\nfunction draw() {\n  background(0);\n\n  let dX = mouseX;\n  let dY = mouseY;\n\n  let u = lerp(1.0, 2.0, dX);\n  let v = lerp(1.0, 2.0, dY);\n\n  scale(width / 2);\n\n  texture(img);\n\n  beginShape(TRIANGLES);\n  vertex(-1, -1, 0, 0, 0);\n  vertex(1, -1, 0, u, 0);\n  vertex(1, 1, 0, u, v);\n\n  vertex(1, 1, 0, u, v);\n  vertex(-1, 1, 0, 0, v);\n  vertex(-1, -1, 0, 0, 0);\n  endShape();\n}\n</code>\n</div>"
    ],
    alt: 'an image of the rocky mountains repeated in mirrored tiles',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material'
  },
  {
    description:
      '<p>Normal material for geometry is a material that is not affected by light.\nIt is not reflective and is a placeholder material often used for debugging.\nSurfaces facing the X-axis, become red, those facing the Y-axis, become green and those facing the Z-axis, become blue.\nYou can view all possible materials in this\n<a href="https://p5js.org/examples/3d-materials.html">example</a>.</p>\n',
    itemtype: 'method',
    name: 'normalMaterial',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(200);\n  normalMaterial();\n  sphere(40);\n}\n</code>\n</div>'
    ],
    alt: 'Red, green and blue gradient.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material'
  },
  {
    description:
      '<p>Ambient material for geometry with a given color. Ambient material defines the color the object reflects under any lighting.\nFor example, if the ambient material of an object is pure red, but the ambient lighting only contains green, the object will not reflect any light.\nHere\'s an <a href="https://p5js.org/examples/3d-materials.html">example containing all possible materials</a>.</p>\n',
    itemtype: 'method',
    name: 'ambientMaterial',
    chainable: 1,
    example: [
      "\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(0);\n  noStroke();\n  ambientLight(200);\n  ambientMaterial(70, 130, 230);\n  sphere(40);\n}\n</code>\n</div>\n<div>\n<code>\n// ambientLight is both red and blue (magenta),\n// so object only reflects it's red and blue components\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(70);\n  ambientLight(100); // white light\n  ambientMaterial(255, 0, 255); // pink material\n  box(30);\n}\n</code>\n</div>\n<div>\n<code>\n// ambientLight is green. Since object does not contain\n// green, it does not reflect any light\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(70);\n  ambientLight(0, 255, 0); // green light\n  ambientMaterial(255, 0, 255); // pink material\n  box(30);\n}\n</code>\n</div>"
    ],
    alt: 'radiating light source from top right of canvas\nbox reflecting only red and blue light\nbox reflecting no light',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material',
    overloads: [
      {
        line: 571,
        params: [
          {
            name: 'v1',
            description:
              '<p>gray value, red or hue value\n                        (depending on the current color mode),</p>\n',
            type: 'Number'
          },
          { name: 'v2', description: '<p>green or saturation value</p>\n', type: 'Number', optional: true },
          { name: 'v3', description: '<p>blue or brightness value</p>\n', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 631,
        params: [
          {
            name: 'color',
            description: '<p>color, color Array, or CSS color string</p>\n',
            type: 'Number[]|String|p5.Color'
          }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Sets the emissive color of the material used for geometry drawn to\nthe screen. This is a misnomer in the sense that the material does not\nactually emit light that effects surrounding polygons. Instead,\nit gives the appearance that the object is glowing. An emissive material\nwill display at full strength even if there is no light for it to reflect.</p>\n',
    itemtype: 'method',
    name: 'emissiveMaterial',
    chainable: 1,
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(0);\n  noStroke();\n  ambientLight(0);\n  emissiveMaterial(130, 230, 0);\n  sphere(40);\n}\n</code>\n</div>'
    ],
    alt: 'radiating light source from top right of canvas',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material',
    overloads: [
      {
        line: 651,
        params: [
          {
            name: 'v1',
            description:
              '<p>gray value, red or hue value\n                        (depending on the current color mode),</p>\n',
            type: 'Number'
          },
          { name: 'v2', description: '<p>green or saturation value</p>\n', type: 'Number', optional: true },
          { name: 'v3', description: '<p>blue or brightness value</p>\n', type: 'Number', optional: true },
          { name: 'a', description: '<p>opacity</p>\n', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 683,
        params: [
          {
            name: 'color',
            description: '<p>color, color Array, or CSS color string</p>\n',
            type: 'Number[]|String|p5.Color'
          }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Specular material for geometry with a given color. Specular material is a shiny reflective material.\nLike ambient material it also defines the color the object reflects under ambient lighting.\nFor example, if the specular material of an object is pure red, but the ambient lighting only contains green, the object will not reflect any light.\nFor all other types of light like point and directional light, a specular material will reflect the color of the light source to the viewer.\nHere\'s an <a href="https://p5js.org/examples/3d-materials.html">example containing all possible materials</a>.</p>\n',
    itemtype: 'method',
    name: 'specularMaterial',
    chainable: 1,
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material',
    overloads: [
      {
        line: 703,
        params: [
          {
            name: 'gray',
            description: '<p>number specifying value between white and black.</p>\n',
            type: 'Number'
          },
          {
            name: 'alpha',
            description:
              '<p>alpha value relative to current color range\n                                (default is 0-255)</p>\n',
            type: 'Number',
            optional: true
          }
        ],
        chainable: 1
      },
      {
        line: 717,
        params: [
          {
            name: 'v1',
            description:
              '<p>red or hue value relative to\n                                the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v2',
            description:
              '<p>green or saturation value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          {
            name: 'v3',
            description:
              '<p>blue or brightness value\n                                relative to the current color range</p>\n',
            type: 'Number'
          },
          { name: 'alpha', description: '', type: 'Number', optional: true }
        ],
        chainable: 1
      },
      {
        line: 747,
        params: [
          {
            name: 'color',
            description: '<p>color Array, or CSS color string</p>\n',
            type: 'Number[]|String|p5.Color'
          }
        ],
        chainable: 1
      }
    ]
  },
  {
    description:
      '<p>Sets the amount of gloss in the surface of shapes.\nUsed in combination with specularMaterial() in setting\nthe material properties of shapes. The default and minimum value is 1.</p>\n',
    itemtype: 'method',
    name: 'shininess',
    params: [
      {
        name: 'shine',
        description: '<p>Degree of Shininess.\n                      Defaults to 1.</p>\n',
        type: 'Number'
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(0);\n  noStroke();\n  let locX = mouseX - width / 2;\n  let locY = mouseY - height / 2;\n  ambientLight(60, 60, 60);\n  pointLight(255, 255, 255, locX, locY, 50);\n  specularMaterial(250);\n  translate(-25, 0, 0);\n  shininess(1);\n  sphere(20);\n  translate(50, 0, 0);\n  shininess(20);\n  sphere(20);\n}\n</code>\n</div>'
    ],
    alt: 'Shininess on Camera changes position with mouse',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Material'
  },
  {
    description:
      '<p>Sets the position of the current camera in a 3D sketch.\nParameters for this function define the camera\'s position,\nthe center of the sketch (where the camera is pointing),\nand an up direction (the orientation of the camera).</p>\n<p>This function simulates the movements of the camera, allowing objects to be\nviewed from various angles. Remember, it does not move the objects themselves\nbut the camera instead. For example when the centerX value is positive,\nand the camera is rotating to the right side of the sketch,\nthe object will seem like it\'s moving to the left.</p>\n<p>See this <a href = "https://www.openprocessing.org/sketch/740258">example</a>\nto view the position of your camera.</p>\n<p>If no parameters are given, the following default is used:\ncamera(0, 0, (height/2) / tan(PI/6), 0, 0, 0, 0, 1, 0)</p>\n',
    itemtype: 'method',
    name: 'camera',
    is_constructor: 1,
    params: [
      { name: 'x', description: '<p>camera position value on x axis</p>\n', type: 'Number', optional: true },
      { name: 'y', description: '<p>camera position value on y axis</p>\n', type: 'Number', optional: true },
      { name: 'z', description: '<p>camera position value on z axis</p>\n', type: 'Number', optional: true },
      {
        name: 'centerX',
        description: '<p>x coordinate representing center of the sketch</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'centerY',
        description: '<p>y coordinate representing center of the sketch</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'centerZ',
        description: '<p>z coordinate representing center of the sketch</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'upX',
        description: "<p>x component of direction 'up' from camera</p>\n",
        type: 'Number',
        optional: true
      },
      {
        name: 'upY',
        description: "<p>y component of direction 'up' from camera</p>\n",
        type: 'Number',
        optional: true
      },
      {
        name: 'upZ',
        description: "<p>z component of direction 'up' from camera</p>\n",
        type: 'Number',
        optional: true
      }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\nfunction draw() {\n  background(204);\n  //move the camera away from the plane by a sin wave\n  camera(0, 0, 20 + sin(frameCount * 0.01) * 10, 0, 0, 0, 0, 1, 0);\n  plane(10, 10);\n}\n</code>\n</div>',
      "\n<div>\n<code>\n//move slider to see changes!\n//sliders control the first 6 parameters of camera()\nlet sliderGroup = [];\nlet X;\nlet Y;\nlet Z;\nlet centerX;\nlet centerY;\nlet centerZ;\nlet h = 20;\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  //create sliders\n  for (var i = 0; i < 6; i++) {\n    if (i === 2) {\n      sliderGroup[i] = createSlider(10, 400, 200);\n    } else {\n      sliderGroup[i] = createSlider(-400, 400, 0);\n    }\n    h = map(i, 0, 6, 5, 85);\n    sliderGroup[i].position(10, height + h);\n    sliderGroup[i].style('width', '80px');\n  }\n}\n\nfunction draw() {\n  background(60);\n  // assigning sliders' value to each parameters\n  X = sliderGroup[0].value();\n  Y = sliderGroup[1].value();\n  Z = sliderGroup[2].value();\n  centerX = sliderGroup[3].value();\n  centerY = sliderGroup[4].value();\n  centerZ = sliderGroup[5].value();\n  camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);\n  stroke(255);\n  fill(255, 102, 94);\n  box(85);\n}\n</code>\n</div>"
    ],
    alt: "White square repeatedly grows to fill canvas and then shrinks.\nAn interactive example of a red cube with 3 sliders for moving it across x, y,\nz axis and 3 sliders for shifting it's center.",
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Camera'
  },
  {
    description:
      '<p>Sets a perspective projection for the current camera in a 3D sketch.\nThis projection represents depth through foreshortening: objects\nthat are close to the camera appear their actual size while those\nthat are further away from the camera appear smaller.</p>\n<p>The parameters to this function define the viewing frustum\n(the truncated pyramid within which objects are seen by the camera) through\nvertical field of view, aspect ratio (usually width/height), and near and far\nclipping planes.</p>\n<p>If no parameters are given, the following default is used:\nperspective(PI/3, width/height, eyeZ/10, eyeZ*10),\nwhere eyeZ is equal to ((height/2) / tan(PI/6)).</p>\n',
    itemtype: 'method',
    name: 'perspective',
    params: [
      {
        name: 'fovy',
        description:
          '<p>camera frustum vertical field of view,\n                          from bottom to top of view, in <a href="#/p5/angleMode">angleMode</a> units</p>\n',
        type: 'Number',
        optional: true
      },
      { name: 'aspect', description: '<p>camera frustum aspect ratio</p>\n', type: 'Number', optional: true },
      { name: 'near', description: '<p>frustum near plane length</p>\n', type: 'Number', optional: true },
      { name: 'far', description: '<p>frustum far plane length</p>\n', type: 'Number', optional: true }
    ],
    chainable: 1,
    example: [
      '\n<div>\n<code>\n//drag the mouse to look around!\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  perspective(PI / 3.0, width / height, 0.1, 500);\n}\nfunction draw() {\n  background(200);\n  orbitControl();\n  normalMaterial();\n\n  rotateX(-0.3);\n  rotateY(-0.2);\n  translate(0, 0, -50);\n\n  push();\n  translate(-15, 0, sin(frameCount / 30) * 95);\n  box(30);\n  pop();\n  push();\n  translate(15, 0, sin(frameCount / 30 + PI) * 95);\n  box(30);\n  pop();\n}\n</code>\n</div>'
    ],
    alt: 'two colored 3D boxes move back and forth, rotating as mouse is dragged.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Camera'
  },
  {
    description:
      '<p>Sets an orthographic projection for the current camera in a 3D sketch\nand defines a box-shaped viewing frustum within which objects are seen.\nIn this projection, all objects with the same dimension appear the same\nsize, regardless of whether they are near or far from the camera.</p>\n<p>The parameters to this function specify the viewing frustum where\nleft and right are the minimum and maximum x values, top and bottom are\nthe minimum and maximum y values, and near and far are the minimum and\nmaximum z values.</p>\n<p>If no parameters are given, the following default is used:\northo(-width/2, width/2, -height/2, height/2).</p>\n',
    itemtype: 'method',
    name: 'ortho',
    params: [
      { name: 'left', description: '<p>camera frustum left plane</p>\n', type: 'Number', optional: true },
      { name: 'right', description: '<p>camera frustum right plane</p>\n', type: 'Number', optional: true },
      { name: 'bottom', description: '<p>camera frustum bottom plane</p>\n', type: 'Number', optional: true },
      { name: 'top', description: '<p>camera frustum top plane</p>\n', type: 'Number', optional: true },
      { name: 'near', description: '<p>camera frustum near plane</p>\n', type: 'Number', optional: true },
      { name: 'far', description: '<p>camera frustum far plane</p>\n', type: 'Number', optional: true }
    ],
    chainable: 1,
    example: [
      "\n<div>\n<code>\n//drag the mouse to look around!\n//there's no vanishing point\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);\n}\nfunction draw() {\n  background(200);\n  orbitControl();\n  normalMaterial();\n\n  rotateX(0.2);\n  rotateY(-0.2);\n  push();\n  translate(-15, 0, sin(frameCount / 30) * 65);\n  box(30);\n  pop();\n  push();\n  translate(15, 0, sin(frameCount / 30 + PI) * 65);\n  box(30);\n  pop();\n}\n</code>\n</div>"
    ],
    alt: 'two 3D boxes move back and forth along same plane, rotating as mouse is dragged.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Camera'
  },
  {
    description:
      '<p>Sets the frustum of the current camera as defined by\nthe parameters.</p>\n<p>A frustum is a geometric form: a pyramid with its top\ncut off. With the viewer\'s eye at the imaginary top of\nthe pyramid, the six planes of the frustum act as clipping\nplanes when rendering a 3D view. Thus, any form inside the\nclipping planes is visible; anything outside\nthose planes is not visible.</p>\n<p>Setting the frustum changes the perspective of the scene being rendered.\nThis can be achieved more simply in many cases by using\n<a href="https://p5js.org/reference/#/p5/perspective">perspective()</a>.</p>\n<p>If no parameters are given, the following default is used:\nfrustum(-width/2, width/2, -height/2, height/2, 0, max(width, height)).</p>\n',
    itemtype: 'method',
    name: 'frustum',
    params: [
      { name: 'left', description: '<p>camera frustum left plane</p>\n', type: 'Number', optional: true },
      { name: 'right', description: '<p>camera frustum right plane</p>\n', type: 'Number', optional: true },
      { name: 'bottom', description: '<p>camera frustum bottom plane</p>\n', type: 'Number', optional: true },
      { name: 'top', description: '<p>camera frustum top plane</p>\n', type: 'Number', optional: true },
      { name: 'near', description: '<p>camera frustum near plane</p>\n', type: 'Number', optional: true },
      { name: 'far', description: '<p>camera frustum far plane</p>\n', type: 'Number', optional: true }
    ],
    chainable: 1,
    example: [
      "\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  setAttributes('antialias', true);\n  frustum(-0.1, 0.1, -0.1, 0.1, 0.1, 200);\n}\nfunction draw() {\n  background(200);\n  orbitControl();\n  normalMaterial();\n\n  rotateY(-0.2);\n  rotateX(-0.3);\n  push();\n  translate(-15, 0, sin(frameCount / 30) * 25);\n  box(30);\n  pop();\n  push();\n  translate(15, 0, sin(frameCount / 30 + PI) * 25);\n  box(30);\n  pop();\n}\n</code>\n</div>"
    ],
    alt: 'two 3D boxes move back and forth along same plane, rotating as mouse is dragged.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Camera'
  },
  {
    description:
      '<p>Creates a new <a href="#/p5.Camera">p5.Camera</a> object and sets it\nas the current (active) camera.</p>\n<p>The new camera is initialized with a default position\n(see <a href="#/p5.Camera/camera">camera()</a>)\nand a default perspective projection\n(see <a href="#/p5.Camera/perspective">perspective()</a>).\nIts properties can be controlled with the <a href="#/p5.Camera">p5.Camera</a>\nmethods.</p>\n<p>Note: Every 3D sketch starts with a default camera initialized.\nThis camera can be controlled with the global methods\n<a href="#/p5/camera">camera()</a>,\n<a href="#/p5/perspective">perspective()</a>, <a href="#/p5/ortho">ortho()</a>,\nand <a href="#/p5/frustum">frustum()</a> if it is the only camera\nin the scene.</p>\n',
    itemtype: 'method',
    name: 'createCamera',
    return: { description: 'The newly created camera object.', type: 'p5.Camera' },
    example: [
      '\n<div><code>\n// Creates a camera object and animates it around a box.\nlet camera;\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  background(0);\n  camera = createCamera();\n}\n\nfunction draw() {\n  camera.lookAt(0, 0, 0);\n  camera.setPosition(sin(frameCount / 60) * 200, 0, 100);\n  box(20);\n}\n</code></div>'
    ],
    alt: 'An example that creates a camera and moves it around the box.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Camera'
  },
  {
    description:
      '<p>Sets a perspective projection.\nAccepts the same parameters as the global\n<a href="#/p5/perspective">perspective()</a>.\nMore information on this function can be found there.</p>\n',
    itemtype: 'method',
    name: 'perspective',
    example: [
      '\n<div>\n<code>\n// drag the mouse to look around!\n\nlet cam;\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  // create a camera\n  cam = createCamera();\n  // give it a perspective projection\n  cam.perspective(PI / 3.0, width / height, 0.1, 500);\n}\n\nfunction draw() {\n  background(200);\n  orbitControl();\n  normalMaterial();\n\n  rotateX(-0.3);\n  rotateY(-0.2);\n  translate(0, 0, -50);\n\n  push();\n  translate(-15, 0, sin(frameCount / 30) * 95);\n  box(30);\n  pop();\n  push();\n  translate(15, 0, sin(frameCount / 30 + PI) * 95);\n  box(30);\n  pop();\n}\n</code>\n</div>'
    ],
    alt: 'two colored 3D boxes move back and forth, rotating as mouse is dragged.',
    class: 'p5.Camera',
    module: 'Lights, Camera',
    submodule: 'Camera'
  },
  {
    description:
      '<p>Sets an orthographic projection.\nAccepts the same parameters as the global\n<a href="#/p5/ortho">ortho()</a>.\nMore information on this function can be found there.</p>\n',
    itemtype: 'method',
    name: 'ortho',
    example: [
      "\n<div>\n<code>\n// drag the mouse to look around!\n// there's no vanishing point\n\nlet cam;\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  // create a camera\n  cam = createCamera();\n  // give it an orthographic projection\n  cam.ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);\n}\nfunction draw() {\n  background(200);\n  orbitControl();\n  normalMaterial();\n\n  rotateX(0.2);\n  rotateY(-0.2);\n  push();\n  translate(-15, 0, sin(frameCount / 30) * 65);\n  box(30);\n  pop();\n  push();\n  translate(15, 0, sin(frameCount / 30 + PI) * 65);\n  box(30);\n  pop();\n}\n</code>\n</div>"
    ],
    alt: 'two 3D boxes move back and forth along same plane, rotating as mouse is dragged.',
    class: 'p5.Camera',
    module: 'Lights, Camera',
    submodule: 'Camera'
  },
  {
    description:
      '<p>Sets the camera\'s frustum.\nAccepts the same parameters as the global\n<a href="#/p5/frustum">frustum()</a>.\nMore information on this function can be found there.</p>\n',
    itemtype: 'method',
    name: 'frustum',
    example: [
      "\n<div>\n<code>\nlet cam;\n\nfunction setup() {\n  x = createCanvas(100, 100, WEBGL);\n  setAttributes('antialias', true);\n  // create a camera\n  cam = createCamera();\n  // set its frustum\n  cam.frustum(-0.1, 0.1, -0.1, 0.1, 0.1, 200);\n}\n\nfunction draw() {\n  background(200);\n  orbitControl();\n  normalMaterial();\n\n  rotateY(-0.2);\n  rotateX(-0.3);\n  push();\n  translate(-15, 0, sin(frameCount / 30) * 25);\n  box(30);\n  pop();\n  push();\n  translate(15, 0, sin(frameCount / 30 + PI) * 25);\n  box(30);\n  pop();\n}\n</code>\n</div>"
    ],
    alt: 'two 3D boxes move back and forth along same plane, rotating as mouse is dragged.',
    class: 'p5.Camera',
    module: 'Lights, Camera',
    submodule: 'Camera'
  },
  {
    description:
      '<p>Sets the camera\'s position and orientation.\nAccepts the same parameters as the global\n<a href="#/p5/camera">camera()</a>.\nMore information on this function can be found there.</p>\n',
    itemtype: 'method',
    name: 'camera',
    example: [
      '\n<div>\n<code>\nlet cam;\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  // Create a camera.\n  // createCamera() sets the newly created camera as\n  // the current (active) camera.\n  cam = createCamera();\n}\n\nfunction draw() {\n  background(204);\n  // Move the camera away from the plane by a sin wave\n  cam.camera(0, 0, 20 + sin(frameCount * 0.01) * 10, 0, 0, 0, 0, 1, 0);\n  plane(10, 10);\n}\n</code>\n</div>',
      "\n<div>\n<code>\n// move slider to see changes!\n// sliders control the first 6 parameters of camera()\n\nlet sliderGroup = [];\nlet X;\nlet Y;\nlet Z;\nlet centerX;\nlet centerY;\nlet centerZ;\nlet h = 20;\nlet cam;\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  // create a camera\n  cam = createCamera();\n  // create sliders\n  for (var i = 0; i < 6; i++) {\n    if (i === 2) {\n      sliderGroup[i] = createSlider(10, 400, 200);\n    } else {\n      sliderGroup[i] = createSlider(-400, 400, 0);\n    }\n    h = map(i, 0, 6, 5, 85);\n    sliderGroup[i].position(10, height + h);\n    sliderGroup[i].style('width', '80px');\n  }\n}\n\nfunction draw() {\n  background(60);\n  // assigning sliders' value to each parameters\n  X = sliderGroup[0].value();\n  Y = sliderGroup[1].value();\n  Z = sliderGroup[2].value();\n  centerX = sliderGroup[3].value();\n  centerY = sliderGroup[4].value();\n  centerZ = sliderGroup[5].value();\n  cam.camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);\n  stroke(255);\n  fill(255, 102, 94);\n  box(85);\n}\n</code>\n</div>"
    ],
    alt: "An interactive example of a red cube with 3 sliders for moving it across x, y,\nz axis and 3 sliders for shifting it's center.",
    class: 'p5.Camera',
    module: 'Lights, Camera',
    submodule: 'Camera'
  },
  {
    description:
      '<p>Sets the current (active) camera of a 3D sketch.\nAllows for switching between multiple cameras.</p>\n',
    itemtype: 'method',
    name: 'setCamera',
    params: [{ name: 'cam', description: '<p>p5.Camera object</p>\n', type: 'p5.Camera' }],
    example: [
      '\n<div>\n<code>\nlet cam1, cam2;\nlet currentCamera;\n\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  normalMaterial();\n\n  cam1 = createCamera();\n  cam2 = createCamera();\n  cam2.setPosition(30, 0, 50);\n  cam2.lookAt(0, 0, 0);\n  cam2.ortho();\n\n  // set variable for previously active camera:\n  currentCamera = 1;\n}\n\nfunction draw() {\n  background(200);\n\n  // camera 1:\n  cam1.lookAt(0, 0, 0);\n  cam1.setPosition(sin(frameCount / 60) * 200, 0, 100);\n\n  // every 100 frames, switch between the two cameras\n  if (frameCount % 100 === 0) {\n    if (currentCamera === 1) {\n      setCamera(cam1);\n      currentCamera = 0;\n    } else {\n      setCamera(cam2);\n      currentCamera = 1;\n    }\n  }\n\n  drawBoxes();\n}\n\nfunction drawBoxes() {\n  rotateX(frameCount * 0.01);\n  translate(-100, 0, 0);\n  box(20);\n  translate(35, 0, 0);\n  box(20);\n  translate(35, 0, 0);\n  box(20);\n  translate(35, 0, 0);\n  box(20);\n  translate(35, 0, 0);\n  box(20);\n  translate(35, 0, 0);\n  box(20);\n  translate(35, 0, 0);\n  box(20);\n}\n</code>\n</div>'
    ],
    alt: 'Canvas switches between two camera views, each showing a series of spinning\n3D boxes.',
    class: 'p5',
    module: 'Lights, Camera',
    submodule: 'Camera'
  },
  {
    description:
      '<p>Set attributes for the WebGL Drawing context.\nThis is a way of adjusting how the WebGL\nrenderer works to fine-tune the display and performance.</p>\n<p>Note that this will reinitialize the drawing context\nif called after the WebGL canvas is made.</p>\n<p>If an object is passed as the parameter, all attributes\nnot declared in the object will be set to defaults.</p>\n<p>The available attributes are:\n<br>\nalpha - indicates if the canvas contains an alpha buffer\ndefault is true</p>\n<p>depth - indicates whether the drawing buffer has a depth buffer\nof at least 16 bits - default is true</p>\n<p>stencil - indicates whether the drawing buffer has a stencil buffer\nof at least 8 bits</p>\n<p>antialias - indicates whether or not to perform anti-aliasing\ndefault is false (true in Safari)</p>\n<p>premultipliedAlpha - indicates that the page compositor will assume\nthe drawing buffer contains colors with pre-multiplied alpha\ndefault is false</p>\n<p>preserveDrawingBuffer - if true the buffers will not be cleared and\nand will preserve their values until cleared or overwritten by author\n(note that p5 clears automatically on draw loop)\ndefault is true</p>\n<p>perPixelLighting - if true, per-pixel lighting will be used in the\nlighting shader otherwise per-vertex lighting is used.\ndefault is true.</p>\n',
    itemtype: 'method',
    name: 'setAttributes',
    example: [
      "\n<div>\n<code>\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(255);\n  push();\n  rotateZ(frameCount * 0.02);\n  rotateX(frameCount * 0.02);\n  rotateY(frameCount * 0.02);\n  fill(0, 0, 0);\n  box(50);\n  pop();\n}\n</code>\n</div>\n<br>\nNow with the antialias attribute set to true.\n<br>\n<div>\n<code>\nfunction setup() {\n  setAttributes('antialias', true);\n  createCanvas(100, 100, WEBGL);\n}\n\nfunction draw() {\n  background(255);\n  push();\n  rotateZ(frameCount * 0.02);\n  rotateX(frameCount * 0.02);\n  rotateY(frameCount * 0.02);\n  fill(0, 0, 0);\n  box(50);\n  pop();\n}\n</code>\n</div>\n\n<div>\n<code>\n// press the mouse button to disable perPixelLighting\nfunction setup() {\n  createCanvas(100, 100, WEBGL);\n  noStroke();\n  fill(255);\n}\n\nlet lights = [\n  { c: '#f00', t: 1.12, p: 1.91, r: 0.2 },\n  { c: '#0f0', t: 1.21, p: 1.31, r: 0.2 },\n  { c: '#00f', t: 1.37, p: 1.57, r: 0.2 },\n  { c: '#ff0', t: 1.12, p: 1.91, r: 0.7 },\n  { c: '#0ff', t: 1.21, p: 1.31, r: 0.7 },\n  { c: '#f0f', t: 1.37, p: 1.57, r: 0.7 }\n];\n\nfunction draw() {\n  let t = millis() / 1000 + 1000;\n  background(0);\n  directionalLight(color('#222'), 1, 1, 1);\n\n  for (let i = 0; i < lights.length; i++) {\n    let light = lights[i];\n    pointLight(\n      color(light.c),\n      p5.Vector.fromAngles(t * light.t, t * light.p, width * light.r)\n    );\n  }\n\n  specularMaterial(255);\n  sphere(width * 0.1);\n\n  rotateX(t * 0.77);\n  rotateY(t * 0.83);\n  rotateZ(t * 0.91);\n  torus(width * 0.3, width * 0.07, 24, 10);\n}\n\nfunction mousePressed() {\n  setAttributes('perPixelLighting', false);\n  noStroke();\n  fill(255);\n}\nfunction mouseReleased() {\n  setAttributes('perPixelLighting', true);\n  noStroke();\n  fill(255);\n}\n</code>\n</div>"
    ],
    alt: 'a rotating cube with smoother edges',
    class: 'p5',
    module: 'Rendering',
    submodule: 'Rendering',
    overloads: [
      {
        line: 334,
        params: [
          { name: 'key', description: '<p>Name of attribute</p>\n', type: 'String' },
          { name: 'value', description: '<p>New value of named attribute</p>\n', type: 'Boolean' }
        ]
      },
      {
        line: 473,
        params: [{ name: 'obj', description: '<p>object with key-value pairs</p>\n', type: 'Object' }]
      }
    ]
  },
  {
    description:
      "<p>Returns the Audio Context for this sketch. Useful for users\nwho would like to dig deeper into the <a target='_blank' href=\n'http://webaudio.github.io/web-audio-api/'>Web Audio API\n</a>.</p>\n\n<p>Some browsers require users to startAudioContext\nwith a user gesture, such as touchStarted in the example below.</p>",
    itemtype: 'method',
    name: 'getAudioContext',
    return: { description: 'AudioContext for this sketch', type: 'Object' },
    example: [
      "\n<div><code>\n function draw() {\n   background(255);\n   textAlign(CENTER);\n\n   if (getAudioContext().state !== 'running') {\n     text('click to start audio', width/2, height/2);\n   } else {\n     text('audio is enabled', width/2, height/2);\n   }\n }\n\n function touchStarted() {\n   if (getAudioContext().state !== 'running') {\n     getAudioContext().resume();\n   }\n   var synth = new p5.MonoSynth();\n   synth.play('A4', 0.5, 0, 0.2);\n }\n\n</div></code>"
    ],
    class: 'p5',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>It is not only a good practice to give users control over starting\naudio. This policy is enforced by many web browsers, including iOS and\n<a href="https://goo.gl/7K7WLu" title="Google Chrome\'s autoplay\npolicy">Google Chrome</a>, which create the Web Audio API\'s\n<a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext"\ntitle="Audio Context @ MDN">Audio Context</a>\nin a suspended state.</p>\n\n<p>In these browser-specific policies, sound will not play until a user\ninteraction event (i.e. <code>mousePressed()</code>) explicitly resumes\nthe AudioContext, or starts an audio node. This can be accomplished by\ncalling <code>start()</code> on a <code>p5.Oscillator</code>,\n<code> play()</code> on a <code>p5.SoundFile</code>, or simply\n<code>userStartAudio()</code>.</p>\n\n<p><code>userStartAudio()</code> starts the AudioContext on a user\ngesture. The default behavior will enable audio on any\nmouseUp or touchEnd event. It can also be placed in a specific\ninteraction function, such as <code>mousePressed()</code> as in the\nexample below. This method utilizes\n<a href="https://github.com/tambien/StartAudioContext">StartAudioContext\n</a>, a library by Yotam Mann (MIT Licence, 2016).</p>',
    params: [
      {
        name: 'element(s)',
        description:
          '<p>This argument can be an Element,\n                              Selector String, NodeList, p5.Element,\n                              jQuery Element, or an Array of any of those.</p>\n',
        type: 'Element|Array',
        optional: true
      },
      {
        name: 'callback',
        description:
          '<p>Callback to invoke when the AudioContext\n                              has started</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    return: {
      description:
        "Returns a Promise that resolves when\n                                     the AudioContext state is 'running'",
      type: 'Promise'
    },
    itemtype: 'method',
    name: 'userStartAudio',
    example: [
      "\n<div><code>\nfunction setup() {\n  // mimics the autoplay policy\n  getAudioContext().suspend();\n\n  let mySynth = new p5.MonoSynth();\n\n  // This won't play until the context has resumed\n  mySynth.play('A6');\n}\nfunction draw() {\n  background(220);\n  textAlign(CENTER, CENTER);\n  text(getAudioContext().state, width/2, height/2);\n}\nfunction mousePressed() {\n  userStartAudio();\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      "<p>Returns a number representing the sample rate, in samples per second,\nof all sound objects in this audio context. It is determined by the\nsampling rate of your operating system's sound card, and it is not\ncurrently possile to change.\nIt is often 44100, or twice the range of human hearing.</p>\n",
    itemtype: 'method',
    name: 'sampleRate',
    return: { description: 'samplerate samples per second', type: 'Number' },
    class: 'p5',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Returns the closest MIDI note value for\na given frequency.</p>\n',
    itemtype: 'method',
    name: 'freqToMidi',
    params: [
      {
        name: 'frequency',
        description:
          '<p>A freqeuncy, for example, the "A"\n                           above Middle C is 440Hz</p>\n',
        type: 'Number'
      }
    ],
    return: { description: 'MIDI note value', type: 'Number' },
    class: 'p5',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Returns the frequency value of a MIDI note value.\nGeneral MIDI treats notes as integers where middle C\nis 60, C# is 61, D is 62 etc. Useful for generating\nmusical frequencies with oscillators.</p>\n',
    itemtype: 'method',
    name: 'midiToFreq',
    params: [{ name: 'midiNote', description: '<p>The number of a MIDI note</p>\n', type: 'Number' }],
    return: { description: 'Frequency value of the given MIDI note', type: 'Number' },
    example: [
      "\n<div><code>\nlet midiNotes = [60, 64, 67, 72];\nlet noteIndex = 0;\nlet midiVal, freq;\n\nfunction setup() {\n  let cnv = createCanvas(100, 100);\n  cnv.mousePressed(startSound);\n  osc = new p5.TriOsc();\n  env = new p5.Envelope();\n}\n\nfunction draw() {\n  background(220);\n  text('tap to play', 10, 20);\n  if (midiVal) {\n    text('MIDI: ' + midiVal, 10, 40);\n    text('Freq: ' + freq, 10, 60);\n  }\n}\n\nfunction startSound() {\n  // see also: userStartAudio();\n  osc.start();\n\n  midiVal = midiNotes[noteIndex % midiNotes.length];\n  freq = midiToFreq(midiVal);\n  osc.freq(freq);\n  env.ramp(osc, 0, 1.0, 0);\n\n  noteIndex++;\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>List the SoundFile formats that you will include. LoadSound\nwill search your directory for these extensions, and will pick\na format that is compatable with the client\'s web browser.\n<a href="http://media.io/">Here</a> is a free online file\nconverter.</p>\n',
    itemtype: 'method',
    name: 'soundFormats',
    params: [
      {
        name: 'formats',
        description: "<p>i.e. 'mp3', 'wav', 'ogg'</p>\n",
        type: 'String',
        optional: true,
        multiple: true
      }
    ],
    example: [
      "\n<div><code>\nfunction preload() {\n  // set the global sound formats\n  soundFormats('mp3', 'ogg');\n\n  // load either beatbox.mp3, or .ogg, depending on browser\n  mySound = loadSound('assets/beatbox.mp3');\n}\n\nfunction setup() {\n     let cnv = createCanvas(100, 100);\n     background(220);\n     text('sound loaded! tap to play', 10, 20, width - 20);\n     cnv.mousePressed(function() {\n       mySound.play();\n     });\n   }\n</code></div>"
    ],
    class: 'p5',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Save a p5.SoundFile as a .wav file. The browser will prompt the user\nto download the file to their device.\nFor uploading audio to a server, use\n<a href="/docs/reference/#/p5.SoundFile/saveBlob"><code>p5.SoundFile.saveBlob</code></a>.</p>\n',
    itemtype: 'method',
    name: 'saveSound',
    params: [
      { name: 'soundFile', description: '<p>p5.SoundFile that you wish to save</p>\n', type: 'p5.SoundFile' },
      { name: 'fileName', description: '<p>name of the resulting .wav file.</p>\n', type: 'String' }
    ],
    class: 'p5',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Loop the p5.SoundFile. Accepts optional parameters to set the\nplayback rate, playback volume, loopStart, loopEnd.</p>\n',
    itemtype: 'method',
    name: 'loop',
    params: [
      {
        name: 'startTime',
        description:
          '<p>(optional) schedule event to occur\n                            seconds from now</p>\n',
        type: 'Number',
        optional: true
      },
      { name: 'rate', description: '<p>(optional) playback rate</p>\n', type: 'Number', optional: true },
      { name: 'amp', description: '<p>(optional) playback volume</p>\n', type: 'Number', optional: true },
      {
        name: 'cueLoopStart',
        description: '<p>(optional) startTime in seconds</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'duration',
        description: '<p>(optional) loop duration in seconds</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    example: [
      "\n <div><code>\n let soundFile;\n let loopStart = 0.5;\n let loopDuration = 0.2;\n function preload() {\n   soundFormats('ogg', 'mp3');\n   soundFile = loadSound('assets/Damscray_-_Dancing_Tiger_02.mp3');\n }\n function setup() {\n   let cnv = createCanvas(100, 100);\n   cnv.mousePressed(canvasPressed);\n   background(220);\n   text('tap to play, release to pause', 10, 20, width - 20);\n }\n function canvasPressed() {\n   soundFile.loop();\n   background(0, 200, 50);\n }\n function mouseReleased() {\n   soundFile.pause();\n   background(220);\n }\n </code>\n </div>"
    ],
    class: 'p5.SoundFile',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Return the sample rate of the sound file.</p>\n',
    itemtype: 'method',
    name: 'sampleRate',
    return: { description: '[sampleRate]', type: 'Number' },
    class: 'p5.SoundFile',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Save a p5.SoundFile as a .wav file. The browser will prompt the user\nto download the file to their device. To upload a file to a server, see\n<a href="/reference/#/p5.SoundFile/getBlob">getBlob</a></p>\n',
    itemtype: 'method',
    name: 'save',
    params: [
      {
        name: 'fileName',
        description: '<p>name of the resulting .wav file.</p>\n',
        type: 'String',
        optional: true
      }
    ],
    example: [
      "\n <div><code>\n let mySound;\n function preload() {\n   mySound = loadSound('assets/doorbell.mp3');\n }\n function setup() {\n   let cnv = createCanvas(100, 100);\n   cnv.mousePressed(canvasPressed);\n   background(220);\n   text('tap to download', 10, 20);\n }\n\n function canvasPressed() {\n   mySound.save('my cool filename');\n }\n</code></div>"
    ],
    class: 'p5.SoundFile',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>loadSound() returns a new p5.SoundFile from a specified\npath. If called during preload(), the p5.SoundFile will be ready\nto play in time for setup() and draw(). If called outside of\npreload, the p5.SoundFile will not be ready immediately, so\nloadSound accepts a callback as the second parameter. Using a\n<a href="https://github.com/processing/p5.js/wiki/Local-server">\nlocal server</a> is recommended when loading external files.</p>\n',
    itemtype: 'method',
    name: 'loadSound',
    params: [
      {
        name: 'path',
        description:
          "<p>Path to the sound file, or an array with\n                                  paths to soundfiles in multiple formats\n                                  i.e. ['sound.ogg', 'sound.mp3'].\n                                  Alternately, accepts an object: either\n                                  from the HTML5 File API, or a p5.File.</p>\n",
        type: 'String|Array'
      },
      {
        name: 'successCallback',
        description: '<p>Name of a function to call once file loads</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>Name of a function to call if there is\n                                    an error loading the file.</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'whileLoading',
        description:
          '<p>Name of a function to call while file is loading.\n                               This function will receive the percentage loaded\n                               so far, from 0.0 to 1.0.</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    return: { description: 'Returns a p5.SoundFile', type: 'SoundFile' },
    example: [
      "\n<div><code>\nlet mySound;\nfunction preload() {\n  soundFormats('mp3', 'ogg');\n  mySound = loadSound('assets/doorbell');\n}\n\nfunction setup() {\n  let cnv = createCanvas(100, 100);\n  cnv.mousePressed(canvasPressed);\n  background(220);\n  text('tap here to play', 10, 20);\n}\n\nfunction canvasPressed() {\n  // playing a sound file on a user gesture\n  // is equivalent to `userStartAudio()`\n  mySound.play();\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Smooth Amplitude analysis by averaging with the last analysis\nframe. Off by default.</p>\n',
    itemtype: 'method',
    name: 'smooth',
    params: [{ name: 'set', description: '<p>smoothing from 0.0 <= 1</p>\n', type: 'Number' }],
    class: 'p5.Amplitude',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Smooth FFT analysis by averaging with the last analysis frame.</p>\n',
    itemtype: 'method',
    name: 'smooth',
    params: [
      {
        name: 'smoothing',
        description: '<p>0.0 < smoothing < 1.0.\n                             Defaults to 0.8.</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5.FFT',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      "<p>Scale this oscillator's amplitude values to a given\nrange, and return the oscillator. Calling this method\nagain will override the initial scale() with new values.</p>\n",
    itemtype: 'method',
    name: 'scale',
    params: [
      { name: 'inMin', description: '<p>input range minumum</p>\n', type: 'Number' },
      { name: 'inMax', description: '<p>input range maximum</p>\n', type: 'Number' },
      { name: 'outMin', description: '<p>input range minumum</p>\n', type: 'Number' },
      { name: 'outMax', description: '<p>input range maximum</p>\n', type: 'Number' }
    ],
    return: {
      description:
        'Oscillator Returns this oscillator\n                                   with scaled output',
      type: 'p5.Oscillator'
    },
    class: 'p5.Oscillator',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Reset the envelope with a series of time/value pairs.</p>\n',
    itemtype: 'method',
    name: 'set',
    params: [
      {
        name: 'attackTime',
        description:
          '<p>Time (in seconds) before level\n                               reaches attackLevel</p>\n',
        type: 'Number'
      },
      {
        name: 'attackLevel',
        description: '<p>Typically an amplitude between\n                               0.0 and 1.0</p>\n',
        type: 'Number'
      },
      { name: 'decayTime', description: '<p>Time</p>\n', type: 'Number' },
      {
        name: 'decayLevel',
        description:
          '<p>Amplitude (In a standard ADSR envelope,\n                               decayLevel = sustainLevel)</p>\n',
        type: 'Number'
      },
      { name: 'releaseTime', description: '<p>Release Time (in seconds)</p>\n', type: 'Number' },
      { name: 'releaseLevel', description: '<p>Amplitude</p>\n', type: 'Number' }
    ],
    example: [
      "\n<div><code>\nlet attackTime;\nlet l1 = 0.7; // attack level 0.0 to 1.0\nlet t2 = 0.3; // decay time in seconds\nlet l2 = 0.1; // decay level  0.0 to 1.0\nlet l3 = 0.2; // release time in seconds\n\nlet env, triOsc;\n\nfunction setup() {\n  let cnv = createCanvas(100, 100);\n  cnv.mousePressed(playSound);\n\n  env = new p5.Envelope();\n  triOsc = new p5.Oscillator('triangle');\n}\n\nfunction draw() {\n  background(220);\n  text('tap here to play', 5, 20);\n\n  attackTime = map(mouseX, 0, width, 0.0, 1.0);\n  text('attack time: ' + attackTime, 5, height - 20);\n}\n\n// mouseClick triggers envelope if over canvas\nfunction playSound() {\n  env.set(attackTime, l1, t2, l2, l3);\n\n  triOsc.start();\n  env.play(triOsc);\n}\n</code></div>\n"
    ],
    class: 'p5.Envelope',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      "<p>Scale this envelope's amplitude values to a given\nrange, and return the envelope. Calling this method\nagain will override the initial scale() with new values.</p>\n",
    itemtype: 'method',
    name: 'scale',
    params: [
      { name: 'inMin', description: '<p>input range minumum</p>\n', type: 'Number' },
      { name: 'inMax', description: '<p>input range maximum</p>\n', type: 'Number' },
      { name: 'outMin', description: '<p>input range minumum</p>\n', type: 'Number' },
      { name: 'outMax', description: '<p>input range maximum</p>\n', type: 'Number' }
    ],
    return: {
      description: 'Envelope Returns this envelope\n                                   with scaled output',
      type: 'p5.Envelope'
    },
    class: 'p5.Envelope',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Set the width of a Pulse object (an oscillator that implements\nPulse Width Modulation).</p>\n',
    itemtype: 'method',
    name: 'width',
    params: [
      {
        name: 'width',
        description: '<p>Width between the pulses (0 to 1.0,\n                       defaults to 0)</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5.Pulse',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Set the frequency and the resonance of the filter.</p>\n',
    itemtype: 'method',
    name: 'set',
    params: [
      {
        name: 'freq',
        description: '<p>Frequency in Hz, from 10 to 22050</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'res',
        description: '<p>Resonance (Q) from 0.001 to 1000</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'timeFromNow',
        description: '<p>schedule this event to happen\n                              seconds from now</p>\n',
        type: 'Number',
        optional: true
      }
    ],
    class: 'p5.Filter',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Set the X,Y,Z position of the Panner</p>\n',
    itemtype: 'method',
    name: 'set',
    params: [
      { name: 'xVal', description: '', type: 'Number' },
      { name: 'yVal', description: '', type: 'Number' },
      { name: 'zVal', description: '', type: 'Number' },
      { name: 'time', description: '', type: 'Number' }
    ],
    return: { description: 'Updated x, y, z values as an array', type: 'Array' },
    class: 'p5.Panner3D',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Set a lowpass filter frequency for the delay. A lowpass filter\nwill cut off any frequencies higher than the filter frequency.</p>\n',
    itemtype: 'method',
    name: 'filter',
    params: [
      {
        name: 'cutoffFreq',
        description:
          '<p>A lowpass filter will cut off any\n                            frequencies higher than the filter frequency.</p>\n',
        type: 'Number|Object'
      },
      {
        name: 'res',
        description:
          '<p>Resonance of the filter frequency\n                            cutoff, or an object (i.e. a p5.Oscillator)\n                            that can be used to modulate this parameter.\n                            High numbers (i.e. 15) will produce a resonance,\n                            low numbers (i.e. .2) will produce a slope.</p>\n',
        type: 'Number|Object'
      }
    ],
    class: 'p5.Delay',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Set the reverb settings. Similar to .process(), but without\nassigning a new input.</p>\n',
    itemtype: 'method',
    name: 'set',
    params: [
      {
        name: 'seconds',
        description:
          '<p>Duration of the reverb, in seconds.\n                         Min: 0, Max: 10. Defaults to 3.</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'decayRate',
        description:
          '<p>Percentage of decay with each echo.\n                          Min: 0, Max: 100. Defaults to 2.</p>\n',
        type: 'Number',
        optional: true
      },
      {
        name: 'reverse',
        description: '<p>Play the reverb backwards or forwards.</p>\n',
        type: 'Boolean',
        optional: true
      }
    ],
    class: 'p5.Reverb',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Create a p5.Convolver. Accepts a path to a soundfile\nthat will be used to generate an impulse response.</p>\n',
    itemtype: 'method',
    name: 'createConvolver',
    params: [
      { name: 'path', description: '<p>path to a sound file</p>\n', type: 'String' },
      {
        name: 'callback',
        description:
          '<p>function to call if loading is successful.\n                              The object will be passed in as the argument\n                              to the callback function.</p>\n',
        type: 'Function',
        optional: true
      },
      {
        name: 'errorCallback',
        description:
          '<p>function to call if loading is not successful.\n                              A custom error will be passed in as the argument\n                              to the callback function.</p>\n',
        type: 'Function',
        optional: true
      }
    ],
    return: { description: '', type: 'p5.Convolver' },
    example: [
      "\n<div><code>\nlet cVerb, sound;\nfunction preload() {\n  // We have both MP3 and OGG versions of all sound assets\n  soundFormats('ogg', 'mp3');\n\n  // Try replacing 'bx-spring' with other soundfiles like\n  // 'concrete-tunnel' 'small-plate' 'drum' 'beatbox'\n  cVerb = createConvolver('assets/bx-spring.mp3');\n\n  // Try replacing 'Damscray_DancingTiger' with\n  // 'beat', 'doorbell', lucky_dragons_-_power_melody'\n  sound = loadSound('assets/Damscray_DancingTiger.mp3');\n}\n\nfunction setup() {\n  let cnv = createCanvas(100, 100);\n  cnv.mousePressed(playSound);\n  background(220);\n  text('tap to play', 20, 20);\n\n  // disconnect from main output...\n  sound.disconnect();\n\n  // ...and process with cVerb\n  // so that we only hear the convolution\n  cVerb.process(sound);\n}\n\nfunction playSound() {\n  sound.play();\n}\n</code></div>"
    ],
    class: 'p5',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Set the global tempo, in beats per minute, for all\np5.Parts. This method will impact all active p5.Parts.</p>\n',
    itemtype: 'method',
    name: 'setBPM',
    params: [
      { name: 'BPM', description: '<p>Beats Per Minute</p>\n', type: 'Number' },
      { name: 'rampTime', description: '<p>Seconds from now</p>\n', type: 'Number' }
    ],
    class: 'p5',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Set the tempo of this part, in Beats Per Minute.</p>\n',
    itemtype: 'method',
    name: 'setBPM',
    params: [
      { name: 'BPM', description: '<p>Beats Per Minute</p>\n', type: 'Number' },
      { name: 'rampTime', description: '<p>Seconds from now</p>\n', type: 'Number', optional: true }
    ],
    class: 'p5.Part',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Loop playback of this part. It will begin\nlooping through all of its phrases at a speed\ndetermined by setBPM.</p>\n',
    itemtype: 'method',
    name: 'loop',
    params: [{ name: 'time', description: '<p>seconds from now</p>\n', type: 'Number', optional: true }],
    class: 'p5.Part',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Tell the part to stop looping.</p>\n',
    itemtype: 'method',
    name: 'noLoop',
    class: 'p5.Part',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Loop playback of the score.</p>\n',
    itemtype: 'method',
    name: 'loop',
    class: 'p5.Score',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description:
      '<p>Stop looping playback of the score. If it\nis currently playing, this will go into effect\nafter the current round of playback completes.</p>\n',
    itemtype: 'method',
    name: 'noLoop',
    class: 'p5.Score',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Set the tempo for all parts in the score</p>\n',
    itemtype: 'method',
    name: 'setBPM',
    params: [
      { name: 'BPM', description: '<p>Beats Per Minute</p>\n', type: 'Number' },
      { name: 'rampTime', description: '<p>Seconds from now</p>\n', type: 'Number' }
    ],
    class: 'p5.Score',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Set the paramters of a compressor.</p>\n',
    itemtype: 'method',
    name: 'set',
    params: [
      {
        name: 'attack',
        description:
          '<p>The amount of time (in seconds) to reduce the gain by 10dB,\n                           default = .003, range 0 - 1</p>\n',
        type: 'Number'
      },
      {
        name: 'knee',
        description:
          '<p>A decibel value representing the range above the\n                           threshold where the curve smoothly transitions to the "ratio" portion.\n                           default = 30, range 0 - 40</p>\n',
        type: 'Number'
      },
      {
        name: 'ratio',
        description:
          '<p>The amount of dB change in input for a 1 dB change in output\n                           default = 12, range 1 - 20</p>\n',
        type: 'Number'
      },
      {
        name: 'threshold',
        description:
          '<p>The decibel value above which the compression will start taking effect\n                           default = -24, range -100 - 0</p>\n',
        type: 'Number'
      },
      {
        name: 'release',
        description:
          '<p>The amount of time (in seconds) to increase the gain by 10dB\n                           default = .25, range 0 - 1</p>\n',
        type: 'Number'
      }
    ],
    class: 'p5.Compressor',
    module: 'p5.sound',
    submodule: 'p5.sound'
  },
  {
    description: '<p>Set the amount and oversample of the waveshaper distortion.</p>\n',
    itemtype: 'method',
    name: 'set',
    params: [
      {
        name: 'amount',
        description:
          '<p>Unbounded distortion amount.\n                               Normal values range from 0-1.</p>\n',
        type: 'Number',
        optional: true,
        optdefault: '0.25'
      },
      {
        name: 'oversample',
        description: "<p>'none', '2x', or '4x'.</p>\n",
        type: 'String',
        optional: true,
        optdefault: "'none'"
      }
    ],
    class: 'p5.Distortion',
    module: 'p5.sound',
    submodule: 'p5.sound'
  }
];
