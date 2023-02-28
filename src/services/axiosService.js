import APIrequest from "../utils/axios.config";

export function getRandomJokes() {
  return APIrequest.get('/', {
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }); 
}
