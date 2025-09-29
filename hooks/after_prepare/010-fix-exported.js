#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

module.exports = function (ctx) {
  const manifestPath = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');

  if (fs.existsSync(manifestPath)) {
    let manifest = fs.readFileSync(manifestPath, 'utf8');

    if (manifest.includes('nl.xservices.plugins.ShareChooserPendingIntent') &&
        !manifest.includes('nl.xservices.plugins.ShareChooserPendingIntent" android:exported')) {

      manifest = manifest.replace(
        /(<receiver[^>]*nl\.xservices\.plugins\.ShareChooserPendingIntent[^>]*)(>)/,
        '$1 android:exported="true"$2'
      );

      fs.writeFileSync(manifestPath, manifest, 'utf8');
      console.log('✔ Patched android:exported="true" for ShareChooserPendingIntent');
    }
  }
};