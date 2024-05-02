import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ImageProps {
  src: string;
  style?: React.CSSProperties;
  alt?: string;
  subtitle?: string;
  noShadow?: boolean;
}

export const MARKDOWN_COMPONENTS = {
  Comment(_: ComponentProps<"div">) {
    return null;
  },
  Image({ src, style, alt, subtitle, noShadow }: ImageProps) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
          overflow: "visible !important",
          // marginTop: '-20px',
          paddingBottom: "20px",
        }}
      >
        <img
          alt={alt}
          src={src}
          style={{
            maxWidth: "98%",
            maxHeight: "400px",
            // FIXME this is not working. This fucking [data-rmiz]
            // is giving the spans an overflow: hidden;
            boxShadow: noShadow
              ? undefined
              : "0 3px 15px 0 rgba(0,0,0,.05), 0 2px 2px 0 rgba(0,0,0,.1)",
            borderRadius: "8px",
            border: "1px solid var(--border-contrast)",
            margin: "0 auto",
            ...style,
          }}
        />
        {subtitle && (
          <p
            style={{
              opacity: ".7",
              fontSize: "13px",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  },
  DocsLink(props: ComponentProps<"a">) {
    return <a {...props}>Link to the documentation &rarr;</a>;
  },
  Callout({ children, variant }: ComponentProps<"div"> & { variant: "info" }) {
    return (
      <div className={twMerge("rounded-sm border p-4 text-[.95rem]")}>
        {children}
      </div>
    );
  },
};
