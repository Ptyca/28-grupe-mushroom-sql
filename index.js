const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'mushroom',
    });

    let sql = '';
    let rows = [];

    sql = 'SELECT `mushroom`, `price` FROM `mushroom` ORDER BY `mushroom`.`price` DESC';
    [rows] = await connection.execute(sql);
    // LOGIC BELOW
    console.log(rows);

    let price = 0;
    console.log('Grybai:')
    for (let i = 0; i < rows.length; i++) {
        const mushroomName = rows[i].mushroom;
        const mushroomPrice = rows[i].price;
        const mushroomNameFirstCapital = mushroomName.charAt(0).toUpperCase() + mushroomName.slice(1);
        console.log(`${i + 1}) ${mushroomNameFirstCapital} - ${mushroomPrice} EUR / kg`);
    }
    sql = 'SELECT `name` FROM `gatherer`';
    [rows] = await connection.execute(sql);

    let gathererNames = [];
    for (let index = 0; index < rows.length; index++) {
        const grybautojas = rows[index].name;
        if (!gathererNames.includes(grybautojas)) {
            gathererNames.push(grybautojas);
        }
    }
    console.log(`Grybautojai: ${gathererNames.join(', ')}.`);
}


app.init();

module.exports = app;