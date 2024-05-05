import * as z from 'zod'

import { awardSchema } from './award'
import { basicSchema } from './basic'
import { certificateSchema } from './certificate'
import { educationSchema } from './education'
import { interestSchema } from './interest'
import { inventionSchema } from './invention'
import { languageSchema } from './language'
import { profileSchema } from './profile'
import { projectSchema } from './project'
import { publicationSchema } from './publication'
import { referenceSchema } from './reference'
import { skillSchema } from './skill'
import { speechSchema } from './speech'
import { teachingSchema } from './teaching'
import { volunteerSchema } from './volunteer'
import { workSchema } from './work'

const resumeSchema = z.object({
  works: workSchema,
  basic: basicSchema,
  skills: skillSchema,
  awards: awardSchema,
  speeches: speechSchema,
  projects: projectSchema,
  profiles: profileSchema,
  languages: languageSchema,
  teachings: teachingSchema,
  interests: interestSchema,
  educations: educationSchema,
  volunteers: volunteerSchema,
  inventions: inventionSchema,
  references: referenceSchema,
  certificates: certificateSchema,
  publications: publicationSchema,
})

export { resumeSchema, basicSchema }
