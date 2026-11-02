import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

/**
 * Owner dashboard configuration.
 *
 * Fill in the two values below with the SAME project id and dataset you put in
 * the website's .env file. Find them at https://sanity.io/manage
 *
 *   projectId — looks like "abc123xy"
 *   dataset   — usually "production"
 *
 * Generated document types (optional, needs a real project):
 *   npm run typegen:schema   # sanity schema extract → ./schema.json
 *   npm run typegen          # sanity typegen generate → __generated__/typegen.ts
 * Both talk to the Sanity API, so they only work once projectId above is valid.
 * The website does not depend on them: its projections are typed by hand in
 * ../src/types/content.ts.
 */
const projectId = 'wmovnl3b'
const dataset = 'production'

export default defineConfig({
  name: 'vallerian-portfolio',
  title: 'Vallerian Dava Dayoh — Studio',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  /* Readable, light editing surface for one person. */
  colorScheme: 'light',
})
