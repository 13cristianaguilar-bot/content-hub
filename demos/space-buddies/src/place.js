// Place chip and which moments the thumb controls are allowed on screen.

export function hideControls(phase, seated, started, eliminated) {
  if (!started) return true;
  if (phase === "results" || phase === "launch" || phase === "countdown") return true;
  if (eliminated && phase === "race") return true;
  return !!(seated && phase === "race");
}

// A seated player shows boarding order, never a race position.

export function hudStatus(race) {
  if (!race) return "";
  if (race.shipRound) return "SEATS " + (race.seatsFilled || 0) + "/" + ((race.cfg && race.cfg.seats) || 8);
  if (race.kind === "survival") {
    const alive = (race.racers || []).filter((r) => !r.eliminated).length;
    return "ALIVE " + alive + "/" + (race.racers || []).length;
  }
  return "QUAL " + (race.qualCount || 0) + "/" + (race.qualifyN || 8);
}

export function showCoach(phase, seated, zoneId, time, auto, paused) {
  if (paused || seated || auto) return false;
  return phase === "race" && zoneId === "meadow" && time < 8;
}

export function resultReason(race) {
  if (!race || race.result === "qualified" || race.result === "escaped") return "";
  const limit = race.roundSeconds || (race.cfg && race.cfg.raceSeconds) || 0;
  if (race.shipRound && race.player && !race.player.seated) return "SHIP SEATS FILLED";
  if (limit && (race.time || 0) >= limit - 0.08) return "TIME RAN OUT";
  return "FELL OFF THE PLANET";
}

export function resultBoard(race) {
  const list = (race && race.racers) || [];
  const made = list.filter((r) => r && (r.qualified || r.seated));
  made.sort((a, b) => (b.pos.z || 0) - (a.pos.z || 0));
  const names = made.slice(0, 8).map((r) => (r.isPlayer ? "YOU" : "BUDDY"));
  return {
    place: placeLabel(race && race.player, list),
    names,
    count: made.length,
    extra: Math.max(0, made.length - names.length),
  };
}

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
