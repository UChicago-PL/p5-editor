import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

export default function ShapeToolbox({ closeCb, canvasSize }) {
  const el = useRef(null);

  canvasSize = { width: Math.max(canvasSize.width, 20), height: Math.max(canvasSize.width, 20) };

  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const canvas_ = new fabric.Canvas(el.current);
    canvas_.setDimensions(canvasSize);
    canvas_.selection = 'true';
    setCanvas(canvas_);
  }, []);

  const defaults = {
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1,
    left: canvasSize.width / 2 - 10,
    top: canvasSize.height / 2 - 10,
    strokeUniform: true
  };

  const addRect = () => {
    canvas.add(
      new fabric.Rect({
        ...defaults,
        width: 20,
        height: 20
      })
    );
  };

  const addCircle = () => {
    canvas.add(
      new fabric.Circle({
        ...defaults,
        radius: 10
      })
    );
  };

  const generateFuncCalls = (o) => {
    const func = (() => {
      switch (o.type) {
        case 'rect':
          return ['rect', o.left, o.top, o.width * o.scaleX, o.height * o.scaleY];
        case 'circle':
          if (o.scaleX === o.scaleY) {
            return [
              'circle',
              o.left + o.radius * o.scaleX,
              o.top + o.radius * o.scaleX,
              o.radius * 2 * o.scaleX
            ];
          }
          return [
            'ellipse',
            o.left + (o.width * o.scaleX) / 2,
            o.top + (o.height * o.scaleY) / 2,
            o.width * o.scaleX,
            o.height * o.scaleY
          ];
        default:
          return null;
      }
    })();
    if (!func) return [];
    if (o.angle) {
      return [
        ['translate', func[1], func[2]],
        ['rotate', `radians(${o.angle})`],
        [func[0], 0, 0, ...func.slice(3)],
        ['rotate', `radians(${-o.angle})`],
        ['translate', -func[1], -func[2]]
      ];
    }
    return [func];
  };

  const roundNums = (xs) => {
    return xs.map((x) => {
      if (typeof x === 'number') {
        return Math.round(x * 100) / 100;
      }
      return x;
    });
  };

  const generateFuncString = ([name, ...args]) => {
    return `${name}(${args.join(',')})`;
  };

  const apply = () => {
    const data = canvas.toObject();
    console.log(data);
    const lines = data.objects.flatMap(generateFuncCalls).map(roundNums).map(generateFuncString);
    canvas.clear();
    closeCb(lines);
  };

  return (
    <div className="shape-toolbox-overlay" style={{ width: canvasSize.width }}>
      <canvas ref={el} />
      <div className="tools">
        <button onClick={addRect}>rect</button>
        <button onClick={addCircle}>circle</button>
        <button className="apply" onClick={apply}>
          apply
        </button>
      </div>
    </div>
  );
}
