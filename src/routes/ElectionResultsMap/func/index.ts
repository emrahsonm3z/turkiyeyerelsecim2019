import electionResults from '../data/secim.json';

import {
  PARTIES,
  COLORS,
  RATE_DIFFERENCE_FOR_LIGHT,
  RATE_DIFFERENCE_FOR_NORMAL,
} from '../constants';

import {
  Candidate,
  CalculatedCandidate,
  PartyColors,
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
  let partyColorObj: PartyColors | undefined;
  if (PARTIES.some(p => p.id === partyId)) {
    partyColorObj = COLORS.find(c => c.partyId === partyId);
  } else partyColorObj = COLORS[0];

  return typeof partyColorObj === 'undefined'
    ? '#ffffff'
    : rateDifference <= RATE_DIFFERENCE_FOR_LIGHT
    ? partyColorObj.light
    : rateDifference <= RATE_DIFFERENCE_FOR_NORMAL
    ? partyColorObj.normal
    : partyColorObj.dark;
};

const reproduceElectionResults = () => {
  debugger;
  const newelectionResults = electionResults.reduce(
    (acc: Array<CalculatedElectionResult>, curr: ElectionResult) => {
      const totalVote = sumOfVotes(curr.results);

      curr.results = sortVotes(curr.results);

      const newResult = curr.results.reduce(
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
};

const groupingByColor = () => {};

export { reproduceElectionResults };
