$(function () {
  let cropper
  let imageUrl
  let croppedCanvas

  $('.modal-drinkbase #crop-button').on('click', function () {
    if (!cropper) {
      return
    }

    croppedCanvas = cropper.getCroppedCanvas()

    $.modal.close()
  })

  // SET IMAGE TO CROP AND OPEN MODAL
  $('#file-upload').on('change', function (input) {
    if (input.target && input.target.files && input.target.files[0]) {
      var reader = new FileReader()

      reader.onload = function (e) {
        imageUrl = e.target.result
        $('#crop-image').attr('src', imageUrl).width(150).height(200)

        // open crop image modal
        $('#login-modal').modal({
          escapeClose: false,
          clickClose: false,
        })
      }

      reader.readAsDataURL(input.target.files[0])
    }
  })

  // CROPPER CONFIG
  function useCropper() {
    $('#crop-image').cropper({
      aspectRatio: 4 / 3,
      crop: function (event) {
        // SET PREVIEW IMAGE
        const el = cropper.getCroppedCanvas()
        el.id = 'preview-image'
        $('#preview-image').replaceWith(el)
      },
    })

    // Get the Cropper.js instance after initialized
    return $('#crop-image').data('cropper')
  }

  // USE CROPPER ON MODAL OPEN, AFTER DESTROYING IT IF THERE IS ALREADY A CROPPER INSTANCE
  $('#login-modal').on($.modal.OPEN, function (event, modal) {
    if (cropper) {
      cropper.destroy()
    }
    cropper = useCropper()
    cropper.replace(imageUrl)
  })

  // POST FORM
  $('.form').submit(function (e) {
    e.preventDefault()

    const formData = new FormData($('.form')[0])

    if (!croppedCanvas) {
      return toastr.error('Error while cropping the image.', 'Error', {
        timeOut: 3000,
        preventDuplicates: true,
        positionClass: 'toast-top-right',
        progressBar: true,
      })
    }

    croppedCanvas.toBlob((blob) => {
      formData.set('image', blob)

      $('#submit-post').prop('disabled', true)
      $.ajax({
        method: 'POST',
        processData: false,
        cache: false,
        contentType: false,
        data: formData,
        enctype: 'multipart/form-data',
        url: this.action,
        success: function (response) {
          toastr.success(response.message, 'Success', {
            timeOut: 3000,
            preventDuplicates: true,
            positionClass: 'toast-top-right',
            progressBar: true,
            // Redirect
            onHidden: function () {
              window.location.replace('/')
            },
          })
        },
        error: function (data) {
          const response = data.responseJSON
          toastr.error(response.message, 'Error', {
            timeOut: 3000,
            preventDuplicates: true,
            positionClass: 'toast-top-right',
            progressBar: true,
          })
        },
        complete: function () {
          $('#submit-post').prop('disabled', false)
        },
      })
    }, $('#file-upload')[0].files[0].type) // set file type to be the same as the initial type
  })
})
