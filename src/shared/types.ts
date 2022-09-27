// https://stackoverflow.com/questions/56419558/typescript-how-to-use-a-generic-parameter-as-object-key
// TODO: try to improve this
export type PopulateField<T, K extends string, U> = Omit<T, K> & {
  [key in K]: U
}
