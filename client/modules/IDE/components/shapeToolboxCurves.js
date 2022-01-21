// Modified from http://fabricjs.com/quadratic-curve

import { fabric } from 'fabric';

export const createBezier = (points, defaults) => {
  const p_ = (i) => `${points[i][0]} ${points[i][1]}`;
  const svgString = `M ${p_(0)} C ${p_(1)}, ${p_(2)}, ${p_(3)}`;

  const line = new fabric.Path(svgString, {
    ...defaults,
    originX: 'center',
    originY: 'center'
  });
  // line.selectable = false;
  line.hasControls = false;

  const controls = points.map(makeControl);

  const relativePointPositions = points.map(([x, y]) => [line.left - x, line.top - y]);

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
      i
    });

    // Custom property
    c.special = true;

    c.hasBorders = c.hasControls = false;

    c.on('moving', ({ transform: { target } }) => {
      modifyLine(i, [target.left, target.top]);
      relativePointPositions[i] = [line.left - target.left, line.top - target.top];
    });

    // Future improvement: update the path selection box upon move
    // The following updates the box but messes up the coordinates
    // https://stackoverflow.com/a/58443916/6643726
    // c.on('moved', () => {
    //   fabric.Polyline.prototype._setPositionDimensions.call(line, {});
    // });

    return c;
  }

  return [line, ...controls];
};

export const toPoints = ({ path }) => {
  return [path[0][1], path[0][2], path[1][1], path[1][2], path[1][3], path[1][4], path[1][5], path[1][6]];
};
