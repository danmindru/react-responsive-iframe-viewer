export const VIEWPORT_SIZES = {
  miniMobile: {
    width: 320,
    height: 480,
  },
  mobile: {
    width: 375,
    height: 667,
  },
  tablet: {
    width: 768,
    height: 1024,
  },
  desktop: {
    width: 1024,
    height: 768,
  },
  fluid: {
    width: "100%",
    height: "100%",
  },

  // Tailwind Viewports
  sm: {
    width: 640,
    height: 1136,
  },

  md: {
    width: 768,
    height: 1024,
  },

  lg: {
    width: 1024,
    height: 768,
  },

  xl: {
    width: 1280,
    height: 720,
  },

  "2xl": {
    width: 1536,
    height: 864,
  },

  "3xl": {
    width: 1920,
    height: 1080,
  },
};

export type ViewportSizeType = keyof typeof VIEWPORT_SIZES;
export const ViewportSize = {
  miniMobile: "miniMobile" as ViewportSizeType,
  mobile: "mobile" as ViewportSizeType,
  tablet: "tablet" as ViewportSizeType,
  desktop: "desktop" as ViewportSizeType,
  fluid: "fluid" as ViewportSizeType,
  sm: "sm" as ViewportSizeType,
  md: "md" as ViewportSizeType,
  lg: "lg" as ViewportSizeType,
  xl: "xl" as ViewportSizeType,
  "2xl": "2xl" as ViewportSizeType,
  "3xl": "3xl" as ViewportSizeType,
};
