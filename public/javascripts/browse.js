$(function () {
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
        toastr.error('An error has occurred.', 'Error', {
          timeOut: 3000,
          preventDuplicates: true,
          positionClass: 'toast-top-right',
          progressBar: true,
        })
      })
  })
})
