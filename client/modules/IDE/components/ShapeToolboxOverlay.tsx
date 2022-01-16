import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import { wrapEvent } from '../../../utils/analytics';
import DrawCircle from './ShapeToolboxTools/DrawCircle';
// import DrawEllipse from './ShapeToolboxTools/DrawEllipse';
import DrawLine from './ShapeToolboxTools/DrawLine';
// import DrawQuad from './ShapeToolboxTools/DrawQuad';
import DrawRect from './ShapeToolboxTools/DrawRect';
import DrawTriangle from './ShapeToolboxTools/DrawTriangle';
const drawOperations: DrawOperation[] = [
  DrawCircle,
  // DrawEllipse,
  DrawLine,
  // DrawQuad,
  DrawRect,
  DrawTriangle
];

// @ts-ignore
import Circle from '../../../images/shapeToolbox/circle.svg';

// https://stackoverflow.com/a/51587105/6643726
fabric.Object.prototype.objectCaching = false;

export const defaults = {
  fill: 'rgb(158,158,236)',
  stroke: 'black',
  strokeWidth: 3
};

export const fabricDefaults = {
  ...defaults,
  strokeUniform: true,
  originX: 'left',
  originY: 'top',
  strokeDashArray: [5, 5]
};

const roundNums = ([name, args]: [string, any[]]): [string, any[]] => [name, args.map(Math.round)];

const generateFuncCallCode = ([name, args]: [string, any[]]) => `${name}(${args.join(', ')})`;
type LocalDefaults = {
  defaultSize: { height: number; width: number };
};
type Point = { x: number; y: number };
export interface DrawOperation {
  name: string;
  insertIntoCanvas: (canvas, gestureSequence: Point[], defaults: LocalDefaults) => any | void;
  processExisitingCall: (args) => any;
  generateCode: (o: fabric.Object) => [string, any[]];
  icon?: any;
  gestureLength: number | 'Infinity';
  skip?: boolean;
  gesturePreview: (seq: Point[], newPoint: Point, defaults: LocalDefaults) => JSX.Element;
}

interface Props {
  closeCb: any;
  canvasSize: { height: number; width: number };
  existingCalls: any[];
}
export default function ShapeToolbox(props: Props) {
  const { closeCb, existingCalls, canvasSize } = props;
  const el = useRef(null);

  const computedSize = { width: Math.max(canvasSize.width, 20), height: Math.max(canvasSize.height, 20) };

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [gestureSequence, setGestureSequence] = useState<false | Point[]>(false);
  const [opType, setOpType] = useState<false | string>(false);
  const [mouseMovePos, setMouseMovePos] = useState<false | Point>(false);
  const resetCanvas = (canvas_) => {
    canvas_.clear();
    existingCalls.map(processExistingCall).forEach((o, i) => {
      if (o) {
        o.id = i;
        canvas_.add(o);
      }
    });
  };

  useEffect(() => {
    const canvas_ = new fabric.Canvas(el.current);
    canvas_.setDimensions(computedSize);
    // canvas_.selection = 'true';
    canvas_.selection = true;
    resetCanvas(canvas_);
    setCanvas(canvas_);

    const delHandler = (e) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        canvas_.remove(canvas_.getActiveObject());
      }
    };
    document.addEventListener('keyup', delHandler);
    return () => document.removeEventListener('keyup', delHandler);
  }, []);

  const defaultSize = {
    width: Math.min(computedSize.width / 2, 70),
    height: Math.min(computedSize.height / 2, 70)
  };

  const processExistingCall = (call) => {
    if (typeof call === 'string') {
      // We are dealing with an ignored line, which has been left in its raw form
      return null;
    }
    const [name, args] = call;
    const operation = drawOperations.find((op) => op.name === name);
    return operation ? operation.processExisitingCall(args) : null;
  };

  // https://stackoverflow.com/a/53710375
  // Polygon points are not updated on transformations. The first function is an implementation of the SO answer,
  // and the second function is a specialized version for lines, because they do not have the pathOffset property
  const calcAbsolutePoints = (o, points) => {
    const matrix = o.calcTransformMatrix();
    return points
      .map((p) => new fabric.Point(p.x - o.pathOffset.x, p.y - o.pathOffset.y))
      .map((p) => fabric.util.transformPoint(p, matrix));
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
    const operation = drawOperations.find((op) => op.name === o.type);
    if (operation) {
      return operation.generateCode(o);
    }
    if (o.type == 'polygon') {
      return handlePolygon(o);
    }
    return null;
  };

  const reset = () => resetCanvas(canvas);

  const apply = () => {
    const objects = canvas!.getObjects();
    canvas!.clear();

    // Start with just the ignored lines
    let res = existingCalls.map((call) => (typeof call === 'string' ? call : null));

    // Add in the shapeToolbox calls
    objects.forEach((o) => {
      const line = generateFuncCallCode(roundNums(generateFuncCall(o)!));
      if ((o as any).id !== undefined) {
        // This is an existing object with a specific position among the other calls
        res[(o as any).id] = line;
      } else {
        // This is a new object
        res.push(line);
      }
    });

    // Filter out any nulls that may be left over from original calls that have since been deleted
    res = res.filter(Boolean);

    closeCb(res);
  };
  const operation = drawOperations.find((op) => op.name === opType)!;
  return (
    <div className="shape-toolbox-overlay">
      <canvas ref={el} />
      <div className="shape-toolbox-overlay__tools">
        {drawOperations
          .filter((op) => !op.skip)
          .map((op) => {
            const Icon = op.icon || Circle;
            return (
              <button
                key={op.name}
                // onClick={wrapEvent(() => op.insertIntoCanvas(canvas, { defaultLoc, defaultSize }), {
                //   eventName: `stb-add${op.name}`
                // })}
                onClick={() => {
                  setGestureSequence([]);
                  setOpType(op.name);
                }}
              >
                <Icon role="img" aria-label="circle()/ellipse()" focusable="false" />
              </button>
            );
          })}
        <button className="reset" onClick={wrapEvent(reset, { eventName: 'stb-reset' })}>
          reset
        </button>
        <button className="apply" onClick={wrapEvent(apply, { eventName: 'stb-apply' })}>
          save
        </button>
      </div>
      {Array.isArray(gestureSequence) && operation && (
        <svg
          height={canvas?.height}
          width={canvas?.width}
          style={{ position: 'absolute' }}
          onMouseMove={(e) => {
            setMouseMovePos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
          }}
          onClick={(e) => {
            const newGestureSeq = [...gestureSequence, mouseMovePos as Point];
            if (newGestureSeq.length >= operation.gestureLength) {
              setGestureSequence(false);
              setOpType(false);
              operation.insertIntoCanvas(canvas, newGestureSeq, { defaultSize });
              // onClick={wrapEvent(() => op.insertIntoCanvas(canvas, { defaultLoc, defaultSize }), {
              //   eventName: `stb-add${op.name}`
              // })}
            } else {
              setGestureSequence(newGestureSeq);
            }
          }}
        >
          {operation.gesturePreview(gestureSequence, mouseMovePos as Point, { defaultSize })}
        </svg>
      )}
    </div>
  );
}
