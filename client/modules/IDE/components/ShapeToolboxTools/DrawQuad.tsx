import React from 'react';

import { fabric } from 'fabric';

import { defaults, DrawOperation } from '../ShapeToolboxOverlay';
const QuadDrawingTool: DrawOperation = {
  name: 'quad',
  insertIntoCanvas: (canvas) => {},
  processExisitingCall: (args) => {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = args;
    const points = [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 },
      { x: x4, y: y4 }
    ];
    return new fabric.Polygon(points, defaults);
  },
  generateCode: () => ['console.log', ['"not implemented yet"']],
  gestureLength: 2,
  skip: true,
  gesturePreview: () => <g></g>
};
export default QuadDrawingTool;
