import type { TaskKey } from "@/lib/site-config";

export const slot4TaskSupport = {
  article: false,
  classified: false,
  sbm: false,
  profile: true,
  pdf: false,
  listing: false,
  image: true,
} satisfies Record<TaskKey, boolean>;

export const slot4TaskNotes = {
  article: "Image note pages connected to profile discovery",
  classified: "Profile notice pages connected to image discovery",
  sbm: "Saved visual references connected to profiles",
  profile: "Professional profile pages",
  pdf: "Portfolio document pages connected to profiles",
  listing: "Business and creator profile directory pages",
  image: "Image gallery pages",
} satisfies Record<TaskKey, string>;
