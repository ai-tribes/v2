#!/bin/bash

# Create GitIngest directory if it doesn't exist
mkdir -p docs/GitIngest/archive

# Get the current timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# If current GitIngest exists, move it to archive with timestamp
if [ -f "docs/GitIngest/ai-tribes-v2.txt" ]; then
    mv "docs/GitIngest/ai-tribes-v2.txt" "docs/GitIngest/archive/ai-tribes-v2_${TIMESTAMP}.txt"
    echo "WARNING: This is an archived GitIngest from ${TIMESTAMP}. Do not use as current reference." > "docs/GitIngest/archive/ai-tribes-v2_${TIMESTAMP}.txt.legacy"
    cat "docs/GitIngest/archive/ai-tribes-v2_${TIMESTAMP}.txt" >> "docs/GitIngest/archive/ai-tribes-v2_${TIMESTAMP}.txt.legacy"
    rm "docs/GitIngest/archive/ai-tribes-v2_${TIMESTAMP}.txt"
    mv "docs/GitIngest/archive/ai-tribes-v2_${TIMESTAMP}.txt.legacy" "docs/GitIngest/archive/ai-tribes-v2_${TIMESTAMP}.txt"
fi

# Generate directory structure
echo "Current GitIngest generated on: $(date)" > "docs/GitIngest/ai-tribes-v2.txt"
echo -e "\nDirectory structure:" >> "docs/GitIngest/ai-tribes-v2.txt"
tree --gitignore -I 'node_modules|.git|.next|coverage' >> "docs/GitIngest/ai-tribes-v2.txt"

# Add separator
echo -e "\n================================================" >> "docs/GitIngest/ai-tribes-v2.txt"

# Add important files content
for file in README.md checklist.md docs/planning/*.md; do
    if [ -f "$file" ]; then
        echo -e "File: /$file\n================================================" >> "docs/GitIngest/ai-tribes-v2.txt"
        cat "$file" >> "docs/GitIngest/ai-tribes-v2.txt"
        echo -e "\n\n" >> "docs/GitIngest/ai-tribes-v2.txt"
    fi
done

# Add all GitIngest files to git
git add docs/GitIngest/ai-tribes-v2.txt docs/GitIngest/archive/ 