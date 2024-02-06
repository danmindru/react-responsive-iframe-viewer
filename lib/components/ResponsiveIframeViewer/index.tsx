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
  FullscreenIcon,
  Tv2Icon,
  ScanIcon,
} from "lucide-react";

interface ResponsiveIframeViewerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  title: string;
  width?: number;
  height?: number;
  size?: ViewportSizeType;
  minWidth?: number;
  minHeight?: number;
  showControls?: boolean;
  enabledControls?: ViewportSizeType[];
  allowResizingY?: boolean;
  allowResizingX?: boolean;
  iframeClassName?: string;
  resizableContainerClassName?: string;
  overrideViewportSizes?: Partial<
    Record<
      ViewportSizeType,
      {
        width: number | string;
        height: number | string;
      }
    >
  >;
}

interface ViewportChangeButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  size: ViewportSizeType;
  selected?: boolean;
}

const ViewportChangeButton = (props: ViewportChangeButtonProps) => {
  const { size, ...rest } = props;
  const iconSize = 18;

  let icon = <FullscreenIcon size={iconSize} />;
  switch (size) {
    case ViewportSize.mobile:
    case ViewportSize.sm:
      icon = <SmartphoneIcon size={iconSize} />;
      break;
    case ViewportSize.tablet:
    case ViewportSize.md:
      icon = <Laptop2Icon size={iconSize} />;
      break;
    case ViewportSize.desktop:
    case ViewportSize.lg:
    case ViewportSize.xl:
      icon = <MonitorIcon size={iconSize} />;
      break;

    case ViewportSize["2xl"]:
    case ViewportSize["3xl"]:
      icon = <Tv2Icon size={iconSize} />;
      break;

    default:
      icon = <ScanIcon size={iconSize} />;
      break;
  }

  return (
    <button
      {...rest}
      className={[
        "border-0", // Reset
        "cursor-pointer w-10 h-10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-gray-100 focus:bg-gray-300 dark:hover:bg-gray-700 dark:focus:bg-gray-900 transition-all rounded-md",
        props.selected
          ? "bg-gray-200 dark:bg-gray-800"
          : "bg-transparent dark:bg-transparent",
        props.className,
      ].join(" ")}
    >
      {icon}
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
    minWidth = 200,
    minHeight = 200,
    enabledControls = [
      ViewportSize.mobile,
      ViewportSize.tablet,
      ViewportSize.desktop,
      ViewportSize.fluid,
    ],
    overrideViewportSizes,
    showControls = true,
    allowResizingY = false,
    allowResizingX = false,
    iframeClassName = "",
    resizableContainerClassName = "",
    ...rest
  } = props;

  const getViewportSize = useCallback(() => {
    const viewportSize = size ? VIEWPORT_SIZES[size] : { width, height };
    return viewportSize;
  }, [size, width, height]);

  const [viewportSizeInternal, setViewportSizeInternal] = useState<{
    width: number | string;
    height: number | string;
  }>(getViewportSize());

  const updateViewportSize = useCallback(
    (
      { width, height }: { width: number | string; height: number | string },
      size?: ViewportSizeType
    ) => {
      // Handle known viewports, applying overrides if necessary.
      if (size) {
        const viewportWidth =
          overrideViewportSizes?.[size]?.width || VIEWPORT_SIZES[size].width;
        const viewportHeight =
          overrideViewportSizes?.[size]?.height || VIEWPORT_SIZES[size].height;

        setViewportSizeInternal({
          width: viewportWidth,
          height: viewportHeight,
        });

        return;
      }

      // Arbitrary dimensions.
      if (typeof width === "number" && typeof height === "number") {
        const nextWidth = width < (minWidth || 0) ? minWidth : width;
        const nextHeight = height < (minHeight || 0) ? minHeight : height;

        setViewportSizeInternal({ width: nextWidth, height: nextHeight });
      } else {
        setViewportSizeInternal({ width, height });
      }
    },
    [setViewportSizeInternal, minWidth, minHeight, overrideViewportSizes]
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
        {enabledControls.map((size) => {
          return (
            <ViewportChangeButton
              key={size}
              size={size}
              onClick={() => updateViewportSize(VIEWPORT_SIZES[size], size)}
              selected={isSizeSelected(size)}
            />
          );
        })}
      </div>
    ) : null;
  };

  useEffect(() => {
    updateViewportSize(getViewportSize(), size);
  }, [getViewportSize, updateViewportSize, size]);

  if (!allowResizingX && !allowResizingY) {
    return (
      <div
        className={[
          "h-full w-full flex flex-col gap-4 items-center justify-center",
          props.className,
        ].join(" ")}
      >
        <Controls />
        <iframe
          {...rest}
          height={viewportSizeInternal.height}
          width={viewportSizeInternal.width}
          className={["border-none", iframeClassName].join(" ")}
        />
      </div>
    );
  }

  return (
    <div
      className={[
        "h-full w-full flex flex-col gap-4 items-center justify-center",
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
        minWidth={viewportSizeInternal.width === "100%" ? undefined : minWidth}
        minHeight={
          viewportSizeInternal.height === "100%" ? undefined : minHeight
        }
        onResizeStop={(_e, _direction, ref, d) => {
          if (
            typeof viewportSizeInternal.width === "number" &&
            typeof viewportSizeInternal.height === "number"
          ) {
            updateViewportSize({
              width: viewportSizeInternal.width + d.width,
              height: viewportSizeInternal.height + d.height,
            });
          } else {
            const existingSize = ref.getBoundingClientRect();

            updateViewportSize({
              width: existingSize.width + d.width,
              height: existingSize.height + d.height,
            });
          }
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
        className={[
          "hover:transition-none transition-all",
          resizableContainerClassName,
        ].join(" ")}
      >
        <iframe
          {...rest}
          className={["border-none w-full h-full", iframeClassName].join(" ")}
        />
      </Resizable>
    </div>
  );
};
