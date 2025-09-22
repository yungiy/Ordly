import Code from './code';

export default function Admin() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <div className='flex flex-col gap-4 text-center'>
          <h3 className='text-2xl font-bold text-gray-800'>관리자 페이지</h3>
          <p className='text-gray-500 font-medium'>
            관리자만 접근할 수 있는 관리자 페이지입니다.
          </p>
          <div className='border border-gray-600' />
          <Code />
        </div>
      </div>
    </div>
  );
}
