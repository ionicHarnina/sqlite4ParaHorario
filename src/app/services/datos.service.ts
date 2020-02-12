import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  db: SQLiteObject;
  isOpen = false;

  constructor(public storage: SQLite, public sqliteDbCopy: SqliteDbCopy) {
    this.sqliteDbCopy.copy('Horario16a.db', 0)
      .then((res: any) => console.log('copiando bbd correcto', res))
      .catch((error: any) => console.error('copiando bbdd error', error));
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "Horario16a.db", location: "default", createFromLocation: 1 }).then(
        (db: SQLiteObject) => {
          console.log('entro bien en el create');
          this.db = db;
          this.isOpen = true;
        }).catch(() => console.log('create me echa de aqui'));
    }
  }

  GetEstudios() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM estudios where id=?", [1])
        .then(
          (data) => {
            console.log('entro en el select all users');
            let arrayEstudios = [];
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                arrayEstudios.push({
                  idEstudios: data.rows.item(i).idEstudios,
                  nombre: data.rows.item(i).nombre,
                });
              }
              console.log(arrayEstudios);
              resolve(arrayEstudios);
            }})
        .catch ( (error) => {
                console.log('error al leer all users ', error)
                reject(error);
                   }
          )
  })
}

}
