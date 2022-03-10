import { when } from 'fns'
import { map, modifyAt } from 'fp-ts/Array'
import { constant, identity, flow, pipe } from 'fp-ts/function'
import { fold as optFold } from 'fp-ts/Option'
import { selectedLens, highlightedLens } from '../optics'
import { Board, Mutation } from '../types'

type SelectCell = Mutation<Board, { ind: number; shouldClear: boolean }>
export const selectCell: SelectCell = (board, { ind, shouldClear }) =>
  pipe(
    board,
    map(
      flow(
        highlightedLens.set(false),
        when(constant(shouldClear), selectedLens.set(false))
      )
    ),
    modifyAt(ind, selectedLens.set(true)),
    optFold(constant(board), identity)
  )
