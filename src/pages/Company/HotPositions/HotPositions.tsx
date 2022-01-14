import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HotItem from '../../../components/Company/HotItem'
import * as api from '../../../services/api'
import { IJobs } from '../../../types'
interface Params {
  id: string
}
export default function HotPositions() {
  const params = useParams<Params>()
  const [jobs, setJobs] = useState<IJobs[]>([])
  useEffect(() => {
    const getDate = async () => {
      const result = await api.getCompanyHotJobs(params.id)
      if (result.data.stat === 'OK') {
        setJobs(result.data.rows)
      }
    }
    getDate()
  }, [params.id])
  return (
    <>
      {jobs.map((job) => (
        <HotItem key={job._id} job={job} />
      ))}
    </>
  )
}
