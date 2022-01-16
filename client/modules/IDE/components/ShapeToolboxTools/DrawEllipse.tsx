import React from 'react';

import { fabric } from 'fabric';
// @ts-ignore
import { defaults, DrawOperation } from '../ShapeToolboxOverlay';
const EllipseDrawingTool: DrawOperation = {
  name: 'ellipse',
  processExisitingCall: (args) => {
    const [left, top, width, height] = args;
    return new fabric.Ellipse({
      ...defaults,
      left: left - width / 2,
      top: top - height / 2,
      rx: width / 2,
      ry: height / 2
    });
  },
  generateCode: (o) => {
    const coords = o.oCoords!;
    return [
      'ellipse',
      [
        coords.tl.x + (o.width! * o.scaleX!) / 2,
        coords.tl.y + (o.height! * o.scaleY!) / 2,
        o.width! * o.scaleX!,
        o.height! * o.scaleY!
      ]
    ];
  },
  insertIntoCanvas: () => {},
  gestureLength: 1,
  skip: true,
  gesturePreview: () => <></>
};
export default EllipseDrawingTool;
