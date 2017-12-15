import axios from 'axios';
import config from './../config/config';

export  function HTTP(method, uri, data, headers = null, params = null) {
    return new  Promise((resolve, reject) => {
      const url = `${config.API_URL}${uri}`.trim();
      const query = {
          method: method,
          url: url
      };

      if (headers != null) {
          query.headers = headers;
      }

      if(params != null){
          query.params = params;
      }

      if (method === 'post' || method === 'put' || method === 'delete') {
          query.data = data;
      }
      console.log('query', query);

      // console.log("Query after header & params: ", query);

      axios(query).then(function(response){
        console.log(response, 'response');
        resolve(response);
      })
      .catch(error => resolve(error))
      // console.log("response from axios reveived: ");

    })

}
