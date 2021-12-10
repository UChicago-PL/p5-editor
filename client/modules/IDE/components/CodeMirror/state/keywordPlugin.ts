import {
  Decoration,
  DecorationSet,
  EditorView,
  MatchDecorator,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view"

export type Keywords = { [key: string]: string[] }

export const keywordPlugin = (keywords: Keywords) =>
  Object.entries(keywords).map(([name, keywords]) =>
    ViewPlugin.fromClass(
      class {
        decorations: DecorationSet
        matchDecorator: MatchDecorator

        constructor(view: EditorView) {
          this.matchDecorator = new MatchDecorator({
            regexp: new RegExp(`(${keywords.join("|")})`, "g"),
            decoration: Decoration.mark({ class: `keyword-${name}` }),
          })
          this.decorations = this.matchDecorator.createDeco(view)
        }

        update(update: ViewUpdate) {
          if (update.docChanged || update.viewportChanged)
            this.decorations = this.matchDecorator.updateDeco(
              update,
              this.decorations,
            )
        }
      },
      {
        decorations: (v) => v.decorations,
      },
    ),
  )
