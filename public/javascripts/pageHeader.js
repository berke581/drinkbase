$(function () {
  const searchQuery = new URLSearchParams(window.location.search)

  $('#search').on(
    'input',
    $.debounce(250, function (e) {
      if (!e.currentTarget.value) {
        $('#clear-filters').prop('disabled', true)
      } else {
        $('#clear-filters').prop('disabled', false)
      }
    }),
  )

  $('#clear-filters').on('click', function (e) {
    e.preventDefault()

    if (searchQuery.has('search')) {
      window.location.replace('/')
    } else {
      $('#search').val('')
      $('#search').trigger('input')
    }
  })

  $('#prev-page').on('click', function (e) {
    e.preventDefault()

    if (!searchQuery.has('page')) {
      return
    }

    searchQuery.set('page', Number(searchQuery.get('page')))

    if (searchQuery.get('page') > 1) {
      searchQuery.set('page', searchQuery.get('page') - 1)
      window.location.replace(`/posts/browse?${searchQuery.toString()}`)
    }
  })

  $('#next-page').on('click', function (e) {
    e.preventDefault()

    if (!searchQuery.has('page')) {
      searchQuery.set('page', 1)
    }

    searchQuery.set('page', Number(searchQuery.get('page')) + 1)
    window.location.replace(`/posts/browse?${searchQuery.toString()}`)
  })

  $('#search').val(searchQuery.get('search'))
  $('#search').trigger('input')
})
