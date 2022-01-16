import React from 'react';
// @ts-ignore
import Triangle from '../../../../images/shapeToolbox/triangle.svg';
import { fabric } from 'fabric';
import { defaults, DrawOperation, fabricDefaults } from '../ShapeToolboxOverlay';
const TriangleDrawingTool: DrawOperation = {
  name: 'triangle',
  insertIntoCanvas: (canvas, gestureSeq, { defaultSize }) =>
    canvas.add(
      new fabric.Triangle({
        ...fabricDefaults,
        left: gestureSeq[0].x,
        top: gestureSeq[0].y,
        ...defaultSize
      })
    ),

  processExisitingCall: (args) => {
    const [x1, y1, x2, y2, x3, y3] = args;
    const points = [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 }
    ];
    return new fabric.Polygon(points, defaults);
  },
  generateCode: (o) => {
    const coords = o.oCoords!;
    return ['triangle', [coords.mt.x, coords.mt.y, coords.bl.x, coords.bl.y, coords.br.x, coords.br.y]];
  },
  icon: Triangle,
  gestureLength: 1,
  gesturePreview: (seq, point) => <circle cx={point.x} cy={point.y} r={20} {...defaults}></circle>
};
export default TriangleDrawingTool;
