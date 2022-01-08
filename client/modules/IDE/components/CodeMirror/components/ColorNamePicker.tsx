import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { colorGroups, colorNames, isTooDark } from '../state/colorNames';

type Props = {
  cb: (color: string | null) => void;
  initColor: string;
  wrap: HTMLElement;
};

const initialState = Object.fromEntries(Object.keys(colorGroups).map((k) => [k, false]));

export default function ColorNamePicker({ cb, initColor, wrap }: Props): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initColorGroup = Object.entries(colorGroups).find(([_, colors]) => colors.includes(initColor));
  if (!initColorGroup) {
    throw new Error('Invalid color passed to the color name picker');
  }
  const [state, setState] = useState({
    ...initialState,
    // to initially expand the group of initColor, set the following to true
    [initColorGroup[0]]: false
  });

  const { left: parentLeft, top: parentTop } = useMemo(() => wrap.getBoundingClientRect(), []);

  const [top, setTop] = useState(parentTop);
  const [left, setLeft] = useState(parentLeft);

  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (el.current) {
      const newTop = window.innerHeight - el.current.getBoundingClientRect().height - 20; // - 20 for margin
      const newLeft = window.innerWidth - el.current.getBoundingClientRect().width - 50;
      if (newLeft < left) {
        setLeft(newLeft);
        // If the element was moved to the left move it down to keep it from
        // concealing the actual color string beneath it
        setTop(top + 50);
      }
      if (newTop < top) {
        setTop(newTop);
      }

      const escHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          cb(null);
        }
      };
      document.addEventListener('keypress', escHandler);
      return () => document.removeEventListener('keypress', escHandler);
    }
  }, []);

  const showGroupIndicators = true;
  return (
    <div className="color-name-picker" style={{ left, top }} ref={el}>
      <ul>
        {Object.entries(colorGroups).map(([groupName, colors]) => (
          <li key={groupName}>
            <span
              className="color-group"
              onClick={() => setState({ ...state, [groupName]: !state[groupName] })}
            >
              {/* https://en.wikipedia.org/wiki/Geometric_Shapes */}
              <span style={{fontSize: "75%"}}>
                {(showGroupIndicators ? (state[groupName] ? '▲ ' : '▼ ') : '')}
              </span>
              <span>
               {groupName.slice(0, 1).toUpperCase() + groupName.slice(1)}
              </span>
            </span>
            <span>
              {colors.map((color) => (
                <span
                  key={color + '-swatch'}
                  className="color-swatch"
                  title={color}
                  onClick={() => cb(color)}
                  style={{
                    background: color,
                    borderColor: color === initColor ? 'black' : 'white'
                  }}
                ></span>
              ))}
            </span>
            {state[groupName] && (
              <ul>
                {colors.map((color) => (
                  <li
                    key={color + '-item'}
                    className={'color-item ' + (color === initColor ? 'selected' : '')}
                    onClick={() => cb(color)}
                    style={{
                      background: color,
                      color: isTooDark(color) ? 'white' : 'black'
                    }}
                  >
                    {color}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="buttons">
        {/* TODO: Escape */}
        <button onClick={() => cb(null)}>Close</button>
        <button onClick={() => cb(colorNames[initColor])}>Convert to hex and close</button>
      </div>
    </div>
  );
}
