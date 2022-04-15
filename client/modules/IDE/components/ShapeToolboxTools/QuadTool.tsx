import { fabric } from 'fabric';

import { defaults, DrawingTool } from '../ShapeToolboxOverlay';
const QuadDrawingTool: DrawingTool = {
  name: 'quad',
  addShape: () => {},
  processExistingCall: ({ args }) => {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = args;
    const points = [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x3, y: y3 },
      { x: x4, y: y4 }
    ];
    return [new fabric.Polygon(points, defaults)];
  },
  generateFuncCall: () => {
    return ['console.log', ['"not implemented yet']];
  },
  ariaLabel: 'quad()'
  //   generateCode: () => ['console.log', ['"not implemented yet"']],
  //   skip: true,
  //   gesturePreview: () => <g></g>
};
export default QuadDrawingTool;
