import os
import cv2
import numpy as np
import subprocess
import imageio_ffmpeg

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
base_dir = 'public/assets/character_states'
temp_dir = 'public/assets/character_states/temp_frames'
os.makedirs(temp_dir, exist_ok=True)

target_w, target_h = 600, 600

def load_pose(name):
    img = cv2.imread(os.path.join(base_dir, name))
    if img.shape[:2] != (target_h, target_w):
        img = cv2.resize(img, (target_w, target_h), interpolation=cv2.INTER_AREA)
    return img.astype(np.float32)

typing = load_pose('pose_typing.png')
coffee = load_pose('pose_coffee.png')
wave = load_pose('pose_wave.png')
listen = load_pose('pose_listen.png')

def ease_in_out_cubic(t):
    t = max(0.0, min(1.0, t))
    if t < 0.5:
        return 4.0 * t * t * t
    else:
        return 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0

def add_breathing(img, phase, amp=1.5):
    h, w = img.shape[:2]
    shift = np.sin(phase) * amp
    M = np.float32([[1, 0, 0], [0, 1, shift]])
    return cv2.warpAffine(img, M, (w, h), borderMode=cv2.BORDER_REPLICATE)

def add_typing_motion(img, frame_idx):
    res = img.copy()
    h, w = res.shape[:2]
    
    # Keystrokes: rapid alternating hand taps
    tap_cycle = (frame_idx % 6)
    left_tap = 3.0 if tap_cycle in [0, 1] else 0.0
    right_tap = 3.0 if tap_cycle in [3, 4] else 0.0
    
    lh_x1, lh_x2, lh_y1, lh_y2 = int(w*0.38), int(w*0.52), int(h*0.68), int(h*0.82)
    if left_tap > 0:
        patch = res[lh_y1:lh_y2, lh_x1:lh_x2]
        M = np.float32([[1, 0, 0], [0, 1, left_tap]])
        res[lh_y1:lh_y2, lh_x1:lh_x2] = cv2.warpAffine(patch, M, (patch.shape[1], patch.shape[0]), borderMode=cv2.BORDER_REPLICATE)
        
    rh_x1, rh_x2, rh_y1, rh_y2 = int(w*0.52), int(w*0.66), int(h*0.68), int(h*0.82)
    if right_tap > 0:
        patch = res[rh_y1:rh_y2, rh_x1:rh_x2]
        M = np.float32([[1, 0, 0], [0, 1, right_tap]])
        res[rh_y1:rh_y2, rh_x1:rh_x2] = cv2.warpAffine(patch, M, (patch.shape[1], patch.shape[0]), borderMode=cv2.BORDER_REPLICATE)
        
    # Blue-white screen reflection pulse
    glow = np.sin(frame_idx * 0.45) * 3.5
    kb_x1, kb_x2, kb_y1, kb_y2 = int(w*0.35), int(w*0.65), int(h*0.70), int(h*0.80)
    res[kb_y1:kb_y2, kb_x1:kb_x2] = np.clip(res[kb_y1:kb_y2, kb_x1:kb_x2] + glow, 0, 255)
    
    # Focused head micro-nod
    nod = np.sin(frame_idx * 0.2) * 1.0
    head_x1, head_x2, head_y1, head_y2 = int(w*0.35), int(w*0.60), int(h*0.25), int(h*0.55)
    patch_head = res[head_y1:head_y2, head_x1:head_x2]
    M_head = np.float32([[1, 0, 0], [0, 1, nod]])
    res[head_y1:head_y2, head_x1:head_x2] = cv2.warpAffine(patch_head, M_head, (patch_head.shape[1], patch_head.shape[0]), borderMode=cv2.BORDER_REPLICATE)
    
    return res

