FROM eclipse-temurin:11-jre
# docker build -t nmf_client . && docker run -it -p 5900:5900 -p 6901:6901 --rm nmf_client

FROM eclipse-temurin:11-jre

# Set environment variables for the display
ENV DISPLAY=:1 \
    VNC_PORT=5900 \
    NO_VNC_PORT=6901

# Install dependencies for VNC, noVNC and a basic GUI environment
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    fluxbox \
    net-tools \
    novnc \
    socat \
    x11vnc \
    tcpdump \
    wireshark \
    vim \
    nano \
    wireguard-tools \
    iproute2 \
    gedit \ 
    xvfb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Add your application and its run script
ADD assets/nmf /opt/nmf

ADD assets/fluxbox /root/.fluxbox
COPY assets/fluxbox-menu /opt/fluxbox-menu
COPY assets/satbackground.png /usr/share/images/fluxbox/ubuntu-light.png

# Make sure the script is executable
RUN chmod +x /opt/nmf/consumer-test-tool/consumer-test-tool.sh

# Create a Fluxbox menu configuration file with an entry for your application
#RUN echo "[begin] (Fluxbox)" > /root/.fluxbox/menu && \
#    echo "[exec] (Launch Java App) {/opt/nmf/consumer-test-tool/consumer-test-tool.sh}" >> /root/.fluxbox/menu && \
#    echo "[end]" >> /root/.fluxbox/menu

# Copy the VNC/xstartup script and the run script
COPY assets/xstartup /root/.xstartup
COPY assets/run.sh /root/run.sh

# Ensure scripts are executable
RUN chmod +x /root/.xstartup /root/run.sh

# Set the working directory to /root
WORKDIR /root

# Expose VNC and noVNC ports
EXPOSE ${VNC_PORT} ${NO_VNC_PORT}

# Start the VNC server and associated services when the container starts
CMD ["/root/run.sh"]
