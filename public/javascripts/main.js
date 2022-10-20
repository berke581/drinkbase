$(document).ready(function () {
  ;(function ($) {
    /*
     * $.import_js() helper (for JavaScript importing within JavaScript code).
     */
    var import_js_imported = []

    $.extend(true, {
      import_js: function (script) {
        var found = false
        for (var i = 0; i < import_js_imported.length; i++)
          if (import_js_imported[i] == script) {
            found = true
            break
          }

        if (found == false) {
          $('head').append($('<script></script').attr('src', script))
          import_js_imported.push(script)
        }
      },
    })
  })(jQuery)

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
