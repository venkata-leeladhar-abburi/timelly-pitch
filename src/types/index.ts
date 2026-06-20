export interface ProblemCard {
  icon: string
  title: string
  body: string
}

export interface Problem {
  id: number
  framesPath: string
  headline: string[]
  label: string
  cards: ProblemCard[]
}

export interface VisionTerminalLine {
  input: string
  output: string
}

export interface VisionPanel {
  id: number
  label: string
  headline: string[]
  body: string
  terminal?: VisionTerminalLine[]
  pills?: string[]
  quote?: string
  expansion?: string[]
  finalStatement?: string
}

export interface TractionItem {
  number: string | null
  label: string
  body: string
}

export interface Projection {
  year: string
  revenue: string
  note: string
  current: boolean
}

export interface FundAllocation {
  label: string
  percent: number
  color: string
}

export interface MarketStat {
  value: string
  label: string
  sub: string
}

export interface MarketTableRow {
  indicator: string
  data: string
}

export interface FrameMeta {
  totalFrames: number
  path: string
}
