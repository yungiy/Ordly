import Button from '@/components/common/button';
import Input from '@/components/common/input';

export default function Code() {
  return (
    <form className='space-y-8'>
      <div>
        <h2 className='flex mb-2 text-lg text-gray-800 font-bold'>
          인증코드 발급
        </h2>
        <div className='flex gap-2'>
          <Input
            type='email'
            placeholder='버튼을 눌러 코드를 발급하세요'
            className='border border-gray-400'
            readOnly
          />
          <Button type='submit' className='py-2 w-20 text-white bg-yellow-500'>
            발급
          </Button>
        </div>
      </div>
      <div>
        <h2 className='flex mb-2 text-lg text-gray-800 font-bold'>
          인증코드 유효성 검사
        </h2>
        <div className='flex gap-2'>
          <Input
            type='email'
            placeholder='인증코드 확인'
            className='border border-gray-400'
          />
          <Button type='submit' className='py-2 w-20 text-white bg-yellow-500'>
            확인
          </Button>
        </div>
      </div>
      <Button
        type='submit'
        className='py-2 text-lg font-bold text-white bg-yellow-500'
      >
        완료
      </Button>
    </form>
  );
}
