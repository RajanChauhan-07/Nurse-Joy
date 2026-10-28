"use client";

import React, { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SharedLayoutBgProps extends HTMLAttributes<HTMLElement> {
  as?: "ul" | "ol" | "div" | "nav" | "section";
  children?: ReactNode;
  className?: string;
  pillClassName?: string;
  pillContainerClassName?: string;
  inset?: number | string;
}

export const SharedLayoutBg = forwardRef<HTMLElement, SharedLayoutBgProps>(
  function SharedLayoutBg(
    {
      as = "div",
      children,
      className,
      pillClassName: _pillClassName,
      pillContainerClassName: _pillContainerClassName,
      inset: _inset,
      ...props
    },
    ref,
  ) {
    return React.createElement(
      as,
      {
        ref,
        className: cn("relative", className),
        ...props,
      },
      children,
    );
  },
);
