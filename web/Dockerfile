FROM node
WORKDIR /app
COPY ./Node-Ts/package.json /app
RUN npm install
COPY ./Node-Ts /app
EXPOSE 8082
CMD ["npm","start"]