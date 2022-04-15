import { fabric } from 'fabric';
import { DrawingTool, defaultLoc, defaults, defaultSize } from '../ShapeToolboxOverlay';
// @ts-ignore
import Triangle from '../../../../images/shapeToolbox/triangle.svg';
const TriangleDrawingTool: DrawingTool = {
  name: 'triangle',
  generateFuncCall: (args) => {
    const { coords } = args;
    return ['triangle', [coords.mt.x, coords.mt.y, coords.bl.x, coords.bl.y, coords.br.x, coords.br.y]];
  },
  addShape: ({ canvas }) => {
    canvas.add(
      new fabric.Triangle({
        ...defaults,
        ...defaultLoc(),
        ...defaultSize
      })
    );
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
  ariaLabel: 'triangle()'
};

export default TriangleDrawingTool;
