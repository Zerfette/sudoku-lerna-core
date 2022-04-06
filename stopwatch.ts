import { concat, magmaModulo, zeroPad } from 'fns'
import { getMonoid as getArrayMonoid } from 'fp-ts/Array'
import { constant, flow, pipe } from 'fp-ts/function'
import { concatAll } from 'fp-ts/lib/Monoid'
import { MonoidProduct, MonoidSum } from 'fp-ts/number'
import { fold, getMonoid as getOptionMonoid, Option } from 'fp-ts/Option'

export type Laps = Option<number[]>

export const arrayOptionMonoid = pipe(getArrayMonoid<number>(), getOptionMonoid)

export const getPrevTotal = fold(constant(0), concatAll(MonoidSum))

const roundPad = flow(Math.floor, zeroPad)

type GetTimerText = (elapsedTime: number) => string
export const getTimerText: GetTimerText = elapsedTime => {
  const hours = pipe(
    elapsedTime,
    concat(magmaModulo)(86400),
    concat(MonoidProduct)(1 / 3600),
    roundPad
  )

  const minutes = pipe(
    elapsedTime,
    concat(magmaModulo)(3600),
    concat(MonoidProduct)(1 / 60),
    roundPad
  )

  const seconds = pipe(elapsedTime, concat(magmaModulo)(60), roundPad)

  return `${hours}:${minutes}:${seconds}`
}
