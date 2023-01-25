import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import {
  ThreeColumnLayout,
  Loader,
  SimplePostCard,
  QuestionCard,
  Placeholder,
  Composer,
  PostCard,
  OnchainPostCard,
} from ".";
import Link from "next/link";

import moment from "moment";
import { useTuning } from "../context/TuningContext";
import { useRouter } from "next/router";
import { useBitcoin } from "../context/BitcoinContext";
import Image from 'next/image'

import { useHaste } from "../hooks/useHaste";
import loader from "../loader";

function ago(period) {
  return moment().subtract(1, period).unix() * 1000;
}

const Dashboard = ({ error, loading }) => {
  const router = useRouter();
  const { authenticated } = useBitcoin();
  const { startTimestamp, tag, setTag } = useTuning();
  const { login } = useHaste()

  function playNow() {
    login()

  }

  const handleChangeTab = (tag) => {
    switch (tag) {
      case "":
        router.push("/");
        break;
      //case "1F9E9":
      case "question":
        router.push("/questions");
        break;
      //case "1F4A1":
      case "answer":
        router.push("/answers");
        break;
      //case "1F48E":
      case "project":
        router.push("/projects");
        break;
      case "test":
        router.push("/test");
        break;
      default:
        console.log("unknown tag");
    }
  };

  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">
          <div className="hidden lg:block mt-8">
            <Image loader={loader} src={'flutter1-9-23_18.gif'} width='100%' />
            <button onClick={playNow} className="h-[52px] p-5 flex bg-blue-500 text-white text-base font-semibold my-4 w-full border-none rounded-lg cursor-pointer items-center justify-center transition duration-500 transform hover:-translate-y-1 hover:bg-green-600">Play Now</button>
          </div>
        <div className="px-4 mt-2">
          <div className="flex my-6">
            <div className="flex">
              {/* <div
                onClick={() => handleChangeTab("")}
                className={
                  tag === ""
                    ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                    : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                }
              >
                All 🦚
              </div> */}

              {/* <div
                //onClick={() => handleChangeTab("1F48E")}
                onClick={() => handleChangeTab("project")}
                className={
                  //tag === "1F48E"
                  tag === "project"
                    ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                    : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                }
              >
                Experiments 💎
              </div> */}
              {/* <div
                  onClick={() => handleChangeTab("test")}
                  className={
                    tag === "test"
                      ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                      : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                  }
                >
                  Tests 🐛
                </div> */}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="relative">
            {/* <InfiniteScroll
                dataLength={posts.length}
                hasMore={hasMore}
                next={fetchMore}
                loader={<Loader />}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                refreshFunction={refresh}
              >
              </InfiniteScroll> */}
            

            {loading && <Loader />}


            {/* {!recentLoading &&
                !recentError &&
                recent.questions.map((post) => (
                  <QuestionCard key={post.tx_id} post={post} />
                ))} */}
          </div>
        </div>
        {authenticated && (
          <Link href="/compose">
            <div className=" lg:hidden fixed bottom-[73px] right-[14px] h-14 w-14 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </Link>
        )}
      </div>
    </ThreeColumnLayout>
  );
};

export default Dashboard;
