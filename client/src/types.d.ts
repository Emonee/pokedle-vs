export type User = {
  user_name: string
  user_tag: string
}

export type MessageData = {
  action?: string
  data?: any
  error?: boolean
  message?: string
}

type Play = {
  matching_results: {
    colors: boolean
    evolution_stage: boolean
    habitat: boolean
    height_comparison: 'match' | 'taller' | 'shorter',
    type1: 'match' | 'no_match' | 'partial',
    type2: 'match' | 'no_match' | 'partial',
    weight_comparison: 'match' |'heavier' | 'lighter'
  }
  player: User,
  pokemon: {
    colors: string
    evolution_stage: number
    habitat: string
    height: number
    name: string
    sprite: string
    type1: string
    type2: string
    weight: number
  }
  winning_play: boolean
}