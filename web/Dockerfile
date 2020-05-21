FROM node
WORKDIR /app
COPY ./Node-Ts/package.json /app
RUN npm install
COPY ./Node-Ts /app
EXPOSE 3000
CMD ["npm","start"]