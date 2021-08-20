import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetStarWarsResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"


export class StarWarsApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getStarWarsCharacters(): Promise<GetStarWarsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://swapi.dev/api/people/1",
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const starWars = response;
      console.log('STARWARS', starWars);

      return { kind: "ok", starWars }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
