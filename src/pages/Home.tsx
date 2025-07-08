import { FactForm } from '@/components/fact-form/fact-form';
import { Layout } from '@/components/layout/layout';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <Layout>
      <FactForm />
    </Layout>
  );
};

export default Home;
