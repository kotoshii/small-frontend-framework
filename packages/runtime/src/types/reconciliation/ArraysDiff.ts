import { ArrayDiffOpType } from '~constants/reconciliation';

export interface ArraysDiff<T = any> {
  added: T[];
  removed: T[];
}

export type ArraysDiffOp =
  | ArraysDiffOpRemove
  | ArraysDiffOpNoop
  | ArraysDiffOpAdd
  | ArraysDiffOpMove;

export interface ArraysDiffOpAdd<T = any> {
  op: ArrayDiffOpType.ADD;
  index: number;
  item: T;
}

export interface ArraysDiffOpMove<T = any> {
  op: ArrayDiffOpType.MOVE;
  originalIndex: number;
  from: number;
  index: number;
  item: T;
}

export interface ArraysDiffOpNoop<T = any> {
  op: ArrayDiffOpType.NOOP;
  originalIndex: number;
  index: number;
  item: T;
}

export interface ArraysDiffOpRemove<T = any> {
  op: ArrayDiffOpType.REMOVE;
  index: number;
  item: T;
}
