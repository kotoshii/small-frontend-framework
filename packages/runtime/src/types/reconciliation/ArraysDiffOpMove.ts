import { ArrayDiffOpType } from '~constants/reconciliation';

export interface ArraysDiffOpMove<T = any> {
  op: ArrayDiffOpType.MOVE;
  originalIndex: number;
  from: number;
  index: number;
  item: T;
}
