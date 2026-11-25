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
  const need = race.qualifyN || 0;
  const got = need ? Math.min(race.qualCount || 0, need) : 0;
  return "QUAL " + got + "/" + need;
}

export function showCoach(phase, seated, zoneId, time, auto, paused) {
  if (paused || seated || auto) return false;
  return phase === "race" && zoneId === "meadow" && time < 70;
}

export function resultReason(race) {
  if (!race) return "";
  if (race.result === "escaped") return "YOU BOARDED THE SHIP";
  if (race.result === "qualified") {
    if (race.kind === "crown") return "YOU HELD THE CROWN";
    if (race.kind === "survival") return "YOU WERE IN THE LAST 8";
    return "YOU CROSSED THE FINISH";
  }
  const limit = race.roundSeconds || (race.cfg && race.cfg.raceSeconds) || 0;
  const timedOut = !!(limit && (race.time || 0) >= limit - 0.08);
  if (race.shipRound && race.player && !race.player.seated) {
    const filled = race.seatsFilled || 0;
    const seats = (race.cfg && race.cfg.seats) || 8;
    if (timedOut && filled < seats) return "TIME RAN OUT · " + filled + " OF " + seats + " SEATS";
    return "SHIP SEATS FILLED";
  }
  const named = race.fallers || [];
  const fellOff = named.includes("YOU") || (race.player && (race.player.fell || (race.player.pos && race.player.pos.y < -4)));
  if (race.result === "out" && fellOff) return "FELL OFF THE PLANET";
  if (timedOut) return "TIME RAN OUT";
  if (race.closedBy === "full" && race.qualifyN) return "ALL " + race.qualifyN + " SPOTS FILLED";
  return "FELL OFF THE PLANET";
}

function ordinal(n) {
  const suffix = n === 1 ? "ST" : n === 2 ? "ND" : n === 3 ? "RD" : "TH";
  return n + suffix;
}

export function resultBoard(race) {
  const list = (race && race.racers) || [];
  const made = list.filter((r) => r && (r.qualified || r.seated));
  const order = (race && race.finishOrder) || [];
  made.sort((a, b) => {
    if (a.seated && b.seated && a.seatIndex >= 0 && b.seatIndex >= 0 && a.seatIndex !== b.seatIndex) return a.seatIndex - b.seatIndex;
    const ia = order.indexOf(a.id);
    const ib = order.indexOf(b.id);
    if (ia >= 0 || ib >= 0) return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    return (b.pos.z || 0) - (a.pos.z || 0);
  });
  const names = made.slice(0, 8).map((r) => (r.isPlayer ? "YOU" : "BUDDY"));
  return {
    place: placeLabel(race && race.player, list, race),
    names,
    count: made.length,
    extra: Math.max(0, made.length - names.length),
  };
}

export function placeLabel(player, racers, race) {
  if (player && player.seated && player.seatIndex >= 0) return "SEAT " + (player.seatIndex + 1);
  const order = race && race.finishOrder;
  if (order && player && player.qualified) {
    const at = order.indexOf(player.id);
    if (at >= 0) return ordinal(at + 1);
  }
  let ahead = 0;
  const list = racers || [];
  for (let i = 0; i < list.length; i++) {
    const r = list[i];
    if (r !== player && !r.seated && r.pos.z > player.pos.z + 0.4) ahead++;
  }
  return ordinal(ahead + 1);
}
