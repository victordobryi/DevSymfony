import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { useNumberFact } from '@/hooks/useNumberFact';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result: FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { data, isFetching, error } = useNumberFact(state.number, state.type);

  if (!state) {
    return (
      <Layout>
        <p className='text-red-500'>Нет данных для отображения</p>
        <Button onClick={() => navigate('/')}>Назад</Button>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='space-y-4 w-full'>
        {isFetching && <p className='text-center text-green-600'>Загрузка...</p>}
        {error && <p className='text-center text-red-500'>Ошибка: {error.message}</p>}
        {data && !isFetching && (
          <>
            <p>
              <strong>Тип:</strong> {state.type}
            </p>
            <p>
              <strong>Число:</strong> {state.number}
            </p>
            <div className='p-4 bg-green-50 border border-green-200 rounded-md'>
              <p className='text-green-800'>{data}</p>
            </div>
          </>
        )}
        <Button className='w-full' onClick={() => navigate('/')}>
          Назад
        </Button>
      </div>
    </Layout>
  );
};

export default Result;
