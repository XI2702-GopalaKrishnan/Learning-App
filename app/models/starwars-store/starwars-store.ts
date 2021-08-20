import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { StarWarsModel, StarWarsSnapshot } from "../starwars/starwars"
import { StarWarsApi } from "../../services/api/starwars-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing Rick and Morty characters
 */
export const StarWarsStoreModel = types
  .model("StarWarsStore")
  .props({
    starwars: types.optional(types.array(StarWarsModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveStarWarCharacters: (starWarsSnapshots: StarWarsSnapshot[]) => {
      self.starwars.replace(starWarsSnapshots)
    },
  }))
  .actions((self) => ({
    getCharacters: async () => {
      const starWarsApi = new StarWarsApi(self.environment.api)
      const result = await starWarsApi.getStarWarsCharacters()

      if (result.kind === "ok") {
        self.saveStarWarCharacters(result.starWars)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type StarWarsStoreType = Instance<typeof StarWarsStoreModel>
export interface StarWarsStore extends StarWarsStoreType {}
type StarWarsSnapshotType = SnapshotOut<typeof StarWarsStoreModel>
export interface StarWarsStoreSnapshot extends StarWarsSnapshotType {}
export const createStarWarsStoreDefaultModel = () => types.optional(StarWarsStoreModel, {})
