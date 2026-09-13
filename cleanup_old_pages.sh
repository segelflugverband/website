#!/bin/bash
# Run this from the project root (sfvs/) to remove old hard-coded page files
# that now conflict with the new Strapi-driven [...slug] catch-all route.

set -e

LOCALE_DIR="frontend/src/app/[locale]"

echo "Removing old hard-coded homepage..."
rm -f "$LOCALE_DIR/page.tsx"

echo "Removing old hard-coded training pages..."
rm -rf "$LOCALE_DIR/training"

echo "Done. The new catch-all [...slug]/page.tsx handles all pages from Strapi."
