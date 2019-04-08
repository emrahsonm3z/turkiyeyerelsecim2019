export type Candidate = {
  id: number;
  name: string;
  voteCount: string;
};

export interface CalculatedCandidate extends Candidate {
  voteRate: string;
}

export interface WinnerCandidate extends CalculatedCandidate {
  rateDifference: string;
  color: string;
}

export type ElectionResult = {
  id: number;
  name: string;
  isMetropolitan: boolean;
  results: Array<Candidate>;
};

export interface CalculatedElectionResult {
  id: number;
  name: string;
  isMetropolitan: boolean;
  results: Array<CalculatedCandidate>;
  winner: WinnerCandidate;
}

export type PartyProps = {
  partyId: number;
  light: string;
  normal: string;
  dark: string;
  icon?: any;
};

export type Party = {
  id: number;
  name: string;
};
