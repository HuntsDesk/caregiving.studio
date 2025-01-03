#!/bin/bash

# Exit on error
set -e

# Build the project
echo "Building project..."
npm run build

# Validate build output exists
if [ ! -d "dist" ]; then
  echo "Error: Build failed - dist directory not found"
  exit 1
fi

# Set content types and cache headers for different file types
echo "Setting cache headers..."
gsutil -m setmeta -h "Cache-Control:no-cache" gs://cs_app/*.html
gsutil -m setmeta -h "Cache-Control:public, max-age=31536000" gs://cs_app/assets/*

# Upload the dist folder to GCS bucket with appropriate flags
echo "Uploading to Google Cloud Storage..."
gsutil -m cp -r dist/* gs://cs_app/

# Set the main page suffix and error page
echo "Configuring web hosting settings..."
gsutil web set -m index.html -e index.html gs://cs_app

# Make all files publicly readable
echo "Setting public access..."
gsutil -m acl ch -r -u AllUsers:R gs://cs_app/

echo "Deployment complete!"