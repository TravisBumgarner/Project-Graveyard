# Setup

1. Install Tampermonkey chrome extension (If you do this on another browser, toss me some instructions so I can add!)
2. Create a new script
3. Replace the entire contents of the file with the tampermonkey-headers.txt (the main point of this file is the regex line `@include /.*/` which will make this script work on all sites with a single video player per page) followed by the main.js code
4. Head to a page with a single video. By default, the script uses `[` to decrease speed and `]` to increase speed. Check the code for how to change this.
5. I've specified some speeds that work for me. You can modify them in the code as well. 
