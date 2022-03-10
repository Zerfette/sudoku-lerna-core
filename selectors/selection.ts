import { lensEq } from 'fns'
import { filter, isEmpty } from 'fp-ts/Array'
import { Eq as bEq } from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import { none, Option, some } from 'fp-ts/Option'
import { selectedLens } from '../optics'
import { Board, Cell } from '../types'

type GetSelectedOption = (board: Board) => Option<Cell[]>
export const getSelectedOption: GetSelectedOption = board => {
  const selection = pipe(board, filter(lensEq(selectedLens, true)(bEq)))
  return isEmpty(selection) ? none : some(selection)
}
