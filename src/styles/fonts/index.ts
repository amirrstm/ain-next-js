import { Manrope } from 'next/font/google'
import localFont from 'next/font/local'

export const ManropeFont = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
})

export const YekanBakhFont = localFont({
  src: [
    {
      path: '../../../public/fonts/YekanBakh/YekanBakh-Light.woff2',
      style: 'normal',
      weight: '300'
    },
    {
      path: '../../../public/fonts/YekanBakh/YekanBakh-Regular.woff2',
      style: 'normal',
      weight: 'normal'
    },
    {
      path: '../../../public/fonts/YekanBakh/YekanBakh-SemiBold.woff2',
      style: 'normal',
      weight: '600'
    },
    {
      path: '../../../public/fonts/YekanBakh/YekanBakh-Bold.woff2',
      style: 'normal',
      weight: 'bold'
    },
    {
      path: '../../../public/fonts/YekanBakh/YekanBakh-ExtraBold.woff2',
      style: 'normal',
      weight: '800'
    },
    {
      path: '../../../public/fonts/YekanBakh/YekanBakh-ExtraBlack.woff2',
      style: 'normal',
      weight: '900'
    }
  ]
})

export const YekanBakhNumFont = localFont({
  src: [
    {
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-Light.woff2',
      style: 'normal',
      weight: '300'
    },
    {
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-Regular.woff2',
      style: 'normal',
      weight: 'normal'
    },
    {
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-SemiBold.woff2',
      style: 'normal',
      weight: '600'
    },
    {
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-Bold.woff2',
      style: 'normal',
      weight: 'bold'
    },
    {
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-ExtraBold.woff2',
      style: 'normal',
      weight: '800'
    },
    {
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-ExtraBlack.woff2',
      style: 'normal',
      weight: '900'
    }
  ],
  variable: '--font-rtl-num'
})
