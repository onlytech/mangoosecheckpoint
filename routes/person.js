var express = require('express');
var router = express.Router();
var personCtl = require("../controllers/person");

/* default page*/
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
/* GET all persons. */
router.get('/all',personCtl.getAllPersons);
/* GET persons by name */
router.get('/:name',personCtl.getPersonByName);
/* GET persons by food */

router.get('/search/:food',personCtl.getPersonByFood);
//search with body 
router.post('/search',personCtl.getPersonByFoodWithBody);
router.put('/updatePersonFood/:id',personCtl.addFood);

router.put('/updatePersonName/:id',personCtl.updatePersonName);
router.delete('/:id',personCtl.removePersonById);

router.delete('/removeMany/:name',personCtl.removeMany);

router.get('/getChain/:food',personCtl.getChainPersons);



/* GET person by id */
router.get('/searchbyid/:id',personCtl.getPersonById);

/* add person. */
router.post('/add',personCtl.addPerson);
/* add many persons */
router.post('/addMany',personCtl.addManyPersons);

module.exports = router;