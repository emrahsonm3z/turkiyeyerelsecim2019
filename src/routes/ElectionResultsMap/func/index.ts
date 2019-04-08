import electionResults from '../data/secim.json';

import {
  PARTIES,
  PARTY_PROPS,
  RATE_DIFFERENCE_FOR_LIGHT,
  RATE_DIFFERENCE_FOR_NORMAL,
} from '../constants';

import {
  Candidate,
  CalculatedCandidate,
  PartyProps,
  CalculatedElectionResult,
  ElectionResult,
} from '../types';

/**
 * İlk bazlı toplam oy sayısı
 */
const sumOfVotes = (results: Array<Candidate>) =>
  results.reduce((acc: number, curr: Candidate) => acc + parseInt(curr.voteCount), 0);

/**
 * İl bazlı sonuçların oy sayısına göre büyükten küçüğe sıralanması
 */
const sortVotes = (results: Array<Candidate>) =>
  results.sort((a, b) => parseInt(b.voteCount) - parseInt(a.voteCount));

/**
 * Haritata gösterilecek rengin belirlenmesi
 */
const getPartyColor = (partyId: number, rateDifference: any): string => {
  // PARTIES array içerinde aday yoksa bağımsız aday demektir. Bu türdeki kazanan adaylara COLORS array'inde ki ilk eleman atanacaktır.
  let partyPropsObj: PartyProps | undefined;
  if (PARTIES.some(p => p.id === partyId)) {
    partyPropsObj = PARTY_PROPS.find(c => c.partyId === partyId);
  } else partyPropsObj = PARTY_PROPS[0];

  return typeof partyPropsObj === 'undefined'
    ? '#ffffff'
    : rateDifference <= RATE_DIFFERENCE_FOR_LIGHT
    ? partyPropsObj.light
    : rateDifference <= RATE_DIFFERENCE_FOR_NORMAL
    ? partyPropsObj.normal
    : partyPropsObj.dark;
};

/**
 * Seçim sonuçlarına adaylara oy oranı bilgisinin sonuçlara eklenmesi
 *  id: number;
 *  name: string;
 *  voteCount: string;
 *  voteRate: string;
 */
const createNewCalculatedCandidate = (results: Array<Candidate>): Array<CalculatedCandidate> => {
  const totalVote = sumOfVotes(results);

  return results.reduce(
    (accCalculatedCandidate: Array<CalculatedCandidate>, currCandidate: Candidate) => {
      const voteCount = parseInt(currCandidate.voteCount);

      const newCalculatedCandidate = {
        ...currCandidate,
        voteRate: ((voteCount / totalVote) * 100).toFixed(2),
      };

      accCalculatedCandidate.push(newCalculatedCandidate);

      return accCalculatedCandidate;
    },
    [],
  );
};

const getElectionResults = (): Array<CalculatedElectionResult> => {
  const newelectionResults = electionResults.reduce(
    (acc: Array<CalculatedElectionResult>, curr: ElectionResult) => {
      curr.results = sortVotes(curr.results);

      const newResult = createNewCalculatedCandidate(curr.results);

      // Oy oranı farkına göre renk belirleme
      const rateDifference = (
        parseFloat(newResult[0].voteRate) - parseFloat(newResult[1].voteRate)
      ).toFixed(2);

      const winnerColor = getPartyColor(newResult[0].id, rateDifference);

      const newCalculatedElectionResult: CalculatedElectionResult = {
        id: curr.id,
        name: curr.name,
        isMetropolitan: curr.isMetropolitan,
        results: newResult,
        winner: {
          ...newResult[0],
          rateDifference: rateDifference,
          color: winnerColor,
        },
      };

      acc.push(newCalculatedElectionResult);

      return acc;
    },
    [],
  );
  console.log('electionResults', electionResults);
  console.log('newelectionResults', newelectionResults);

  return newelectionResults;
};

const getPartyIcon = (partyId: number) => {
  const partyProps = PARTY_PROPS.find(p => p.partyId === partyId);
  return typeof partyProps !== 'undefined' ? partyProps.icon : PARTY_PROPS[0].icon;
};

export { getElectionResults, getPartyIcon };
