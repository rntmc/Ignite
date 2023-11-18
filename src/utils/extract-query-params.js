export function extractQueryParams(query) {
  return query.substr(1).split('&').reduce((queryParams, param)=> { //reduce eh um metodo do JS que permite percorrer array e transforma-lo em qlq outra coisa.Nesse caso transformara em um novo objeto
    const [key, value] = param.split('=') // key, value para desestruturacao do array

    queryParams[key] = value

    return queryParams
  }, {})
}