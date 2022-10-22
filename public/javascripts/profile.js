$(function () {
  $.import_js('/javascripts/utils/toast.js')

  $('#delete-user').on('click', function (e) {
    e.preventDefault() // prevent default behavior

    $('#delete-modal').modal()
  })

  $('.modal-drinkbase #confirm-delete').on('click', function (e) {
    e.preventDefault()

    $.ajax({
      url: '/user/delete',
      method: 'DELETE',
      success: function () {
        sessionStorage.setItem('toastMessage', 'Account deleted.')
        $(window)[0].location.replace('/')
      },
      error: function (data) {
        const response = data.responseJSON
        toastError(response.message)
      },
      complete: function () {
        $.modal.close()
      },
    })
  })

  $('.modal-drinkbase #cancel-delete').on('click', function (e) {
    e.preventDefault()

    $.modal.close()
  })
})
