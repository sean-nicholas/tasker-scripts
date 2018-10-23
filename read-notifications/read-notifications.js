const splitter = '__JOIN__'
const names = anapp.split(splitter)
const titles = antitle.split(splitter)
const texts = antext.split(splitter)
const textlines = antextbig.split(splitter)

var say = texts
  .map((_, index) => ([names[index], titles[index], texts[index], textlines[index]]))
  .map(props => props.map(prop => (prop || '').startsWith('%an')
    ? null
    : prop
  ))
  .reduce((aggr, props) => {
    const [name, title, text, lines] = props
    const [prevName, prevTitle] = aggr.prev
    const aggrText = []

    const content = lines || text
    if (!content) return aggr

    if (name && name !== prevName) aggrText.push(name)
    if (title && title !== prevTitle) aggrText.push(title)
    aggrText.push(content)

    return {
      text: [
        ...aggr.text,
        aggrText.join(': ')
      ],
      prev: props
    }
  }, { text: '', prev: ['', ''] })
  .text.join('. ') || 'Keine Benachrichtigungen'