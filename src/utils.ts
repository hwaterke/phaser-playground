/**
 * Returns a random int between from (inclusive) and to (exclusive)
 */
export const rand = (from: number, to: number) => {
  return Math.floor(Math.random() * (to - from)) + from
}

export const sampleFromArray = <T>(array: T[]): T => {
  const index = rand(0, array.length)
  return array[index]
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = rand(0, i)
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}
