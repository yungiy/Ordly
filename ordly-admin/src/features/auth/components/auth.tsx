import AuthForm from './auth-form';

export default function Auth() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-lg bg-white p-8'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-800'>
          Ordly Admin
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}
