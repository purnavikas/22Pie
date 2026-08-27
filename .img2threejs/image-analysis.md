# Chameleon reference analysis

Reference: `frontend/public/images/Chameleon_character_3D_modeling_…_202608262356.jpeg`

## Identification

- Stylized upright chameleon character; `primaryDomain: character`; confidence 0.99.
- One clear three-quarter/front studio view on a neutral background. The entire character and cast shadow are visible.

## Form and silhouette

- Organic, bilaterally symmetric core with intentionally asymmetric tail presentation.
- Total standing height is about 3.25 head heights. The head is about 1.1 times the torso width and dominates the read.
- Macro silhouette: broad wedge/helmet head, oval pear-shaped torso, four splayed limbs, and a thick tail that leaves the rear pelvis and forms a near-planar inward spiral on character-right.

## Macro / meso / micro hierarchy

- Macro: root, torso/body, neck, head, tail, paired arms, paired legs.
- Meso: continuous cranium/muzzle/jaw, two protruding turret eyes, dorsal crest, brow rims, shoulder/hip transitions, elbows/knees, palms/soles, digits.
- Micro: polygonal scale fields, larger plate scales around muzzle and brow, eyelid/turret rings, gold-green iris rims, black pupils, catchlights, thin russet mouth crease, nostril, turquoise flank patches, ochre limb/tail bands, dorsal spines.

## Spatial relationships

- Neck overlaps upward into the underside/back of the head and downward into the torso.
- Head pivots at the top of the neck; lower jaw hinges near the posterior mouth corners.
- Eye turrets attach to the lateral/front head surface; eyeballs sit within those turrets and require independent aim pivots.
- Arms attach below the neck at the lateral upper torso; legs attach low on the pelvis. Hands and feet terminate in separated, rounded chameleon digits.
- Tail attaches behind the pelvis, sweeps toward character-right, rises, and curls inward as a spiral.

## Materials and finish

- Skin is dielectric, opaque, satin/matte: dominant mint/sea-green albedo, roughness about 0.58–0.72, zero metalness, slight clearcoat only for soft studio highlights.
- Color is not flat: pale yellow-green throat/belly and digit tips; darker teal lateral shadows and scale fields; irregular turquoise patches; muted ochre/olive bands on limbs, crest and tail.
- Eyes use green textured turrets with glossy gold-green irises, near-black pupils, and sharp white catchlights.
- Visible relief is dense but shallow. Runtime geometry should reserve real geometry for silhouette scales/spines and use a deterministic canvas bump/color texture for broad skin microstructure.

## Identity-defining features

1. Two very large, protruding, independently aimed turret eyes with heavy circular rims.
2. Tall sloped casque/crest forming a peaked head silhouette.
3. Broad, flattened muzzle and nearly straight thin mouth line.
4. Thick tail forming a clean inward spiral.
5. Short upright body with long splayed limbs and broad three-lobed feet.
6. Mint/teal skin with yellow-green underside and irregular ochre/turquoise mottling.
7. Dorsal triangular spines and dense small scale relief.

## Uncertainty

- Only one view is available. Rear body markings, hidden inner limbs, opposite tail surface, exact digit count on occluded hands, and the back of the casque are inferred.
- The reconstruction is therefore an approximate stylized likeness, not an exact hidden-side reconstruction. Front and three-quarter silhouette/face receive highest confidence; rear details receive moderate confidence.

## Suitability verdict

Pass as `character-conditional -> stylized`. The image is high resolution, the target is isolated, all macro forms are legible, and the requested procedural/interactive use fits a stylized primitive/sweep construction. Exact scale-by-scale reproduction and unseen-side accuracy are outside what one image can support.

