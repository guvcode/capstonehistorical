"use client";
//import "ka-table/style.css";
import { useReactToPrint } from "react-to-print";
//import Html2Pdf from "js-html2pdf";
import "../../../../styles/kaoverides.css";
import React, { useRef } from "react";
import Image from "next/image";
import { Table } from "ka-table";
import { DataType, EditingMode, SortDirection, SortingMode } from "ka-table/enums";
import { useState, useEffect } from "react";


const imageStyles = {
  width: "900px",
  opacity: 0.99,
  align: "center",
};

const presentList = ["PC", "P", "CP", "LATE", "PP", "PA", "AP",];

const StudentReport = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [gridData, setgridDate] = useState([]);
  const [scoresGridData, setScoregridDate] = useState([]);

  let componentRef = useRef<HTMLDivElement>(null);

  /*  const handleDownload = useReactToPrint({
    onPrintError: (error) => console.log(error),
    content: () => componentRef.current,
    removeAfterPrint: true,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      if (document) {
        const html = document.getElementById("element-to-download-as-pdf");
        console.log(html);
        const exporter = new Html2Pdf(html, { filename: "test.pdf" });
        exporter.getPdf(true);
      }
    },
  }); */
  useEffect(() => {
    fetch("/api/students/zubeida.ogh@gmail.com")
      .then((res) => res.json())
      .then((data) => {
        if (data.data.docscores.length > 0)
          setScoregridDate(data.data.docscores);

        if (data.data.doc.length > 0) {
          setData(data.data.doc);
          setgridDate(
            data.data.doc.map(
              (
                { _id, email, name, instructor, classtime, course, ...item },
                index
              ) => {
                let oneOrZero = 0;
                //let classTimeTrimmed =
                if (
                  presentList.includes(
                    item.attendanceStatus.trim().toUpperCase()
                  )
                )
                  oneOrZero = 1;
                return {
                  ...item,
                  classDate: item.classDate.substring(0, 10),
                  id: index + 1,
                  oneOrZero: oneOrZero,
                };
              }
            )
          );
        }
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      {/* <button
        style={{ backgroundColor: "blue", marginLeft: "1%" }}
        onClick={handleDownload}
      >
        PDF
      </button> */}
      <section
        className="relative z-10 pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28"
        id="element-to-download-as-pdf"
        /* style={{
          opacity: "0.5",
          backgroundImage: "url(/images/logo/logo.png)",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }} */
      >
        <div className="absolute top-1/2 left-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2 transform">
          <img src="/images/logo/logologo.png" style={imageStyles} />
        </div>
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
                  <h3 className="mb-2 text-2xl font-bold leading-tight text-black dark:text-white">
                    TRANSCRIPT OF RECORDS
                  </h3>
                  <h5>-- UNDERGRADUATE --</h5>
                </div>
                {transcriptHeaderTable(scoresGridData)}
                {transcriptTable(scoresGridData)}
                <hr />
                <br />
                <br />
                <br />
                <div className="mt-12 font-bold leading-tight text-black dark:text-white">
                  <img
                    src="/images/logo/signature01.png"
                    className="mx-auto"
                    width={"200px"}
                  />
                  _____________________________ <br />
                  Mrs Olukemi Olaniyan Bed, Med.
                  <br />
                  Registrar/Admision Director
                </div>

                <span className="m-12 text-center text-xs text-body-color">
                  Transcript Date : {new Date().toString()}
                </span>
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
    </>
  );
};

const PageBody = (scoresGridData) => {
  return (
    <section
      className="relative z-10 pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28"
      id="element-to-download-as-pdf"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[900px] text-center">
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
                <h3 className="mb-2 text-2xl font-bold leading-tight text-black dark:text-white">
                  TRANSCRIPT OF RECORDS
                </h3>
                <h5>-- UNDERGRADUATE --</h5>
              </div>
              {transcriptHeaderTable(scoresGridData)}
              {transcriptTable(scoresGridData)}
              <hr />

              <span className="text-center text-xs text-body-color">
                Report Date : {new Date().toString()}
              </span>
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
  );
};
export default StudentReport;

function transcriptTable(gridData: any) {
  if (gridData.length < 1) return null;
  return (
    <Table
      columns={[
        {
          key: "type",
          title: "Course Code",
          dataType: DataType.String,
          style: { fontWeight: "bold" },
        },
        {
          key: "type",
          title: "Course Title",
          dataType: DataType.String,
          style: { fontWeight: "bold" },
          width: 400,
          sortDirection: SortDirection.Ascend
        },
        {
          key: "score",
          title: "Grade",
          dataType: DataType.String,
          style: { fontWeight: "bold" },
        },
        {
          key: "score",
          title: "Letter Grade",
          dataType: DataType.String,
          style: { fontWeight: "bold" },
        },
      ]}
      data={gridData}
      rowKeyField={"id"}
      //sortingMode={SortingMode.Single}
      format={({ column, value }) => {
        if (column.title === "Letter Grade") {
          return getLetterGrade(value);
        }

        if (column.title === "Course Code") {
          return getCourseCode(value);
        }
      }}
      childComponents={{
        dataRow: {
          elementAttributes: ({ rowData, index }) => ({
            style: {
              /*  backgroundColor:
                rowData.id % 2 ? "rgba(0, 0, 0, 0.9)" : "rgba(255,255, 255, 0)", */
            },
          }),
        },
      }}
    />
  );
}

function transcriptHeaderTable(doc: any) {
  //const doc = data.data.doc;

  const headerRow = [];
  headerRow.push(doc[0]);

  return (
    <>
      <Table
        columns={[
          {
            key: "studentID",
            title: "Id Number",
            dataType: DataType.String,
          },
          {
            key: "name",
            title: "Student",
            dataType: DataType.String,
          },
          {
            key: "course",
            title: "Program",
            dataType: DataType.String,
          },
          {
            key: "",
            title: "Gen Ave.",
            dataType: DataType.String,
          },
        ]}
        data={headerRow}
        rowKeyField={"name"}
      />
      <hr />
      <br />
    </>
  );
}

const getLetterGrade = (score: number) => {
  let letterGrade = "";

  if (score == 100) letterGrade = "A+";
  if (score >= 89 && score <= 99) letterGrade = "A-";
  if (score >= 85 && score <= 89) letterGrade = "B+";
  if (score >= 80 && score <= 84.9) letterGrade = "B-";
  if (score >= 70 && score <= 79) letterGrade = "B";
  if (score >= 60 && score <= 69) letterGrade = "C+";
  if (score >= 50 && score <= 59.9) letterGrade = "C-";
  if (score >= 45 && score <= 49) letterGrade = "D";
  if (score >= 0 && score <= 44.9) letterGrade = "F";

  return letterGrade;
};

/* 
          GRADE
100 -A+
89-91 A-

85-89 B+
80-84.5 B-
70-79 B
60-69 C+
50-59.5 C-
45-49 D
0-44 F


 Managing in the Digital Economy- BSA 229
 Small Business Management- BSA 230
 Business Ethics (Corporate Social Responsibility)- BSA 231
 Social Marketing and E-Commerce- BSA 232
 Strategic Management- BSA 233
 Applied Communications Concepts- BSA 234
 Computing Concepts- BSA 235
 Human Side of Information Systems- BSA 235
 Making Sense of Management- BSA 236
 Management Communication- BSA 237
 Professional Sales Skills- BSA 238
          */

const getCourseCode = (course: string) => {
  switch (course.trim().toUpperCase()) {
    case "Business Writing and Presentation Skills".toUpperCase():
    case "Business Writing and Presentation".toUpperCase():
      return "BSA-221";
    case "Management Computing".toUpperCase():
      return "BSA-222";
    case "Financial Accounting Fundamentals".toUpperCase():
      return "BSA-223";
    case "Management Practices".toUpperCase():
    case "Fundamentals Management Practices".toUpperCase():
      return "BSA-224";
    case "Marketing".toUpperCase():
      return "BSA-225";
    case "Fundamental of Operations Management".toUpperCase():
    case "Fundamentals of Operations Management".toUpperCase():
      return "BSA-226";
    case "Human Resource Management".toUpperCase():
      return "BSA-227";
    case "Interpersonal Business Communications".toUpperCase():
      return "BSA-228";
    case "Managing in the Digital Economy".toUpperCase():
      return "BSA-229";
    case "Small Business Management".toUpperCase():
    case "Small Business Management – Entrepreneurship".toUpperCase():
      return "BSA-230";
    case "Business Ethics (Corporate Social Responsibility)".toUpperCase():
    case "Business Ethics (CSR)".toUpperCase():
      return "BSA-231";
    case "Social Marketing and E-Commerce".toUpperCase():
      return "BSA-232";
    case "Fundamentals of Strategic Management".toUpperCase():
      return "BSA-233";
    case "Applied Communications Concepts".toUpperCase():
      return "BSA-234";
    case "Computing Concepts – Information Systems".toUpperCase():
      return "BSA-235";
    case "Human Side of Information Systems".toUpperCase():
      return "BSA-235B";
    case "Making Sense of Management".toUpperCase():
      return "BSA-236";
    case "Management Communication".toUpperCase():
      return "BSA-237";
    case "Professional Sales Skills".toUpperCase():
      return "BSA-238";
    default:
      return "-";
  }
};
