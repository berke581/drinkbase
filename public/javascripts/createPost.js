$(function () {
  $.import_js('/javascripts/utils/toast.js')
  $.import_js('/javascripts/utils/editor.js')
  const editor = createEditor('body')

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
        $('#crop-modal').modal({
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
  $('#crop-modal').on($.modal.OPEN, function (event, modal) {
    if (cropper) {
      cropper.destroy()
    }
    cropper = useCropper()
    cropper.replace(imageUrl)
  })

  // POST FORM
  $('.form').submit(async function (e) {
    e.preventDefault()

    // client side form validation
    let errorEncountered = false
    let outputData
    try {
      outputData = await editor.save()

      let errorItem = null
      if ($('#title').val() === '') {
        $('#title').addClass('input--invalid')
        errorEncountered = true
        if (!errorItem) {
          errorItem = $('#title')
        }
      } else {
        $('#title').removeClass('input--invalid')
      }
      if (outputData.blocks.length === 0) {
        $('#body').addClass('input--invalid')
        errorEncountered = true
        if (!errorItem) {
          errorItem = $('#body')
        }
      } else {
        $('#body').removeClass('input--invalid')
      }
      if (!$('#file-upload').val()) {
        if (!errorEncountered) {
          return toastError('Please select an image.')
        }
        errorEncountered = true
      }

      if (errorEncountered) {
        if (errorItem) {
          errorItem.focus()
        }

        return toastError('Please fill the form.')
      }
    } catch (err) {
      return toastError('Error while saving recipe.')
    }

    if (errorEncountered) {
      return
    }

    const formData = new FormData($('.form')[0])

    if (!croppedCanvas) {
      return toastError('Error while cropping the image.')
    }

    croppedCanvas.toBlob((blob) => {
      formData.set('image', blob)

      formData.set('body', JSON.stringify(outputData))

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
          sessionStorage.setItem('toastMessage', response.message)
          $(window)[0].location.replace('/')
        },
        error: function (data) {
          const response = data.responseJSON

          if (response.redirect) {
            $(window)[0].location.replace(response.redirect)
          } else {
            toastError(response.message)
          }
        },
        complete: function () {
          $('#submit-post').prop('disabled', false)
        },
      })
    }, $('#file-upload')[0].files[0].type) // set file type to be the same as the initial type
  })
})
