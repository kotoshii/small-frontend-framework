import { VDOMNodeType } from '~constants/vdom';
import { ComparatorFn } from '~types/ComparatorFn';
import { ArraysDiff, ArraysDiffOp } from '~types/reconciliation/ArraysDiff';
import { ObjectsDiff } from '~types/reconciliation/ObjectsDiff';
import { SFFVDOMNode } from '~types/vdom/SFFVDOMNode';
import { ArrayWithOriginalIndices } from '~utils/reconciliation/ArrayWithOriginalIndices';

export function objectsDiff(
  oldObj: Record<string, any>,
  newObj: Record<string, any>,
): ObjectsDiff {
  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);

  return {
    added: newKeys.filter((key) => !(key in oldObj)),
    removed: oldKeys.filter((key) => !(key in newObj)),
    updated: newKeys.filter(
      (key) => key in oldObj && oldObj[key] !== newObj[key],
    ),
  };
}

export function arraysDiff<T>(oldArray: T[], newArray: T[]): ArraysDiff {
  return {
    added: newArray.filter((newItem) => !oldArray.includes(newItem)),
    removed: oldArray.filter((oldItem) => !newArray.includes(oldItem)),
  };
}

export function nodesEqual(nodeOne: SFFVDOMNode, nodeTwo: SFFVDOMNode) {
  if (nodeOne.type !== nodeTwo.type) {
    return false;
  }

  if (
    nodeOne.type === VDOMNodeType.ELEMENT &&
    nodeTwo.type === VDOMNodeType.ELEMENT
  ) {
    return nodeOne.tag === nodeTwo.tag;
  }

  return true;
}

export function arraysDiffSequence<T = any>(
  oldArray: T[],
  newArray: T[],
  equalsFn: ComparatorFn = (a, b) => a === b,
) {
  const sequence: ArraysDiffOp<T>[] = [];
  const array = new ArrayWithOriginalIndices(oldArray, equalsFn);

  for (let index = 0; index < newArray.length; index++) {
    if (array.isRemoval(index, newArray)) {
      sequence.push(array.removeItem(index));
      index--;
      continue;
    }

    if (array.isNoop(index, newArray)) {
      sequence.push(array.noopItem(index));
      continue;
    }

    const item = newArray[index];
    if (array.isAddition(item, index)) {
      sequence.push(array.addItem(item, index));
      continue;
    }

    sequence.push(array.moveItem(item, index));
  }

  sequence.push(...array.removeItemsAfter(newArray.length));

  return sequence;
}
