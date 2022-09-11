$(function () {
  $('#logout-link').on('click', function (e) {
    e.preventDefault() // cancel the link itself
    $.post(this.href).done(() => {
      $(window)[0].location.replace('/')
    })
  })
})
