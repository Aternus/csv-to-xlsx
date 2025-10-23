export async function measure<T>(name: string, fn: () => T | Promise<T>) {
  performance.mark(`${name}:start`);
  const result = await fn();
  performance.mark(`${name}:end`);

  const measure = performance.measure(name, `${name}:start`, `${name}:end`);
  performance.clearMarks(`${name}:start`);
  performance.clearMarks(`${name}:end`);
  performance.clearMeasures(name);

  return {
    result,
    measure,
  };
}
