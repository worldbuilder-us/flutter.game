import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useAPI } from "../hooks/useAPI";
import { useTuning } from "../context/TuningContext";
import { useRouter } from 'next/router'
import { useHaste } from '../hooks/useHaste'

const Index = () => {
  const { startTimestamp } = useTuning();


  const { query, push } = useRouter()

  if (query.idToken) {
    console.log('idToken', query.idToken)

    //push('/')

    localStorage.setItem('haste.idToken', query.idToken)

  }

  const haste = useHaste()

  useEffect(() => {

    window.haste = haste

  }, [haste])


  return (
    <Dashboard
      error={null}
      loading={false}
    />
  );
};

export default Index;
