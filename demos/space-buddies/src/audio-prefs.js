// Saved sound preferences and which pack cue an event should play.
// No browser audio here, so the race sim tests can import it.

export const AUDIO_KEY = "space-buddies-audio";

export function defaultAudioPrefs() {
  return { muted: false, music: true, sfx: true, haptics: true };
}

export function normalizePrefs(raw) {
  const base = defaultAudioPrefs();
  if (!raw || typeof raw !== "object") return base;
  return {
    muted: !!raw.muted,
    music: raw.music !== false,
    sfx: raw.sfx !== false,
    haptics: raw.haptics !== false,
  };
}

export function loadAudioPrefs(storage) {
  try {
    return normalizePrefs(JSON.parse(storage.getItem(AUDIO_KEY) || "{}"));
  } catch (err) {
    return defaultAudioPrefs();
  }
}

export function saveAudioPrefs(storage, prefs) {
  const next = normalizePrefs(prefs);
  try { storage.setItem(AUDIO_KEY, JSON.stringify(next)); } catch (err) { /* private mode */ }
  return next;
}

// Plain speaker while anything can be heard. Speaker-with-X only when output is silent.
export function audioAudible(prefs) {
  const p = normalizePrefs(prefs);
  return !p.muted && (p.music || p.sfx);
}

export function muteIcon(prefs) {
  return audioAudible(prefs) ? "ui/svg/icon_unmute.svg" : "ui/svg/icon_mute.svg";
}

export function muteLabel(prefs) {
  return audioAudible(prefs) ? "Mute" : "Unmute";
}

export function cueFor(event) {
  if (!event) return "";
  if (event.t === "tick") return event.n === 2 ? "count2" : event.n === 1 ? "count1" : "count3";
  if (event.t === "go") return "go";
  if (event.t === "jump") return "jump";
  if (event.t === "land") return "land";
  if (event.t === "dive") return "dive";
  if (event.t === "bump" || event.t === "geyser" || event.t === "grab") return "hit";
  if (event.t === "coin") return "collect";
  if (event.t === "qualify" || event.t === "roundwin") return "qualify";
  if (event.t === "eliminated" || event.t === "missed") return "eliminated";
  if (event.t === "seat") return "seat";
  if (event.t === "lastseat") return "last";
  if (event.t === "launch") return "launch";
  if (event.t === "escaped") return "escaped";
  if (event.t === "crack") return "crumble";
  return "";
}

export function playerOnlyCue(event) {
  if (!event) return false;
  return event.t === "jump" || event.t === "land" || event.t === "dive" || event.t === "grab" || event.t === "qualify";
}
