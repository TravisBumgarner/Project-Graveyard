About

Pairs with Google Sheets as a backend to display stats on a raspberry pi

# Raspberry Pi Setup

1. Clone via HTTPS into `/var/www/stats_tracker`

2. Install NPM and Node
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt install nodejs
```

3. Install depdendencies
`npm i`

4. Setup Service
`sudo cp stats_tracker.service /etc/systemd/system`
`sudo systemctl start stats_tracker`
`sudo systemctl enable stats_tracker`
`chmod +x server.js`

See logs at `journalctl -fu stats_tracker`
Should see running on port 8000

5. Setup Kiosk Mode. 
Lost the documentation so what.