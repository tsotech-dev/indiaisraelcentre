import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Publications } from './src/collections/Publications'
import { People } from './src/collections/People'
import { Convenings } from './src/collections/Convenings'
import { NewsletterSubscribers } from './src/collections/NewsletterSubscribers'
import { Pillars } from './src/collections/Pillars'
import { Videos } from './src/collections/Videos'

import { Home } from './src/globals/Home'
import { About } from './src/globals/About'
import { AboutStrategicObjective } from './src/globals/AboutStrategicObjective'
import { AboutAreasOfEngagement } from './src/globals/AboutAreasOfEngagement'
import { AboutAcademicPartners } from './src/globals/AboutAcademicPartners'
import { AboutGovernance } from './src/globals/AboutGovernance'
import { AboutContact } from './src/globals/AboutContact'
import { AboutContactEditorial } from './src/globals/AboutContactEditorial'
import { AboutContactMedia } from './src/globals/AboutContactMedia'
import { AboutPartnerWithUs } from './src/globals/AboutPartnerWithUs'
import { AboutWorkWithUs } from './src/globals/AboutWorkWithUs'
import { Forum } from './src/globals/Forum'
import { ForumArchive } from './src/globals/ForumArchive'
import { Research } from './src/globals/Research'
import { ResearchPapers } from './src/globals/ResearchPapers'
import { ResearchBriefs } from './src/globals/ResearchBriefs'
import { ResearchCommentary } from './src/globals/ResearchCommentary'
import { Privacy } from './src/globals/Privacy'
import { Terms } from './src/globals/Terms'
import { NotFound } from './src/globals/NotFound'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Publications,
    People,
    Convenings,
    Pillars,
    NewsletterSubscribers,
    Videos,
  ],
  globals: [
    Home,
    About,
    AboutStrategicObjective,
    AboutAreasOfEngagement,
    AboutAcademicPartners,
    AboutGovernance,
    AboutContact,
    AboutContactEditorial,
    AboutContactMedia,
    AboutPartnerWithUs,
    AboutWorkWithUs,
    Forum,
    ForumArchive,
    Research,
    ResearchPapers,
    ResearchBriefs,
    ResearchCommentary,
    Privacy,
    Terms,
    NotFound,
  ],
  editor: lexicalEditor(),
  plugins: [
    s3Storage({
      enabled: !!process.env.SUPABASE_STORAGE_BUCKET,
      collections: {
        media: true,
      },
      bucket: process.env.SUPABASE_STORAGE_BUCKET || '',
      config: {
        endpoint: `https://${process.env.SUPABASE_PROJECT_REF}.supabase.co/storage/v1/s3`,
        region: 'auto',
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
})
