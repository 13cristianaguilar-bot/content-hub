// Shared toy-plastic look: 3-step vertical ramp, rim, contact darkening, and a clearcoat highlight.
export function plasticShader(shader, opts = {}) {
  shader.vertexShader = shader.vertexShader
    .replace("#include <common>", "#include <common>\nvarying vec3 vPlW;\nvarying float vPlUp;")
    .replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\nvPlW = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvPlUp = normalize(mat3(modelMatrix) * objectNormal).y;"
    );
  const pattern = opts.floors
    ? "float stripe = step(0.5, fract(vPlW.x * 0.23 + vPlW.z * 0.23));\ndiffuseColor.rgb *= mix(0.92, 1.08, stripe);\n"
    : "";
  const bands = opts.stripes
    ? "float band = step(0.5, fract(vPlW.y * 1.7));\nlit *= mix(0.86, 1.1, band);\n"
    : "";
  shader.fragmentShader = "varying vec3 vPlW;\nvarying float vPlUp;\n" + shader.fragmentShader
    .replace("#include <color_fragment>", "#include <color_fragment>\n" + pattern)
    .replace(
      "#include <opaque_fragment>",
      "vec3 base = diffuseColor.rgb;\nfloat luma = dot(base, vec3(0.2126, 0.7152, 0.0722));\nbase = clamp(luma + (base - luma) * 1.35, 0.0, 1.0);\nfloat up = clamp(vPlUp * 0.5 + 0.5, 0.0, 1.0);\nfloat stepLight = up < 0.34 ? 0.82 : (up < 0.68 ? 1.0 : 1.28);\nvec3 lit = base * stepLight;\nfloat rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.4);\nlit *= mix(1.0, 1.28, rim);\nfloat ao = mix(0.84, 1.0, smoothstep(-0.65, 0.2, vPlUp));\nlit *= ao;\nvec3 L = normalize(vec3(-0.35, 0.86, 0.28));\nvec3 V = normalize(vViewPosition);\nfloat spec = pow(clamp(dot(normalize(normal), normalize(L + V)), 0.0, 1.0), 140.0);\nlit += vec3(1.0) * spec * 0.45;\n" +
      bands +
      "outgoingLight = lit;\n#include <opaque_fragment>"
    );
}
