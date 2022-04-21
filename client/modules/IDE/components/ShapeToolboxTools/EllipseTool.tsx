import React from 'react';
import { fabric } from 'fabric';
import { DrawingTool, defaults } from '../ShapeToolboxOverlay';
const EllipseDrawingTool: DrawingTool = {
  name: 'ellipse',
  generateFuncCall: (args) => {
    const { coords, o } = args;
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
  addShape: () => {},
  ariaLabel: 'ellipse',
  processExistingCall: ({ args }) => {
    const [left, top, width, height] = args;
    return [
      new fabric.Ellipse({
        ...defaults,
        left: left - width / 2,
        top: top - height / 2,
        rx: width / 2,
        ry: height / 2
      })
    ];
  },
  gestureLength: 1,
  skip: true,
  gesturePreview: () => <></>
};

export default EllipseDrawingTool;
