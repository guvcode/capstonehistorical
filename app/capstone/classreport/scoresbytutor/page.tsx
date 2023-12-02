"use client";
import "ka-table/style.css";
import React from "react";

import { Table } from "ka-table";
import { DataType, SortingMode } from "ka-table/enums";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface studentRecord {
  count: any;
  total: number;
  _id: string;
  name: string;
  email: string;
  instructor: string;
  course: string;
  classtime: string;
  classDate: string;
  score: number;
  type: string;
}
interface gridHeader {
  key: string;
  title: string;
  width: number;
  dataType: DataType;
}

let gridCollection = [];

const transpose = (matrix: studentRecord[]) => {
  const uniqueClassTimes = matrix
    .filter(
      (thing, i, arr) =>
        arr.findIndex((t) => t.classtime === thing.classtime) === i
    )
    .map((filteredObj) => filteredObj.classtime);

  let overallResult = [];
  for (const classtime of uniqueClassTimes) {
    let gridColumns: gridHeader[] = [];
    const currentMatrix = matrix.filter((item) => {
      return item.classtime == classtime;
    });
    let result = [];
    gridColumns.length = 0;
    gridColumns.push({
      key: "name",
      title: "Student",
      width: 250,
      dataType: DataType.String,
    });

    for (const item of currentMatrix) {
      let aRow = result.find((student) => student.email === item.email);
      if (aRow) {
        aRow[item.type] = item.score;
        aRow.total += item.score;
        aRow.count++;
        aRow.average = (aRow.total / aRow.count).toFixed(2);
        //aRow.average =
        updateGridHeader(item.type, gridColumns);
      } else {
        result.push({
          name: titleCase(item.name),
          email: item.email,
          total: item.score,
          course: item.course,
          classtime: item.classtime,
          count: 1,
          average: item.score,
          [item.type]: item.score,
        });
        updateGridHeader(item.type, gridColumns);
      }
    }

    gridColumns.push({
      key: "total",
      title: "Total",
      width: 60,
      dataType: DataType.Number,
    });

    gridColumns.push({
      key: "average",
      title: "Average",
      width: 60,
      dataType: DataType.Number,
    });
    const key = classtime;
    gridCollection.push({ key, gridColumns });
    overallResult.push(result);
  }

  return overallResult;
};

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

