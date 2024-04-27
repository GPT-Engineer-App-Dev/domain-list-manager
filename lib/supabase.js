import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://adlzdmxeyzrvgygumdlq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkbHpkbXhleXpydmd5Z3VtZGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNDQ5NzgsImV4cCI6MjAyOTgyMDk3OH0.0vS3BzSD8sQ3mCp2EKGEI24uaNnn4S6b7FzFmranq_Y'

const supabase = createClient(supabaseUrl, supabaseKey)

/*
To use getClient(projectId) you must give it the projectId of the current project.

You must also ensure to define the type of `value` you expect, as a class, to help the reader of the code.

Exact schema of the table:
[
  {
    "column_name": "id",
    "data_type": "bigint",
    "is_nullable": "NO"
  },
  {
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO"
  },
  {
    "column_name": "key",
    "data_type": "text",
    "is_nullable": "NO"
  },
  {
    "column_name": "value",
    "data_type": "jsonb",
    "is_nullable": "YES"
  },
  {
    "column_name": "project_id",
    "data_type": "text",
    "is_nullable": "NO"
  },
]


To import you can use the following code:

import { getClient } from './supabase'
*/

export const getClient = (projectId) => ({
  get: async (key) => {
    const { data, error} = await (
      supabase
      .from('objects')
      .select('value')
      .eq('project_id', projectId)
      .eq('key', key)
    )

    if (error) {
      console.error(error)
      return null
    }

    return data
  },
  set: async (key, value) => {
    const { error } = await (
      supabase
      .from('objects')
      .upsert({ project_id: projectId, key, value })
    )

    if (error) {
      console.error(error)
      return false
    }

    return true
  },
  delete: async (key) => { const { error } = await (
      supabase
      .from('objects')
      .eq('project_id', projectId)
      .eq('key', key)
      .delete()
    )

    if (error) {
      console.error(error)
      return false
    }

    return true
  },
  getWithPrefix: async (prefix) => {
    const { data, error} = await (
      supabase
      .from('objects')
      .select('value')
      .eq('project_id', projectId)
      .like('key', `${prefix}%`)
    )

    if (error) {
      console.error(error)
      return null
    }

    return data
  }


})


