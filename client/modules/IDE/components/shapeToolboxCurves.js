// Modified from http://fabricjs.com/quadratic-curve

export const createBezier = (points, defaults) => {
  const p_ = (i) => `${points[i][0]} ${points[i][1]}`;
  const svgString = `M ${p_(0)} C ${p_(1)}, ${p_(2)}, ${p_(3)}`;

  const line = new fabric.Path(svgString, {
    ...defaults,
    originX: 'center',
    originY: 'center'
  });
  line.selectable = false;

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

  const controls = points.map(makeControl);

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
      originY: 'center'
    });

    // Custom property
    c.special = true;

    c.hasBorders = c.hasControls = false;

    c.on('moving', ({ transform: { target } }) => {
      modifyLine(i, [target.left, target.top]);
    });

    return c;
  }

  return [line, ...controls];
};

export const toPoints = ({ path }) => {
  return [path[0][1], path[0][2], path[1][1], path[1][2], path[1][3], path[1][4], path[1][5], path[1][6]];
};
