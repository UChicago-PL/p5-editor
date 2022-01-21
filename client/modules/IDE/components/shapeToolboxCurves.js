// Modified from http://fabricjs.com/quadratic-curve

import { fabric } from 'fabric';

export const createBezier = (absolutePoints, defaults) => {
  const makeSvgString = (points) => {
    const p_ = (i) => `${points[i][0]} ${points[i][1]}`;
    return `M ${p_(0)} C ${p_(1)}, ${p_(2)}, ${p_(3)}`;
  };

  const line = new fabric.Path(makeSvgString(absolutePoints), {
    ...defaults,
    originX: 'center',
    originY: 'center',
    hasControls: false,
    // Custom properties
    id: window.fabricObjectId
  });

  const controls = absolutePoints.map(makeControl);

  let relativePointPositions = absolutePoints.map(([x, y]) => [line.left - x, line.top - y]);

  line.on('moving', () => {
    controls.forEach((o) => {
      const [x, y] = relativePointPositions[o.i];
      o.left = line.left - x;
      o.top = line.top - y;
      o.setCoords();
    });
  });

  const modifyLine = (i, [x, y]) => {
    // This weird code is necessary because the fabric path don't store points as a simple array,
    // but instead in a nested array that's shaped according to the svg string that is passed to the constructor
    if (i === 0) {
      // The "M" part of the string
      line.path[0][1] = x;
      line.path[0][2] = y;
    } else {
      // The "C" part of the string
      line.path[1][(i - 1) * 2 + 1] = x;
      line.path[1][(i - 1) * 2 + 2] = y;
    }
  };

  function makeControl(loc, i) {
    const isEndpoint = i === 0 || i === 3;
    const c = new fabric.Circle({
      left: loc[0],
      top: loc[1],
      strokeWidth: 3,
      radius: 12,
      fill: isEndpoint ? '#666' : '#fff',
      stroke: '#666',
      originX: 'center',
      originY: 'center',
      hasBorders: false,
      hasControls: false,
      // Custom properties
      i,
      special: true,
      parentId: line.id
    });

    c.on('moving', ({ transform: { target } }) => {
      // The subtraction here is to account for the possibility that the path has been moved
      // When the path is moved, only the object's `left` and `top` fields are updated, and not the path values
      // Thus, since here we are setting the path values, we have to undo any translations
      // We undo relative to `pathOffset`, which specifies the initial top left position of the path
      modifyLine(i, [
        target.left - (line.left - line.pathOffset.x),
        target.top - (line.top - line.pathOffset.y)
      ]);
      relativePointPositions[i] = [line.left - target.left, line.top - target.top];
    });

    c.on('moved', () => {
      const points = toPoints(line.path);
      // This technique is similar to the one used for modifying the line just above,
      // except in this case we are adding (line.left - line.pathOffset.x) instead of subtracting it
      // That's because we want to add any accrued translations to convert the path coordinates to their absolute form
      // so that the path can be safely re-initialized without messing up its coordinates/positioning
      const absolutePoints = points.map(([x, y]) => [
        x + line.left - line.pathOffset.x,
        y + line.top - line.pathOffset.y
      ]);
      line.initialize(makeSvgString(absolutePoints));
      relativePointPositions = controls.map((o) => [line.left - o.left, line.top - o.top]);
      line.setCoords();
    });

    return c;
  }

  return [line, ...controls];
};

export const toPoints = (path) => {
  return [
    [path[0][1], path[0][2]],
    [path[1][1], path[1][2]],
    [path[1][3], path[1][4]],
    [path[1][5], path[1][6]]
  ];
};
