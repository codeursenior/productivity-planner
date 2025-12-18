const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: string | null;
  protected props: T;

  constructor(props: T, id?: string) {
    this._id = id || null;
    this.props = props;
  }

  isEmpty() {
    return this._id === null;
  }

  equals(object: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }
}
