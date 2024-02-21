interface Props {
  children: React.ReactNode;
}

export function Banner({ children }: Props) {
  return (
    <div className="bg-foreground text-contrast w-fit rounded-md border p-2 py-0.5 text-sm">
      {children}
    </div>
  );
}
