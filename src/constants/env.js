// Envs
let dev = false;
let devserver = "http://192.168.1.108:8082/";
let deploy = "http://plus-softjo.info:3000/";

let env = {
  server: dev ? devserver : deploy,
  dev: dev,
};

export default env;
