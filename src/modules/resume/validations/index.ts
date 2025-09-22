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
  awards: awardSchema,
  basic: basicSchema,
  certificates: certificateSchema,
  educations: educationSchema,
  interests: interestSchema,
  inventions: inventionSchema,
  languages: languageSchema,
  profiles: profileSchema,
  projects: projectSchema,
  publications: publicationSchema,
  references: referenceSchema,
  skills: skillSchema,
  speeches: speechSchema,
  teachings: teachingSchema,
  volunteers: volunteerSchema,
  works: workSchema
})

export { resumeSchema, basicSchema }
