"use client";
import { useCallback, useEffect, useState } from "react";
import { VIEWPORT_SIZES, ViewportSizeType, ViewportSize } from "./consts";
import { Resizable } from "re-resizable";
import {
  GripHorizontalIcon,
  GripVerticalIcon,
  SmartphoneIcon,
  Laptop2Icon,
  MonitorIcon,
} from "lucide-react";

interface ResponsiveIframeViewerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  title: string;
  width?: number;
  height?: number;
  size?: ViewportSizeType;
  showControls?: boolean;
  allowResizingY?: boolean;
  allowResizingX?: boolean;
}

interface ViewportChangeButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  size: ViewportSizeType;
  selected?: boolean;
}

const ViewportChangeButton = (props: ViewportChangeButtonProps) => {
  const { size, ...rest } = props;
  const iconSize = 18;

  return (
    <button
      {...rest}
      className={[
        "border-0", // Reset
        "w-10 h-10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-gray-100 focus:bg-gray-300 dark:hover:bg-gray-700 dark:focus:bg-gray-900 transition-all rounded-md",
        props.selected
          ? "bg-gray-200 dark:bg-gray-800"
          : "bg-transparent dark:bg-transparent",
        props.className,
      ].join(" ")}
    >
      {size === "mobile" ? (
        <SmartphoneIcon size={iconSize} />
      ) : size === "tablet" ? (
        <Laptop2Icon size={iconSize} />
      ) : (
        <MonitorIcon size={iconSize} />
      )}
    </button>
  );
};

const CornerHandle = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={[
      "relative left-[5px] top-[5px] w-4 h-4 group bg-gray-200 hover:bg-gray-100 focus:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-900 transition-all flex items-center justify-center",
      props.className,
    ].join(" ")}
  />
);

const CustomHandle = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={[
      "group absolute hover:z-20 bg-gray-200 hover:bg-gray-100 focus:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:bg-gray-900 transition-all flex items-center justify-center",
      props.className,
    ].join(" ")}
  />
);

const HorizontalHandle = ({ className }: { className?: string }) => (
  <CustomHandle className={className}>
    <GripHorizontalIcon className="w-4 text-black dark:text-white opacity-30 group-hover:opacity-70" />
  </CustomHandle>
);

const VerticalHandle = ({ className }: { className?: string }) => (
  <CustomHandle className={className}>
    <GripVerticalIcon className="text-black dark:text-white opacity-30 group-hover:opacity-70" />
  </CustomHandle>
);

export const ResponsiveIframeViewer = (props: ResponsiveIframeViewerProps) => {
  const {
    width = VIEWPORT_SIZES.desktop.width,
    height = VIEWPORT_SIZES.desktop.height,
    size,
    showControls = true,
    allowResizingY = false,
    allowResizingX = false,
    ...rest
  } = props;

  const getViewportSize = useCallback(() => {
    const viewportSize = size ? VIEWPORT_SIZES[size] : { width, height };
    return viewportSize;
  }, [size, width, height]);

  const [viewportSizeInternal, setViewportSizeInternal] = useState(
    getViewportSize()
  );

  const isSizeSelected = (size: ViewportSizeType) => {
    return (
      viewportSizeInternal.width === VIEWPORT_SIZES[size].width &&
      viewportSizeInternal.height === VIEWPORT_SIZES[size].height
    );
  };

  const Controls = () => {
    return showControls ? (
      <div className="flex items-center justify-center gap-2">
        <ViewportChangeButton
          size="mobile"
          onClick={() => setViewportSizeInternal(VIEWPORT_SIZES.mobile)}
          selected={isSizeSelected(ViewportSize.mobile)}
        />

        <ViewportChangeButton
          size="tablet"
          onClick={() => setViewportSizeInternal(VIEWPORT_SIZES.tablet)}
          selected={isSizeSelected(ViewportSize.tablet)}
        />

        <ViewportChangeButton
          size="desktop"
          onClick={() => setViewportSizeInternal(VIEWPORT_SIZES.desktop)}
          selected={isSizeSelected(ViewportSize.desktop)}
        />
      </div>
    ) : null;
  };

  useEffect(() => {
    setViewportSizeInternal(getViewportSize());
  }, [getViewportSize]);

  if (!allowResizingX && !allowResizingY) {
    return (
      <div
        className={[
          "flex flex-col gap-4 items-center justify-center",
          props.className,
        ].join(" ")}
      >
        <Controls />
        <iframe
          {...rest}
          height={viewportSizeInternal.height}
          width={viewportSizeInternal.width}
          className="border-none"
        />
      </div>
    );
  }

  return (
    <div
      className={[
        "flex flex-col gap-4 items-center justify-center",
        props.className,
      ].join(" ")}
    >
      <Controls />

      <Resizable
        defaultSize={{
          width: viewportSizeInternal.width,
          height: viewportSizeInternal.height,
        }}
        size={{
          width: viewportSizeInternal.width,
          height: viewportSizeInternal.height,
        }}
        onResizeStop={(_e, _direction, _ref, d) => {
          setViewportSizeInternal({
            width: viewportSizeInternal.width + d.width,
            height: viewportSizeInternal.height + d.height,
          });
        }}
        handleComponent={{
          // top: <HorizontalHandle />,
          right: (
            <VerticalHandle
              className={[
                "w-4",
                allowResizingY ? "h-[calc(100%+11px)]" : "h-full",
              ].join(" ")}
            />
          ),
          bottom: (
            <HorizontalHandle
              className={[
                "h-4",
                allowResizingX ? "w-[calc(100%+11px)]" : "w-full",
              ].join(" ")}
            />
          ),
          // left: <VerticalHandle />,
          bottomRight:
            allowResizingX && allowResizingY ? <CornerHandle /> : undefined,
        }}
        enable={{
          top: false, // top: allowResizingY,
          right: allowResizingX,
          bottom: allowResizingY,
          left: false, // left: allowResizingX,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
        className="hover:transition-none transition-all"
      >
        <iframe {...rest} className="border-none w-full h-full" />
      </Resizable>
    </div>
  );
};
