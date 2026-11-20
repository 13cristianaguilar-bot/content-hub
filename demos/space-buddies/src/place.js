// Place chip and which moments the thumb controls are allowed on screen.

export function hideControls(phase, seated, started) {
  if (!started) return true;
  if (phase === "results" || phase === "launch" || phase === "countdown") return true;
  return !!(seated && phase === "race");
}

// A seated player shows boarding order, never a race position.

export function placeLabel(player, racers) {
  if (player && player.seated && player.seatIndex >= 0) return "SEAT " + (player.seatIndex + 1);
  let ahead = 0;
  const list = racers || [];
  for (let i = 0; i < list.length; i++) {
    const r = list[i];
    if (r !== player && !r.seated && r.pos.z > player.pos.z + 0.4) ahead++;
  }
  const n = ahead + 1;
  const suffix = n === 1 ? "ST" : n === 2 ? "ND" : n === 3 ? "RD" : "TH";
  return n + suffix;
}
