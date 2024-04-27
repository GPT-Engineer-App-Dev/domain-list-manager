import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://adlzdmxeyzrvgygumdlq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkbHpkbXhleXpydmd5Z3VtZGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNDQ5NzgsImV4cCI6MjAyOTgyMDk3OH0.0vS3BzSD8sQ3mCp2EKGEI24uaNnn4S6b7FzFmranq_Y'

const supabase = createClient(supabaseUrl, supabaseKey)

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
    const { data, error } = await (
      supabase
      .from('objects')
      .select('value')
      .eq('project_id', projectId)
      .like('key', `${prefix}%`)
    );

    if (error) {
      console.error(error);
      return null;
    }

    return data.map(item => item.value);
  }
})