# GitIngest Documentation

This directory contains automated snapshots of the project state at each git push.

## Structure

- `ai-tribes-v2.txt` - Current state of the project
- `archive/` - Historical snapshots with timestamps
  - Format: `ai-tribes-v2_YYYYMMDD_HHMMSS.txt`

## Files Included

Each GitIngest contains:
1. Directory structure (excluding node_modules, .git, etc.)
2. Content of key documentation files:
   - README.md
   - checklist.md
   - Planning documents (from docs/planning/)

## Usage

- For current state, always refer to `ai-tribes-v2.txt` in the root of this directory
- Archive files are for historical reference only and should not be used as current documentation
- Each archived file is clearly marked with a warning header and timestamp

## Automation

GitIngests are automatically generated:
1. Before each git push
2. Current state is saved to `ai-tribes-v2.txt`
3. Previous state is archived with timestamp
4. All changes are included in the push 