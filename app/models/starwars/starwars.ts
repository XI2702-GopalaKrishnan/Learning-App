import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Star wars character model.
 */

const ItemModel = types.model("StarWarsCharacters").props({
  name: types.maybe(types.string),
  height: types.maybe(types.string),
  mass: types.maybe(types.string),
  hair_color: types.maybe(types.string),
  skin_color: types.maybe(types.string),
  eye_color: types.maybe(types.string),
  birth_year: types.maybe(types.string),
  gender: types.maybe(types.string),
  homeworld: types.maybe(types.string),
  films: types.maybe(types.array(types.string)),
  species: types.maybe(types.array(types.string)),
  vehicles: types.maybe(types.array(types.string)),
  starships: types.maybe(types.array(types.string)),
  created: types.maybe(types.string),
  edited: types.maybe(types.string),
  url: types.maybe(types.string)
})

export const StarWarsModel = types.model("StarWars").props({
  count: types.maybe(types.string),
  next: types.maybe(types.string),
  previous: types.maybe(types.string),
  // results: types.maybe(types.array(ItemModel)),
})

type StarWarsType = Instance<typeof StarWarsModel>
export interface StarWars extends StarWarsType {}
type StarWarsSnapshotType = SnapshotOut<typeof StarWarsModel>
export interface StarWarsSnapshot extends StarWarsSnapshotType {}
export const createSraeWarsDefaultModel = () => types.optional(StarWarsModel, {})
