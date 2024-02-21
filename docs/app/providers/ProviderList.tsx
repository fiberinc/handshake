import { MdxRender } from "~/ui/MdxRender";
import { ProviderInfo, getProviderInfos } from "../getProviderInfos";

export async function ProviderList() {
  const infos = await getProviderInfos();

  const els = infos.map((info) => {
    return <ProviderItem key={info.id} {...info} />;
  });

  return <>{els}</>;
}

export async function ProviderItem(info: ProviderInfo) {
  const markdown = <MdxRender {...info.serialized} />;

  return (
    <div key={info.id} id={info.id}>
      <h1 className="text-3xl font-medium">{info.name}</h1>
      {info.logoUrl && (
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-gray-800">
          <img src={info.logoUrl} width="30px" alt={`${info.name} logo`} />
        </div>
      )}
      {markdown}
    </div>
  );
}
