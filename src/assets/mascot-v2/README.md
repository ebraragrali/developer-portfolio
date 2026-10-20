# Supplied standing robot layers

Source: user-supplied `68ad6da7-167b-4876-920d-ccb6209f1a73.png` (1983 × 793).

The body and arm use the first supplied pose at crop `(8,16,400,752)`. All layers retain the same 400 × 752 registration canvas. Only the isolated arm rotates around the shoulder at (280,370); body, antenna, feet and head stay fixed. Five face patches replace only the screen interior. Frames are not swapped as whole-body images.

The source's checkerboard is baked in, not real alpha. The extraction helper removes connected neutral background and residual neutral checker pixels in enclosed gaps, then exports real RGBA PNGs. No image generation was used.

Regenerate from the project root with `scripts/extract-sprites.ps1 -RobotSheet <robot-sheet-path> -PacmanSheet <pacman-sheet-path>` in Windows PowerShell. Source sheets remain unchanged. Review the resulting transparent edges when replacing sources.
