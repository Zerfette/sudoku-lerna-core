import { lensEq, mapWhen } from 'fns'
import { Eq as bEq } from 'fp-ts/boolean'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { selectedLens, lockedLens } from '../optics'
import { Board } from '../types'

export const selectAll: Endomorphism<Board> = mapWhen(
  lensEq(lockedLens, false)(bEq),
  selectedLens.set(true)
)