import { ArrayDiffOpType } from '~constants/reconciliation';

export interface ArraysDiffOpRemove<T = any> {
  op: ArrayDiffOpType.REMOVE;
  index: number;
  item: T;
}
