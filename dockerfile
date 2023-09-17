FROM  node:latest
WORKDIR /
COPY . /
RUN npm i
EXPOSE 5000
CMD npm start