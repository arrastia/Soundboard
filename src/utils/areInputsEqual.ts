export function areInputsEqual(newInputs: any[], lastInputs: any[]) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (let i = 0; i < newInputs.length; i++) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }
  return true;
}
