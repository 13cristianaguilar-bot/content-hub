// Shared toy-plastic look: 3-step vertical ramp, rim, contact darkening, and a clearcoat highlight.
export function plasticShader(shader, opts = {}) {
  shader.vertexShader = shader.vertexShader
    .replace("#include <common>", "#include <common>\nvarying vec3 vPlW;\nvarying float vPlUp;")
    .replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\nvPlW = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvPlUp = normalize(mat3(modelMatrix) * objectNormal).y;"
    );
  const pattern = opts.floors
    ? "float stripe = step(0.5, fract(vPlW.x * 0.23 + vPlW.z * 0.23));\nfloat check = step(1.0, fract(vPlW.x * 0.16) + fract(vPlW.z * 0.16));\ndiffuseColor.rgb = mix(diffuseColor.rgb, min(diffuseColor.rgb * vec3(1.12, 1.05, 0.94), vec3(1.0)), max(stripe, check) * 0.55);\n"
    : "";
  const bands = opts.stripes
    ? "float band = step(0.5, fract(vPlW.y * 1.7));\noutgoingLight = mix(outgoingLight * 0.78, outgoingLight * vec3(1.1, 1.04, 0.94), band);\n"
    : "";
  shader.fragmentShader = "varying vec3 vPlW;\nvarying float vPlUp;\n" + shader.fragmentShader
    .replace("#include <color_fragment>", "#include <color_fragment>\n" + pattern)
    .replace(
      "#include <opaque_fragment>",
      "float up = clamp(vPlUp * 0.5 + 0.5, 0.0, 1.0);\nfloat stepLight = up < 0.34 ? 0.64 : (up < 0.7 ? 0.92 : 1.14);\noutgoingLight *= stepLight;\nfloat ao = mix(0.62, 1.0, smoothstep(-0.45, 0.35, vPlUp));\noutgoingLight *= ao;\nfloat rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 1.7);\noutgoingLight += rim * vec3(1.0, 0.97, 0.9) * 0.5;\nvec3 L = normalize(vec3(-0.35, 0.86, 0.28));\nvec3 V = normalize(vViewPosition);\nfloat spec = pow(clamp(dot(normalize(normal), normalize(L + V)), 0.0, 1.0), 36.0);\noutgoingLight += spec * vec3(1.0, 0.99, 0.95) * 0.48;\n" +
      bands +
      "#include <opaque_fragment>"
    );
}
