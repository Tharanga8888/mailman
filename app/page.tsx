
"use client";

import Link from "next/link";
import { useState } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type RequestTab = "Params" | "Headers" | "Body";

const methods: HttpMethod[] = ["GET", "POST", "PUT", "DELETE"];
const tabs: RequestTab[] = ["Params", "Headers", "Body"];

export default function Home() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/posts/1",
  );
  const [activeTab, setActiveTab] = useState<RequestTab>("Params");
  const [notice, setNotice] = useState(
    "Your response will appear here.",
  );

  return (
    <main className="min-h-screen bg-[#0b0e14] text-slate-200">
      <header className="flex h-16 items-center justify-between border-b border-white/10 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-cyan-400 font-bold text-slate-950">
            M
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Mailman
          </span>
          <span className="hidden rounded-md border border-white/10 px-2 py-1 text-xs text-slate-400 sm:inline">
            API Client
          </span>
        </Link>

        <span className="text-xs text-slate-500">
          A developer tool, built from scratch
        </span>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-cyan-400">
            API WORKSPACE
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Request builder
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Build HTTP requests, configure your inputs, and inspect
            server responses in one place.
          </p>
        </div>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111620] shadow-2xl shadow-black/20">
          <div className="border-b border-white/10 px-4 py-4 sm:px-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
              Request
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                aria-label="HTTP method"
                value={method}
                onChange={(event) =>
                  setMethod(event.target.value as HttpMethod)
                }
                className="h-11 rounded-lg border border-white/10 bg-[#0b0e14] px-3 text-sm font-semibold text-emerald-400 outline-none focus:border-cyan-400 sm:w-32"
              >
                {methods.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                aria-label="Request URL"
                type="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="Enter an API URL"
                className="h-11 min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0b0e14] px-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />

              <button
                type="button"
                onClick={() =>
                  setNotice(
                    "The request engine is our next milestone. No HTTP request has been sent yet.",
                  )
                }
                className="h-11 rounded-lg bg-cyan-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#111620]"
              >
                Send request
              </button>
            </div>
          </div>

          <div className="border-b border-white/10 px-4 sm:px-5">
            <div className="flex gap-6" role="tablist" aria-label="Request settings">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  id={`tab-${tab.toLowerCase()}`}
                  aria-selected={activeTab === tab}
                  aria-controls="request-tab-panel"
                  onClick={() => setActiveTab(tab)}
                  className={`border-b-2 py-4 text-sm transition ${
                    activeTab === tab
                      ? "border-cyan-400 font-medium text-cyan-300"
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab}
                  {tab === "Headers" && (
                    <span className="ml-2 rounded bg-white/5 px-1.5 py-0.5 text-xs">
                      0
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div
            id="request-tab-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab.toLowerCase()}`}
            className="min-h-48 p-4 sm:p-5"
          >
            {activeTab === "Params" && (
              <div>
                <h2 className="text-sm font-medium text-slate-200">
                  Query parameters
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Add parameters to your URL in the next development step.
                  For now, you can enter a complete URL above.
                </p>
              </div>
            )}

            {activeTab === "Headers" && (
              <div>
                <h2 className="text-sm font-medium text-slate-200">
                  Request headers
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Custom key-value headers will be configurable here.
                </p>
              </div>
            )}

            {activeTab === "Body" && (
              <div>
                <h2 className="text-sm font-medium text-slate-200">
                  Request body
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  JSON request-body editing will be available for methods
                  such as POST and PUT.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#111620]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
            <div>
              <h2 className="font-semibold text-slate-100">Response</h2>
              <p className="mt-1 text-xs text-slate-500">
                Response data and request metrics
              </p>
            </div>

            <span className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400">
              Not sent
            </span>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0b0e14] p-6">
              <div className="max-w-md text-center">
                <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-white/5 text-lg text-cyan-300">
                  {"{}"}
                </div>
                <p className="text-sm font-medium text-slate-300">
                  Ready when you are
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {notice}
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-8 flex flex-col gap-2 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Mailman · Mini API testing tool</span>
          <span>Built with Next.js, TypeScript and Tailwind CSS</span>
        </footer>
      </div>
    </main>
  );
}
