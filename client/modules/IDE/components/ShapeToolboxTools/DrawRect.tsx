import * as React from 'react';
import { fabric } from 'fabric';
// @ts-ignore
import Square from '../../../../images/shapeToolbox/square.svg';
import { fabricDefaults, defaults, DrawOperation } from '../ShapeToolboxOverlay';
const RectDrawingTool: DrawOperation = {
  name: 'rect',
  insertIntoCanvas: (canvas, gestureSeq, { defaultSize }) =>
    canvas.add(
      new fabric.Rect({
        ...fabricDefaults,
        left: gestureSeq[0].x,
        top: gestureSeq[0].y,
        ...defaultSize
      })
    ),
  processExisitingCall: ([left, top, width, height]) => {
    return new fabric.Rect({ ...defaults, left, top, width, height });
  },
  generateCode: (o) => {
    const coords = o.oCoords!;
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
    } else return ['rect', [coords.tl.x, coords.tl.y, o.width! * o.scaleX!, o.height! * o.scaleY!]];
  },
  icon: Square,
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
