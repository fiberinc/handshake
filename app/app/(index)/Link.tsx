// This is a work-in-progress.
// You can remove this if you don't want your users to see a UI.

import { getSanitizedHandlerInfo } from "./LocalIndex";

export async function Link() {
  const handlerInfos = await getSanitizedHandlerInfo();

  const els = handlerInfos.map((handlerInfo) => {
    const logoUrl = `https://handshake.cool/images/logos/${handlerInfo.provider.id}.svg`;

    function onClick() {}

    return (
      <div
        key={handlerInfo.id}
        className="flex h-[50px] cursor-pointer flex-row items-center justify-start gap-5 border px-4"
        onClick={onClick}
      >
        <div className="flex h-[20px] w-[20px] items-center justify-start">
          <img
            src={logoUrl}
            width={30}
            alt={`${handlerInfo.provider.title} logo`}
          />
        </div>
        {handlerInfo.provider.title}
      </div>
    );
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-[500px] flex-col items-center gap-10">
        <h3>Choose a tool:</h3>
        <main className="w-full border">{els}</main>
      </div>
    </div>
  );
}
