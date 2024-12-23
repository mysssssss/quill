import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect, notFound } from 'next/navigation';
import React from 'react';
interface PageProps {
  params: {
    fileid: string;
  };
}
import PdfRenderer from '@/Components/PdfRenderer';
import ChatWrapper from '@/Components/ChatWrapper';
import { db } from '@/db';
const page = async ({ params }: PageProps) => {
  // retrieve file id
  const { fileid } = params;
  // make database call
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`);

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  });
  if (!file) notFound();

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* left side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer />
          </div>
        </div>

        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-to-0">
          <ChatWrapper />
        </div>
      </div>
    </div>
  );
};

export default page;
