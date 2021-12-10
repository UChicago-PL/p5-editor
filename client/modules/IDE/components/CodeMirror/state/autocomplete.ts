import { autocompletion, CompletionSource } from '@codemirror/autocomplete';

function from(list: string[]): CompletionSource {
  return (cx) => {
    const word = cx.matchBefore(/\w+$/);
    if (!word && !cx.explicit) {
      return null;
    }
    return {
      from: word ? word.from : cx.pos,
      options: list.map((w) => ({ label: w })),
      span: /\w*/
    };
  };
}

export default function (words: { [group: string]: string[] }) {
  const allWords = Object.values(words).reduce((acc, row) => acc.concat(row), []);
  return autocompletion({ override: [from(allWords)] });
}
