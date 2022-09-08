export interface IGenericRepository<T> {
  find(item: T): Promise<T[]>
  findOne(item: Partial<T>): Promise<T | null>
  findById(id: string): Promise<T | null>
  create(item: T): Promise<T>
  update(id: string, item: Partial<T>): Promise<T | null>
  delete(id: string): Promise<boolean>
}
