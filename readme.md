# Setup

Run bootstrap

# Signing and notarizing

- https://www.npmjs.com/package/@electron/notarize
- https://github.com/vercel/hyper/tree/3da89a8797cfedf908bfc118d3776b9a5a051f13
- https://github.com/electron/notarize#safety-when-using-appleidpassword
- https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution/customizing_the_notarization_workflow
https://medium.com/@johndyer24/creating-and-deploying-an-auto-updating-electron-app-for-mac-and-windows-using-electron-builder-6a3982c0cee6

To check logs
`xcrun notarytool history --apple-id travis@sillysideprojects.com --team-id 669MM5WVSV`

# Windows Issues

Need to install `sudo apt install libnss3` before yarn start
Then install `sudo apt-get install -y libatk-bridge2.0-0 libgtk-3.0 libasound2`
Then install `sudo apt-get install libgbm-dev`
