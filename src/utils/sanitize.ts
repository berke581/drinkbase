import sanitizeHtml from 'sanitize-html'
import { Body } from '@src/modules/post/IPost'

function sanitize(dirty: string) {
  return sanitizeHtml(dirty, {
    allowedTags: ['b', 'i', 'u', 'a', 'mark'],
    disallowedTagsMode: 'escape',
  })
}

export function sanitizeEditorJSON(dirtyObj: Body) {
  const { blocks } = dirtyObj

  // TODO: improve below
  blocks.forEach((block) => {
    switch (block.type) {
      case 'paragraph':
      case 'header':
        if (block.data?.text) {
          block.data.text = sanitize(block.data.text)
        }
        break
      case 'list':
        if (block.data?.items) {
          block.data.items.forEach((item) => (item = sanitize(item)))
        }
        break
      default:
        if (block.data?.text) {
          block.data.text = sanitize(block.data.text)
        }
        break
    }
  })

  return dirtyObj
}
