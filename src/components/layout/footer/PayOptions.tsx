import Image from 'next/image'

import React from 'react'

const PayOptions = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-10 pb-20">
      <div className="max-w-4xl mx-auto w-full border-[5px] border-primary rounded-lg p-6 text-center">
        <strong className="text-2xl text-primary text-center">
          Solutions Apps - Your reliable partner for softwares and grow business
        </strong>
      </div>

      <div className="flex items-center gap-4 sm:gap-8 mt-6">
        <div className="relative">
          <Image
            priority
            width={50}
            height={50}
            alt="master"
            className="object-contain"
            src="/2890f688-0a66-437e-ce0d-4adfb2147500"
          />
        </div>

        <div className="relative">
          <Image
            priority
            width={65}
            height={65}
            alt="visa"
            className="object-contain"
            src="/7e42ecfe-d500-4662-7f8d-eec9caf9ec00"
          />
        </div>

        <div className="relative">
          <Image
            priority
            width={75}
            height={75}
            alt="paypal"
            className="object-contain"
            src="/7147f028-5e0d-49a7-45ff-12b4217cd900"
          />
        </div>

        <div className="relative">
          <Image
            priority
            width={85}
            height={85}
            alt="vorkase"
            className="object-contain"
            src="/cf4eef97-6c71-461b-9a72-20fac1fa2e00"
          />
        </div>

        <div className="relative">
          <Image
            priority
            width={70}
            height={70}
            alt="sofort"
            className="object-contain"
            src="/dbcea346-e473-421d-037a-85c293962200"
          />
        </div>
      </div>
    </div>
  )
}

export default PayOptions
