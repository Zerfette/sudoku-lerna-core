import { lensEq, mapWhen } from 'fns'
import { Eq as bEq } from 'fp-ts/boolean'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { flow } from 'fp-ts/function'
import {
  valueLens,
  selectedLens,
  highlightedLens,
  lockedLens,
  cornerLens,
  middleLens
} from '../optics'
import { Board } from '../types'

export const resetBoard: Endomorphism<Board> = mapWhen(
  lensEq(lockedLens, false)(bEq),
  flow(
    selectedLens.set(false),
    highlightedLens.set(false),
    valueLens.set(0),
    cornerLens.set([]),
    middleLens.set([])
  )
)
