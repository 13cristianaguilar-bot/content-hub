// Shared toy-plastic look: 3-step vertical ramp, rim, contact darkening, and a clearcoat highlight.
export function plasticShader(shader, opts = {}) {
  shader.vertexShader = shader.vertexShader
    .replace("#include <common>", "#include <common>\nvarying vec3 vPlW;\nvarying float vPlUp;")
    .replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\nvPlW = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvPlUp = normalize(mat3(modelMatrix) * objectNormal).y;"
    );
  const rimAmt = opts.floors ? 0.08 : opts.hero ? 0.5 : 0.35;
  const gloss = opts.floors ? 0.04 : opts.hero ? 0.4 : 0.16;
  const sat = opts.floors ? 1.55 : 1.08;
  const stepHi = opts.floors ? "1.0" : "1.12";
  const pattern = opts.floors
    ? "vec2 cell = floor(vPlW.xz * 7.0);\nfloat speck = fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);\nvec3 grain = mix(vec3(0.90, 1.06, 0.92), vec3(1.04, 0.98, 0.94), speck);\ndiffuseColor.rgb *= grain;\n"
    : "";
  const bands = opts.stripes
    ? "float band = step(0.5, fract(vPlW.y * 1.7));\nlit *= mix(0.86, 1.1, band);\n"
    : "";
  shader.fragmentShader = "varying vec3 vPlW;\nvarying float vPlUp;\n" + shader.fragmentShader
    .replace("#include <color_fragment>", "#include <color_fragment>\n" + pattern)
    .replace(
      "#include <opaque_fragment>",
      "vec3 base = diffuseColor.rgb;\nfloat luma = dot(base, vec3(0.2126, 0.7152, 0.0722));\nbase = clamp(luma + (base - luma) * " + sat.toFixed(2) + ", 0.0, 1.0);\nfloat up = clamp(vPlUp * 0.5 + 0.5, 0.0, 1.0);\nfloat stepLight = up < 0.34 ? 0.82 : (up < 0.68 ? 1.0 : " + stepHi + ");\nvec3 lit = base * stepLight;\nfloat rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.5);\nlit += vec3(1.0) * rim * " + rimAmt.toFixed(2) + ";\nfloat ao = mix(0.84, 1.0, smoothstep(-0.65, 0.2, vPlUp));\nlit *= ao;\nvec3 L = normalize(vec3(-0.35, 0.86, 0.28));\nvec3 V = normalize(vViewPosition);\nfloat spec = pow(clamp(dot(normalize(normal), normalize(L + V)), 0.0, 1.0), 72.0);\nlit += vec3(1.0) * spec * " + gloss.toFixed(2) + ";\n" +
      bands +
      "outgoingLight = lit;\n#include <opaque_fragment>"
    );
}
