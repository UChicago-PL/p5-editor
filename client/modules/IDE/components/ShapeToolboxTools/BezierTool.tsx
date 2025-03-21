import React from 'react';
import { fabric } from 'fabric';
import { DrawingTool, defaults } from '../ShapeToolboxOverlay';

// @ts-ignore
import Curve from '../../../../images/shapeToolbox/curve.svg';

const BezierDrawingTool: DrawingTool = {
  name: 'bezier',
  generateFuncCall: ({ o }) => {
    const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = toAbsolutePoints(o);
    return ['bezier', [x1, y1, x2, y2, x3, y3, x4, y4]];
  },
  addShape: ({ canvas, gestureSeq }) => {
    const [p1, p2] = gestureSeq;
    const top = p1.y > p2.y ? p1 : p2;
    const bot = p1.y < p2.y ? p1 : p2;
    createBezier(
      [
        [bot.x, bot.y],
        [bot.x, bot.y + Math.abs(bot.y - top.y) / 2],
        [top.x, top.y - Math.abs(bot.y - top.y) / 2],
        [top.x, top.y]
      ],
      defaults,
      canvas
    ).forEach((o) => canvas.add(o));
  },
  processExistingCall: ({ args, canvas }) => {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = args;
    return createBezier(
      [
        [x1, y1],
        [x2, y2],
        [x3, y3],
        [x4, y4]
      ],
      defaults,
      canvas
    );
  },
  icon: Curve,
  ariaLabel: 'bezier()',
  gestureLength: 2,
  gesturePreview: (seq, point) => {
    if (!seq.length) {
      return <circle cx={point.x} cy={point.y} r={10} fill="black"></circle>;
    }
    return (
      <g>
        <line stroke="black" x1={seq[0].x} y1={seq[0].y} x2={point.x} y2={point.y}></line>
        <circle cx={point.x} cy={point.y} r={10} fill="black"></circle>
      </g>
    );
  }
};

export default BezierDrawingTool;

const randomColorTheme = () => {
  const hue = Math.random() * 360;
  return [`hsl(${hue},40%,50%)`, `hsl(${hue},40%,75%)`];
};

// Modified from http://fabricjs.com/quadratic-curve

const createBezier = (absolutePoints, defaults, canvas: fabric.Canvas) => {
  // Prevent the user from creating multi-selections that contain paths or paths handles
  // This is because operations on group selections, like scaling, can mess up the special path handles
  const selectionHandler = () => {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.some((o) => (o as any).special || o.type === 'path') && activeObjects.length > 1) {
      canvas.discardActiveObject();
      const otherObjects = activeObjects.filter((o) => !(o as any).special && o.type !== 'path');
      if (otherObjects.length) {
        //   @ts-ignore
        const sel = new fabric.ActiveSelection({ canvas });
        canvas.setActiveObject(sel);
      }
    } else if (activeObjects.length === 1) {
      const bringAllControlsToFront = (parentId) => {
        canvas.getObjects().forEach((o) => {
          if ((o as any).parentId === parentId || (o as any).id === parentId) {
            o.bringToFront();
          }
        });
      };
      const activeObject = activeObjects[0];
      if (activeObject.type === 'path') {
        bringAllControlsToFront((activeObject as any).id);
      } else if ((activeObject as any).special) {
        bringAllControlsToFront((activeObject as any).parentId);
      }
    }
  };

  canvas.on('selection:created', selectionHandler);
  canvas.on('selection:updated', selectionHandler);

  const [color, lighterColor] = randomColorTheme();

  const path = new fabric.Path(makeSvgString(absolutePoints), {
    ...defaults,
    originX: 'center',
    originY: 'center',
    hasControls: false,
    fill: 'rgba(0,0,0,0)',
    stroke: color,
    // Custom properties

    // @ts-ignore
    id: window.fabricObjectId,
    stbType: 'bezier'
  });
  // @ts-ignore
  window.fabricObjectId++;
  const controls = absolutePoints.map(makeControl);

  let relativePointPositions = absolutePoints.map(([x, y]) => [path.left! - x, path.top! - y]);

  path.on('moving', () => {
    controls.forEach((o) => {
      const [x, y] = relativePointPositions[o.i];
      o.left = path.left! - x;
      o.top = path.top! - y;
      o.setCoords();
    });
  });

  const modifyPath = (i, [x, y]) => {
    // This weird code is necessary because the fabric path don't store points as a simple array,
    // but instead in a nested array that's shaped according to the svg string that is passed to the constructor
    if (i === 0) {
      // The "M" part of the string
      path.path![0][1] = x;
      path.path![0][2] = y;
    } else {
      // The "C" part of the string
      path.path![1][(i - 1) * 2 + 1] = x;
      path.path![1][(i - 1) * 2 + 2] = y;
    }
  };

  function makeControl(loc, i) {
    const isEndpoint = i === 0 || i === 3;
    let theme;
    if (isEndpoint) {
      theme = {
        fill: color,
        stroke: lighterColor
      };
    } else {
      theme = {
        stroke: color,
        fill: 'rgba(0,0,0,0)'
      };
    }

    const c = new fabric.Circle({
      left: loc[0],
      top: loc[1],
      strokeWidth: 3,
      radius: 12,
      originX: 'center',
      originY: 'center',
      hasBorders: false,
      hasControls: false,
      ...theme,
      // Custom properties
      i,
      special: true,
      parentId: (path as any).id
    });

    c.on('moving', (arg: any) => {
      const {
        transform: { target }
      } = arg;
      // The subtraction here is to account for the possibility that the path has been moved
      // When the path is moved, only the object's `left` and `top` fields are updated, and not the path values
      // Thus, since here we are setting the path values, we have to undo any translations
      // We undo relative to `pathOffset`, which specifies the initial top left position of the path
      modifyPath(i, [
        target.left - (path.left! - path.pathOffset.x),
        target.top - (path.top! - path.pathOffset.y)
      ]);
      relativePointPositions[i] = [path.left! - target.left, path.top! - target.top];
    });

    c.on('moved', () => {
      const absolutePoints = toAbsolutePoints(path);
      path.initialize(makeSvgString(absolutePoints) as any);
      relativePointPositions = controls.map((o) => [path.left! - o.left, path.top! - o.top]);
      path.setCoords();
    });

    return c;
  }

  return [path, ...controls];
};

const makeSvgString = (points: number[][]): string => {
  const p_ = (i) => `${points[i][0]} ${points[i][1]}`;
  return `M ${p_(0)} C ${p_(1)}, ${p_(2)}, ${p_(3)}`;
};

const toAbsolutePoints = (o) => {
  const path = o.path;
  const relativePoints = [
    [path[0][1], path[0][2]],
    [path[1][1], path[1][2]],
    [path[1][3], path[1][4]],
    [path[1][5], path[1][6]]
  ];
  // This technique is similar to the one used for modifying the path just above,
  // except in this case we are adding (path.left - path.pathOffset.x) instead of subtracting it
  // That's because we want to add any accrued translations to convert the path coordinates to their absolute form
  // so that the path can be safely re-initialized without messing up its coordinates/positioning
  return relativePoints.map(([x, y]) => [x + o.left - o.pathOffset.x, y + o.top - o.pathOffset.y]);
};
