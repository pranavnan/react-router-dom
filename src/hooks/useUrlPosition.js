import { useSearchParams } from 'react-router-dom';

export const useUrlPosition = () => {
  const [searchParam, setSearch] = useSearchParams();

  const lat = searchParam.get('lat');
  const lng = searchParam.get('lng');

  return [lat, lng];
};
