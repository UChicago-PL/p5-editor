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

  processExistingCall: (args) => {
    const [x1, y1, x2, y2, x3, y3] = args;
    const points = [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 }
    ];
    return new fabric.Polygon(points, fabricDefaults);
  },
  generateCode: (o) => {
    const { mt, bl, br } = o.oCoords!;
    return ['triangle', [mt.x, mt.y, bl.x, bl.y, br.x, br.y]];
  },
  icon: Triangle,
  gestureLength: 1,
  gesturePreview: (seq, { x, y }, { defaultSize: { height, width } }) => {
    const points = [
      [x, y + height],
      [x + width / 2, y],
      [x + width, y + height]
    ]
      .map((r) => r.join(','))
      .join(' ');
    return <polygon {...defaults} points={points}></polygon>;
  }
};
export default TriangleDrawingTool;
