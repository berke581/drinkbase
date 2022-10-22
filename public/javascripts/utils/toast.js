function toastSuccess(content) {
  return toastr.success(content || 'Action successful.', 'Success', {
    timeOut: 3000,
    preventDuplicates: true,
    positionClass: 'toast-top-right',
    progressBar: true,
  })
}

function toastError(content) {
  return toastr.error(content || 'An error has occurred.', 'Error', {
    timeOut: 3000,
    preventDuplicates: true,
    positionClass: 'toast-top-right',
    progressBar: true,
  })
}
