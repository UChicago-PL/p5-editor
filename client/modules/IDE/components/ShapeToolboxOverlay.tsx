/* eslint-disable */
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import { wrapEvent } from '../../../utils/analytics';

// import Line from '../../../images/shapeToolbox/line.svg';
// @ts-ignore
import Circle from '../../../images/shapeToolbox/circle.svg';
// import Square from '../../../images/shapeToolbox/square.svg';
// import Triangle from '../../../images/shapeToolbox/triangle.svg';
// import Curve from '../../../images/shapeToolbox/curve.svg';

import BezierDrawingTool from './ShapeToolboxTools/BezierTool';
// import EllipseDrawingTool from './ShapeToolboxTools/EllipseTool';
import TriangleDrawingTool from './ShapeToolboxTools/TriTool';
import CircleDrawingTool from './ShapeToolboxTools/CircleTool';
import RectDrawingTool from './ShapeToolboxTools/RectTool';
import LineDrawingTool from './ShapeToolboxTools/LineTool';
// import QuadDrawingTool from './ShapeToolboxTools/QuadTool';

export interface DrawingTool {
  name: string;
  generateFuncCall: (args: { o: fabric.Object; coords: any }) => [string, any[]] | null; // REDO?
  addShape: (args: { canvas: fabric.Canvas }) => void;
  icon?: any;
  ariaLabel: string;
  processExistingCall: (args: { args: any; canvas: fabric.Canvas }) => any;
}

const DrawingTools: DrawingTool[] = [
  // QuadDrawingTool,
  BezierDrawingTool,
  // EllipseDrawingTool,
  TriangleDrawingTool,
  CircleDrawingTool,
  RectDrawingTool,
  LineDrawingTool
];

function randrange(min, max) {
  return Math.random() * (max - min) + min;
}

export function defaultLoc() {
  return { left: 100, top: 100 };
}
export const defaults = {
  strokeDashArray: [5, 5],
  fill: 'rgb(158,158,236)',
  stroke: 'black',
  strokeWidth: 3,
  strokeUniform: true,
  originX: 'left',
  originY: 'top'
};
export const defaultSize = {
  // width: Math.min(canvasSize.width / 2, 70),
  // height: Math.min(canvasSize.height / 2, 70)
  width: 400,
  height: 400
};

// https://stackoverflow.com/a/51587105/6643726
fabric.Object.prototype.objectCaching = false;

// @ts-ignore
window.fabricObjectId = 0;

