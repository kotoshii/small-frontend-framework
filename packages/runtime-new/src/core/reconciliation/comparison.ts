import { ArrayWithOriginalIndexes } from '~core/reconciliation/ArrayWithOriginalIndexes';
import {
  ArraysDiff,
  ArraysDiffOp,
} from '~core/reconciliation/types/ArraysDiff';
import { ComparatorFn } from '~core/reconciliation/types/ComparatorFn';
import { ObjectsDiff } from '~core/reconciliation/types/ObjectsDiff';
import { VDOMNodeType } from '~core/vdom/constants/VDOMNodeType';
import { SFFElement } from '~core/vdom/types/SFFElement';

export function objectsDiff(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): ObjectsDiff {
  const oldKeys = Object.keys(obj1);
  const newKeys = Object.keys(obj2);

  return {
    added: newKeys.filter((key) => !(key in obj1)),
    removed: oldKeys.filter((key) => !(key in obj2)),
    updated: newKeys.filter((key) => key in obj1 && obj1[key] !== obj2[key]),
  };
}

export function arraysDiff<T>(array1: T[], array2: T[]): ArraysDiff<T> {
  return {
    added: array2.filter((newItem) => !array1.includes(newItem)),
    removed: array1.filter((oldItem) => !array2.includes(oldItem)),
  };
}

export function nodesEqual(node1: SFFElement, node2: SFFElement) {
  if (node1.type !== node2.type) {
    return false;
  }

  if (
    node1.type === VDOMNodeType.ELEMENT &&
    node2.type === VDOMNodeType.ELEMENT
  ) {
    return node1.tag === node2.tag;
  }

  if (
    node1.type === VDOMNodeType.COMPONENT &&
    node2.type === VDOMNodeType.COMPONENT
  ) {
    return (
      node1.componentClass === node2.componentClass &&
      node1.props.key === node2.props.key
    );
  }

  return true;
}

export function arraysDiffSequence<T>(
  oldArray: T[],
  newArray: T[],
  equalsFn: ComparatorFn<T> = (a, b) => a === b,
) {
  const sequence: ArraysDiffOp<T>[] = [];
  const array = new ArrayWithOriginalIndexes(oldArray, equalsFn);

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
