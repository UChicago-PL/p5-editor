/* eslint-disable */
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

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
  strokeDashArray: [5, 5],
  fill: 'rgb(158,158,236)',
  stroke: 'black',
  strokeWidth: 3,
  strokeUniform: true,
  originX: 'left',
  originY: 'top'
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

const roundNums = ([name, args]) => {
  return [name, args.map(Math.round)];
};

const generateFuncCallCode = ([name, args]) => {
  return `${name}(${args.join(', ')})`;
};

type Coord = { x: number; y: number };
interface Coords {
  tl: Coord;
  bl: Coord;
  tr: Coord;
  br: Coord;
  mt: Coord;
}

interface SomeObject {
  angle: number;
  scaleX: number;
  scaleY: number;
  width: number;
  height: number;
  radius: number;
}

type XXX = { defaultLoc: any; defaultSize: any };
interface DrawOperation {
  name: string;
  insertIntoCanvas: (canvas, XXX) => any | void;
  processExisitingCall: (args) => any;
  generateCode: (coords: Coords, o: SomeObject) => [string, any[]];
  icon?: any;
}
const drawOperations: DrawOperation[] = [
  {
    name: 'rect',
    insertIntoCanvas: (canvas, { defaultLoc, defaultSize }) =>
      canvas.add(
        new fabric.Rect({
          ...defaults,
          ...defaultLoc(),
          ...defaultSize
        })
      ),
    processExisitingCall: (args) => {
      const [left, top, width, height] = args;
      return new fabric.Rect({
        ...defaults,
        left,
        top,
        width,
        height
      });
    },
    generateCode: (coords, o) => {
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
      } else return ['rect', [coords.tl.x, coords.tl.y, o.width * o.scaleX, o.height * o.scaleY]];
    },
    icon: Square
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
    generateCode: () => ['console.log', ['"not implemented yet"']]
  },
  {
    name: 'circle',
    insertIntoCanvas: (canvas, { defaultLoc, defaultSize }) => {
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
    processExisitingCall: (args) => {
      const [left, top, diameter] = args;
      return new fabric.Circle({
        ...defaults,
        left: left - diameter / 2,
        top: top - diameter / 2,
        radius: diameter / 2
      });
    },
    generateCode: (coords, o) => {
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
    icon: Circle
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
    generateCode: (coords, o) => {
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
    insertIntoCanvas: () => {}
  },
  {
    name: 'triangle',
    insertIntoCanvas: (canvas, { defaultLoc, defaultSize }) =>
      canvas.add(
        new fabric.Triangle({
          ...defaults,
          ...defaultLoc(),
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
    generateCode: (coords, o) => {
      return ['triangle', [coords.mt.x, coords.mt.y, coords.bl.x, coords.bl.y, coords.br.x, coords.br.y]];
    },
    icon: Triangle
  },
  {
    name: 'line',
    insertIntoCanvas: (canvas, { defaultLoc, defaultSize }) => {
      const loc = defaultLoc();

      canvas.add(
        new fabric.Line(
          [loc.left, loc.top, loc.left + defaultSize.width, loc.top + defaultSize.height],
          defaults
        )
      );
    },
    processExisitingCall: (args) => new fabric.Line(args, defaults),
    generateCode: (coords, o) => {
      const [p1, p2] = calcAbsolutePointsForLine(o);
      return ['line', [p1.x, p1.y, p2.x, p2.y]];
    },
    icon: Line
  }
];

export default function ShapeToolbox({ closeCb, canvasSize, existingCalls }) {
  const el = useRef(null);

  canvasSize = { width: Math.max(canvasSize.width, 20), height: Math.max(canvasSize.height, 20) };

  const [canvas, setCanvas] = useState(null);

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
    canvas_.selection = 'true';
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
  const variation = 20;
  const defaultLoc = () => ({
    left: canvasSize.width / 2 - defaultSize.width / 2 + randrange(-variation, variation),
    top: canvasSize.height / 2 - defaultSize.height / 2 + randrange(-variation, variation)
  });

  // const addLine = () => {
  //   const loc = defaultLoc();

  //   canvas.add(
  //     new fabric.Line(
  //       [loc.left, loc.top, loc.left + defaultSize.width, loc.top + defaultSize.height],
  //       defaults
  //     )
  //   );
  // };

  // const addRect = () =>
  //   canvas.add(
  //     new fabric.Rect({
  //       ...defaults,
  //       ...defaultLoc(),
  //       ...defaultSize
  //     })
  //   );

  // const addCircle = () => {
  //   const o = new fabric.Circle({
  //     ...defaults,
  //     ...defaultLoc(),
  //     radius: defaultSize.width / 2
  //   });

  //   // https://stackoverflow.com/a/66692592
  //   // Disable rotation. We don't have support for this because there's no way
  //   // to do that in p5 without using transforms,
  //   // whereas, for example, it is possible to do that with rects using quad()
  //   o.setControlsVisibility({ mtr: false });

  //   canvas.add(o);
  // };

  // const addTriangle = () =>
  //   canvas.add(
  //     new fabric.Triangle({
  //       ...defaults,
  //       ...defaultLoc(),
  //       ...defaultSize
  //     })
  //   );

  const processExistingCall = (call) => {
    if (typeof call === 'string') {
      // We are dealing with an ignored line, which has been left in its raw form
      return null;
    }

    const [name, args] = call;
    const operation = drawOperations.find((op) => op.name);
    if (operation) {
      return operation.processExisitingCall(args)!;
    }
    return null;
    // switch (name) {
    // case 'line':
    // return new fabric.Line(args, defaults);
    // Curly brackets necessary here because of duplicate declaration of left and top below :(
    // case 'rect': {
    //   const [left, top, width, height] = args;
    //   return new fabric.Rect({
    //     ...defaults,
    //     left,
    //     top,
    //     width,
    //     height
    //   });
    // }
    // case 'quad': {
    //   const [x1, y1, x2, y2, x3, y3, x4, y4] = args;
    //   const points = [
    //     { x: x1, y: y1 },
    //     { x: x2, y: y2 },
    //     { x: x3, y: y3 },
    //     { x: x4, y: y4 }
    //   ];
    //   return new fabric.Polygon(points, defaults);
    // }
    // case 'circle': {
    //   const [left, top, diameter] = args;
    //   return new fabric.Circle({
    //     ...defaults,
    //     left: left - diameter / 2,
    //     top: top - diameter / 2,
    //     radius: diameter / 2
    //   });
    // }
    // case 'ellipse':
    //   const [left, top, width, height] = args;
    //   return new fabric.Ellipse({
    //     ...defaults,
    //     left: left - width / 2,
    //     top: top - height / 2,
    //     rx: width / 2,
    //     ry: height / 2
    //   });
    // case 'triangle':
    //   const [x1, y1, x2, y2, x3, y3] = args;
    //   const points = [
    //     { x: x1, y: y1 },
    //     { x: x2, y: y2 },
    //     { x: x3, y: y3 }
    //   ];
    //   return new fabric.Polygon(points, defaults);
    // default:
    //   return null;
    // }
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

  const generateFuncCall = (o) => {
    const { oCoords: coords } = o;
    const operation = drawOperations.find((op) => op.name === o.type);
    if (operation) {
      return operation.generateCode(coords, o);
    }
    switch (o.type) {
      // case 'line':
      //   const [p1, p2] = calcAbsolutePointsForLine(o);
      //   return ['line', [p1.x, p1.y, p2.x, p2.y]];
      // case 'rect':
      //   if (o.angle) {
      //     return [
      //       'quad',
      //       [
      //         coords.tl.x,
      //         coords.tl.y,
      //         coords.bl.x,
      //         coords.bl.y,
      //         coords.br.x,
      //         coords.br.y,
      //         coords.tr.x,
      //         coords.tr.y
      //       ]
      //     ];
      //   } else return ['rect', [coords.tl.x, coords.tl.y, o.width * o.scaleX, o.height * o.scaleY]];
      // case 'circle':
      //   if (o.scaleX === o.scaleY) {
      //     return [
      //       'circle',
      //       [coords.tl.x + o.radius * o.scaleX, coords.tl.y + o.radius * o.scaleX, o.radius * 2 * o.scaleX]
      //     ];
      //   }
      //   return [
      //     'ellipse',
      //     [
      //       coords.tl.x + (o.width * o.scaleX) / 2,
      //       coords.tl.y + (o.height * o.scaleY) / 2,
      //       o.width * o.scaleX,
      //       o.height * o.scaleY
      //     ]
      //   ];
      // case 'triangle':
      //   return ['triangle', [coords.mt.x, coords.mt.y, coords.bl.x, coords.bl.y, coords.br.x, coords.br.y]];
      // case 'ellipse':
      //   return [
      //     'ellipse',
      //     [
      //       coords.tl.x + (o.width * o.scaleX) / 2,
      //       coords.tl.y + (o.height * o.scaleY) / 2,
      //       o.width * o.scaleX,
      //       o.height * o.scaleY
      //     ]
      //   ];
      case 'polygon':
        const points = calcAbsolutePoints(o, o.points);
        switch (o.points.length) {
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
                o.points.length
            );
        }
      default:
        return null;
    }
  };

  const reset = () => resetCanvas(canvas);

  const apply = () => {
    const objects = canvas.getObjects();
    console.log(objects);
    canvas.clear();

    // Start with just the ignored lines
    let res = existingCalls.map((call) => (typeof call === 'string' ? call : null));

    // Add in the shapeToolbox calls
    objects.forEach((o) => {
      const line = generateFuncCallCode(roundNums(generateFuncCall(o)));
      if (o.id !== undefined) {
        // This is an existing object with a specific position among the other calls
        res[o.id] = line;
      } else {
        // This is a new object
        res.push(line);
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
        </button> */}
        {drawOperations.map((op) => {
          const Icon = op.icon || Circle;
          return (
            <button
              key={op.name}
              onClick={wrapEvent(() => op.insertIntoCanvas(canvas, { defaultLoc, defaultSize }), {
                eventName: `stb-add${op.name}`
              })}
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
    </div>
  );
}
/* eslint-enable */
