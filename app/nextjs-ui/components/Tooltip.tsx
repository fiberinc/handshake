// @ts-nocheck

import {
  autoPlacement,
  autoUpdate,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import dynamic from "next/dynamic";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  defaultOpen?: boolean;
  placement?: Placement;
  contentClassName?: string;
}

function Tooltip_({
  children,
  content,
  contentClassName,
  defaultOpen,
  placement,
  ...props
}: TooltipProps) {
  if (!content) {
    return <>{children}</>;
  }

  return (
    <FloatingTooltip initialOpen={defaultOpen} placement={placement}>
      <FloatingTooltipTrigger>{children}</FloatingTooltipTrigger>
      <FloatingTooltipContent>
        <div
          className={twMerge(
            "bg-navbar border-primary relative z-50 rounded-md border px-2 py-1.5 pr-2.5 leading-5 tracking-wide shadow-sm dark:text-white",
            contentClassName,
          )}
        >
          {typeof content === "string" ? (
            <p className="max-w-xs text-sm">{content}</p>
          ) : (
            content
          )}
        </div>
      </FloatingTooltipContent>
    </FloatingTooltip>
  );
}

interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useTooltip({
  initialOpen = false,
  placement = "top",
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: TooltipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      autoPlacement(),
      // flip({
      //   fallbackAxisSideDirection: 'start',
      //   crossAxis: placement.includes('-'),
      // }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    delay: 100,
    enabled: controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  );
}

type ContextType = ReturnType<typeof useTooltip> | null;

const FloatingTooltipContext = React.createContext<ContextType>(null);

export const useTooltipState = () => {
  const context = React.useContext(FloatingTooltipContext);

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context;
};

export function FloatingTooltip({
  children,
  ...options
}: { children: React.ReactNode } & TooltipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTooltip(options);

  return (
    <FloatingTooltipContext.Provider value={tooltip}>
      {children}
    </FloatingTooltipContext.Provider>
  );
}

export const FloatingTooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const state = useTooltipState();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([state.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      state.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": state.open ? "open" : "closed",
      }),
    );
  }

  return (
    // FELIPE: this was `button` before, which caused issues when Tooltip
    // wrapped around buttons.
    <div
      ref={ref}
      // The user can style the trigger based on the state
      className="w-fit cursor-pointer"
      data-state={state.open ? "open" : "closed"}
      {...state.getReferenceProps(props)}
    >
      {children}
    </div>
  );
});

export const FloatingTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent(props, propRef) {
  const state = useTooltipState();
  const ref = useMergeRefs([state.refs.setFloating, propRef]);

  return (
    <FloatingPortal>
      {state.open && (
        <div
          ref={ref}
          style={{
            position: state.strategy,
            top: state.y ?? 0,
            left: state.x ?? 0,
            visibility: state.x == null ? "hidden" : "visible",
            ...props.style,
          }}
          // {...state.getFloatingProps(props)}
        >
          {props.children}
        </div>
      )}
    </FloatingPortal>
  );
});

export const Tooltip = dynamic(() => Promise.resolve(Tooltip_), { ssr: false });
