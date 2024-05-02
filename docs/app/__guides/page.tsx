import Link from "next/link";
import { getGuides } from "./[slug]/loaders";

export default async function Page() {
  const guides = await getGuides();

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-contrast text-5xl">Guides</h1>
      </header>
      <ul className="flex list-none flex-col gap-5">
        {guides.map((guide) => {
          return (
            <li key={guide.slug}>
              <Link href={`/guides/${guide.slug}`}>
                <div className="">
                  <h2 className="text-contrastn text-lg">{guide.title}</h2>
                  <p className="text-sm">{guide.subtitle}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
