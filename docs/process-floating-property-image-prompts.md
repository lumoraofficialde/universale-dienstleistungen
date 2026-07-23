# Process Floating Property Image Prompts

Generation mode: built-in `image_gen`

## Completed landscape

```text
Use case: stylized-concept
Asset type: premium website section visual and implementation source asset
Primary request: Create a cinematic, hyper-detailed floating landscape architecture model for a professional German garden and property services website. The subject is one rectangular garden property slab suspended in space, shown in a refined three-quarter isometric view. It should feel like an architectural museum maquette made real, not fantasy art.
Scene/backdrop: soft mineral off-white gallery backdrop with extremely subtle natural paper grain, generous clean negative space around the object, no room corners and no horizon.
Subject: a completed contemporary garden on a thick cutaway terrain slab. Include an immaculate but believable lawn, one sculptural multi-stem tree, clipped hedge masses, restrained perennial planting, a precision-laid natural stone path, a small timber deck edge, and a discreet drainage channel. The cutaway edge below must reveal realistic layers of dark topsoil with fine roots, compacted gravel, drainage aggregate, and stone sub-base. No house, no people, no vehicles.
Style/medium: photorealistic high-end architectural visualization with tactile real materials, elegant and technically credible, like a landscape architecture competition model photographed for a luxury design magazine.
Composition/framing: very wide horizontal 16:9 scene. The floating property occupies roughly the right 60 percent and lower-middle of the image. Keep the upper-left and far-left clean for large live HTML typography. Camera slightly elevated, viewing the front and right cutaway faces. Keep the full slab inside frame with ample breathing room.
Lighting/mood: controlled late-afternoon museum light from upper left, long soft directional shadow below the slab, subtle volumetric haze, precise highlights on wet stone and foliage, calm but spectacular.
Color palette: deep forest green, moss and olive foliage, charcoal-brown soil, pale limestone, muted natural timber, mineral off-white backdrop, one restrained yellow-green plant accent.
Materials/textures: individual grass blades at edges, fibrous roots, stratified earth, rough drainage gravel, honed stone, subtle timber grain, realistic leaf translucency.
Text (verbatim): none
Constraints: no text, no numbers, no labels, no logos, no watermark, no UI, no cards, no icons, no borders, no decorative circles, no fantasy plants. Keep the garden premium, modern, professional, and physically plausible. The floating object must have a clean silhouette suitable for masking and motion in a website section.
Avoid: whimsical miniature diorama style, cartoon look, glossy plastic, oversaturated greens, tropical plants, suburban clichés, fake bloom, excessive lens flare, black background, visible architecture studio props.
```

Workspace outputs:

- `public/media/process-floating-property-complete.jpg`
- `public/media/process-floating-property-complete-960.jpg`

## Exploded terrain layers

```text
Use case: precise-object-edit
Asset type: second scroll state for the same premium website section
Input images: Image 1 is the exact base scene and must remain the visual anchor.
Primary request: Transform only the floating terrain model into a precise landscape-architecture exploded view. Separate the same property vertically into four clearly readable suspended layers while preserving the exact camera angle, crop, overall object position, backdrop, lighting direction, plants, stone path geometry, timber edge, and material realism.
Layer structure from top to bottom: 1) the finished living garden surface with lawn, tree, hedges, perennial planting, stone path and timber edge lifted highest; 2) a dark topsoil and fine root layer floating below it; 3) a compacted drainage gravel layer below that; 4) the rough structural stone sub-base lowest. Maintain generous but elegant air gaps between layers. Add a few tiny falling soil particles and root fibers in the gaps, extremely restrained.
Style/medium: photorealistic high-end architectural visualization, museum installation precision, not an infographic.
Composition/framing: keep the same very wide 16:9 composition and negative space. The full exploded object must remain inside frame. Do not zoom or recrop.
Lighting/mood: keep the original controlled late-afternoon gallery light and one coherent soft shadow beneath the lowest layer. Slightly increase rim light along the separated edges so the layers read cleanly.
Color palette: preserve Image 1 exactly.
Text (verbatim): none
Constraints: change only the vertical separation of the terrain layers and the subtle edge lighting. Preserve all garden geometry and object identity. No arrows, no labels, no numbers, no UI, no callout lines, no text, no logos, no watermark. No new objects. No fantasy levitation glow.
Avoid: diagram aesthetic, plastic model look, neon glow, extra plants, missing tree, changing the path, changing the perspective, changing the background, dramatic debris.
```

Workspace outputs:

- `public/media/process-floating-property-layers.jpg`
- `public/media/process-floating-property-layers-960.jpg`

## Planning scan

```text
Use case: precise-object-edit
Asset type: planning scroll state for the same premium website section
Input images: Image 1 is the exact completed floating garden scene and must remain the visual anchor.
Primary request: Change only the presentation of the floating garden into an elegant landscape-planning scan state while preserving the exact camera, crop, object position, garden geometry, cutaway layers, backdrop, lighting direction and silhouette. The left half of the garden should remain photorealistic. Across the right half, the same garden gradually resolves into a refined semi-transparent architectural planning model: muted pale limestone surfaces, fine deep-forest contour lines following the terrain, precise planting-radius arcs around the tree and hedges, and a restrained orthographic survey grid projected directly on the ground plane. The transition between real and planned should feel like a physical light scan moving across one continuous object, not a split screen.
Style/medium: photorealistic architectural visualization fused with sophisticated landscape-architecture model rendering, museum quality, highly restrained.
Composition/framing: preserve the same very wide 16:9 framing and clean upper-left negative space. No zoom, no recrop.
Lighting/mood: keep the original late-afternoon gallery light. Add one subtle vertical wash of brighter light at the boundary between photoreal and planning model, soft and physically plausible.
Color palette: preserve original forest greens and mineral neutrals; planning lines use only deep forest green and a restrained yellow-green highlight.
Text (verbatim): none
Constraints: no text, no labels, no measurements, no numbers, no arrows, no callout lines leaving the object, no UI, no cards, no icons, no logos, no watermark. Preserve every plant, path, hedge and layer. The planning graphics must be integrated on the property surfaces only.
Avoid: neon hologram, blue sci-fi interface, glowing HUD, technical dashboard, fantasy grid, changing the tree, changing the path, changing the background.
```

Workspace outputs:

- `public/media/process-floating-property-plan.jpg`
- `public/media/process-floating-property-plan-960.jpg`
