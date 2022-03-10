import { lengthIs, lensEq } from 'fns'
import { elem, filter, map, uniq } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { range } from 'fp-ts/NonEmptyArray'
import { Eq as nEq } from 'fp-ts/number'
import { fold } from 'fp-ts/Option'
import { Lens } from 'monocle-ts'
import { getSelectedOption } from './selection'
import { valueLens, rowLens, colLens, regLens } from '../optics'
import { Board, Cell } from '../types'
import { isValidPlacement } from '../'

export const getAvailableValues = (board: Board) =>
  pipe(
    board,
    getSelectedOption,
    fold(
      () => ({ row: [], col: [], reg: [], cell: [] }),
      selection => {
        const singleSelected = lengthIs(1)(selection)
        const [head] = selection
        const isValid = (x: number) => isValidPlacement(board)(x)(head)

        const shouldCalcAvailables = (lens: Lens<Cell, number>) =>
          pipe(selection, map(lens.get), uniq(nEq), lengthIs(1))

        const section = (lens: Lens<Cell, number>) =>
          pipe(
            board,
            filter(lensEq(lens, lens.get(head))(nEq)),
            map(valueLens.get)
          )

        const conflicts = (lens: Lens<Cell, number>) => (x: number) =>
          !pipe(section(lens), elem(nEq)(x))

        const calcAvailables = (lens: Lens<Cell, number>) =>
          shouldCalcAvailables(lens)
            ? pipe(range(1, 9), filter(conflicts(lens)))
            : []

        return {
          cell: singleSelected ? pipe(range(1, 9), filter(isValid)) : [],
          row: calcAvailables(rowLens),
          col: calcAvailables(colLens),
          reg: calcAvailables(regLens)
        }
      }
    )
  )
