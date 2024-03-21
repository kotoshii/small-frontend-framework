import { ArrayDiffOpType } from '~constants/reconciliation';

export interface ArraysDiffOpAdd<T = any> {
  op: ArrayDiffOpType.ADD;
  index: number;
  item: T;
}
