import os
import cv2
import numpy as np
import subprocess
import shutil

# Ensure strict consistency:
# Pose 1: pose_typing.png (focused on laptop)
# Pose 2: pose_listen.png (looking forward attentively, smiling)
# Pose 3: pose_wave.png (looking forward smiling, right hand raised waving)

base_dir = os.path.join(os.path.dirname(__file__), "public", "assets", "character_states")
temp_dir = os.path.join(base_dir, "temp_render_frames")
os.makedirs(temp_dir, exist_ok=True)

import imageio_ffmpeg
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

print("--- Loading Master Illustrated Poses ---")
hero_img = cv2.imread(os.path.join(base_dir, "pose_typing.png"))
listen_img = cv2.imread(os.path.join(base_dir, "pose_listen.png"))
raw_wave_img = cv2.imread(os.path.join(base_dir, "pose_wave.png"))

H, W = hero_img.shape[:2]
print(f"Master Resolution: {W}x{H}")

# -------------------------------------------------------------
# 1. EXTRACT 100% PRISTINE HAND & CUFF SPRITE
# -------------------------------------------------------------
y1_hand, y2_hand = int(0.41 * H), int(0.585 * H)
x1_hand, x2_hand = int(0.235 * W), int(0.355 * W)

hand_patch = raw_wave_img[y1_hand:y2_hand, x1_hand:x2_hand].astype(np.float32)
bg_patch = listen_img[y1_hand:y2_hand, x1_hand:x2_hand].astype(np.float32)

diff = np.max(np.abs(hand_patch - bg_patch), axis=2)
mask = (diff > 16).astype(np.uint8) * 255

kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(mask)
clean_mask = np.zeros_like(mask)
main_label = np.argmax(stats[1:, cv2.CC_STAT_AREA]) + 1
clean_mask[labels == main_label] = 255

