import { fabric } from 'fabric';
// @ts-ignore
import Line from '../../../../images/shapeToolbox/line.svg';
import {
  calcAbsolutePointsForLine,
  DrawingTool,
  defaultLoc,
  defaults,
  defaultSize
} from '../ShapeToolboxOverlay';

const LineDrawingTool: DrawingTool = {
  name: 'line',
  generateFuncCall: (args) => {
    const { o } = args;
    const [p1, p2] = calcAbsolutePointsForLine(o);
    return ['line', [p1.x, p1.y, p2.x, p2.y]];
  },
  addShape: (args) => {
    const { canvas } = args;
    const loc = defaultLoc();

    canvas.add(
      new fabric.Line(
        [loc.left, loc.top, loc.left + defaultSize.width, loc.top + defaultSize.height],
        defaults
      )
    );
  },
  icon: Line,
  ariaLabel: 'line()',
  processExistingCall: ({ args }) => {
    return [new fabric.Line(args, defaults)];
  }
};

export default LineDrawingTool;
