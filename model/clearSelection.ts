import { map } from 'fp-ts/Array'
import { flow } from 'fp-ts/function'
import { Endomorphism } from 'fp-ts/Endomorphism'
import { selectedLens, highlightedLens } from '../optics'
import { Board } from '../types'

export const clearSelection: Endomorphism<Board> = map(
  flow(selectedLens.set(false), highlightedLens.set(false))
)
