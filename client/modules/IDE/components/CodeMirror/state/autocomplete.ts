import { autocompletion, CompletionSource } from '@codemirror/autocomplete';

// // got this by running yarn grunt yui in the p5.js repo
// import paramaterData from '../assets/paramData';

// // const elements: any = [];
// // function parseParameterData(input: any) {
// //   if (Array.isArray(input)) {
// //     input.forEach(parseParameterData);
// //     return;
// //   }
// //   const isObj = typeof input === 'object';
// //   if (isObj && input.description) {
// //     elements.push(input);
// //     return;
// //   }
// //   if (isObj) {
// //     Object.values(input).forEach(parseParameterData);
// //   }
// // }
// // parseParameterData(paramaterData);
// // console.log(paramaterData);

// const p5Descriptions = Object.entries(paramaterData.p5).reduce(
//   (acc: any, [name, description]: [string, any]) => {
//     //   if (description.params) {

//     //   }
//     if (description.module) {
//       acc[name] = `From the p5 ${description.module} module`;
//     }
//     return acc;
//   },
//   {}
// );

function from(list: string[]): CompletionSource {
  //   console.log('here???');
  return (cx) => {
    console.log('???', cx);
    const word = cx.matchBefore(/\w+$/);
    console.log(word);
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
  return autocompletion({
    // activateOnTyping: true,
    override: [from(allWords)]
    // override: ['fuck you']
  });
}
