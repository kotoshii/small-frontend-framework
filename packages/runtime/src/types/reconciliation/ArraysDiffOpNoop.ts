import { ArrayDiffOpType } from '~constants/reconciliation';

export interface ArraysDiffOpNoop<T = any> {
  op: ArrayDiffOpType.NOOP;
  originalIndex: number;
  index: number;
  item: T;
}
