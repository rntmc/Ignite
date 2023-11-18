import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath,JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if(search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
    return data
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {

    if (!this.#database[table]) {
      this.#database[table] = []; // Inicializa a tabela se ainda não existir
    }

    const rowIndex = this.#database[table].findIndex(row => row.id === id) //verifica se o Id existe no banco de dados

    if(rowIndex > -1) { //retorna -1 se nao encontrar
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...data,
        updated_at: new Date()
      }
      this.#persist() //persist salvara o banco de dados com info removida
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id) //verifica se o Id existe no banco de dados

    if(rowIndex > -1) { //retorna -1 se nao encontrar
      this.#database[table].splice(rowIndex, 1) //1 de uma linha
      this.#persist() //persist salvara o banco de dados com info removida
    }
  }

  complete(table, id, data) {

    if (!this.#database[table]) {
      this.#database[table] = []; // Inicializa a tabela se ainda não existir
    }

    const rowIndex = this.#database[table].findIndex(row => row.id === id) //verifica se o Id existe no banco de dados

    if(rowIndex > -1) { //retorna -1 se nao encontrar
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...data,
        completed_at: new Date()
      }
      this.#persist() //persist salvara o banco de dados com info removida
    }
  }

}