// https://stackoverflow.com/a/53710375
// Polygon points are not updated on transformations. The first function is an implementation of the SO answer,
// and the second function is a specialized version for lines, because they do not have the pathOffset property
export const calcAbsolutePoints = (o, points) => {
  const matrix = o.calcTransformMatrix();
  return points
    .map((p) => new fabric.Point(p.x - o.pathOffset.x, p.y - o.pathOffset.y))
    .map((p) => fabric.util.transformPoint(p, matrix));
};
export const calcAbsolutePointsForLine = (o) => {
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

export default function ShapeToolbox({ closeCb, canvasSize, existingCalls }) {
  const el = useRef(null);

  canvasSize = { width: Math.max(canvasSize.width, 20), height: Math.max(canvasSize.height, 20) };

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  const resetCanvas = (canvas_) => {
    canvas_.clear();
    let i = 0;
    existingCalls.flatMap(processExistingCall(canvas_)).forEach((o) => {
      if (!o.special) {
        o.orderId = i;
        i++;
      }
      canvas_.add(o);
    });
  };

  useEffect(() => {
    const canvas_ = new fabric.Canvas(el.current);
    canvas_.setDimensions(canvasSize);
    canvas_.selection = true;
    canvas_.preserveObjectStacking = false;
    resetCanvas(canvas_);
    setCanvas(canvas_);

    const delHandler = (e) => {
      if (e.key !== 'Delete' && e.key !== 'Backspace') {
        return;
      }

      const o = canvas_.getActiveObject();
      if (o && !(o as any).special) {
        if (o.type === 'activeSelection') {
          o.getObjects().forEach((o2) => canvas_.remove(o2));
          canvas_.discardActiveObject();
        } else {
          canvas_.getObjects().forEach((o2) => {
            if ((o2 as any).special && (o2 as any).parentId === (o as any).id) {
              canvas_.remove(o2);
            }
          });
          canvas_.remove(o);
        }
      }
    };
    document.addEventListener('keyup', delHandler);
    return () => document.removeEventListener('keyup', delHandler);
  }, []);

  const processExistingCall = (canvas) => (call) => {
    if (typeof call === 'string') {
      // We are dealing with an ignored line, which has been left in its raw form
      return [];
    }
    const [name, args] = call;
    const tool = DrawingTools.find((tool) => tool.name === name);
    return tool ? tool.processExistingCall({ args, canvas }) : null;
  };

  function handlePolygon(o: fabric.Object): [string, any[]] {
    const points = calcAbsolutePoints(o, (o as any).points);
    const numPoints = (o as any).points.length;
    if (numPoints === 3) {
      const [p1, p2, p3] = points;
      return ['triangle', [p1.x, p1.y, p2.x, p2.y, p3.x, p3.y]];
    }
    if (numPoints === 4) {
      const [p1, p2, p3, p4] = points;
      return ['quad', [p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y]];
    }
    throw Error(
      'Trying to generate p5 code for a Fabric.js polygon with unrecognized number of points: ' +
        (o as any).points.length
    );
  }

  const generateFuncCall = (o: fabric.Object): [string, any[]] | null => {
    const { oCoords: coords } = o;
    const tool = DrawingTools.find((tool) => tool.name === o.type);
    console.log({ tool });
    if (tool) {
      return tool.generateFuncCall({ o, coords });
    }
    if (o.type == 'polygon') {
      return handlePolygon(o);
    }
    return null;
  };

  const roundNums = ([name, args]): [string, any[]] => [name, args.map(Math.round)];
  const generateFuncCallCode = ([name, args]) => `${name}(${args.join(', ')})`;
  const reset = () => resetCanvas(canvas);

  const apply = () => {
    if (!canvas) {
      return;
    }
    const objects = canvas.getObjects();
    console.log(objects);
    canvas.clear();

    // Start with just the ignored lines
    let res = existingCalls.map((call) => (typeof call === 'string' ? call : null));

    // Add in the shapeToolbox calls
    objects.forEach((o) => {
      const funcCall = generateFuncCall(o);
      console.log(funcCall);
      if (funcCall) {
        const line = generateFuncCallCode(roundNums(funcCall));
        if ((o as any).orderId !== undefined) {
          // This is an existing object with a specific position among the other calls
          res[(o as any).orderId] = line;
        } else {
          // This is a new object
          res.push(line);
        }
      }
    });

    // Filter out any nulls that may be left over from original calls that have since been deleted
    res = res.filter(Boolean);

    closeCb(res);
  };

  return (
    <div className="shape-toolbox-overlay">
      <canvas ref={el} />
      <div className="shape-toolbox-overlay__tools">
        {canvas &&
          DrawingTools.map((tool) => {
            const Icon = tool.icon || Circle;
            return (
              <button
                key={tool.name}
                onClick={() => {
                  tool.addShape({ canvas });
                }}
              >
                <Icon role="img" aria-label={tool.ariaLabel} focusable="false" />
              </button>
            );
          })}
        {/* <button onClick={wrapEvent(addLine, { eventName: 'stb-addLine' })}>
          <Line role="img" aria-label="line()" focusable="false" />
        </button>
        <button onClick={wrapEvent(addRect, { eventName: 'stb-addRect' })}>
          <Square role="img" aria-label="square()/rect()" focusable="false" />
        </button>
        <button onClick={wrapEvent(addCircle, { eventName: 'stb-addCircle' })}>
          <Circle role="img" aria-label="circle()/ellipse()" focusable="false" />
        </button>
        <button onClick={wrapEvent(addTriangle, { eventName: 'stb-addTri' })}>
          <Triangle role="img" aria-label="triangle()" focusable="false" />
        </button>
        <button onClick={wrapEvent(addBezier, { eventName: 'stb-addBezier' })}>
          <Curve role="img" aria-label="bezier()" focusable="false" />
        </button> */}
        <button className="reset" onClick={wrapEvent(reset, { eventName: 'stb-reset' })}>
          reset
        </button>
        <button className="apply" onClick={wrapEvent(apply, { eventName: 'stb-apply' })}>
          save
        </button>
      </div>
    </div>
  );
}
/* eslint-enable */
