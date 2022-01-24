import { autocompletion, CompletionSource } from '@codemirror/autocomplete';
import words, { snippets } from './autocomplete-words';

function from(list: string[]): CompletionSource {
  return (cx) => {
    const word = cx.matchBefore(/\w+$/);
    if (!word && !cx.explicit) {
      return null;
    }
    return {
      from: word ? word.from : cx.pos,
      options: snippets.concat(list.map((w) => ({ label: w }))),
      span: /\w*/
    };
  };
}

export default function () {
  // const allWords = Object.values(words).reduce((acc, row) => acc.concat(row), []);
  return autocompletion({
    activateOnTyping: true,
    override: [from(words)]
  });
}
