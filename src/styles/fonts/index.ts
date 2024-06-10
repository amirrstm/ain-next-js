import { Manrope } from 'next/font/google'
import localFont from 'next/font/local'

export const ManropeFont = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export const YekanBakhFont = localFont({
  src: [
    {
      weight: '300',
      style: 'normal',
      path: '../../../public/fonts/YekanBakh/YekanBakh-Light.woff2',
    },
    {
      weight: 'normal',
      style: 'normal',
      path: '../../../public/fonts/YekanBakh/YekanBakh-Regular.woff2',
    },
    {
      weight: '600',
      style: 'normal',
      path: '../../../public/fonts/YekanBakh/YekanBakh-SemiBold.woff2',
    },
    {
      weight: 'bold',
      style: 'normal',
      path: '../../../public/fonts/YekanBakh/YekanBakh-Bold.woff2',
    },
    {
      weight: '800',
      style: 'normal',
      path: '../../../public/fonts/YekanBakh/YekanBakh-ExtraBold.woff2',
    },
    {
      weight: '900',
      style: 'normal',
      path: '../../../public/fonts/YekanBakh/YekanBakh-ExtraBlack.woff2',
    },
  ],
})

export const YekanBakhNumFont = localFont({
  src: [
    {
      weight: '300',
      style: 'normal',
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-Light.woff2',
    },
    {
      weight: 'normal',
      style: 'normal',
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-Regular.woff2',
    },
    {
      weight: '600',
      style: 'normal',
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-SemiBold.woff2',
    },
    {
      weight: 'bold',
      style: 'normal',
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-Bold.woff2',
    },
    {
      weight: '800',
      style: 'normal',
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-ExtraBold.woff2',
    },
    {
      weight: '900',
      style: 'normal',
      path: '../../../public/fonts/YekanBakhNum/YekanBakhFaNum-ExtraBlack.woff2',
    },
  ],
  variable: '--font-rtl-num',
})
