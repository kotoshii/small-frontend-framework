import { ArraysDiffOpAdd } from '~types/reconciliation/ArraysDiffOpAdd';
import { ArraysDiffOpMove } from '~types/reconciliation/ArraysDiffOpMove';
import { ArraysDiffOpNoop } from '~types/reconciliation/ArraysDiffOpNoop';
import { ArraysDiffOpRemove } from '~types/reconciliation/ArraysDiffOpRemove';

export type ArraysDiffOp =
  | ArraysDiffOpRemove
  | ArraysDiffOpNoop
  | ArraysDiffOpAdd
  | ArraysDiffOpMove;
