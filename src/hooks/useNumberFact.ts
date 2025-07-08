import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useNumberFact(number: string, type: 'math' | 'trivia' | 'date') {
  return useQuery({
    queryKey: ['number-fact', number, type],
    queryFn: async () => {
      const response = await axios.get(`http://numbersapi.com/${number}/${type}`);
      return response.data;
    },
    enabled: !!number,
    retry: false,
  });
}
