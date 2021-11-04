import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

export default function ShapeToolbox() {
  const el = useRef(null);

  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const canvas_ = new fabric.Canvas(el.current);
    canvas_.setDimensions({ width: 500, height: 500 });
    canvas_.selection = 'true';
    setCanvas(canvas_);
  }, []);

  const addRect = () => {
    canvas.add(
      new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      })
    );
  };

  const generateFuncString = ([name, ...args]) => {
    return `${name}(${args.join(',')})`;
  };

  const apply = () => {
    const data = canvas.toObject();
    console.log(data);
    const lines = data.objects
      .map((o) => {
        switch (o.type) {
          case 'rect':
            return ['rect', o.left, o.top, o.width, o.height];
          default:
            return null;
        }
      })
      .filter(Boolean)
      .map(generateFuncString);
    console.log(lines);
    canvas.clear();
  };

  return (
    <div className="shape-toolbox-overlay">
      <canvas ref={el} />
      <button onClick={addRect}>rect</button>
      <button onClick={apply}>apply</button>
    </div>
  );
}
