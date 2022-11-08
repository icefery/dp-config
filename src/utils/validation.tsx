export function and(conditions: boolean[]): boolean {
  return conditions.reduce((final, current) => final && current, true)
}

export function or(conditions: boolean[]): boolean {
  return conditions.reduce((final, current) => final || current, false)
}
