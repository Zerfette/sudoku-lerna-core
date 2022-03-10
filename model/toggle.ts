import { Lens } from 'monocle-ts'
import { Mutation, Toggles } from '../types'

type Payload = { lens: Lens<Toggles, boolean> }

export const toggle: Mutation<Toggles, Payload> = (toggles, { lens }) =>
  lens.set(!lens.get(toggles))(toggles)
