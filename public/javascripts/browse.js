$(function () {
  $.import_js('/javascripts/utils/toast.js')

  // show toast messages from created post
  const msg = sessionStorage.getItem('toastMessage')
  if (msg) {
    toastSuccess(msg)
    sessionStorage.removeItem('toastMessage')
  }

  const favoritedClass = 'fa-solid fa-heart'
  const unFavoritedClass = 'fa-regular fa-heart'

  $('.favorite-button').on('click', function () {
    $.post('/posts/favorite', { post_id: this.dataset.postId })
      .done((data) => {
        const { favorited, favorited_count } = data

        if (favorited) {
          $(this).find('i').attr('class', favoritedClass)
        } else {
          $(this).find('i').attr('class', unFavoritedClass)
        }

        $(this).find('.favorited-count').text(favorited_count)
      })
      .fail((data) => {
        const response = data.responseJSON
        toastError(response.message)
      })
  })
})
