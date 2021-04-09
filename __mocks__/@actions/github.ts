type Params = {
  environment_name: string
  owner: string
  repo: string
}

export const getOctokit = jest.fn(() => {
  return {
    repos: {
      deleteAnEnvironment: jest.fn((params: Params) => {
        const match = params.environment_name.match(/-([0-9]+)/)
        return {
          status: Number(match?.[1])
        }
      })
    }
  }
})

export const context = {
  repo: {
    owner: '',
    repo: ''
  }
}
