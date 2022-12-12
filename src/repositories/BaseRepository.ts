import { IRead } from './IRead';
import { IWrite } from './IWrite';
import { Model, FilterQuery } from 'mongoose';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  public readonly _collection: Model<T>;
  constructor(model: Model<T>) {
    this._collection = model;
  }

  async findAll(): Promise<T[]> {
    const result = await this._collection.find();
    return result;
  }

  async find(filterQuery: FilterQuery<T>, selectOption?: string): Promise<T[]> {
    const result = await this._collection
      .find(filterQuery)
      .select(selectOption);
    return result;
  }
  async findOne(id: string, selectOption?: string): Promise<T> {
    const result = await this._collection.findOne({ id }).select(selectOption);
    return result as T;
  }

  async findOneByCondition(
    filterQuery: FilterQuery<T>,
    selectOption?: string,
  ): Promise<T> {
    try {
      const result = await this._collection
        .findOne(filterQuery)
        .select(selectOption);
      return result as T;
    } catch (error) {
      throw new Error('Read Failed');
    }
  }
  async create(item: T | any): Promise<T> {
    try {
      const model = new this._collection(item);
      await model.save();
      return model;
    } catch (error) {
      throw new Error('Create Failed');
    }
  }
  async update(id: string, newItem: T | any): Promise<T> {
    try {
      const update = { $set: { ...newItem } };

      const modifiedItem = await this._collection.findByIdAndUpdate(
        id,
        update,
        { returnOriginal: false },
      );

      return modifiedItem as T;
    } catch (error) {
      console.error(error);
      throw new Error('Update Failed');
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      await this._collection.findOneAndDelete({ _id: id });
      return true;
    } catch (error) {
      return false;
    }
  }
}
