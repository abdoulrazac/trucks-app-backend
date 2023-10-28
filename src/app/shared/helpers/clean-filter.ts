export function cleanFilter<T>(filter: T): T {
  const cleanFilter = { ...filter };

  for (const key in cleanFilter) {
    const field = cleanFilter[key as keyof T];
    if (
      field !== undefined &&
      typeof field !== "boolean" &&
      !Array.isArray(field) &&
      String(field).length < 3
    ) {
      delete cleanFilter[key as keyof T];
    }
  }

  return cleanFilter;
}
