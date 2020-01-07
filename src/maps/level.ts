export const PATH_INDEX = 26

const X = 65
const O = PATH_INDEX

export const generateLevel = () => [
  [O, O, X, X, X, X, X, X, X, X, X],
  [X, O, X, O, O, O, X, O, O, O, O],
  [X, O, O, O, O, O, X, O, X, O, O],
  [X, X, X, O, O, O, X, O, X, O, O],
  [X, O, O, O, O, O, X, O, X, X, X],
  [X, O, X, X, X, X, X, O, O, O, O],
  [X, O, O, X, O, O, X, X, O, X, O],
  [X, X, O, O, O, O, O, X, O, O, O],
  [O, O, O, X, O, X, X, X, X, O, X],
  [X, O, O, X, O, O, O, O, O, O, X],
  [X, X, O, O, O, X, X, X, X, X, X],
]
