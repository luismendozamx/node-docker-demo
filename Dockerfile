# Set the base image
FROM node:6.7

# Add user app and group
RUN useradd --user-group --create-home --shell /bin/false app

# Set environment variables
ENV HOME=/home/app
ENV NPM_CONFIG_LOGLEVEL=warn

# Copy npm-shrinkwrap
COPY npm-shrinkwrap.json $HOME/node-docker/

# Make app owner of HOME
RUN chown -R app:app $HOME/*

# Run npm install as user app
USER app
WORKDIR $HOME/node-docker
RUN npm install

# Copy files
USER root
COPY . $HOME/node-docker

# Make app owner of HOME with application files
RUN chown -R app:app $HOME/*

USER app

EXPOSE 4040

CMD ["npm", "start"]
