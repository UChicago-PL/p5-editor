import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import { trackEvent, wrapEvent } from '../../../utils/analytics';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Circle from '../../../images/shapeToolbox/circle.svg';

import BezierDrawingTool from './ShapeToolboxTools/BezierTool';
import EllipseDrawingTool from './ShapeToolboxTools/EllipseTool';
import TriangleDrawingTool from './ShapeToolboxTools/TriTool';
import CircleDrawingTool from './ShapeToolboxTools/CircleTool';
import RectDrawingTool from './ShapeToolboxTools/RectTool';
import LineDrawingTool from './ShapeToolboxTools/LineTool';
import QuadDrawingTool from './ShapeToolboxTools/QuadTool';

type LocalDefaults = {
  defaultSize: { height: number; width: number };
};
type Point = { x: number; y: number };
export interface DrawingTool {
  name: string;
  generateFuncCall: (args: { o: fabric.Object; coords: any }) => [string, any[]] | null; // REDO?
  addShape: (args: { canvas: fabric.Canvas; localDefaults: LocalDefaults; gestureSeq: Point[] }) => void;
  icon?: any;
  ariaLabel: string;
  processExistingCall: (args: { args: any; canvas: fabric.Canvas }) => fabric.Object[];
  gestureLength: number | 'Infinity';
  skip?: boolean;
  gesturePreview: (seq: Point[], newPoint: Point, defaults: LocalDefaults) => JSX.Element;
}

export type FuncCall = [string, any[]];

const DrawingTools: DrawingTool[] = [
  QuadDrawingTool,
  BezierDrawingTool,
  EllipseDrawingTool,
  TriangleDrawingTool,
  CircleDrawingTool,
  RectDrawingTool,
  LineDrawingTool
];

export function defaultLoc() {
  return { left: 100, top: 100 };
}
export const defaults = {
  strokeDasharray: '[5, 5]',
  fill: 'rgb(158,158,236)',
  stroke: 'black',
  strokeWidth: 3
  // strokeUniform: true
  // originX: 'left',
  // originY: 'top'
};

// https://stackoverflow.com/a/51587105/6643726
fabric.Object.prototype.objectCaching = false;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.fabricObjectId = 0;

// // https://stackoverflow.com/a/53710375
// // Polygon points are not updated on transformations. The first function is an implementation of the SO answer,
// // and the second function is a specialized version for lines, because they do not have the pathOffset property
export const calcAbsolutePoints = (o, points) => {
  const matrix = o.calcTransformMatrix();
  return points
    .map((p) => new fabric.Point(p.x - o.pathOffset.x, p.y - o.pathOffset.y))
    .map((p) => fabric.util.transformPoint(p, matrix));
};

interface Props {
  closeCb: (lines: string[]) => void;
  canvasSize: { width: number; height: number };
  existingCalls: FuncCall[];
}

export default function ShapeToolbox({ closeCb, canvasSize, existingCalls }: Props) {
  const el = useRef(null);

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [gestureSequence, setGestureSequence] = useState<false | Point[]>(false);
  const [selectedTool, setSelectedTool] = useState<false | DrawingTool>(false);
  const [mouseMovePos, setMouseMovePos] = useState<false | Point>(false);

  const computedSize = { width: Math.max(canvasSize.width, 20), height: Math.max(canvasSize.height, 20) };
  const defaultSize = {
    width: Math.min(computedSize.width / 2, 70),
    height: Math.min(computedSize.height / 2, 70)
  };

  const resetCanvas = (canvas_) => {
    canvas_.clear();
    let i = 0;
    existingCalls
      .flatMap(processExistingCall(canvas_))
      // fail graciously
      .filter((x) => x)
      .forEach((o: fabric.Object | null) => {
        if (o && !(o as any).special) {
          (o as any).orderId = i;
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
    const tool = DrawingTools.find((tool) => tool.name === ((o as any).stbType || o.type));
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

  const apply = () => {
    if (!canvas) {
      return;
    }
    const objects = canvas.getObjects();
    canvas.clear();

    // Start with just the ignored lines
    let res = existingCalls.map((call) => (typeof call === 'string' ? call : null)) as unknown as string[];

    // Add in the shapeToolbox calls
    objects.forEach((o) => {
      const funcCall = generateFuncCall(o);
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
          DrawingTools.filter((tool) => !tool.skip).map((tool) => {
            const Icon = tool.icon || Circle;
            return (
              <button
                aria-label={tool.ariaLabel}
                key={tool.name}
                onClick={() => {
                  setGestureSequence([]);
                  setSelectedTool(tool);
                }}
              >
                <Icon role="img" focusable="false" />
              </button>
            );
          })}
        <button className="reset" onClick={wrapEvent(() => resetCanvas(canvas), { eventName: 'stb-reset' })}>
          reset
        </button>
        <button className="apply" onClick={wrapEvent(apply, { eventName: 'stb-apply' })}>
          save
        </button>
      </div>
      {Array.isArray(gestureSequence) && selectedTool && (
        <svg
          height={canvas?.height}
          width={canvas?.width}
          style={{ position: 'absolute' }}
          onMouseMove={(e) => {
            setMouseMovePos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
          }}
          onClick={() => {
            const newGestureSeq = [...gestureSequence, mouseMovePos as Point];
            if (newGestureSeq.length >= selectedTool.gestureLength) {
              trackEvent({ eventName: `stb-add${selectedTool.name}-end` });
              setGestureSequence(false);
              setSelectedTool(false);
              setMouseMovePos(false);
              selectedTool.addShape({
                canvas: canvas as fabric.Canvas,
                localDefaults: { defaultSize },
                gestureSeq: newGestureSeq
              });
            } else {
              setGestureSequence(newGestureSeq);
            }
          }}
        >
          {mouseMovePos &&
            selectedTool.gesturePreview(gestureSequence, mouseMovePos as Point, { defaultSize })}
        </svg>
      )}
    </div>
  );
}
