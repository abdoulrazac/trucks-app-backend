export function toSelectOption(list: []) {
  let options = [];
  for (const k in list) {
    options.push({ [k]: k });
  }
  return options;
}
