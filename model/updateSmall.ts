import { ifElse, lensEq, mapWhen } from 'fns'
import { difference, elem, getMonoid, sort } from 'fp-ts/Array'
import { Eq as bEq, fold as bFold } from 'fp-ts/boolean'
import { constant, pipe } from 'fp-ts/function'
import { Eq as nEq, Ord as nOrd } from 'fp-ts/number'
import { Lens } from 'monocle-ts'
import { selectedLens } from '../optics'
import { Board, Cell, Mutation, Smalls } from '../types'

type Payload = {
  lens: Lens<Cell, Smalls>
  value: number
}
type UpdateSmall = Mutation<Board, Payload>
export const updateSmall: UpdateSmall = (board, { lens, value }) =>
  pipe(
    board,
    mapWhen(
      lensEq(selectedLens, true)(bEq),
      ifElse(constant(nEq.equals(value, 0)), lens.set([]), cell =>
        pipe(
          cell,
          lens.get,
          elem(nEq)(value),
          bFold(
            constant(
              lens.set(
                pipe(
                  getMonoid<number>().concat(lens.get(cell), [value]),
                  sort(nOrd)
                )
              )(cell)
            ),
            constant(
              lens.set(pipe(lens.get(cell), difference(nEq)([value])))(cell)
            )
          )
        )
      )
    )
  )