def add_waving_motion(img, frame_idx):
    res = img.copy()
    h, w = res.shape[:2]
    
    # Lively waving swing
    angle_r = np.sin(frame_idx * 0.35) * 8.0
    angle_l = np.cos(frame_idx * 0.35) * 5.0
    
    ra_x1, ra_x2, ra_y1, ra_y2 = int(w*0.58), int(w*0.96), int(h*0.10), int(h*0.65)
    patch_ra = res[ra_y1:ra_y2, ra_x1:ra_x2]
    p_h, p_w = patch_ra.shape[:2]
    M_ra = cv2.getRotationMatrix2D((int(p_w * 0.25), int(p_h * 0.85)), angle_r, 1.0)
    res[ra_y1:ra_y2, ra_x1:ra_x2] = cv2.warpAffine(patch_ra, M_ra, (p_w, p_h), borderMode=cv2.BORDER_REPLICATE)
    
    la_x1, la_x2, la_y1, la_y2 = int(w*0.12), int(w*0.42), int(h*0.10), int(h*0.65)
    patch_la = res[la_y1:la_y2, la_x1:la_x2]
    p_hl, p_wl = patch_la.shape[:2]
    M_la = cv2.getRotationMatrix2D((int(p_wl * 0.75), int(p_hl * 0.85)), angle_l, 1.0)
    res[la_y1:la_y2, la_x1:la_x2] = cv2.warpAffine(patch_la, M_la, (p_wl, p_hl), borderMode=cv2.BORDER_REPLICATE)
    
    # Warm speaking mouth movement
    mouth_open = max(0.0, np.sin(frame_idx * 0.55)) * 3.5
    m_x1, m_x2, m_y1, m_y2 = int(w*0.44), int(w*0.56), int(h*0.44), int(h*0.52)
    patch_m = res[m_y1:m_y2, m_x1:m_x2]
    M_m = np.float32([[1, 0, 0], [0, 1, mouth_open * 0.4]])
    res[m_y1:m_y2, m_x1:m_x2] = cv2.warpAffine(patch_m, M_m, (patch_m.shape[1], patch_m.shape[0]), borderMode=cv2.BORDER_REPLICATE)
    
    return add_breathing(res, frame_idx * 0.18, amp=2.0)

