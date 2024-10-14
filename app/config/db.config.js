const env = require('./env.js');
const Sequelize = require('sequelize');
const oracledb = require('oracledb');

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: 'oracle',
  dialectModule: oracledb,
  dialectOptions: {
    connectString: `(description=(retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=${env.DB_PORT})(host=${env.DB_HOST}))(connect_data=(service_name=${env.DB_NAME}))(security=(ssl_server_dn_match=yes)))`
  },
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
  logging: false, // Opcional: desactiva el logging si no lo necesitas
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Factura = require('../models/factura.model.js')(sequelize, Sequelize);
db.DetalleFactura = require('../models/detallefactura.model.js')(sequelize, Sequelize);


db.Factura.hasMany(db.DetalleFactura, {
    foreignKey: {
        name: 'noFactura',     
        field: 'NO_FACTURA'    
    },
    sourceKey: 'noFactura',    
    otherKey: 'serieFactura',  
    as: 'detalles',             
    foreignKey: {
        name: 'serieFactura',   
        field: 'SERIE_FACTURA'  
    }
});


db.DetalleFactura.belongsTo(db.Factura, {
    foreignKey: {
        name: 'noFactura',    
        field: 'NO_FACTURA'     
    },
    targetKey: 'noFactura',     
    otherKey: 'serieFactura',  
    as: 'factura',              
    foreignKey: {
        name: 'serieFactura', 
        field: 'SERIE_FACTURA'  
    }
});





module.exports = db;