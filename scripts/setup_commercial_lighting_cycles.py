"""
Commercial Hyper-Realistic Lighting & Cycles Setup for Blender
Engineered for E-Commerce Product Visualization (Blender 3.x, 4.x, 5.x)
"""

import bpy
import math

def setup_cycles_gpu(scene=None, samples=128):
    """Configures Cycles with OptiX / CUDA GPU acceleration and optimal ray bounces."""
    if scene is None:
        scene = bpy.context.scene

    # 1. Switch to Cycles Engine
    scene.render.engine = 'CYCLES'
    
    # 2. Hardware Ray-Tracing (OptiX / CUDA)
    prefs = bpy.context.preferences
    cycles_prefs = prefs.addons.get('cycles')
    if cycles_prefs:
        cprefs = cycles_prefs.preferences
        # Prefer OptiX for NVIDIA RTX cards, fallback to CUDA
        for device_type in ['OPTIX', 'CUDA', 'METAL', 'HIP']:
            try:
                cprefs.compute_device_type = device_type
                cprefs.get_devices()
                valid_devices = [d for d in cprefs.devices if d.type == device_type]
                if valid_devices:
                    for d in valid_devices:
                        d.use = True
                    print(f"[Cycles] Configured GPU device: {device_type} ({len(valid_devices)} devices)")
                    break
            except Exception:
                continue

    scene.cycles.device = 'GPU'

    # 3. Ray Tracing Quality & Sampling
    scene.cycles.preview_samples = 32
    scene.cycles.samples = samples
    scene.cycles.use_adaptive_sampling = True
    scene.cycles.adaptive_threshold = 0.01  # Stops calculation once noise drops below 1%
    
    # Denoising
    scene.cycles.use_denoising = True
    try:
        scene.cycles.denoiser = 'OPTIX'
    except Exception:
        scene.cycles.denoiser = 'OPENIMAGEDENOISE'

    # 4. Realistic Light Bounces (Eliminates flat toy shadows)
    scene.cycles.max_bounces = 12
    scene.cycles.diffuse_bounces = 4        # Deep crevice bounce fill
    scene.cycles.glossy_bounces = 4         # Metallic & gloss inter-reflections
    scene.cycles.transmission_bounces = 8   # Crystal-clear liquid / glass refraction
    scene.cycles.transparent_max_bounces = 8
    scene.cycles.sample_clamp_indirect = 10.0  # Eliminates bright firefly artifacts

    print("[Cycles] Render engine configured successfully.")


def setup_world_environment(scene=None, strength=0.5, hdri_filepath=None):
    """Sets up a World Shader with soft studio ambient fill or an HDRI."""
    if scene is None:
        scene = bpy.context.scene
    
    world = scene.world
    if not world:
        world = bpy.data.worlds.new("Studio_World")
        scene.world = world
    
    world.use_nodes = True
    nodes = world.node_tree.nodes
    links = world.node_tree.links
    nodes.clear()

    # Output node
    node_out = nodes.new(type='ShaderNodeOutputWorld')
    node_out.location = (400, 0)

    # Background node
    node_bg = nodes.new(type='ShaderNodeBackground')
    node_bg.location = (150, 0)
    node_bg.inputs['Strength'].default_value = strength
    links.new(node_bg.outputs['Background'], node_out.inputs['Surface'])

    if hdri_filepath:
        try:
            node_env = nodes.new(type='ShaderNodeTexEnvironment')
            node_env.location = (-200, 0)
            node_env.image = bpy.data.images.load(hdri_filepath, check_existing=True)

            node_mapping = nodes.new(type='ShaderNodeMapping')
            node_mapping.location = (-400, 0)

            node_coord = nodes.new(type='ShaderNodeTexCoord')
            node_coord.location = (-600, 0)

            links.new(node_coord.outputs['Generated'], node_mapping.inputs['Vector'])
            links.new(node_mapping.outputs['Vector'], node_env.inputs['Vector'])
            links.new(node_env.outputs['Color'], node_bg.inputs['Color'])
            print(f"[World] HDRI mapped from: {hdri_filepath}")
        except Exception as e:
            print(f"[World] Could not load HDRI ({e}). Using neutral studio gradient.")
            node_bg.inputs['Color'].default_value = (0.08, 0.08, 0.09, 1.0)
    else:
        # High-end studio neutral charcoal grey (never pure black or white)
        node_bg.inputs['Color'].default_value = (0.08, 0.08, 0.09, 1.0)

    print("[World] Environment lighting configured.")


