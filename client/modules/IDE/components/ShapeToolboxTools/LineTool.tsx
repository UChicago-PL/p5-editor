import React from 'react';

import { fabric } from 'fabric';
// @ts-ignore
import Line from '../../../../images/shapeToolbox/line.svg';
import { DrawingTool, defaults } from '../ShapeToolboxOverlay';

const calcAbsolutePointsForLine = (o) => {
  const { x1, y1, x2, y2 } = o;
  const center = new fabric.Point((x1 + x2) / 2, (y1 + y2) / 2);
  const matrix = o.calcTransformMatrix();
  return (
    [new fabric.Point(x1, y1), new fabric.Point(x2, y2)]
      .map((p) => new fabric.Point(p.x - center.x, p.y - center.y))
      .map((p) => fabric.util.transformPoint(p, matrix))
      // This is very strange, but for some reason the points increase by 0.5 every time this function is applied
      .map((p) => new fabric.Point(p.x - 0.5, p.y - 0.5))
  );
};

const LineDrawingTool: DrawingTool = {
  name: 'line',
  generateFuncCall: (args) => {
    const { o } = args;
    const [p1, p2] = calcAbsolutePointsForLine(o);
    return ['line', [p1.x, p1.y, p2.x, p2.y]];
  },
  addShape: ({ canvas, gestureSeq }) => {
    const [p1, p2] = gestureSeq;
    canvas.add(new fabric.Line([p1.x, p1.y, p2.x, p2.y], defaults));
  },
  icon: Line,
  ariaLabel: 'line()',
  processExistingCall: ({ args }) => {
    return [new fabric.Line(args, defaults)];
  },
  gestureLength: 2,
  gesturePreview: (seq, point) => {
    if (!seq.length) {
      return <circle cx={point.x} cy={point.y} r={10} fill="black"></circle>;
    }
    return <line x1={point.x} y1={point.y} x2={seq[0].x} y2={seq[0].y} {...defaults}></line>;
  }
};

export default LineDrawingTool;
