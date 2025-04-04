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
  RectangleVertical,
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
  fluidX?: boolean;
  fluidY?: boolean;
  onIframeLoad?: (
    event: React.SyntheticEvent<HTMLIFrameElement, Event>
  ) => void;
  overrideViewportSizes?: Partial<
    Record<
      ViewportSizeType,
      {
        width: number | string;
        height: number | string;
      }
    >
  >;
  iframeClassName?: string;
  resizableContainerClassName?: string;
  controlsClassName?: string;
  controlsContainerClassName?: string;
  controlsPreComponent?: React.ReactNode;
  controlsPostComponent?: React.ReactNode;
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
    case ViewportSize.miniMobile:
      icon = <RectangleVertical size={iconSize} />;
      break;

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
    fluidX = false,
    fluidY = false,
    iframeClassName = "",
    resizableContainerClassName = "",
    controlsPreComponent,
    controlsPostComponent,
    controlsContainerClassName,
    controlsClassName,
    className,
    src,
    title,
    onIframeLoad,
    ...iframeProps
  } = props;

  const getViewportSize = useCallback(() => {
    // Apply fluid settings first
    const fluidDimensions = {
      width: fluidX ? "100%" : width,
      height: fluidY ? "100%" : height,
    };

    // If size is specified and neither fluidX nor fluidY are set, use the viewport size
    if (size && !fluidX && !fluidY) {
      return VIEWPORT_SIZES[size];
    }

    // If size is specified but either fluidX or fluidY are set,
    // selectively override the dimensions
    if (size) {
      return {
        width: fluidX ? "100%" : VIEWPORT_SIZES[size].width,
        height: fluidY ? "100%" : VIEWPORT_SIZES[size].height,
      };
    }

    // Otherwise use the fluid dimensions (which might include width/height props)
    return fluidDimensions;
  }, [size, width, height, fluidX, fluidY]);

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

        // Apply fluid settings on top of viewport sizes
        setViewportSizeInternal({
          width: fluidX ? "100%" : viewportWidth,
          height: fluidY ? "100%" : viewportHeight,
        });

        return;
      }

      // Arbitrary dimensions.
      if (typeof width === "number" && typeof height === "number") {
        const nextWidth = width < (minWidth || 0) ? minWidth : width;
        const nextHeight = height < (minHeight || 0) ? minHeight : height;

        // Apply fluid settings for arbitrary dimensions
        setViewportSizeInternal({
          width: fluidX ? "100%" : nextWidth,
          height: fluidY ? "100%" : nextHeight,
        });
      } else {
        // If width/height are already strings (potentially "100%"),
        // respect fluidX/fluidY for explicit overrides
        setViewportSizeInternal({
          width: fluidX ? "100%" : width,
          height: fluidY ? "100%" : height,
        });
      }
    },
    [
      setViewportSizeInternal,
      minWidth,
      minHeight,
      overrideViewportSizes,
      fluidX,
      fluidY,
    ]
  );

  const isSizeSelected = (size: ViewportSizeType) => {
    return (
      viewportSizeInternal.width === VIEWPORT_SIZES[size].width &&
      viewportSizeInternal.height === VIEWPORT_SIZES[size].height
    );
  };

  const Controls = () => {
    return showControls ? (
      <div
        className={[
          "flex justify-between items-center gap-2",
          controlsContainerClassName,
        ].join(" ")}
      >
        {controlsPreComponent}
        <div
          className={[
            "flex items-center justify-center gap-2",
            controlsClassName,
          ].join(" ")}
        >
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
        {controlsPostComponent}
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
          className,
        ].join(" ")}
      >
        <Controls />
        <iframe
          {...iframeProps}
          src={src}
          title={title}
          height={viewportSizeInternal.height}
          width={viewportSizeInternal.width}
          className={["border-none", iframeClassName].join(" ")}
          onLoad={onIframeLoad}
        />
      </div>
    );
  }

  return (
    <div
      className={[
        "h-full w-full flex flex-col gap-4 items-center justify-center",
        className,
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
          {...iframeProps}
          className={["border-none w-full h-full", iframeClassName].join(" ")}
          onLoad={onIframeLoad}
        />
      </Resizable>
    </div>
  );
};
