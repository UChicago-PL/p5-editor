import React from 'react';

import { fabric } from 'fabric';
// @ts-ignore
import Circle from '../../../../images/shapeToolbox/circle.svg';
import { fabricDefaults, defaults, DrawOperation } from '../ShapeToolboxOverlay';
const CircleDrawingTool: DrawOperation = {
  name: 'circle',
  insertIntoCanvas: (canvas, gestureSeq) => {
    const radius = Math.sqrt(
      Math.pow(gestureSeq[0].x - gestureSeq[1].x, 2) + Math.pow(gestureSeq[0].y - gestureSeq[1].y, 2)
    );
    const o = new fabric.Circle({
      ...fabricDefaults,
      left: gestureSeq[0].x,
      top: gestureSeq[0].y,
      radius
    });

    // https://stackoverflow.com/a/66692592
    // Disable rotation. We don't have support for this because there's no way
    // to do that in p5 without using transforms,
    // whereas, for example, it is possible to do that with rects using quad()
    o.setControlsVisibility({ mtr: false });

    canvas.add(o);
  },
  processExistingCall: (args) => {
    const [left, top, diameter] = args;
    return new fabric.Circle({
      ...defaults,
      left: left - diameter / 2,
      top: top - diameter / 2,
      radius: diameter / 2
    });
  },
  generateCode: (o) => {
    const coords = o.oCoords!;
    if (o.scaleX === o.scaleY) {
      return [
        'circle',
        [
          coords.tl.x + (o as any).radius * o.scaleX!,
          coords.tl.y + (o as any).radius * o.scaleX!,
          (o as any).radius * 2 * o.scaleX!
        ]
      ];
    }
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
  icon: Circle,
  gestureLength: 2,
  gesturePreview: (seq, point, def) => {
    let r = Math.min(def.defaultSize.height, def.defaultSize.width) / 2;
    let cx = point.x;
    let cy = point.y;
    if (seq.length === 1) {
      cx = seq[0].x;
      cy = seq[0].y;
      r = Math.sqrt(Math.pow(cx - point.x, 2) + Math.pow(cy - point.y, 2));
    }
    return <circle cx={cx + r} cy={cy + r} r={r} {...defaults}></circle>;
  }
};
export default CircleDrawingTool;