def add_steam(img, frame_idx, mug_x=int(600*0.25), mug_y=int(600*0.72)):
    res = img.copy()
    for p in range(4):
        p_age = (frame_idx * 2 + p * 20) % 60
        progress = p_age / 60.0
        y_pos = int(mug_y - progress * 48)
        x_wobble = int(mug_x + np.sin(frame_idx * 0.18 + p) * 9.0)
        radius = int(3 + progress * 8)
        alpha = (1.0 - progress) * 0.28
        
        overlay = res.copy()
        cv2.circle(overlay, (x_wobble, y_pos), radius, (245, 245, 255), -1)
        res = cv2.addWeighted(overlay, alpha, res, 1.0 - alpha, 0)
    return res

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
        "-pix_fmt", "yuv420p",
        "-crf", "22",
        "-movflags", "+faststart",
        mp4_path
    ]
    subprocess.run(cmd_mp4, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    cmd_webm = [
        ffmpeg_exe, "-y",
        "-framerate", str(fps),
        "-i", os.path.join(temp_dir, "frame_%05d.png"),
        "-c:v", "libvpx-vp9",
        "-crf", "32",
        "-b:v", "0",
        webm_path
    ]
    subprocess.run(cmd_webm, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    size_kb = os.path.getsize(mp4_path) // 1024
    print(f"Rendered {name}: MP4 ({size_kb} KB)")

# ===============================================================
# 1. Base Typing Loop (8.0s, 240 frames)
# ===============================================================
print("Rendering Clip 1: Base Typing Loop with Real Typing & Coffee Sip...")
clip1 = []
for i in range(240):
    b_phase = (i / 30.0) * np.pi * 1.5
    
    if i < 75:
        f = add_typing_motion(typing, i)
        f = add_steam(f, i)
        f = add_breathing(f, b_phase, amp=1.0)
    elif i < 105:
        t = ease_in_out_cubic((i - 75) / 30.0)
        blend = (1.0 - t) * typing + t * coffee
        f = add_steam(blend, i, mug_y=int(600*0.72 - t*140))
        f = add_breathing(f, b_phase, amp=1.2)
    elif i < 145:
        f = coffee.copy()
        f = add_steam(f, i, mug_x=int(600*0.42), mug_y=int(600*0.46))
        f = add_breathing(f, b_phase, amp=1.4)
    elif i < 175:
        t = ease_in_out_cubic((i - 145) / 30.0)
        blend = (1.0 - t) * coffee + t * typing
        f = add_steam(blend, i, mug_y=int(600*0.46 + t*140))
        f = add_breathing(f, b_phase, amp=1.2)
    else:
        f = add_typing_motion(typing, i)
        f = add_steam(f, i)
        settle_factor = 1.0 if i < 225 else (240 - i) / 15.0
        f = add_breathing(f, b_phase * settle_factor, amp=1.0 * settle_factor)
        
    clip1.append(np.clip(f, 0, 255).astype(np.uint8))
encode_clip(clip1, "clip_1_typing_loop", 30)

# ===============================================================
# 2. Transition: Typing -> Wave (1.2s, 36 frames)
# ===============================================================
print("Rendering Clip 2: Transition Typing to Wave...")
clip2 = []
for i in range(36):
    t = ease_in_out_cubic(i / 35.0)
    blend = (1.0 - t) * typing + t * wave
    if t < 0.4:
        blend = add_typing_motion(blend, i)
    f = add_breathing(blend, i * 0.15, amp=1.2)
    clip2.append(np.clip(f, 0, 255).astype(np.uint8))
encode_clip(clip2, "clip_2_typing_to_wave", 30)

# ===============================================================
# 3. Waving Greeting State (3.0s, 90 frames)
# ===============================================================
print("Rendering Clip 3: Waving Greeting State...")
clip3 = []
for i in range(90):
    f = add_waving_motion(wave, i)
    clip3.append(np.clip(f, 0, 255).astype(np.uint8))
encode_clip(clip3, "clip_3_waving_speech", 30)

# ===============================================================
# 4. Attentive Listening State (5.0s, 150 frames)
# ===============================================================
print("Rendering Clip 4: Attentive Listening State...")
clip4 = []
for i in range(150):
    b_phase = (i / 30.0) * np.pi * 1.2
    nod = np.sin(i * 0.1) * 1.8
    h, w = listen.shape[:2]
    patch = listen[int(h*0.2):int(h*0.6), int(w*0.3):int(w*0.7)]
    M = np.float32([[1, 0, 0], [0, 1, nod]])
    f = listen.copy()
    f[int(h*0.2):int(h*0.6), int(w*0.3):int(w*0.7)] = cv2.warpAffine(patch, M, (patch.shape[1], patch.shape[0]), borderMode=cv2.BORDER_REPLICATE)
    f = add_breathing(f, b_phase, amp=1.5)
    clip4.append(np.clip(f, 0, 255).astype(np.uint8))
encode_clip(clip4, "clip_4_listening_wait", 30)

# ===============================================================
# 5. Transition: Listening -> Typing (1.0s, 30 frames)
# ===============================================================
print("Rendering Clip 5: Transition Listening to Typing...")
clip5 = []
for i in range(30):
    t = ease_in_out_cubic(i / 29.0)
    blend = (1.0 - t) * listen + t * typing
    if t > 0.6:
        blend = add_typing_motion(blend, i)
    f = add_breathing(blend, i * 0.15, amp=1.0)
    clip5.append(np.clip(f, 0, 255).astype(np.uint8))
encode_clip(clip5, "clip_5_listen_to_typing", 30)

# Cleanup
for f in os.listdir(temp_dir):
    os.remove(os.path.join(temp_dir, f))
os.rmdir(temp_dir)
print("ALL 5 CLIPS SUCCESSFULLY RENDERED WITH REAL CHARACTER MOTION!")
