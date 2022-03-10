import { map, replicate } from 'fp-ts/Array'
import { constant, pipe } from 'fp-ts/function'
import { puzzleToBoard } from './puzzleToBoard'
import { Board } from '../types'

export const clearBoard: Board = pipe(
  replicate(9, 0),
  map(constant(replicate(9, 0))),
  puzzleToBoard
)
