import React from 'react'
import { useState } from 'react'
import { useTuning } from '../context/TuningContext'

import axios from 'axios'

import {useAPI} from '../hooks/useAPI'

const TuningPanel = ({ closeAction }) => {
    const { filter, setFilter, zenMode, setZenMode } = useTuning()

    const [leaderboard, setLeaderboard] = useState()

    const { data, loading } = useAPI(`/haste/leaderboards`)

    const leaderboards = data?.leaderboards

    if (loading) { return <div>Loading Leaderboards...</div> }

    const handleChange = (e) => {

      console.log('e.target.value', e.target.value)

      setLeaderboard(e.target.value);
      if (closeAction !== null){

        closeAction({ leaderboard: e.target.value })
      }
      
    }
    const toggleZen = () => {
      setZenMode(!zenMode)
      if (closeAction !== null){

        closeAction()     
      }
    }
  return (
    <div className='flex flex-col'>
      <div className='flex items-center w-full'>
          <label htmlFor="filter" className="text-sm font-medium text-gray-700 dark:text-gray-200">Leaderboard:</label>
          <select  onChange={handleChange} id="filter" className="ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block grow p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {leaderboards.map((leaderboard) => {
            return <option value={leaderboard.id}>{leaderboard.formattedCostString}</option>
          })}
          </select>
      </div>

    </div>
  )
}

export default TuningPanel
