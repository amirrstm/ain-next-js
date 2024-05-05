export const resumeDefaultValues = {
  basic: {
    url: '',
    label: '',
    email: '',
    gender: '',
    marriage: '',
    lastName: '',
    military: '',
    firstName: '',
    phone: { countryCode: '+98', text: '' },
    location: { country: 'ایران', state: '', address: '' },
  },
  educations: [
    {
      institution: '',
      area: '',
      studyType: '',
      fieldOfStudy: '',
      startDate: new Date(),
      endDate: new Date(),
      score: '',
      stillStudying: false,
      highlights: [{ value: '' }],
      location: { city: '', state: '', country: 'ایران' },
    },
  ],
  works: [
    {
      name: '',
      position: '',
      website: '',
      startDate: new Date(),
      endDate: new Date(),
      summary: '',
      stillWorking: false,
      highlights: [{ value: '' }],
      location: { city: '', state: '', country: 'ایران' },
    },
  ],
  skills: [
    {
      name: '',
      level: 1,
      hasLevel: false,
      description: '',
    },
    {
      name: '',
      level: 1,
      hasLevel: false,
      description: '',
    },
  ],
  languages: [
    {
      language: '',
      fluency: '',
      level: 1,
      hasLevel: false,
    },
  ],
  awards: [
    {
      title: '',
      awarder: '',
      summary: '',
      date: new Date(),
    },
  ],
  certificates: [],
  publications: [
    {
      name: '',
      url: '',
      summary: '',
      publisher: '',
      releaseDate: new Date(),
    },
  ],
  projects: [
    {
      name: '',
      url: '',
      description: '',
      organization: '',
      startDate: new Date(),
      endDate: new Date(),
      highlights: [{ value: '' }],
    },
  ],
}
