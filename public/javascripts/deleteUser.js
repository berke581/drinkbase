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
        document.write(data.responseText)
      },
    })
  })
})
