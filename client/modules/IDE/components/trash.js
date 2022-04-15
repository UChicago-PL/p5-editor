// const defaultSize = {
//   width: Math.min(canvasSize.width / 2, 70),
//   height: Math.min(canvasSize.height / 2, 70)
// };

// The randomness slightly changes the placement of every new shape
// This makes it obvious that a new shape is added, even when it's the same one multiple times in a row
// const variation = 20;
// const defaultLoc = () => ({
//   left: canvasSize.width / 2 - defaultSize.width / 2 + randrange(-variation, variation),
//   top: canvasSize.height / 2 - defaultSize.height / 2 + randrange(-variation, variation)
// });

// const addLine = () => {
//   const loc = defaultLoc();

//   canvas.add(
//     new fabric.Line(
//       [loc.left, loc.top, loc.left + defaultSize.width, loc.top + defaultSize.height],
//       defaults
//     )
//   );
// };

// const addRect = () =>
//   canvas.add(
//     new fabric.Rect({
//       ...defaults,
//       ...defaultLoc(),
//       ...defaultSize
//     })
//   );

// const addCircle = () => {
//   const o = new fabric.Circle({
//     ...defaults,
//     ...defaultLoc(),
//     radius: defaultSize.width / 2
//   });

//   // https://stackoverflow.com/a/66692592
//   // Disable rotation. We don't have support for this because there's no way
//   // to do that in p5 without using transforms,
//   // whereas, for example, it is possible to do that with rects using quad()
//   o.setControlsVisibility({ mtr: false });

//   canvas.add(o);
// };

// const addTriangle = () =>
//   canvas.add(
//     new fabric.Triangle({
//       ...defaults,
//       ...defaultLoc(),
//       ...defaultSize
//     })
//   );

// const addBezier = () => {
//   const loc = defaultLoc();
//   createBezier(
//     [
//       [loc.left, loc.top + defaultSize.height],
//       [loc.left + 10, loc.top],
//       [loc.left + defaultSize.width - 10, loc.top],
//       [loc.left + defaultSize.width, loc.top + defaultSize.height]
//     ],
//     defaults,
//     canvas
//   ).forEach((o) => canvas.add(o));
// };

// switch (name) {
// case 'line': {
//   return [new fabric.Line(args, defaults)];
// }
// Curly brackets necessary here because of duplicate declaration of left and top below :(
// case 'rect': {
//   const [left, top, width, height] = args;
//   return [
//     new fabric.Rect({
//       ...defaults,
//       left,
//       top,
//       width,
//       height
//     })
//   ];
// }
// case 'quad': {
//   const [x1, y1, x2, y2, x3, y3, x4, y4] = args;
//   const points = [
//     { x: x1, y: y1 },
//     { x: x2, y: y2 },
//     { x: x3, y: y3 },
//     { x: x4, y: y4 }
//   ];
//   return [new fabric.Polygon(points, defaults)];
// }
// case 'circle': {
//   const [left, top, diameter] = args;
//   return [
//     new fabric.Circle({
//       ...defaults,
//       left: left - diameter / 2,
//       top: top - diameter / 2,
//       radius: diameter / 2
//     })
//   ];
// }
// case 'ellipse': {
//   const [left, top, width, height] = args;
//   return [
//     new fabric.Ellipse({
//       ...defaults,
//       left: left - width / 2,
//       top: top - height / 2,
//       rx: width / 2,
//       ry: height / 2
//     })
//   ];
// }
// case 'triangle': {
//   const [x1, y1, x2, y2, x3, y3] = args;
//   const points = [
//     { x: x1, y: y1 },
//     { x: x2, y: y2 },
//     { x: x3, y: y3 }
//   ];
//   return [new fabric.Polygon(points, defaults)];
// }
// case 'bezier': {
//   const [x1, y1, x2, y2, x3, y3, x4, y4] = args;
//   return createBezier(
//     [
//       [x1, y1],
//       [x2, y2],
//       [x3, y3],
//       [x4, y4]
//     ],
//     defaults,
//     canvas
//   );
// }
// default:
//   return [];
// }

// switch (o.type) {
// case 'line': {
//   const [p1, p2] = calcAbsolutePointsForLine(o);
//   return ['line', [p1.x, p1.y, p2.x, p2.y]];
// }
// case 'rect': {
//   if (o.angle) {
//     return [
//       'quad',
//       [
//         coords.tl.x,
//         coords.tl.y,
//         coords.bl.x,
//         coords.bl.y,
//         coords.br.x,
//         coords.br.y,
//         coords.tr.x,
//         coords.tr.y
//       ]
//     ];
//   } else return ['rect', [coords.tl.x, coords.tl.y, o.width * o.scaleX, o.height * o.scaleY]];
// }
// case 'circle': {
//   if (o.special) {
//     // This is a special control circle used in the curve shape
//     return null;
//   }
//   if (o.scaleX === o.scaleY) {
//     return [
//       'circle',
//       [coords.tl.x + o.radius * o.scaleX, coords.tl.y + o.radius * o.scaleX, o.radius * 2 * o.scaleX]
//     ];
//   }
//   return [
//     'ellipse',
//     [
//       coords.tl.x + (o.width * o.scaleX) / 2,
//       coords.tl.y + (o.height * o.scaleY) / 2,
//       o.width * o.scaleX,
//       o.height * o.scaleY
//     ]
//   ];
// }
// case 'triangle': {
//   return ['triangle', [coords.mt.x, coords.mt.y, coords.bl.x, coords.bl.y, coords.br.x, coords.br.y]];
// }
// case 'ellipse': {
//   return [
//     'ellipse',
//     [
//       coords.tl.x + (o.width * o.scaleX) / 2,
//       coords.tl.y + (o.height * o.scaleY) / 2,
//       o.width * o.scaleX,
//       o.height * o.scaleY
//     ]
//   ];
// }
// case 'polygon': {
//   const points = calcAbsolutePoints(o, o.points);
//   switch (o.points.length) {
//     case 3: {
//       const [p1, p2, p3] = points;
//       return ['triangle', [p1.x, p1.y, p2.x, p2.y, p3.x, p3.y]];
//     }
//     case 4:
//       const [p1, p2, p3, p4] = points;
//       return ['quad', [p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y]];
//     default:
//       throw Error(
//         'Trying to generate p5 code for a Fabric.js polygon with unrecognized number of points: ' +
//           o.points.length
//       );
//   }
// }
// case 'path': {
//   const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = toAbsolutePoints(o);
//   return ['bezier', [x1, y1, x2, y2, x3, y3, x4, y4]];
// }
//   default:
//     throw new Error('Attempting to generate code for unrecognized fabric.js object type: ' + o.type);
// }
