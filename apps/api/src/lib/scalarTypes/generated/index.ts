import { GraphQLURL } from 'graphql-scalars'
import { asNexusMethod } from 'nexus'

export default [asNexusMethod(GraphQLURL, 'url')]
