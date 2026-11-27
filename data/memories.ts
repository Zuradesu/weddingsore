import { assets } from "./assets";

export type Memory = { id: string; title: string; date: string; text: string; src: string; file: string };

export const memories: Memory[] = [
  { id: "meeting", title: "The first meeting", date: "[Date]", text: "Two strangers, one ordinary day.", ...pick(assets.memoryFirstMeeting.src) },
  { id: "conversation", title: "The first conversation", date: "[Date]", text: "Neither of us wanted it to end.", ...pick(assets.memoryFirstConversation.src) },
  { id: "day", title: "The first memorable day", date: "[Date]", text: "The day we stopped counting hours.", ...pick(assets.memoryFirstDay.src) },
  { id: "growing", title: "Growing together", date: "[Date]", text: "Small days, quietly becoming home.", ...pick(assets.memoryGrowing.src) },
  { id: "proposal", title: "The proposal", date: "[Date]", text: "A question with only one answer.", ...pick(assets.memoryProposal.src) },
];

function pick(src: string) {
  return { src, file: src.split("/").pop() ?? src };
}
