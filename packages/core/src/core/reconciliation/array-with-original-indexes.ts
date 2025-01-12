import { ArrayDiffOpType } from '~core/reconciliation/constants/ArrayDiffOpType';
import {
  ArraysDiffOpAdd,
  ArraysDiffOpMove,
  ArraysDiffOpNoop,
  ArraysDiffOpRemove,
} from '~core/reconciliation/types/ArraysDiff';
import { ComparatorFn } from '~core/reconciliation/types/ComparatorFn';

export class ArrayWithOriginalIndexes<T> {
  private readonly array: T[] = [];
  private readonly originalIndices: number[] = [];
  private readonly equalsFn: ComparatorFn<T>;

  constructor(array: T[], equalsFn: ComparatorFn<T>) {
    this.array = [...array];
    this.originalIndices = array.map((_, i) => i);
    this.equalsFn = equalsFn;
  }

  get length() {
    return this.array.length;
  }

  isRemoval(index: number, newArray: T[]) {
    if (index >= this.length) {
      return false;
    }
    const item = this.array[index];
    const indexInNewArray = newArray.findIndex((newItem) =>
      this.equalsFn(item, newItem),
    );
    return indexInNewArray === -1;
  }

  removeItem(index: number) {
    const operation: ArraysDiffOpRemove<T> = {
      op: ArrayDiffOpType.REMOVE,
      index,
      item: this.array[index],
    };

    this.array.splice(index, 1);
    this.originalIndices.splice(index, 1);

    return operation;
  }

  isNoop(index: number, newArray: T[]) {
    if (index >= this.length) {
      return false;
    }
    const item = this.array[index];
    const newItem = newArray[index];
    return this.equalsFn(item, newItem);
  }

  noopItem(index: number): ArraysDiffOpNoop<T> {
    return {
      op: ArrayDiffOpType.NOOP,
      originalIndex: this.originalIndexAt(index),
      index,
      item: this.array[index],
    };
  }

  isAddition(item: T, fromIdx: number) {
    return this.findIndexFrom(item, fromIdx) === -1;
  }

  addItem(item: T, index: number) {
    const operation: ArraysDiffOpAdd<T> = {
      op: ArrayDiffOpType.ADD,
      index,
      item,
    };

    this.array.splice(index, 0, item);
    this.originalIndices.splice(index, 0, -1);

    return operation;
  }

  moveItem(item: T, toIndex: number) {
    const fromIndex = this.findIndexFrom(item, toIndex);
    const operation: ArraysDiffOpMove<T> = {
      op: ArrayDiffOpType.MOVE,
      originalIndex: this.originalIndexAt(fromIndex),
      from: fromIndex,
      index: toIndex,
      item: this.array[fromIndex],
    };

    const [movedItem] = this.array.splice(fromIndex, 1);
    this.array.splice(toIndex, 0, movedItem);

    const [originalIndex] = this.originalIndices.splice(fromIndex, 1);
    this.originalIndices.splice(toIndex, 0, originalIndex);

    return operation;
  }

  removeItemsAfter(index: number) {
    const operations: ArraysDiffOpRemove<T>[] = [];

    while (this.length > index) {
      operations.push(this.removeItem(index));
    }

    return operations;
  }

  private originalIndexAt(index: number) {
    return this.originalIndices[index];
  }

  private findIndexFrom(item: T, fromIdx: number) {
    for (let i = fromIdx; i < this.length; i++) {
      if (this.equalsFn(item, this.array[i])) {
        return i;
      }
    }
    return -1;
  }
}
