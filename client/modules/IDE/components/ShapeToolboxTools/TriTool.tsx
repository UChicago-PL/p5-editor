import React from 'react';
import { fabric } from 'fabric';
import { DrawingTool, defaults } from '../ShapeToolboxOverlay';
// @ts-ignore
import Triangle from '../../../../images/shapeToolbox/triangle.svg';
const TriangleDrawingTool: DrawingTool = {
  name: 'triangle',
  generateFuncCall: (args) => {
    const { coords } = args;
    return ['triangle', [coords.mt.x, coords.mt.y, coords.bl.x, coords.bl.y, coords.br.x, coords.br.y]];
  },
  addShape: ({ canvas, localDefaults: { defaultSize }, gestureSeq }) => {
    const tri = new fabric.Triangle({
      ...defaults,
      left: gestureSeq[0].x,
      top: gestureSeq[0].y,
      ...defaultSize
    });
    canvas.add(tri);
  },
  processExistingCall: ({ args }) => {
    const [x1, y1, x2, y2, x3, y3] = args;
    const points = [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 }
    ];
    return [new fabric.Polygon(points, defaults)];
  },
  icon: Triangle,
  ariaLabel: 'triangle()',
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
