
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import {
  Drawer,
  PanelLayout,
  ThreeColumnLayout,
  WalletProviderPopUp,
} from "../../components";
import { useRelay } from "../../context/RelayContext";
import TuningPanel from "../../components/TuningPanel";
import { useBitcoin } from "../../context/BitcoinContext";
import { useHaste } from '../../hooks/useHaste'
import { useRouter } from 'next/router'

import axios from 'axios'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

export default function PlayGame() {
  const { theme, setTheme } = useTheme();
  const { logout: logoutHaste } = useHaste();
  const [isDark, setIsDark] = useState(theme === "dark");
  const [walletPopupOpen, setWalletPopupOpen] = useState(false);

  const router = useRouter()

  const {haste, tokenDetails, login} = useHaste()

  const [leaderboards, setLeaderboards] = useState()

  const [leaderboard, setLeaderboard] = useState()


  function leaderboardSelected({leaderboard: leaderboard_id}) {

    console.log('haste.leaderboardSelected', {leaderboard_id})

    setLeaderboard(leaderboard_id)

  }

  const authenticated = tokenDetails?.isAuthenticated

  async function donePlaying() {
    console.log('play now clicked')

    if (!authenticated) {
      login()
      return
    }

    const { data } = await axios.post(`https://fluttergame.fun/api/v1/haste/scores`, {
      leaderboard_id: leaderboard,
      handcash_token: tokenDetails.token,
      play: {
        id: router.query.play_id
      },
      score: getRandomInt(1000)
    })

    console.log('haste.score.recorded', data)

  }

  function logout() {
    console.log('logout clicked')
    logoutHaste()
  }

  useEffect(() => {
    if (theme === "dark") {
      setIsDark(true);
    }
    if (theme === "light") {
      setIsDark(false);
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    }
    if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <PanelLayout>
      <div className="mx-auto max-w-xl col-span-12 lg:col-span-6 min-h-screen flex flex-col ">
        <div className="mt-7  p-4  ">
        <img src={'/flutter1-9-23_18.gif'} width='100%' layout='fill'/>


          <div className="bg-gray-100 dark:bg-gray-600 p-5 flex flex-col cursor-pointer my-4 rounded-lg">

            <p>Play ID: {router.query.play_id}</p>
          </div>
          {/* <div
            onClick={() => setWalletPopupOpen(true)}
            className="bg-gray-100 dark:bg-gray-600 p-5 flex items-center h-[78px] cursor-pointer my-4 rounded-lg"
          >
            <div className="flex flex-col">
              <p className="text-base font-semibold my-0.5 text-gray-700 dark:text-white">
                Select Wallet Provider
              </p>
              <p className="text-gray-400 dark:text-gray-300 text-sm tracking-normal	text-left my-0.5">
                Choose your way to interact with our app
              </p>
            </div>
            <div className="grow" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div> */}

          <button
            onClick={donePlaying}
            className="h-[52px] p-5 flex bg-red-500 text-white text-base font-semibold my-4 w-full border-none rounded-lg cursor-pointer items-center justify-center transition duration-500 transform hover:-translate-y-1 hover:bg-red-600"
          >
            Done Playing
          </button>
        </div>
        <div className="grow" />
        {/* <p className="mb-[68px] text-center text-xs text-gray-700 dark:text-gray-300 font-semibold ">
          Built for profit by
          <a
            href="https://twetch.com/u/652"
            target="_blank"
            rel="noreferrer"
            className="ml-1 cursor-pointer hover:underline"
          >
            @652
          </a>
          , powered by BitCoin
        </p> */}
      </div>
      <Drawer
        selector="#walletProviderPopupControler"
        isOpen={walletPopupOpen}
        onClose={() => setWalletPopupOpen(false)}
      >
        <WalletProviderPopUp onClose={() => setWalletPopupOpen(false)} />
      </Drawer>
    </PanelLayout>
  );
}
