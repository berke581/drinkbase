import { ValidationError } from 'joi'

export function formatJoiValidationErrors(error: ValidationError) {
  return error?.details?.map((error) => error.message) || []
}
