import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useAPI } from "../hooks/useAPI";
import { useTuning } from "../context/TuningContext";
import { useRouter } from 'next/router'
import { useHaste } from '../hooks/useHaste'

const Index = () => {

  return (
    <Dashboard
      error={null}
      loading={false}
    />
  );
};

export default Index;
