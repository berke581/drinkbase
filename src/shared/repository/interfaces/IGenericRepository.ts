export interface IGenericRepository<T, TID> {
  find(item: T): Promise<T[]>
  findOne(item: Partial<T>): Promise<T | null>
  findById(id: TID): Promise<T | null>
  create(item: T): Promise<T>
  update(id: TID, item: Partial<T>): Promise<T | null>
  delete(id: TID): Promise<boolean>
}
