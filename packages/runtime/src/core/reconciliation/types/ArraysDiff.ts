import { ArrayDiffOpType } from '~core/reconciliation/constants/ArrayDiffOpType';

export interface ArraysDiff<T> {
  added: T[];
  removed: T[];
}

export type ArraysDiffOp<T> =
  | ArraysDiffOpRemove<T>
  | ArraysDiffOpNoop<T>
  | ArraysDiffOpAdd<T>
  | ArraysDiffOpMove<T>;

export interface ArraysDiffOpAdd<T> {
  op: ArrayDiffOpType.ADD;
  index: number;
  item: T;
}

export interface ArraysDiffOpMove<T> {
  op: ArrayDiffOpType.MOVE;
  originalIndex: number;
  from: number;
  index: number;
  item: T;
}

export interface ArraysDiffOpNoop<T> {
  op: ArrayDiffOpType.NOOP;
  originalIndex: number;
  index: number;
  item: T;
}

export interface ArraysDiffOpRemove<T> {
  op: ArrayDiffOpType.REMOVE;
  index: number;
  item: T;
}
