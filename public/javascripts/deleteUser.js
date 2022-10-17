$(function () {
  $('#delete-user').on('click', function (e) {
    e.preventDefault() // prevent default behavior
    $.ajax({
      url: '/user/delete',
      method: 'DELETE',
      success: function () {
        $(window)[0].location.replace('/')
      },
      error: function (data) {
        const response = data.responseJSON
        toastr.error(response.message || 'An error has occurred.', 'Error', {
          timeOut: 3000,
          preventDuplicates: true,
          positionClass: 'toast-top-right',
          progressBar: true,
        })
      },
    })
  })
})
