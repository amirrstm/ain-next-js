import i18next from 'i18next'

const enIsRequired = (value: string) => `${value} is required`
const deIsRequired = (value: string) => `${value} ist erforderlich`

const EN = {
  Register: {
    first_name: enIsRequired('First name'),
    last_name: enIsRequired('Last name'),
    email: enIsRequired('Email'),
    mobile: enIsRequired('Mobile'),
    country: enIsRequired('Country'),
    language: enIsRequired('Language'),
    phone: enIsRequired('Phone'),
    password: 'Password must be at least 8 characters long',
  },

  Profile: {
    country: enIsRequired('Country'),
    language: enIsRequired('Language'),
    last_name: enIsRequired('Last name'),
    first_name: enIsRequired('First name'),
    telephone_number: enIsRequired('Phone number'),
  },

  Address: {
    city: enIsRequired('City'),
    title: enIsRequired('Title'),
    phone: enIsRequired('Phone'),
    street: enIsRequired('Street'),
    country: enIsRequired('Country'),
    last_name: enIsRequired('Last name'),
    first_name: enIsRequired('First name'),
    house_number: enIsRequired('House number'),
    postal_code: enIsRequired('Postal code'),
  },

  Ticket: {
    title: enIsRequired('Title'),
    description: enIsRequired('Description'),
  },

  Party: {
    PartyName: enIsRequired('Party name'),
    StartDate: enIsRequired('Start date'),
    EndDate: enIsRequired('End date'),
    FirstName: enIsRequired('First name'),
    LastName: enIsRequired('Last name'),
  },
}

const DE = {
  Register: {
    first_name: deIsRequired('First name'),
    last_name: deIsRequired('Last name'),
    email: deIsRequired('Email'),
    mobile: deIsRequired('Mobile'),
    country: deIsRequired('Country'),
    language: deIsRequired('Language'),
    phone: deIsRequired('Phone'),
    password: 'Passowrt muss mindestens 8 Zeichen lang sein',
  },

  Profile: {
    country: deIsRequired('Country'),
    language: deIsRequired('Language'),
    last_name: deIsRequired('Last name'),
    first_name: deIsRequired('First name'),
    telephone_number: deIsRequired('Phone number'),
  },

  Address: {
    city: deIsRequired('City'),
    title: deIsRequired('Title'),
    phone: deIsRequired('Phone'),
    street: deIsRequired('Street'),
    country: deIsRequired('Country'),
    last_name: deIsRequired('Last name'),
    first_name: deIsRequired('First name'),
    house_number: deIsRequired('House number'),
    postal_code: deIsRequired('Postal code'),
  },

  Ticket: {
    title: deIsRequired('Title'),
    description: deIsRequired('Description'),
  },

  Party: {
    PartyName: deIsRequired('Party name'),
    StartDate: deIsRequired('Start date'),
    EndDate: deIsRequired('End date'),
    FirstName: deIsRequired('First name'),
    LastName: deIsRequired('Last name'),
  },
}

export default i18next.language === 'en' ? EN : DE
