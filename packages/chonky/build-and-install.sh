#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e 

# Step 1: Run npm build
echo "Running npm build..."
npm run build

# Step 2: Create npm package
echo "Creating npm package..."
PACKFILE="vladimir.medina-chonky-0.3.5.tgz"
rm $PACKFILE

npm pack

# Step 3: Copy the generated .tgz file to the specified directory
PACKAGE_NAME="vladimir.medina-chonky-0.3.5.tgz"
DESTINATION="/home/vladimir/Documents/KOBARGO/InfraPEEK"
FILE="$DESTINATION/$PACKAGE_NAME"

rm $FILE

echo "Copying $PACKAGE_NAME to $DESTINATION..."
cp "$PACKAGE_NAME" "$DESTINATION"

# Step 4: Navigate to the destination directory
echo "Changing directory to $DESTINATION..."
cd "$DESTINATION"

# Step 5: Install the package
echo "Installing package..."
npm install $PACKFILE

echo "Process completed successfully!"
