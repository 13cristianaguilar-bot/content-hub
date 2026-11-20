# Space Buddies bugs

Severities: P0 crash or softlock, P1 breaks a round, P2 feel, P3 cosmetic. Seeds are the `?seed=` value. Shots are 390×844.

## SB-1 Seated badge said 16TH

- Severity: P2
- Status: fixed
- Seed: 4
- Shot: `qa/shots/sb-spectate-before.png`

Repro: finish a seat (or board on seed 4), look at the place shield. It counted every racer ahead of your parked body, so seat 1 of 8 read 16TH.

Fix: a seated player shows `SEAT n` from boarding order. Regression in `src/qa-regress.test.js`.

## SB-2 Spectate sat low, close, and foggy

- Severity: P2
- Status: fixed
- Seed: 4
- Shot: `qa/shots/sb-spectate-before.png`, after `qa/shots/sb-spectate-after.png`

Repro: take a seat on the meadow and wait out the boarding cinematic. The orbit was about 12 m back but only 5 m up, looked at the leader's chest, and left the meadow fog on, so Buddies crowded the bottom of the frame.

Fix: the orbit stays 13 m out and 11 m up, looks 9 m ahead along the course, and pushes the fog out to 150 m. A Buddy standing under the camera lifts the frame. Regression checks the 10–14 m band, the height, and the look-ahead.

## SB-3 Body falls through a floor a ramp overlaps

- Severity: P1
- Status: fixed
- Seed: 4, and harness seed 213 before the fix (planet 1 round 1)

Repro: stand on the lower pad where a higher bridge ellipse covers the same ground, around quick-mode `(1.2, 112)`. The ground query returned only the higher pad. That pad was too tall to step onto, so the lower floor was ignored and the body dropped through it.

Fix: walking considers every floor under the point and stands on the highest one the step can actually reach. Regression drops the player through that overlap and expects them to land.

## SB-4 Jump controls come back during the launch

- Severity: P1
- Status: fixed
- Seed: 213 (planet 1, ship round)

Repro: board the ship and let the round end. The thumb buttons were hidden while you waited, then shown again for the launch because only the results screen hid them.

Fix: controls stay hidden for countdown, launch, results, and any moment you are seated. Regression covers those four cases.

## Harness

`npm run test:qa` plays quick rounds in headless Chrome. Phone runs are 390×844, touch, device pixel ratio 3. Landscape runs are 1280×800. Twenty seeds per planet cover the three round types. Adversarial passes hug the wall, jump off the edge, stand still, spam jump and dive, reverse, pinch, pause, background the tab, and rotate the phone. The script also walks title, locker, spectate, podium, map, and a five-round memory check.

Before these fixes, a planet 1 smoke (gate, sky heat, ship) failed 2 of 3 runs: the body fell through an overlapped floor, and the launch showed the jump controls. After the fixes, 20 seeds on each planet (60 rounds, every round type) passed with no P0, P1, or P2. The menu flow, adversarial passes, and the five-round memory check then passed 21 of 21. Combined pass rate: 81 of 81.

Headless Chrome on this machine renders with a software GPU, so frames under 45 are recorded as P3 environment notes and are not counted as phone defects. Logic runs use `?qa=4` so the sim can finish a quick round without changing the step size. The realtime pause, pinch, background, and rotate checks use `qa=1`.
