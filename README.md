# Raspberry Pi Setup

1. Clone via HTTPS
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

See logs at `journalctl -u stats_tracker`