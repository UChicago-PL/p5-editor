import React from 'react';
import { fabric } from 'fabric';
import { DrawingTool, defaults } from '../ShapeToolboxOverlay';
// @ts-ignore
import Square from '../../../../images/shapeToolbox/square.svg';
const RectDrawingTool: DrawingTool = {
  name: 'rect',
  generateFuncCall: (args) => {
    const { o, coords } = args;
    if (o.angle) {
      return [
        'quad',
        [
          coords.tl.x,
          coords.tl.y,
          coords.bl.x,
          coords.bl.y,
          coords.br.x,
          coords.br.y,
          coords.tr.x,
          coords.tr.y
        ]
      ];
    } else {
      return ['rect', [coords.tl.x, coords.tl.y, o.width * o.scaleX, o.height * o.scaleY]];
    }
  },
  addShape: ({ canvas, localDefaults: { defaultSize }, gestureSeq }) => {
    canvas.add(
      new fabric.Rect({
        ...defaults,
        left: gestureSeq[0].x,
        top: gestureSeq[0].y,
        ...defaultSize
      })
    );
  },
  icon: Square,
  ariaLabel: 'square()/rect()',
  processExistingCall: ({ args }) => {
    const [left, top, width, height] = args;
    return [
      new fabric.Rect({
        ...defaults,
        left,
        top,
        width,
        height
      })
    ];
  },
  gestureLength: 1,
  gesturePreview: (seq, point, def) => (
    <rect
      x={point.x}
      y={point.y}
      height={def.defaultSize.height}
      width={def.defaultSize.width}
      {...defaults}
    ></rect>
  )
};

export default RectDrawingTool;
