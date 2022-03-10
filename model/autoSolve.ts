import { anyPass, lensEq, mapWhen } from 'fns'
import { lookup, modifyAt } from 'fp-ts/Array'
import { constant, identity, flow, pipe } from 'fp-ts/function'
import { Eq as nEq } from 'fp-ts/number'
import { fold as optFold } from 'fp-ts/Option'
import {
  valueLens,
  rowLens,
  colLens,
  regLens,
  selectedLens,
  highlightedLens
} from '../optics'
import { Board, Mutation } from '../types'

type AutoSolve = Mutation<Board, { ind: number; value: number }>
export const autoSolve: AutoSolve = (board, { ind, value }) => {
  const { row, col, reg } = pipe(
    board,
    lookup(ind),
    optFold(constant({ row: 0, col: 0, reg: 0 }), identity)
  )

  return pipe(
    board,
    modifyAt(
      ind,
      flow(
        valueLens.set(value),
        highlightedLens.set(true),
        selectedLens.set(false)
      )
    ),
    optFold(
      constant(board),
      mapWhen(
        anyPass([
          lensEq(rowLens, row)(nEq),
          lensEq(colLens, col)(nEq),
          lensEq(regLens, reg)(nEq)
        ]),
        selectedLens.set(false)
      )
    )
  )
}
