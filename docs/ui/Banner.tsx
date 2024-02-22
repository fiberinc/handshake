interface Props {
  children: React.ReactNode;
}

export function Banner({ children }: Props) {
  return (
    <div className="bg-foreground text-contrast flex h-[30px] w-fit flex-row items-center rounded-md border p-2 text-[14px] antialiased">
      {children}
    </div>
  );
}
