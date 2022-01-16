/* eslint-disable */
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { line } from 'd3-shape';

import { wrapEvent } from '../../../utils/analytics';

// @ts-ignore
import Line from '../../../images/shapeToolbox/line.svg';
// @ts-ignore
import Circle from '../../../images/shapeToolbox/circle.svg';
// @ts-ignore
import Square from '../../../images/shapeToolbox/square.svg';
// @ts-ignore
import Triangle from '../../../images/shapeToolbox/triangle.svg';

function randrange(min, max) {
  return Math.random() * (max - min) + min;
}

// https://stackoverflow.com/a/51587105/6643726
fabric.Object.prototype.objectCaching = false;

const defaults = {
  // strokeDashArray: [5, 5],
  fill: 'rgb(158,158,236)',
  stroke: 'black',
  strokeWidth: 3
  // strokeUniform: true
  // originX: 'left',
  // originY: 'top'
};

const calcAbsolutePointsForLine = (o) => {
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

const roundNums = ([name, args]: [string, any[]]): [string, any[]] => [name, args.map(Math.round)];

const generateFuncCallCode = ([name, args]: [string, any[]]) => `${name}(${args.join(', ')})`;
type LocalDefaults = {
  // defaultLoc: any;
  defaultSize: { height: number; width: number };
};
type Point = { x: number; y: number };
interface DrawOperation {
  name: string;
  insertIntoCanvas: (canvas, gestureSequence: Point[], defaults: LocalDefaults) => any | void;
  processExisitingCall: (args) => any;
  generateCode: (o: fabric.Object) => [string, any[]];
  icon?: any;
  gestureLength: number | 'Infinity';
  skip?: Boolean;
  gesturePreview: (seq: Point[], newPoint: Point, defaults: LocalDefaults) => JSX.Element;
}
const drawOperations: DrawOperation[] = [
  {
    name: 'rect',
    insertIntoCanvas: (canvas, gestureSeq, { defaultSize }) =>
      canvas.add(
        new fabric.Rect({
          ...defaults,
          // ...defaultLoc(),
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
  },
  {
    name: 'quad',
    insertIntoCanvas: (canvas) => {},
    processExisitingCall: (args) => {
      const [x1, y1, x2, y2, x3, y3, x4, y4] = args;
      const points = [
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        { x: x3, y: y3 },
        { x: x4, y: y4 }
      ];
      return new fabric.Polygon(points, defaults);
    },
    generateCode: () => ['console.log', ['"not implemented yet"']],
    gestureLength: 2,
    skip: true,
    gesturePreview: () => <></>
  },
  {
    name: 'circle',
    insertIntoCanvas: (canvas, gestureSeq, { defaultSize }) => {
      const radius = Math.sqrt(
        Math.pow(gestureSeq[0].x - gestureSeq[1].x, 2) + Math.pow(gestureSeq[0].y - gestureSeq[1].y, 2)
      );
      const o = new fabric.Circle({
        ...defaults,
        // ...defaultLoc(),
        left: gestureSeq[0].x,
        top: gestureSeq[0].y,
        // radius: defaultSize.width / 2
        radius
      });

      // https://stackoverflow.com/a/66692592
      // Disable rotation. We don't have support for this because there's no way
      // to do that in p5 without using transforms,
      // whereas, for example, it is possible to do that with rects using quad()
      o.setControlsVisibility({ mtr: false });

      canvas.add(o);
    },
    processExisitingCall: (args) => {
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
  },
  {
    name: 'ellipse',
    processExisitingCall: (args) => {
      const [left, top, width, height] = args;
      return new fabric.Ellipse({
        ...defaults,
        left: left - width / 2,
        top: top - height / 2,
        rx: width / 2,
        ry: height / 2
      });
    },
    generateCode: (o) => {
      const coords = o.oCoords!;
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
    insertIntoCanvas: () => {},
    gestureLength: 1,
    skip: true,
    gesturePreview: () => <></>
  },
  {
    name: 'triangle',
    insertIntoCanvas: (canvas, gestureSeq, { defaultSize }) =>
      canvas.add(
        new fabric.Triangle({
          ...defaults,
          // ...defaultLoc(),
          left: gestureSeq[0].x,
          top: gestureSeq[0].y,
          ...defaultSize
        })
      ),

    processExisitingCall: (args) => {
      const [x1, y1, x2, y2, x3, y3] = args;
      const points = [
        { x: x1, y: y1 },
        { x: x2, y: y2 },
        { x: x3, y: y3 }
      ];
      return new fabric.Polygon(points, defaults);
    },
    generateCode: (o) => {
      const coords = o.oCoords!;
      return ['triangle', [coords.mt.x, coords.mt.y, coords.bl.x, coords.bl.y, coords.br.x, coords.br.y]];
    },
    icon: Triangle,
    gestureLength: 1,
    gesturePreview: (seq, point) => <circle cx={point.x} cy={point.y} r={20} {...defaults}></circle>
  },
  {
    name: 'line',
    insertIntoCanvas: (canvas, gestureSeq) => {
      // const loc = defaultLoc();
      const points = [gestureSeq[0].x, gestureSeq[0].y, gestureSeq[1].x, gestureSeq[1].y];
      canvas.add(new fabric.Line(points, defaults));
    },
    processExisitingCall: (args) => new fabric.Line(args, defaults),
    generateCode: (o) => {
      const [p1, p2] = calcAbsolutePointsForLine(o);
      return ['line', [p1.x, p1.y, p2.x, p2.y]];
    },
    icon: Line,
    gestureLength: 2,
    gesturePreview: (seq, point) => {
      if (!seq.length) {
        return <circle cx={point.x} cy={point.y} {...defaults}></circle>;
      }
      return <line x1={point.x} y1={point.y} x2={seq[0].x} y2={seq[0].y} {...defaults}></line>;
    }
  }
];

export default function ShapeToolbox({ closeCb, canvasSize, existingCalls }) {
  const el = useRef(null);

  canvasSize = { width: Math.max(canvasSize.width, 20), height: Math.max(canvasSize.height, 20) };

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
    canvas_.setDimensions(canvasSize);
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
    width: Math.min(canvasSize.width / 2, 70),
    height: Math.min(canvasSize.height / 2, 70)
  };

  // The randomness slightly changes the placement of every new shape
  // This makes it obvious that a new shape is added, even when it's the same one multiple times in a row
  // const variation = 20;
  // const defaultLoc = () => ({
  //   left: canvasSize.width / 2 - defaultSize.width / 2 + randrange(-variation, variation),
  //   top: canvasSize.height / 2 - defaultSize.height / 2 + randrange(-variation, variation)
  // });

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

  const generateFuncCall = (o: fabric.Object): [string, any[]] | null => {
    const operation = drawOperations.find((op) => op.name === o.type);
    if (operation) {
      return operation.generateCode(o);
    }
    switch (o.type) {
      case 'polygon':
        const points = calcAbsolutePoints(o, (o as any).points);
        switch ((o as any).points.length) {
          case 3: {
            const [p1, p2, p3] = points;
            return ['triangle', [p1.x, p1.y, p2.x, p2.y, p3.x, p3.y]];
          }
          case 4:
            const [p1, p2, p3, p4] = points;
            return ['quad', [p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y]];
          default:
            throw Error(
              'Trying to generate p5 code for a Fabric.js polygon with unrecognized number of points: ' +
                (o as any).points.length
            );
        }
      default:
        return null;
    }
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
          {/* {gestureSequence.map((item, idx) => (
            <circle
              key={idx}
              r={Math.min(defaultSize.height, defaultSize.width)}
              cx={item.x}
              cy={item.y}
            ></circle>
          ))} */}
          {operation.gesturePreview(gestureSequence, mouseMovePos as Point, { defaultSize })}
        </svg>
      )}
    </div>
  );
}
/* eslint-enable */
