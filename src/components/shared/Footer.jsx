import React from "react";
import { PageContainer } from "@/components/shared/PageContainer";
import clsx from "clsx";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";

export const Footer = ({ className }) => {
  return (
    <div className={clsx(className)}>
      <div className="bg-slate-50 w-full mt-12">
        <PageContainer>
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <div className="flex flex-col justify-center gap-6 items-center md:gap-0 md:flex-row md:justify-between ">
              <div className="flex flex-col justify-center items-center md:items-start">
                <Link href="/" className="font-bold text-green-950">
                  GANGSALAN KIDUL
                </Link>

                <p className="mt-2 md:mt-0 text-xs text-center md:text-left max-w-md leading-relaxed text-gray-500">
                  Nglindur, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah
                  Istimewa Yogyakarta, Indonesia.
                </p>

                <p className="text-xs text-gray-500 mt-2 md:mt-0">
                  Copyright © 2024 KKN 85 UAJY Kelompok 31
                </p>
              </div>

              <ul className="flex justify-center gap-6 md:gap-8">
                <li>
                  <Tooltip content="Instagram">
                    <a
                      href="https://www.instagram.com/kim_padukuhangangsalankidul/"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:text-gray-700/75"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </Tooltip>
                </li>

                <li>
                  <Tooltip content="Tiktok">
                    <a
                      href="https://www.tiktok.com/@gangsalan.kidul"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:text-gray-700/75"
                    >
                      <span className="sr-only">Tiktok</span>
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        id="icons"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.321 5.562a5.109 5.109 0 0 1 -0.443 -0.258 6.234 6.234 0 0 1 -1.138 -0.967c-0.848 -0.971 -1.165 -1.956 -1.282 -2.645h0.005C16.366 1.12 16.406 0.75 16.412 0.75h-3.864v14.943c0 0.201 0 0.399 -0.008 0.595 0 0.024 -0.002 0.047 -0.004 0.073 0 0.011 0 0.022 -0.002 0.033v0.008a3.281 3.281 0 0 1 -1.651 2.604 3.225 3.225 0 0 1 -1.599 0.422c-1.8 0 -3.26 -1.468 -3.26 -3.281s1.459 -3.281 3.26 -3.281a3.23 3.23 0 0 1 1.004 0.159l0.005 -3.935a7.178 7.178 0 0 0 -5.531 1.618 7.584 7.584 0 0 0 -1.655 2.04c-0.163 0.281 -0.779 1.411 -0.853 3.246 -0.047 1.041 0.266 2.12 0.415 2.565v0.009c0.094 0.262 0.457 1.158 1.049 1.913A7.852 7.852 0 0 0 5.391 22.062v-0.009l0.009 0.009c1.871 1.271 3.945 1.188 3.945 1.188 0.359 -0.015 1.562 0 2.928 -0.647 1.515 -0.718 2.377 -1.787 2.377 -1.787a7.43 7.43 0 0 0 1.296 -2.153c0.35 -0.919 0.466 -2.022 0.466 -2.462V8.273c0.047 0.028 0.671 0.441 0.671 0.441s0.9 0.577 2.303 0.952c1.007 0.267 2.363 0.323 2.363 0.323v-3.836c-0.475 0.052 -1.44 -0.098 -2.429 -0.591" />
                      </svg>
                    </a>
                  </Tooltip>
                </li>

                <li>
                  <Tooltip content="Shopee">
                    <a
                      href="https://shopee.co.id/dediananto123"
                      rel="noreferrer"
                      target="_blank"
                      className="text-gray-700 transition hover:text-gray-700/75"
                    >
                      <span className="sr-only">Shopee</span>
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 5.76 5.76"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                      >
                        <path
                          fill="#000000"
                          d="m0.87 4.712 0.18 -0.012zM0.66 1.56v-0.18a0.18 0.18 0 0 0 -0.18 0.192zm4.23 3.152 -0.18 -0.012zM5.1 1.56l0.18 0.012A0.18 0.18 0 0 0 5.1 1.38zM1.05 4.7 0.84 1.548l-0.359 0.024 0.21 3.152zm4.02 0.024 0.21 -3.152 -0.359 -0.024 -0.21 3.152zm-0.359 -0.024a0.3 0.3 0 0 1 -0.299 0.28v0.36c0.347 0 0.635 -0.269 0.659 -0.616zm-4.02 0.024C0.714 5.071 1.002 5.34 1.349 5.34v-0.36a0.3 0.3 0 0 1 -0.299 -0.28zM2.22 1.44c0 -0.364 0.295 -0.66 0.66 -0.66V0.42c-0.563 0 -1.02 0.457 -1.02 1.02zm0.66 -0.66c0.364 0 0.66 0.295 0.66 0.66h0.36c0 -0.563 -0.457 -1.02 -1.02 -1.02zM0.66 1.74h4.44V1.38H0.66zm0.689 3.6H4.411v-0.36H1.349z"
                        />
                        <path
                          stroke="#000000"
                          strokeLinecap="round"
                          strokeWidth="0.36"
                          d="M3.42 2.52H2.64c-0.232 0 -0.42 0.188 -0.42 0.42v0c0 0.232 0.188 0.42 0.42 0.42h0.12m-0.06 0h0.42c0.232 0 0.42 0.188 0.42 0.42v0c0 0.232 -0.188 0.42 -0.42 0.42H2.34"
                        />
                      </svg>
                    </a>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </PageContainer>
      </div>
    </div>
  );
};
