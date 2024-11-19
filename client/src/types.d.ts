type User = {
  user_name: string
  user_tag: string
}

type MessageData = {
  action?: string
  data?: any
  error?: boolean
  message?: string
}

type Pokemon = {
  name: string
  sprite: string
  type1: string
  type2: string
  habitat: string
  colors: string
  evolution_stage: number
  height: number
  weight: number
}

type MatchingResults = {
  type1: 'match' | 'no_match' | 'partial'
  type2: 'match' | 'no_match' | 'partial'
  habitat: boolean
  colors: boolean
  evolution_stage: boolean
  height_comparison: 'match' | 'taller' | 'shorter'
  weight_comparison: 'match' | 'heavier' | 'lighter'
}

type Play = {
  matching_results: MatchingResults
  player: User,
  pokemon: Pokemon
  winning_play: boolean
}