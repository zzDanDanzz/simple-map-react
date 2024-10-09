type IMapStyle = {
  type: "vector" | "raster";
  source: string;
};

export const MAPIR_API_BASE = "https://map.ir";

const GOOGLE_PROXY_BASE = MAPIR_API_BASE + "/google";

export const mapStylesSources: { source: string; type: "vector" | "raster" }[] =
  [
    {
      source: "mapir-xyz-style",
      type: "vector",
    },
    {
      source: "mapir-style-dark",
      type: "vector",
    },
    {
      source: "mapir-xyz-light-style",
      type: "vector",
    },
    {
      source: "mapir-Dove-style",
      type: "vector",
    },
    {
      source: "mapir-frank-style",
      type: "vector",
    },
    {
      source: "mapir-raster",
      type: "raster",
    },
    {
      source: "google-satellite",
      type: "raster",
    },
    {
      source: "google-satellite-label",
      type: "raster",
    },
    {
      source: "google-terrain-label",
      type: "raster",
    },
    {
      source: "google-terrain-traffic-label",
      type: "raster",
    },
  ];

const generateMapstyleForRaster = (rasterID: string) => {
  return {
    version: 8,
    sprite: `${MAPIR_API_BASE}/vector/styles/main/sprite`,
    glyphs: `${MAPIR_API_BASE}/vector/styles/main/glyphs/{fontstack}/{range}.pbf`,
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: [getRasterTileUrlFromSource(rasterID)],
        tileSize: 256,
        attribution: "",
      },
    },
    layers: [
      {
        id: "simple-tiles",
        type: "raster",
        source: "raster-tiles",
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  };
};

export const generateMapStyle = ({ type, source }: IMapStyle) => {
  if (type === "vector") {
    return `${MAPIR_API_BASE}/vector/styles/main/${source}.json`;
  }

  return generateMapstyleForRaster(source);
};

const getRasterTileUrlFromSource = (source: string) =>
  source === "mapir-raster"
    ? `${MAPIR_API_BASE}/shiveh/xyz/1.0.0/Shiveh:Shiveh@EPSG:3857@png/{z}/{x}/{y}.png`
    : source === "google-satellite"
      ? `${GOOGLE_PROXY_BASE}/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`
      : source === "google-satellite-label"
        ? `${GOOGLE_PROXY_BASE}/vt/lyrs=y&hl=fa&x={x}&y={y}&z={z}`
        : source === "google-terrain-label"
          ? `${GOOGLE_PROXY_BASE}/vt/lyrs=p&hl=fa&x={x}&y={y}&z={z}`
          : source === "google-terrain-traffic-label"
            ? `${GOOGLE_PROXY_BASE}/vt/lyrs=p,traffic&hl=fa&x={x}&y={y}&z={z}`
            : source === "osm-raster"
              ? "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              : `${MAPIR_API_BASE}/shiveh/xyz/1.0.0/Shiveh:Shiveh@EPSG:3857@png/{z}/{x}/{y}.png`;
