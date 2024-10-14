
let express = require('express');
let router = express.Router();
 

const DetalleFactura = require('../controllers/controller.factura.js');

// Ruta para realizar la compra
router.post('carrito/compras', DetalleFactura.realizarCompra);
router.get('/clientes/:idCliente/facturas', DetalleFactura.retrieveFacturasByCliente);
router.get('/factura/:noFactura/:serieFactura', DetalleFactura.retrieveFacturaWithDetails);




router.get('/test', (req, res) => {
    res.send('Ruta de prueba funcionando');
});


module.exports = router;