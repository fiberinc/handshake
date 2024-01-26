// @ts-nocheck

import { ProjectInfo, ProviderInfo } from "fiber-link";
import Head from "next/head";
import pckg from "../../../../../package.json";

interface Props {
  project: ProjectInfo;
  provider: ProviderInfo;
  onSubmit: (e: React.FormEvent) => void;
  isDisabled?: boolean;
  formElements?: React.ReactNode;
}

export function LinkPage({
  project,
  isDisabled = false,
  onSubmit,
  formElements,
  provider,
}: Props) {
  return (
    <>
      <Head>
        <title>Connect {provider.title}</title>
        <link rel="shortcut icon" href={provider.logo} />
      </Head>

      <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
        {/* {!brandId && <MissingBrandId />} */}
        <div className="flex w-[500px] max-w-full flex-col gap-4 rounded-xl border-[1px] border-[#EEE] bg-zinc-200 p-12">
          <header>
            <div className="flex justify-center pb-10">
              <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-zinc-100/80">
                <img alt="" width="40px" src={project.logo} />
              </div>
              <div className="ml-[-20px] flex h-[80px] w-[80px] items-center justify-center rounded-full bg-zinc-200/60">
                <img alt="" width="33px" src={provider.logo} />
              </div>
            </div>
            <h3>
              Connect your {provider.title}{" "}
              {project.id && `to ${upperCaseFirstLetter(project.id as string)}`}
            </h3>
          </header>

          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            {formElements}
            <button
              className="text-md justify-center rounded-md bg-black py-3 text-white dark:bg-white dark:text-black"
              disabled={isDisabled}
              onClick={(e) => {
                e.stopPropagation();
                onSubmit(e);
              }}
            >
              Authorize on {provider.title}
            </button>
          </form>

          <footer className="flex flex-col items-center opacity-20">
            <small>
              {process.env.NODE_ENV} &bull; v{pckg.version}
            </small>
          </footer>
        </div>
      </div>
    </>
  );
}

function upperCaseFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
