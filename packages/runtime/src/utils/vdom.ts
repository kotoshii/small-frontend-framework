import { _SFFElementTruthy, SFFElement } from '~types/SFFElement';

export function isElementFalsy(element: SFFElement) {
  return (
    typeof element === 'undefined' || element === null || element === false
  );
}

export function removeFalsyElements(
  elements: SFFElement[],
): _SFFElementTruthy[] {
  return elements.filter(
    (element) => !isElementFalsy(element),
  ) as _SFFElementTruthy[];
}