const updateGridHeader = (type, gridColumns: gridHeader[]) => {
  const newHeader = {
    key: type,
    title: type,
    width: 60,
    dataType: DataType.String,
  };
  let gridColumn = gridColumns.find((header) => header.key === type);
  if (!gridColumn) gridColumns.push(newHeader);
};
const ScoreReport = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [gridData, setgridData] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    /*  const course = "Medical Office Assistant";
    const time = "Monday 7-8pm";
    const tutor = "Mr Fobete"; */
    const tutor = searchParams.get("tutor");

    fetch(`/api/scores/${tutor}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setgridData(transpose(data.data.doc));
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!gridData || gridData?.length == 0) return <p>No data</p>;

  return (
    <>
      <section className="relative z-10 pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[1200px] text-center">
                <div className="flex max-w-full justify-center px-4 xl:mr-12">
                  <Image
                    src="/images/logo/logo.png"
                    alt="logo"
                    width={280}
                    height={60}
                    className="mx-auto dark:hidden"
                  />{" "}
                </div>
                <div className="mx-auto mb-12 text-center">
                  {" "}
                  <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">
                    Class Scores Report{" "}
                  </h3>
                </div>
                <div className="w-full table-auto overflow-x-scroll">
                  {scoresHeadertable(data)}
                  {scorestable(gridData)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 bottom-0 z-[-1] hidden sm:block">
          <svg
            width="406"
            height="286"
            viewBox="0 0 406 286"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <rect
                opacity="0.5"
                x="56.25"
                y="110.344"
                width="116.719"
                height="116.438"
                stroke="url(#paint0_linear_116:1140)"
              />
              <rect
                opacity="0.1"
                x="56.25"
                y="110.344"
                width="116.719"
                height="116.438"
                fill="url(#paint1_linear_116:1140)"
              />
              <path
                opacity="0.5"
                d="M172.688 110.344L229.219 51V167.601L172.688 226.781V110.344Z"
                stroke="url(#paint2_linear_116:1140)"
              />
              <path
                opacity="0.1"
                d="M172.688 110.344L229.219 51V167.601L172.688 226.781V110.344Z"
                fill="url(#paint3_linear_116:1140)"
              />
              <path
                opacity="0.5"
                d="M0 169.619L56.25 110.344V226.85L0 286.125V169.619Z"
                stroke="url(#paint4_linear_116:1140)"
              />
              <path
                opacity="0.1"
                d="M0 169.619L56.25 110.344V226.85L0 286.125V169.619Z"
                fill="url(#paint5_linear_116:1140)"
              />
              <rect
                opacity="0.5"
                x="228.938"
                y="51.2812"
                width="119.25"
                height="116.438"
                stroke="url(#paint6_linear_116:1140)"
              />
              <rect
                opacity="0.1"
                x="228.938"
                y="51.2812"
                width="119.25"
                height="116.438"
                fill="url(#paint7_linear_116:1140)"
              />
              <path
                opacity="0.5"
                d="M347.906 51.2812L405 2V110.113L347.906 167.719V51.2812Z"
                stroke="url(#paint8_linear_116:1140)"
              />
              <path
                opacity="0.1"
                d="M347.906 51.2812L405 2V110.113L347.906 167.719V51.2812Z"
                fill="url(#paint9_linear_116:1140)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_116:1140"
                x1="49.0781"
                y1="112.313"
                x2="148.922"
                y2="131.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_116:1140"
                x1="179.141"
                y1="209.062"
                x2="32.6026"
                y2="145.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_116:1140"
                x1="170.016"
                y1="125.25"
                x2="217.542"
                y2="125.507"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_116:1140"
                x1="233.578"
                y1="113.156"
                x2="146.509"
                y2="143.95"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_116:1140"
                x1="-3.45633"
                y1="113.316"
                x2="46.311"
                y2="116.426"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_116:1140"
                x1="69.8907"
                y1="189.234"
                x2="84.0124"
                y2="249.947"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_116:1140"
                x1="218.953"
                y1="157.453"
                x2="330.261"
                y2="148.369"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_116:1140"
                x1="348.187"
                y1="46.6406"
                x2="280.112"
                y2="168.552"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_116:1140"
                x1="329"
                y1="190"
                x2="369.525"
                y2="-29.8829"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint9_linear_116:1140"
                x1="409"
                y1="10"
                x2="331.729"
                y2="34.2741"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute top-0 right-0 z-[-1] hidden sm:block">
          <svg
            width="406"
            height="286"
            viewBox="0 0 406 286"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <rect
                opacity="0.5"
                x="57.25"
                y="108.344"
                width="116.719"
                height="116.438"
                stroke="url(#paint0_linear_116:1151)"
              />
              <rect
                opacity="0.1"
                x="57.25"
                y="108.344"
                width="116.719"
                height="116.438"
                fill="url(#paint1_linear_116:1151)"
              />
              <path
                opacity="0.5"
                d="M173.688 108.344L230.219 49V165.601L173.688 224.781V108.344Z"
                stroke="url(#paint2_linear_116:1151)"
              />
              <path
                opacity="0.1"
                d="M173.688 108.344L230.219 49V165.601L173.688 224.781V108.344Z"
                fill="url(#paint3_linear_116:1151)"
              />
              <path
                opacity="0.5"
                d="M1 167.619L57.25 108.344V224.85L1 284.125V167.619Z"
                stroke="url(#paint4_linear_116:1151)"
              />
              <path
                opacity="0.1"
                d="M1 167.619L57.25 108.344V224.85L1 284.125V167.619Z"
                fill="url(#paint5_linear_116:1151)"
              />
              <rect
                opacity="0.5"
                x="229.938"
                y="49.2812"
                width="119.25"
                height="116.438"
                stroke="url(#paint6_linear_116:1151)"
              />
              <rect
                opacity="0.1"
                x="229.938"
                y="49.2812"
                width="119.25"
                height="116.438"
                fill="url(#paint7_linear_116:1151)"
              />
              <path
                opacity="0.5"
                d="M348.906 49.2812L406 0V108.113L348.906 165.719V49.2812Z"
                stroke="url(#paint8_linear_116:1151)"
              />
              <path
                opacity="0.1"
                d="M348.906 49.2812L406 0V108.113L348.906 165.719V49.2812Z"
                fill="url(#paint9_linear_116:1151)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_116:1151"
                x1="50.0781"
                y1="110.313"
                x2="149.922"
                y2="129.859"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_116:1151"
                x1="180.141"
                y1="207.062"
                x2="33.6026"
                y2="143.47"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_116:1151"
                x1="171.016"
                y1="123.25"
                x2="218.542"
                y2="123.507"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_116:1151"
                x1="234.578"
                y1="111.156"
                x2="147.509"
                y2="141.95"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_116:1151"
                x1="85.5"
                y1="71.5"
                x2="100.174"
                y2="270.716"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_116:1151"
                x1="70.8907"
                y1="187.234"
                x2="85.0124"
                y2="247.947"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_116:1151"
                x1="219.953"
                y1="155.453"
                x2="331.261"
                y2="146.369"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_116:1151"
                x1="349.187"
                y1="44.6406"
                x2="281.112"
                y2="166.552"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_116:1151"
                x1="394.75"
                y1="64.3284"
                x2="409.531"
                y2="110.901"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint9_linear_116:1151"
                x1="410"
                y1="8.00001"
                x2="332.729"
                y2="32.2741"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
      <span>
        <span className="text-center text-xs text-body-color">
          Report Date : {new Date().toString()}
        </span>
      </span>
    </>
  );
};

export default ScoreReport;
const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};
function scorestable(gridData: any) {
  const allTables = [];
  gridData.forEach((classTime) => {
    const currGrodCols = gridCollection.filter(
      (row) => row.key == classTime[0].classtime
    );
    const numberofbreaks = Math.floor((currGrodCols[0].gridColumns.length + 5) / 6);
    const newGridColumns = chunkIntoN(
      currGrodCols[0].gridColumns,
      numberofbreaks
    );
    const nameColumn = newGridColumns[0][0];
    const tables = newGridColumns.map((data, id, { length }) => {
      if (id > 0) data.unshift(nameColumn);
      const headerRow = [];
      headerRow.push(classTime[0]);
      return (
        <>
          <Table
            columns={[
              {
                key: "course",
                title: "Course",
                dataType: DataType.String,
              },
              {
                key: "classtime",
                title: "Class Time",
                dataType: DataType.String,
              },
            ]}
            data={headerRow}
            rowKeyField={"course"}
          />

          <Table
            //key={id}
            columns={data}
            data={classTime}
            rowKeyField={"name"}
            sortingMode={SortingMode.Single}
          />
          <br />
          <br />
          <hr />
        </>
      );
    });

    allTables.push(tables);
  });
  return <>{allTables}</>;
}

function scoresHeadertable(data: any) {
  const doc = data.data.doc;
  const headerRow = [];
  headerRow.push(doc[0]);
  return (
    <>
      <Table
        columns={[
          {
            key: "instructor",
            title: "Tutor",
            dataType: DataType.String,
          },
        ]}
        data={headerRow}
        rowKeyField={"instructor"}
      />
      <br />
      <hr />
      <br />
    </>
  );
}
function item(
  value: studentRecord,
  index: number,
  array: studentRecord[]
): value is studentRecord {
  throw new Error("Function not implemented.");
}
