export type Asset = { src: string; scene: number; kind: "couple" | "scenery"; description: string };

const a = (file: string, scene: number, kind: Asset["kind"], description: string): Asset => ({
  src: `/images/${file}`,
  scene,
  kind,
  description,
});

export const assets = {
  openingWindow: a("01-opening-window.jpg", 1, "scenery", "Quiet bedroom, blue-grey morning, sunlight through a window. Portrait-friendly, 2000px tall."),
  arrivalA: a("02-arrival-a.jpg", 2, "couple", "Couple portrait, warm natural light. Portrait 4:5."),
  arrivalB: a("02-arrival-b.jpg", 2, "couple", "Detail or candid of the couple. Portrait 3:4."),
  memoryFirstMeeting: a("03-first-meeting.jpg", 3, "couple", "First meeting. Any ratio, ~1600px."),
  memoryFirstConversation: a("03-first-conversation.jpg", 3, "couple", "First conversation."),
  memoryFirstDay: a("03-first-memorable-day.jpg", 3, "couple", "First memorable day."),
  memoryGrowing: a("03-growing-together.jpg", 3, "couple", "Growing together."),
  memoryProposal: a("03-proposal.jpg", 3, "couple", "The proposal."),
  sunsetA: a("04-sunset-a.jpg", 4, "couple", "Warm sunset, soft focus couple photograph. Portrait or square."),
  sunsetB: a("04-sunset-b.jpg", 4, "couple", "Second sunset frame that the first dissolves into."),
  weddingWide: a("05-wedding-wide.jpg", 5, "couple", "Full-width golden-hour wedding photograph. Landscape, 2400px wide."),
  closingSunset: a("06-closing-sunset.jpg", 6, "couple", "Couple from behind, facing the sunset. Landscape or portrait."),
} satisfies Record<string, Asset>;
