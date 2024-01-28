#!/bin/bash

# Define NO_VNC_PORT and VNC_PORT if they are not set
NO_VNC_PORT=${NO_VNC_PORT:-6901}
VNC_PORT=${VNC_PORT:-5900}

# Start Xvfb, Fluxbox, x11vnc, and websockify with the specified ports
Xvfb :1 -screen 0 1229x910x24 &  # Increased color depth to 24-bit
#Xvfb :1 -screen 0 1280x1024x32 & # Increased color depth to 24-bit
fluxbox &
x11vnc -display :1 -nopw -xkb -forever -shared &
websockify --web /usr/share/novnc/ ${NO_VNC_PORT} localhost:${VNC_PORT}

# Wait for all background processes to finish
wait