def setup_three_point_lighting(target_location=(0, 0, 1.0)):
    """Creates a calibrated commercial 3-point studio lighting rig."""
    # Ensure lighting collection
    col_name = "Studio_Lighting_Rig"
    if col_name in bpy.data.collections:
        col = bpy.data.collections[col_name]
        # Clear previous studio lights to avoid duplicates
        for obj in list(col.objects):
            bpy.data.objects.remove(obj, do_unlink=True)
    else:
        col = bpy.data.collections.new(col_name)
        bpy.context.scene.collection.children.link(col)

    tx, ty, tz = target_location

    def create_area_light(name, pos, size_x, size_y, power, color_rgb):
        light_data = bpy.data.lights.new(name=name, type='AREA')
        light_data.shape = 'RECTANGLE'
        light_data.size = size_x
        light_data.size_y = size_y
        light_data.energy = power
        light_data.color = color_rgb

        light_obj = bpy.data.objects.new(name=name, object_data=light_data)
        light_obj.location = pos
        col.objects.link(light_obj)

        # Track to target
        constraint = light_obj.constraints.new(type='TRACK_TO')
        
        # Target dummy if not exists
        target_name = "Studio_Product_Center"
        if target_name in bpy.data.objects:
            target_obj = bpy.data.objects[target_name]
        else:
            target_obj = bpy.data.objects.new(target_name, None)
            target_obj.location = target_location
            target_obj.empty_display_size = 0.2
            col.objects.link(target_obj)

        constraint.target = target_obj
        constraint.track_axis = 'TRACK_NEGATIVE_Z'
        constraint.up_axis = 'UP_Y'
        return light_obj

    # 1. Key Light: 45 degrees right, 35 degrees elevation, large soft area (Warm 5500K)
    create_area_light(
        name="Studio_Key_Light",
        pos=(tx + 1.8, ty - 2.2, tz + 2.0),
        size_x=1.4,
        size_y=1.4,
        power=450.0,
        color_rgb=(1.0, 0.96, 0.90)  # Warm soft white
    )

    # 2. Fill Light: 45 degrees left, extra-large softbox, lower power (Neutral 6000K, ~1:3 ratio)
    create_area_light(
        name="Studio_Fill_Light",
        pos=(tx - 2.2, ty - 1.8, tz + 1.4),
        size_x=2.2,
        size_y=2.2,
        power=150.0,
        color_rgb=(0.95, 0.97, 1.0)   # Neutral soft fill
    )

    # 3. Rim / Kicker Light: High backlight behind product to chisel silhouette edges
    create_area_light(
        name="Studio_Rim_Light",
        pos=(tx - 0.8, ty + 2.0, tz + 2.2),
        size_x=0.6,
        size_y=1.6,
        power=380.0,
        color_rgb=(0.90, 0.94, 1.0)   # Cool rim to separate dark edges
    )

    print("[Lighting] 3-Point commercial studio lighting setup created.")


def setup_commercial_camera(target_obj=None, position=(0, -3.2, 1.4), focal_length=85.0, fstop=2.8):
    """Sets up an 85mm commercial cinema camera with physical Depth of Field."""
    scene = bpy.context.scene
    cam_name = "Commercial_Hero_Camera"

    if cam_name in bpy.data.cameras:
        cam_data = bpy.data.cameras[cam_name]
        cam_obj = bpy.data.objects.get(cam_name)
    else:
        cam_data = bpy.data.cameras.new(cam_name)
        cam_obj = bpy.data.objects.new(cam_name, cam_data)
        scene.collection.objects.link(cam_obj)

    # Cinematic optics
    cam_data.lens = focal_length  # 85mm compresses perspective, eliminating wide-angle "toy" distortion
    cam_data.sensor_width = 36.0  # Full frame 35mm standard

    # Depth of field (DOF)
    cam_data.dof.use_dof = True
    cam_data.dof.aperture_fstop = fstop
    cam_data.dof.aperture_blades = 9  # 9 rounded blades for creamy circular bokeh
    
    if target_obj:
        cam_data.dof.focus_object = target_obj
    else:
        cam_data.dof.focus_distance = (cam_obj.location - bpy.mathutils.Vector((0, 0, 1.0))).length

    cam_obj.location = position
    scene.camera = cam_obj

    # Point towards product center
    constraint = cam_obj.constraints.get("Track_Target")
    if not constraint:
        constraint = cam_obj.constraints.new(type='TRACK_TO')
        constraint.name = "Track_Target"
    
    target_name = "Studio_Product_Center"
    if target_name in bpy.data.objects:
        constraint.target = bpy.data.objects[target_name]
        constraint.track_axis = 'TRACK_NEGATIVE_Z'
        constraint.up_axis = 'UP_Y'

    print(f"[Camera] Configured {focal_length}mm camera with f/{fstop} DOF.")


