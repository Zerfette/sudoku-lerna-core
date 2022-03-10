import { when, lensEq } from 'fns'
import { map } from 'fp-ts/Array'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { flow } from 'fp-ts/function'
import { Eq as nEq } from 'fp-ts/number'
import { not } from 'fp-ts/Predicate'
import { valueLens, selectedLens, lockedLens } from '../optics'
import { Board } from '../types'

export const lockBoard: Endomorphism<Board> = map(
  flow(
    selectedLens.set(false),
    when(not(lensEq(valueLens, 0)(nEq)), lockedLens.set(true))
  )
)
