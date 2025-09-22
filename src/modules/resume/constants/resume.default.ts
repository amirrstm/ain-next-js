export const resumeDefaultValues = {
  awards: [
    {
      awarder: '',
      date: new Date(),
      summary: '',
      title: ''
    }
  ],
  basic: {
    email: '',
    firstName: '',
    gender: '',
    label: '',
    lastName: '',
    location: { address: '', country: localStorage.getItem('lang') === 'fa' ? 'ایران' : '', state: '' },
    marriage: '',
    military: '',
    phone: { countryCode: '+98', text: '' },
    url: ''
  },
  certificates: [],
  educations: [
    {
      area: '',
      endDate: new Date(),
      fieldOfStudy: '',
      highlights: [{ value: '' }],
      institution: '',
      location: { city: '', country: localStorage.getItem('lang') === 'fa' ? 'ایران' : '', state: '' },
      score: '',
      startDate: new Date(),
      stillStudying: false,
      studyType: ''
    }
  ],
  languages: [
    {
      fluency: '',
      hasLevel: false,
      language: '',
      level: 1
    }
  ],
  projects: [
    {
      description: '',
      endDate: new Date(),
      highlights: [{ value: '' }],
      name: '',
      organization: '',
      startDate: new Date(),
      url: ''
    }
  ],
  publications: [
    {
      name: '',
      publisher: '',
      releaseDate: new Date(),
      summary: '',
      url: ''
    }
  ],
  skills: [
    {
      description: '',
      hasLevel: false,
      level: 1,
      name: ''
    },
    {
      description: '',
      hasLevel: false,
      level: 1,
      name: ''
    }
  ],
  works: [
    {
      endDate: new Date(),
      highlights: [{ value: '' }],
      location: { city: '', country: localStorage.getItem('lang') === 'fa' ? 'ایران' : '', state: '' },
      name: '',
      position: '',
      startDate: new Date(),
      stillWorking: false,
      summary: '',
      website: ''
    }
  ]
}

export const RESUME_FONTS = [
  {
    label: 'ایران سنس',
    value: 'IranSans'
  },
  {
    label: 'یکان بخ',
    value: 'YekanBakh'
  },
  {
    label: 'وزیر متن',
    value: 'Vazirmatn'
  }
]
