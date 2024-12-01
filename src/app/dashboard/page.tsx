import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !(await user).id) redirect('/auth-callback?origin=dashboard');

  return <div>{(await user).email}</div>;
};

export default Dashboard;
