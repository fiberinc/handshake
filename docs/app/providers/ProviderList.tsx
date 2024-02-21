import { getProviderInfos } from "../getProviderInfos";
import { ProviderItem } from "./ProviderItem";

export async function ProviderList() {
  const infos = await getProviderInfos();

  const els = infos.map((info) => {
    return <ProviderItem key={info.id} {...info} />;
  });

  return <>{els}</>;
}
