"use client";

import { PropagateLoader } from "react-spinners";
import { CSSProperties } from "react";

interface LoaderProps {
  loading?: boolean;
  size?: number;
  color?: string;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "gray",
};

export default function Loader({
                                 loading = true,
                                 size = 10,
                                 color = "#3b82f6",
                               }: LoaderProps) {
  return (
    <div className="flex justify-center mt-8">
      <PropagateLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={size}
        aria-label="Loading Spinner"
      />
    </div>

  );
}
