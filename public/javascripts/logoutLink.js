$(function () {
  $('#logout-link').on('click', function (e) {
    e.preventDefault() // cancel the link itself
    $.post(this.href)
      .done(() => {
        $(window)[0].location.replace('/')
      })
      .fail((data) => {
        const response = data.responseJSON
        toastr.error(response.message || 'An error has occurred.', 'Error', {
          timeOut: 3000,
          preventDuplicates: true,
          positionClass: 'toast-top-right',
          progressBar: true,
        })
      })
  })
})
