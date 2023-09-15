import { Header, SideBar } from "@/components";
import React from "react";
import { roboto } from "./_app";

const Questions = ({ question, answer }: any) => {
  return (
    <div className="self-stretch sm:flex-col justify-start items-start flex border-b pb-4 border-b-gray-200">
      <div className="pt-6 justify-center items-start md:gap-8 sm:inline-flex">
        <div className=" text-gray-900 text-base font-medium font-['Roboto'] leading-normal">
          {question}
        </div>
        <div className=" text-gray-500 text-base font-normal font-['Roboto'] leading-normal">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function help() {
  return (
    <SideBar>
      <div>
        <Header>
          <div
            className={`${roboto.className} text-gray-900 text-2xl font-semibold font-['Roboto Slab'] leading-loose`}
          >
            Help
          </div>{" "}
        </Header>
        <div className="w-full mt-40 px-10 pt-4 pb-10 bg-white rounded-lg shadow border border-zinc-300 flex-col justify-start items-start gap-4 inline-flex">
          <div className="self-stretch flex-col justify-start items-start flex">
            <div className="self-stretch text-gray-700 text-[28px] font-bold font-['Roboto'] leading-[48px]">
              Hi, how can we help you?
            </div>
            <div className="self-stretch h-10 p-2 flex-col justify-start items-start gap-4 flex">
              <div className="self-stretch text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
                Search for answers to your problems in the search field below.
              </div>
            </div>
          </div>
          <div className="self-stretch pl-2 flex-col justify-start items-start flex">
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <div className="grow shrink basis-0 self-stretch pl-px pr-[13px] py-[9px] justify-start items-center gap-3 flex">
                <div className="w-5 h-5 relative" />
                <div className="grow shrink basis-0 text-gray-500 text-sm font-normal font-['Roboto'] leading-tight">
                  Search
                </div>
              </div>
              <div className="px-6 py-3 bg-violet-700 rounded-md shadow justify-center items-center flex">
                <div className="text-white text-lg font-medium font-['Roboto'] leading-normal">
                  Search
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full mt-10 px-10 pt-6 pb-10 bg-white rounded-lg flex-col justify-start items-start gap-10 inline-flex">
        <div className="self-stretch flex-col justify-start items-start flex">
          <div className="self-stretch h-20 flex-col justify-start items-start flex">
            <div className="self-stretch text-gray-700 text-[28px] font-bold font-['Roboto'] leading-[48px]">
              Frequently Asked Questions
            </div>
            <div className="self-stretch p-2 flex-col justify-start items-start gap-4 flex">
              <div className="self-stretch text-zinc-500 text-base font-normal font-['Roboto'] leading-normal">
                Find answers to some commonly asked question.
              </div>
            </div>
          </div>
          <div className="self-stretch flex-col justify-start items-start flex">
            <div className="self-stretch h-px bg-gray-200" />
            <div className="self-stretch flex-col justify-start items-start gap-8 flex">
              <Questions
                question="How do i recieve my document after printing"
                answer="You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus."
              />
              <Questions
                question="How do i recieve my document after printing"
                answer="You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus."
              />
              <Questions
                question="How do i recieve my document after printing"
                answer="You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus."
              />
              <Questions
                question="How do i recieve my document after printing"
                answer="You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus."
              />
              <Questions
                question="How do i recieve my document after printing"
                answer="You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus."
              />
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}
