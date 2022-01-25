import { autocompletion, CompletionSource, snippet } from '@codemirror/autocomplete';
import words, { preCompletions } from './autocomplete-words';
import { trackEvent } from '../../../../../utils/analytics';

function from(list: string[]): CompletionSource {
  return (cx) => {
    const word = cx.matchBefore(/\w+$/);
    if (!word && !cx.explicit) {
      return null;
    }
    function apply(template: string) {
      const snipBind = snippet(template);
      return function snippetCatcher(view, completion, from, to) {
        trackEvent({ eventName: 'ac', context: completion.shortLabel || completion.label });
        snipBind(view, completion, from, to);
      };
    }
    return {
      from: word ? word.from : cx.pos,
      options: ([] as any)
        .concat(preCompletions.map((comp) => ({ ...comp, apply: apply(comp.template) })))
        .concat(list.map((label) => ({ label, apply: apply(label) }))),
      span: /\w*/
    };
  };
}

export default function () {
  return autocompletion({
    activateOnTyping: true,
    override: [from(words)]
  });
}
