import { defineCliConfig } from 'sanity/cli'

const projectId = 'your-project-id'
const dataset = 'production'

export default defineCliConfig({ api: { projectId, dataset } })