def setup_color_management_and_compositor(scene=None):
    """Applies AgX/Filmic high contrast and adds optical glare/bloom in Compositor."""
    if scene is None:
        scene = bpy.context.scene

    # 1. Color Management
    view_settings = scene.view_settings
    try:
        # Modern Blender 4.0+ standard: AgX handles intense highlights smoothly
        view_settings.view_transform = 'AgX'
        view_settings.look = 'AgX - High Contrast'
    except Exception:
        # Blender 3.x fallback: Filmic
        view_settings.view_transform = 'Filmic'
        view_settings.look = 'High Contrast'

    scene.display_settings.display_device = 'sRGB'
    view_settings.exposure = 0.2

    # 2. Compositor Optical Bloom & Contact Shadows
    scene.use_nodes = True
    tree = scene.node_tree
    nodes = tree.nodes
    links = tree.links
    nodes.clear()

    # Base Render Layer
    rl = nodes.new(type='RenderLayers')
    rl.location = (0, 200)

    # Glare Node (Fog Glow for organic highlight blooming)
    glare = nodes.new(type='CompositorNodeGlare')
    glare.location = (300, 200)
    glare.glare_type = 'FOG_GLOW'
    glare.quality = 'HIGH'
    glare.size = 7
    glare.threshold = 0.95  # Only affects true bright highlights

    # Composite Output
    composite = nodes.new(type='CompositorNodeComposite')
    composite.location = (600, 200)

    # Viewer for interactive feedback
    viewer = nodes.new(type='CompositorNodeViewer')
    viewer.location = (600, 0)

    links.new(rl.outputs['Image'], glare.inputs['Image'])
    links.new(glare.outputs['Image'], composite.inputs['Image'])
    links.new(glare.outputs['Image'], viewer.inputs['Image'])

    print("[Compositor] High contrast color management & Fog Glow bloom applied.")


def apply_micro_surface_material(obj, base_color=(0.1, 0.45, 0.25, 1.0), roughness=0.25):
    """
    Applies a hyper-realistic Principled BSDF with:
    1. Procedural micro-surface bump (eliminates digital plastic flatness).
    2. Bevel node (rounds sharp CG knife-edges to catch light highlights).
    """
    if not obj:
        return

    mat = bpy.data.materials.new(name=f"{obj.name}_Realistic_Commercial")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    # Output
    out_node = nodes.new(type='ShaderNodeOutputMaterial')
    out_node.location = (600, 0)

    # Principled BSDF
    bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    bsdf.location = (250, 0)
    bsdf.inputs['Base Color'].default_value = base_color
    bsdf.inputs['Roughness'].default_value = roughness
    links.new(bsdf.outputs['BSDF'], out_node.inputs['Surface'])

    # Micro-Texture Noise Node
    noise = nodes.new(type='ShaderNodeTexNoise')
    noise.location = (-400, -100)
    noise.inputs['Scale'].default_value = 180.0
    noise.inputs['Detail'].default_value = 8.0
    noise.inputs['Roughness'].default_value = 0.65

    # Bump Node
    bump = nodes.new(type='ShaderNodeBump')
    bump.location = (-150, -100)
    bump.inputs['Strength'].default_value = 0.04   # Subtle micro-texture
    bump.inputs['Distance'].default_value = 0.002  # 2mm scale
    links.new(noise.outputs['Fac'], bump.inputs['Height'])

    # Bevel Node for rounded contact highlights
    bevel = nodes.new(type='ShaderNodeBevel')
    bevel.location = (-150, 150)
    bevel.inputs['Radius'].default_value = 0.005  # 5mm smooth bevel radius
    bevel.samples = 8

    # Combine Bump and Bevel into Normal
    links.new(bevel.outputs['Normal'], bump.inputs['Normal'])
    links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])

    # Assign to object
    if obj.data.materials:
        obj.data.materials[0] = mat
    else:
        obj.data.materials.append(mat)

    print(f"[Material] Applied micro-bump & bevel shader to '{obj.name}'.")


def run_full_commercial_pipeline():
    """Executes the entire commercial hyper-realism workflow."""
    print("=" * 60)
    print("Executing Commercial 3D Hyper-Realistic Pipeline...")
    print("=" * 60)
    
    scene = bpy.context.scene

    # 1. Render Engine (Cycles + GPU OptiX)
    setup_cycles_gpu(scene=scene, samples=128)

    # 2. Environment & Lighting
    setup_world_environment(scene=scene, strength=0.45)
    setup_three_point_lighting(target_location=(0, 0, 1.0))

    # 3. Camera (85mm + DOF)
    setup_commercial_camera(position=(0, -3.2, 1.3), focal_length=85.0, fstop=2.8)

    # 4. Color Management & Compositor
    setup_color_management_and_compositor(scene=scene)

    print("=" * 60)
    print("Pipeline Complete! Scene is ready for high-end commercial rendering.")
    print("=" * 60)

if __name__ == "__main__":
    run_full_commercial_pipeline()
