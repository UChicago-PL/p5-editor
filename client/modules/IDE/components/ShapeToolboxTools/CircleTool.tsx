import { fabric } from 'fabric';
import { DrawingTool, defaultLoc, defaults, defaultSize } from '../ShapeToolboxOverlay';
// @ts-ignore
import Circle from '../../../../images/shapeToolbox/circle.svg';
const CircleDrawingTool: DrawingTool = {
  name: 'circle',
  generateFuncCall: (args) => {
    const { o, coords } = args;
    if ((o as any).special) {
      // This is a special control circle used in the curve shape
      return null;
    }
    if (o.scaleX === o.scaleY) {
      return [
        'circle',
        [coords.tl.x + o.radius * o.scaleX, coords.tl.y + o.radius * o.scaleX, o.radius * 2 * o.scaleX]
      ];
    }
    return [
      'ellipse',
      [
        coords.tl.x + (o.width * o.scaleX) / 2,
        coords.tl.y + (o.height * o.scaleY) / 2,
        o.width * o.scaleX,
        o.height * o.scaleY
      ]
    ];
  },
  addShape: ({ canvas }) => {
    const o = new fabric.Circle({
      ...defaults,
      ...defaultLoc(),
      radius: defaultSize.width / 2
    });

    // https://stackoverflow.com/a/66692592
    // Disable rotation. We don't have support for this because there's no way
    // to do that in p5 without using transforms,
    // whereas, for example, it is possible to do that with rects using quad()
    o.setControlsVisibility({ mtr: false });

    canvas.add(o);
  },
  processExistingCall: ({ args }) => {
    const [left, top, diameter] = args;
    return [
      new fabric.Circle({
        ...defaults,
        left: left - diameter / 2,
        top: top - diameter / 2,
        radius: diameter / 2
      })
    ];
  },
  icon: Circle,
  ariaLabel: 'circle()/ellipse()'
};

export default CircleDrawingTool;
