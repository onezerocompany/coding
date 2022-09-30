#!/bin/bash
cd functions
npm install
npm run build
firebase emulators:start --only auth,firestore,storage,pubsub,functions --import /emulators/data/export --export-on-exit