$(function () {
  $('#delete-user').on('click', function (e) {
    e.preventDefault() // prevent default behavior
    $.post('/user/delete').done(() => {
      $(window)[0].location.replace('/')
    })
  })
})
