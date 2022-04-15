import React from 'react';
import { fabric } from 'fabric';
import { DrawingTool, defaults } from '../ShapeToolboxOverlay';
const EllipseDrawingTool: DrawingTool = {
  name: 'ellipse',
  generateFuncCall: (args) => {
    const { coords, o } = args;
    const o_ = o as fabric.Ellipse;
    return [
      'ellipse',
      [
        coords.tl.x + (o_.width * o_.scaleX) / 2,
        coords.tl.y + (o_.height * o_.scaleY) / 2,
        o_.width * o_.scaleX,
        o_.height * o_.scaleY
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
