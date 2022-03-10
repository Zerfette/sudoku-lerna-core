import { Lens } from 'monocle-ts'
import { Mutation, Toggles } from '../types'

type Payload = { lens: Lens<Toggles, boolean>; value: boolean }

export const setToggle: Mutation<Toggles, Payload> = (
  toggles,
  { lens, value }
) => lens.set(value)(toggles)
