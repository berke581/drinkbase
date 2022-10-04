$(document).ready(function () {
  // highlight current page
  $("a[href='" + location.pathname + "']").addClass('btn--nav--current-page')

  // set loading indicator
  $(document)
    .ajaxStart(function () {
      $('body').addClass('page-loading')
    })
    .ajaxStop(function () {
      $('body').removeClass('page-loading')
    })
})