contours, _ = cv2.findContours(clean_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
cv2.drawContours(clean_mask, contours, -1, 255, -1)
feather_mask = cv2.GaussianBlur(clean_mask.astype(np.float32) / 255.0, (5, 5), 0)

# Build pristine master pose_wave.png (0 degrees)
master_wave = listen_img.copy()
hand_blend = hand_patch * feather_mask[:, :, np.newaxis] + bg_patch * (1.0 - feather_mask[:, :, np.newaxis])
master_wave[y1_hand:y2_hand, x1_hand:x2_hand] = hand_blend.astype(np.uint8)
cv2.imwrite(os.path.join(base_dir, "pose_wave.png"), master_wave)
print("Updated master pose_wave.png with 100% clean background and single right hand!")

# Wrist pivot point inside hand patch
pivot_in_patch = (int(x2_hand - x1_hand) // 2 + 10, int(y2_hand - y1_hand) - 10)

def render_waving_hand(base_canvas, angle_deg):
    M = cv2.getRotationMatrix2D(pivot_in_patch, angle_deg, 1.0)
    rot_hand = cv2.warpAffine(hand_patch, M, (x2_hand - x1_hand, y2_hand - y1_hand), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101)
    rot_mask = cv2.warpAffine(feather_mask, M, (x2_hand - x1_hand, y2_hand - y1_hand), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=0)[:, :, np.newaxis]
    
    bg = base_canvas[y1_hand:y2_hand, x1_hand:x2_hand].astype(np.float32)
    comp = rot_hand * rot_mask + bg * (1.0 - rot_mask)
    
    res = base_canvas.copy()
    res[y1_hand:y2_hand, x1_hand:x2_hand] = np.clip(comp, 0, 255).astype(np.uint8)
    return res

# -------------------------------------------------------------
# 2. ANATOMICAL MOTION GENERATORS
# -------------------------------------------------------------

# Respiration: Torso and head expand gently
# Feathered at desk boundary (y ~ 0.70*H) so desk/laptop never moves
breath_mask = np.zeros((H, W), dtype=np.float32)
y1_b, y2_b = int(H * 0.20), int(H * 0.70)
x1_b, x2_b = int(W * 0.32), int(W * 0.72)
breath_mask[y1_b:y2_b, x1_b:x2_b] = 1.0
breath_mask = cv2.GaussianBlur(breath_mask, (45, 45), 0)[:, :, np.newaxis]

def apply_breathing(img, phase, amp=1.2):
    dy = float(np.sin(phase) * amp)
    M = np.float32([[1, 0, 0], [0, 1, dy]])
    shifted = cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101)
    return (shifted * breath_mask + img * (1.0 - breath_mask)).astype(np.uint8)

# Continuous Discord Mug Steam
def apply_mug_steam(img, frame_idx):
    res = img.copy()
    mug_cx = int(W * 0.088)
    mug_top_y = int(H * 0.672)
    
    for i in range(3):
        age = (frame_idx + i * 20) % 60
        prog = age / 60.0
        puff_y = int(mug_top_y - prog * 44)
        puff_x = int(mug_cx + np.sin(prog * np.pi * 2.5 + i * 1.5) * 5.0)
        radius = int(3 + prog * 6)
        alpha = (1.0 - prog) * 0.25
        
        overlay = res.copy()
        cv2.circle(overlay, (puff_x, puff_y), radius, (255, 252, 248), -1)
        overlay = cv2.GaussianBlur(overlay, (7, 7), 0)
        res = cv2.addWeighted(overlay, alpha, res, 1.0 - alpha, 0)
    return res

# Organic Typing Keys (sub-pixel finger rhythm, NO sharp rectangular blue boxes)
def apply_typing(img, frame_idx):
    res = img.copy()
    cycle = frame_idx % 12
    # Alternate left and right fingertip micro-taps (0.8px)
    left_dy = 0.8 * np.sin((cycle / 6.0) * np.pi) if cycle < 6 else 0.0
    right_dy = 0.8 * np.sin(((cycle - 6) / 6.0) * np.pi) if cycle >= 6 else 0.0
    
    if left_dy > 0:
        ly1, ly2 = int(H * 0.690), int(H * 0.740)
        lx1, lx2 = int(W * 0.390), int(W * 0.450)
        patch_l = res[ly1:ly2, lx1:lx2]
        M_l = np.float32([[1, 0, 0], [0, 1, left_dy]])
        shifted_l = cv2.warpAffine(patch_l, M_l, (lx2 - lx1, ly2 - ly1), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101)
        mask_l = np.zeros((ly2 - ly1, lx2 - lx1), dtype=np.float32)
        cv2.ellipse(mask_l, ((lx2 - lx1)//2, (ly2 - ly1)//2), ((lx2 - lx1)//2 - 2, (ly2 - ly1)//2 - 2), 0, 0, 360, 1.0, -1)
        mask_l = cv2.GaussianBlur(mask_l, (7, 7), 0)[:, :, np.newaxis]
        res[ly1:ly2, lx1:lx2] = (shifted_l * mask_l + patch_l * (1.0 - mask_l)).astype(np.uint8)
        
    if right_dy > 0:
        ry1, ry2 = int(H * 0.690), int(H * 0.740)
        rx1, rx2 = int(W * 0.440), int(W * 0.500)
        patch_r = res[ry1:ry2, rx1:rx2]
        M_r = np.float32([[1, 0, 0], [0, 1, right_dy]])
        shifted_r = cv2.warpAffine(patch_r, M_r, (rx2 - rx1, ry2 - ry1), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101)
        mask_r = np.zeros((ry2 - ry1, rx2 - rx1), dtype=np.float32)
        cv2.ellipse(mask_r, ((rx2 - rx1)//2, (ry2 - ry1)//2), ((rx2 - rx1)//2 - 2, (ry2 - ry1)//2 - 2), 0, 0, 360, 1.0, -1)
        mask_r = cv2.GaussianBlur(mask_r, (7, 7), 0)[:, :, np.newaxis]
        res[ry1:ry2, rx1:rx2] = (shifted_r * mask_r + patch_r * (1.0 - mask_r)).astype(np.uint8)
        
    # Soft, ambient screen reflection (smooth radial gradient, NO rectangular box)
    glow_pulse = 0.04 + 0.02 * float(np.sin(frame_idx * 0.3))
    gy1, gy2 = int(H * 0.680), int(H * 0.770)
    gx1, gx2 = int(W * 0.350), int(W * 0.530)
    radial_mask = np.zeros((gy2 - gy1, gx2 - gx1), dtype=np.float32)
    cv2.ellipse(radial_mask, ((gx2 - gx1)//2, (gy2 - gy1)//2), ((gx2 - gx1)//2 - 4, (gy2 - gy1)//2 - 4), 0, 0, 360, 1.0, -1)
    radial_mask = cv2.GaussianBlur(radial_mask, (19, 19), 0)[:, :, np.newaxis]
    
    blue_tint = np.zeros_like(res[gy1:gy2, gx1:gx2])
    blue_tint[:, :] = [238, 120, 30] # Soft gentle blue in BGR
    sub = res[gy1:gy2, gx1:gx2].astype(np.float32)
    blend = sub * (1.0 - radial_mask * glow_pulse) + blue_tint * (radial_mask * glow_pulse)
    res[gy1:gy2, gx1:gx2] = np.clip(blend, 0, 255).astype(np.uint8)
    
    return res

# Attentive Head Nod (State 4)
nod_mask = np.zeros((H, W), dtype=np.float32)
ny1, ny2 = int(H * 0.240), int(H * 0.500)
nx1, nx2 = int(W * 0.360), int(W * 0.560)
nod_mask[ny1:ny2, nx1:nx2] = 1.0
nod_mask = cv2.GaussianBlur(nod_mask, (25, 25), 0)[:, :, np.newaxis]

def apply_head_nod(img, frame_idx):
    nod_dy = float(np.sin((frame_idx / 45.0) * np.pi) * 1.4)
    M = np.float32([[1, 0, 0], [0, 1, nod_dy]])
    shifted = cv2.warpAffine(img, M, (W, H), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101)
    return (shifted * nod_mask + img * (1.0 - nod_mask)).astype(np.uint8)

# Natural speech cadence on smile mouth (State 3)
def apply_speaking_cadence(img, frame_idx):
    res = img.copy()
    my1, my2 = int(H * 0.444), int(H * 0.468)
    mx1, mx2 = int(W * 0.424), int(W * 0.462)
    speech_amount = float(max(0.0, np.sin(frame_idx * 0.55)) * 1.5)
    if speech_amount < 0.2:
        return res
    patch = res[my1:my2, mx1:mx2]
    M = np.float32([[1, 0, 0], [0, 1, speech_amount * 0.4]])
    shifted = cv2.warpAffine(patch, M, (mx2 - mx1, my2 - my1), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101)
    mask = np.zeros((my2 - my1, mx2 - mx1), dtype=np.float32)
    cv2.ellipse(mask, ((mx2 - mx1)//2, (my2 - my1)//2), ((mx2 - mx1)//2 - 2, (my2 - my1)//2 - 2), 0, 0, 360, 1.0, -1)
    mask = cv2.GaussianBlur(mask, (5, 5), 0)[:, :, np.newaxis]
    res[my1:my2, mx1:mx2] = (shifted * mask + patch * (1.0 - mask)).astype(np.uint8)
    return res

# -------------------------------------------------------------
# CLIP ENCODER
# -------------------------------------------------------------
def encode_clip(frames, name, fps=30):
    for f in os.listdir(temp_dir):
        os.remove(os.path.join(temp_dir, f))
    for idx, f in enumerate(frames):
        cv2.imwrite(os.path.join(temp_dir, f"frame_{idx:05d}.png"), f)
        
    mp4_path = os.path.join(base_dir, f"{name}.mp4")
    webm_path = os.path.join(base_dir, f"{name}.webm")
    
    cmd_mp4 = [
        ffmpeg_exe, "-y",
        "-framerate", str(fps),
        "-i", os.path.join(temp_dir, "frame_%05d.png"),
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-pix_fmt", "yuv420p",
        "-profile:v", "baseline",
        "-level", "3.0",
        "-crf", "18",
        "-movflags", "+faststart",
        mp4_path
    ]
    subprocess.run(cmd_mp4, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    cmd_webm = [
        ffmpeg_exe, "-y",
        "-framerate", str(fps),
        "-i", os.path.join(temp_dir, "frame_%05d.png"),
        "-c:v", "libvpx-vp9",
        "-deadline", "realtime",
        "-cpu-used", "8",
        "-crf", "26",
        "-b:v", "0",
        webm_path
    ]
    subprocess.run(cmd_webm, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    size_kb = os.path.getsize(mp4_path) // 1024
    print(f"-> Encoded {name}: MP4 ({size_kb} KB)", flush=True)

# Helper easing
def ease_in_out(t):
    return t * t * (3.0 - 2.0 * t)

# =============================================================
# 1. State 1: Typing Loop (180 frames, 6.0s seamless)
# =============================================================
print("\nRendering State 1: Typing Loop...")
frames1 = []
for i in range(180):
    f = hero_img.copy()
    f = apply_typing(f, i)
    f = apply_breathing(f, (i / 180.0) * 2.0 * np.pi * 3.0, amp=1.2)
    f = apply_mug_steam(f, i)
    frames1.append(f)
encode_clip(frames1, "clip_1_typing_loop", 30)

# =============================================================
# 2. State 2: Transition Typing to Wave (24 frames, 0.8s)
# =============================================================
print("\nRendering State 2: Transition Typing to Wave...")
frames2 = []
# Diff mask between hero and master_wave
diff_tw = np.abs(hero_img.astype(np.float32) - master_wave.astype(np.float32)).max(axis=2)
diff_tw_mask = cv2.GaussianBlur((diff_tw > 12).astype(np.float32), (31, 31), 0)[:, :, np.newaxis]

for i in range(24):
    t = ease_in_out(i / 23.0)
    # Smooth morph
    f = (hero_img.astype(np.float32) * (1.0 - t * diff_tw_mask) + master_wave.astype(np.float32) * (t * diff_tw_mask)).astype(np.uint8)
    f = apply_breathing(f, (i / 24.0) * np.pi, amp=1.0)
    f = apply_mug_steam(f, i)
    frames2.append(f)
encode_clip(frames2, "clip_2_typing_to_wave", 30)

# =============================================================
# 3. State 3: Waving Greeting (72 frames, 2.4s seamless loop)
# =============================================================
print("\nRendering State 3: Waving Greeting...")
frames3 = []
for i in range(72):
    # Oscillate ±5.5 degrees around wrist
    angle = float(np.sin((i / 72.0) * 2.0 * np.pi * 2.0) * 5.5)
    f = render_waving_hand(listen_img, angle)
    f = apply_speaking_cadence(f, i)
    f = apply_breathing(f, (i / 72.0) * 2.0 * np.pi, amp=1.0)
    f = apply_mug_steam(f, i)
    frames3.append(f)
encode_clip(frames3, "clip_3_waving_speech", 30)

# =============================================================
# 4. State 4: Listening Wait (90 frames, 3.0s seamless loop)
# =============================================================
print("\nRendering State 4: Listening Wait...")
frames4 = []
for i in range(90):
    f = listen_img.copy()
    f = apply_head_nod(f, i)
    f = apply_breathing(f, (i / 90.0) * 2.0 * np.pi, amp=1.2)
    f = apply_mug_steam(f, i)
    frames4.append(f)
encode_clip(frames4, "clip_4_listening_wait", 30)

# =============================================================
# 5. State 5: Transition Listening to Typing (24 frames, 0.8s)
# =============================================================
print("\nRendering State 5: Transition Listening to Typing...")
frames5 = []
diff_lt = np.abs(listen_img.astype(np.float32) - hero_img.astype(np.float32)).max(axis=2)
diff_lt_mask = cv2.GaussianBlur((diff_lt > 12).astype(np.float32), (31, 31), 0)[:, :, np.newaxis]

for i in range(24):
    t = ease_in_out(i / 23.0)
    f = (listen_img.astype(np.float32) * (1.0 - t * diff_lt_mask) + hero_img.astype(np.float32) * (t * diff_lt_mask)).astype(np.uint8)
    f = apply_breathing(f, (i / 24.0) * np.pi, amp=1.0)
    f = apply_mug_steam(f, i)
    frames5.append(f)
encode_clip(frames5, "clip_5_listen_to_typing", 30)

# Cleanup
if os.path.exists(temp_dir):
    shutil.rmtree(temp_dir)

print("\nALL 5 HIGH-DEFINITION PRISTINE VIDEO TRACKS RENDERED AND ENCODED!")
