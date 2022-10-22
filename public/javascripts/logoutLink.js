$(function () {
  $.import_js('/javascripts/utils/toast.js')

  $('#logout-link').on('click', function (e) {
    e.preventDefault() // cancel the link itself
    $.post(this.href)
      .done(() => {
        $(window)[0].location.replace('/')
      })
      .fail((data) => {
        const response = data.responseJSON
        toastError(response.message)
      })
  })
})
