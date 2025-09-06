import Link from 'next/link';

export default function footers() {
  return (
    <>
      <div className='px-4 py-2 bg-gray-100'>
        <div className='py-2 font-bold text-base text-gray-600'>
          <span>yungiy 개인 프로젝트</span>
        </div>
        <div className='text-sm text-gray-500'>
          <p>대표 : 양윤기</p>
          <p>사업자 등록번호 : 000-00-00000</p>
          <p>이메일 : devyungiy@gmail.com</p>
        </div>
        <div className='py-4'>
          <div className='border border-gary' />
        </div>
        <div className=' text-sm gap-2 flex text-gray-500'>
          <Link href={''}>개인정보 처리방침</Link>|<Link href={''}>이용약관</Link>
        </div>
        <div className='text-sm pt-4 pb-11 font-thin text-gray-500'>
          <p>@ yungiy All rights reserved.</p>
        </div>
      </div>
    </>
  )
}