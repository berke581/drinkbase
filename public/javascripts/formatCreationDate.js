$('#created_at').text(function (_index, content) {
  return moment(content).format('DD.MM.YYYY HH:mm')
})
