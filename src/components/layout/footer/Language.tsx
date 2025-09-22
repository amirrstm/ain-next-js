import { useRouter } from 'next/navigation'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const langs = [
  {
    icon: (
      <svg height={20} version="1.1" viewBox="0 0 55.2 38.4" width={20} xmlns="http://www.w3.org/2000/svg">
        <g>
          <path
            d="M2.87,38.4h49.46c1.59-0.09,2.87-1.42,2.87-3.03V3.03c0-1.66-1.35-3.02-3.01-3.03H3.01 C1.35,0.01,0,1.37,0,3.03v32.33C0,36.98,1.28,38.31,2.87,38.4L2.87,38.4z"
            fill="#fefefe"
          />
          <polygon
            fill="#c8102e"
            points="23.74,23.03 23.74,38.4 31.42,38.4 31.42,23.03 55.2,23.03 55.2,15.35 31.42,15.35 31.42,0 23.74,0 23.74,15.35 0,15.35 0,23.03 23.74,23.03"
          />
          <path d="M33.98,12.43V0h18.23c1.26,0.02,2.34,0.81,2.78,1.92L33.98,12.43L33.98,12.43z" fill="#012169" />
          <path d="M33.98,25.97V38.4h18.35c1.21-0.07,2.23-0.85,2.66-1.92L33.98,25.97L33.98,25.97z" fill="#012169" />
          <path d="M21.18,25.97V38.4H2.87c-1.21-0.07-2.24-0.85-2.66-1.94L21.18,25.97L21.18,25.97z" fill="#012169" />
          <path d="M21.18,12.43V0H2.99C1.73,0.02,0.64,0.82,0.21,1.94L21.18,12.43L21.18,12.43z" fill="#012169" />
          <polygon fill="#012169" points="0,12.8 7.65,12.8 0,8.97 0,12.8" />
          <polygon fill="#012169" points="55.2,12.8 47.51,12.8 55.2,8.95 55.2,12.8" />
          <polygon fill="#012169" points="55.2,25.6 47.51,25.6 55.2,29.45 55.2,25.6" />
          <polygon fill="#012169" points="0,25.6 7.65,25.6 0,29.43 0,25.6" />
          <polygon fill="#c8102e" points="55.2,3.25 36.15,12.8 40.41,12.8 55.2,5.4 55.2,3.25" />
          <polygon fill="#c8102e" points="19.01,25.6 14.75,25.6 0,32.98 0,35.13 19.05,25.6 19.01,25.6" />
          <polygon fill="#c8102e" points="10.52,12.81 14.78,12.81 0,5.41 0,7.55 10.52,12.81" />
          <polygon fill="#c8102e" points="44.63,25.59 40.37,25.59 55.2,33.02 55.2,30.88 44.63,25.59" />
        </g>
      </svg>
    ),
    title: 'English',
    value: 'en'
  },
  {
    icon: (
      <svg height={20} viewBox="0 0 55.2 38.4" width={20} xmlns="http://www.w3.org/2000/svg">
        <g clipRule="evenodd" fillRule="evenodd">
          <path d="M3.03 0h49.13c1.67 0 3.03 1.36 3.03 3.03v32.33c0 1.66-1.36 3.02-3.02 3.03H3.02C1.36 38.4 0 37.03 0 35.37V3.03C0 1.36 1.36 0 3.03 0z" />
          <path d="M0 12.8h55.2v22.57c0 1.67-1.36 3.03-3.03 3.03H3.03C1.36 38.4 0 37.04 0 35.37V12.8z" fill="#d00" />
          <path d="M0 25.6h55.2v9.77c0 1.66-1.36 3.02-3.02 3.03H3.03A3.04 3.04 0 010 35.37V25.6z" fill="#ffce00" />
        </g>
      </svg>
    ),
    title: 'German',
    value: 'de'
  },
  {
    icon: (
      <svg height={20} viewBox="0 0 55.2 38.4" width={20} xmlns="http://www.w3.org/2000/svg">
        <g clipRule="evenodd" fillRule="evenodd">
          <rect fill="#ED2939" height={13} width={20} />
          <rect fill="#fff" height={13} width={13} />
          <rect fill="#002395" height={13} width={7} />
        </g>
      </svg>
    ),
    title: 'Franch',
    value: 'fr'
  }
]

const Language: React.FC = () => {
  const router = useRouter()

  const onChange = (value: string) => {
    router.push(`/${value}`)
  }

  return (
    <div>
      <Select onValueChange={onChange} value={'fa'}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {langs.map((lang, index) => (
            <SelectItem key={index} value={lang.value}>
              <div className="flex items-center gap-3">
                {lang.icon}
                {lang.title}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default Language
