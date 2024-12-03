import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
interface PageProps {
  params: {
    fileid: string;
  };
}
const page = async ({ params }: PageProps) => {
  // retrieve file id
  const { fileid } = params;
  // make database call
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`);
  return <div>{fileid}</div>;
};

export default page;
