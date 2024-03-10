import React from 'react'
import Header from '@/components/shared/Header'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm';
import { auth } from '@clerk/nextjs';
import { getUserById } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {

  const transformationType = transformationTypes[type];

  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
    return null;
  }
  const user = await getUserById(userId);

  return (
    <>
      <Header
        title={transformationType.title}
        subtitle={transformationType.subTitle}
      />
      <TransformationForm
        action="Add"
        userId={user._id}
        type={transformationType.type as TransformationTypeKey}
        creditBalance={user.creditBalance} />
    </>
  )
}

export default AddTransformationTypePage

// http://localhost:3000/transformatype 