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

  const addLine = () => canvas.add(new fabric.Line([-10, -10, 10, 10], defaults));

  const addRect = () =>
    canvas.add(
      new fabric.Rect({
        ...defaults,
        width: 20,
        height: 20
      })
    );

  const addCircle = () =>
    canvas.add(
      new fabric.Circle({
        ...defaults,
        radius: 10
      })
    );

  const addTriangle = () =>
    canvas.add(
      new fabric.Triangle({
        ...defaults,
        width: 20,
        height: 20
      })
    );

  const generateFuncCalls = (o) => {
    const { oCoords: coords } = o;
    switch (o.type) {
      case 'line':
        return ['line', coords.tl.x, coords.tl.y, coords.br.x, coords.br.y];
      case 'rect':
        if (o.angle)
          return [
            'quad',
            coords.tl.x,
            coords.tl.y,
            coords.bl.x,
            coords.bl.y,
            coords.br.x,
            coords.br.y,
            coords.tr.x,
            coords.tr.y
          ];
        else return ['rect', coords.tl.x, coords.tl.y, o.width * o.scaleX, o.height * o.scaleY];
      case 'circle':
        if (o.scaleX === o.scaleY) {
          return [
            'circle',
            coords.tl.x + o.radius * o.scaleX,
            coords.tl.y + o.radius * o.scaleX,
            o.radius * 2 * o.scaleX
          ];
        }
        return [
          'ellipse',
          coords.tl.x + (o.width * o.scaleX) / 2,
          coords.tl.y + (o.height * o.scaleY) / 2,
          o.width * o.scaleX,
          o.height * o.scaleY
        ];
      case 'triangle':
        return ['triangle', coords.mt.x, coords.mt.y, coords.bl.x, coords.bl.y, coords.br.x, coords.br.y];
      default:
        return null;
    }
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
    const objects = canvas.getObjects();
    console.log(objects);
    const lines = objects.map(generateFuncCalls).filter(Boolean).map(roundNums).map(generateFuncString);
    canvas.clear();
    closeCb(lines);
  };

  return (
    <div className="shape-toolbox-overlay" style={{ width: canvasSize.width }}>
      <canvas ref={el} />
      <div className="tools">
        <button onClick={addLine}>line</button>
        <button onClick={addRect}>rect</button>
        <button onClick={addCircle}>circle</button>
        <button onClick={addTriangle}>triangle</button>
        <button className="apply" onClick={apply}>
          apply
        </button>
      </div>
    </div>
  );
}
