function createEditor(id) {
  return new EditorJS({
    holder: id,
    tools: {
      header: {
        class: Header,
        inlineToolbar: true,
        config: {
          levels: [1, 2, 3],
          defaultLevel: 2,
        },
      },
      delimiter: {
        class: Delimiter,
        inlineToolbar: true,
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
      },
      underline: {
        class: Underline,
        inlineToolbar: true,
      },
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: 'unordered',
        },
      },
      marker: {
        class: Marker,
        inlineToolbar: true,
      },
    },
    minHeight: 100,
    logLevel: 'ERROR',
  })
}
