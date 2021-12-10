/*
function randomInt(max: number): number {
  return Math.floor(Math.random() * max)
}

function randomShape(): string {
  switch (randomInt(3)) {
    case 0:
      return "rect(10, 10, 100, 200)"
    case 1:
      return "circle(10, 10, 200)"
    case 2:
      return "line(10, 10, 100, 200)"
    default:
      return "BLAH: randomShape()"
  }
}

export function addRandomShape(code: string): string {
  const newShape = "  " + randomShape() + "\n"
  const re = /function scratchpad\(\) \{([^\}]*)\}/
  const m = code.match(re)
  let newCode
  if (m === null) {
    newCode = code + "\nfunction scratchpad() {\n" + newShape + "}"
  } else {
    const posBeforeClosingBrace = m!.index + m[0].length - 1
    newCode =
      code.slice(0, posBeforeClosingBrace) +
      newShape +
      code.slice(posBeforeClosingBrace)
  }
  return newCode
}
*/
