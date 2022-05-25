import {SQLLite} from 'expo-sqlite';

const db=SQLLite.openDatabase('scanningApp');

export const init=() => {
    const promise = new Promise((resolve, reject) =>{
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT,company TEXT,user TEXT);',
            [],
            ()=>{
    resolve();
            },
            (_,err)=>{
                reject(err);
            }
            )
        });
    });
return promise;
};