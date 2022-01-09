/* eslint-disable */
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

export default function ShapeToolbox({ closeCb, canvasSize, existingCalls }) {
  const el = useRef(null);

  canvasSize = { width: Math.max(canvasSize.width, 20), height: Math.max(canvasSize.height, 20) };

  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const canvas_ = new fabric.Canvas(el.current);
    canvas_.setDimensions(canvasSize);
    canvas_.selection = 'true';
    existingCalls
      .map(processExistingCall)
      .filter(Boolean)
      .forEach((o) => canvas_.add(o));
    setCanvas(canvas_);
  }, []);

  const defaults = {
    fill: 'white',
    stroke: 'black',
    strokeWidth: 1,
    strokeUniform: true,
    originX: 'left',
    originY: 'top'
  };

  const defaultLoc = {
    left: canvasSize.width / 2 - 10,
    top: canvasSize.height / 2 - 10
  };

  const addLine = () =>
    canvas.add(
      new fabric.Line([defaultLoc.left, defaultLoc.top, defaultLoc.left + 20, defaultLoc.top + 20], defaults)
    );

  const addRect = () =>
    canvas.add(
      new fabric.Rect({
        ...defaults,
        ...defaultLoc,
        width: 20,
        height: 20
      })
    );

  const addCircle = () => {
    const o = new fabric.Circle({
      ...defaults,
      ...defaultLoc,
      radius: 10
    });

    // https://stackoverflow.com/a/66692592
    // Disable rotation. We don't have support for this because there's no way
    // to do that in p5 without using transforms,
    // whereas, for example, it is possible to do that with rects using quad()
    o.setControlsVisibility({ mtr: false });

    canvas.add(o);
  };

  const addTriangle = () =>
    canvas.add(
      new fabric.Triangle({
        ...defaults,
        ...defaultLoc,
        width: 20,
        height: 20
      })
    );

  const processExistingCall = ([name, args]) => {
    switch (name) {
      case 'line':
        return new fabric.Line(args, defaults);
      // Curly brackets necessary here because of duplicate declaration of left and top below :(
      case 'rect': {
        const [left, top, width, height] = args;
        return new fabric.Rect({
          ...defaults,
          left,
          top,
          width,
          height
        });
      }
      case 'quad': {
        const [x1, y1, x2, y2, x3, y3, x4, y4] = args;
        const points = [
          { x: x1, y: y1 },
          { x: x2, y: y2 },
          { x: x3, y: y3 },
          { x: x4, y: y4 }
        ];
        return new fabric.Polygon(points, defaults);
      }
      case 'circle': {
        const [left, top, diameter] = args;
        return new fabric.Circle({
          ...defaults,
          left: left - diameter / 2,
          top: top - diameter / 2,
          radius: diameter / 2
        });
      }
      case 'ellipse':
        const [left, top, width, height] = args;
        return new fabric.Ellipse({
          ...defaults,
          left: left - width / 2,
          top: top - height / 2,
          rx: width / 2,
          ry: height / 2
        });
      case 'triangle':
        const [x1, y1, x2, y2, x3, y3] = args;
        const points = [
          { x: x1, y: y1 },
          { x: x2, y: y2 },
          { x: x3, y: y3 }
        ];
        return new fabric.Polygon(points, defaults);
      default:
        return null;
    }
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

  const generateFuncCalls = (o) => {
    const { oCoords: coords } = o;
    switch (o.type) {
      case 'line':
        const [p1, p2] = calcAbsolutePointsForLine(o);
        return ['line', [p1.x, p1.y, p2.x, p2.y]];
      case 'rect':
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
      case 'circle':
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
      case 'triangle':
        return ['triangle', [coords.mt.x, coords.mt.y, coords.bl.x, coords.bl.y, coords.br.x, coords.br.y]];
      case 'ellipse':
        return [
          'ellipse',
          [
            coords.tl.x + (o.width * o.scaleX) / 2,
            coords.tl.y + (o.height * o.scaleY) / 2,
            o.width * o.scaleX,
            o.height * o.scaleY
          ]
        ];
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

  const roundNums = ([name, args]) => {
    return [name, args.map(Math.round)];
  };

  const apply = () => {
    const objects = canvas.getObjects();
    console.log(objects);
    canvas.clear();
    closeCb(objects.map(generateFuncCalls).filter(Boolean).map(roundNums));
  };

  return (
    <div className="shape-toolbox-overlay" style={{ width: canvasSize.width }}>
      <canvas ref={el} />
      <div className="tools">
        <button onClick={addLine}>line()</button>
        <button onClick={addRect}>square()/rect()</button>
        <button onClick={addCircle}>circle()/ellipse()</button>
        <button onClick={addTriangle}>triangle()</button>
        <button className="apply" onClick={apply}>
          apply
        </button>
      </div>
    </div>
  );
}
/* eslint-enable */
