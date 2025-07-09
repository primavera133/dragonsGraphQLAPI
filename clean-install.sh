#!/bin/bash
# Clean install script for Dragons GraphQL API

echo "🧹 Cleaning up old dependencies..."
rm -rf node_modules
rm -f package-lock.json

echo "📦 Installing dependencies..."
npm install

echo "🚀 Running development server..."
npm run dev
