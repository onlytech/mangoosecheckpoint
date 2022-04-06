const Person = require("../models/person");

exports.addPerson = (req, res, next) => {
    var person= new Person(req.body);
    person.save().then(data => {
        return res.status(201).json({ success: true, msg: 'Successful created new Person'});
      }).catch(err => {
        return res.status(403).json({ err: err });
      });
}

exports.addManyPersons = (req, res, next) => {
    Person.insertMany(req.body.persons).then(function(){
        return res.status(201).json({ success: true, msg: 'Successful created multiple Persons'});  
    }).catch(function(error){
        console.log(error)    
    });
}

exports.getAllPersons = (req, res, next) => {
	Person.find().then(persons => {
		res.send(persons);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
  };

  exports.getPersonByName = (req, res, next) => {
	Person.find({"name":req.params.name}).then(persons => {
		res.send(persons);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
  };
  exports.getPersonByFood = (req, res, next) => {
	Person.find({"favoriteFoods":{"$in":req.params.food}}).then(persons => {
		res.send(persons);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
  };
  exports.getPersonByFoodWithBody = (req, res, next) => {
	Person.find({"favoriteFoods":{"$in":req.body.foods}}).then(persons => {
		res.send(persons);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
  };

  
  exports.getPersonById = (req, res, next) => {

    Person.findById(req.params.id).then(persons => {
       // res.send(persons);
      // var person = new Person();
      // person = persons;
        return person;
    }).catch(err => {
        console.log('ERROR', err)
        res.status(401).json({
            error: err
        });
    })
  };



  exports.updatePersonFoodById = (req, res, next) => {
    var person1 = new Person();
try {
    person1 = this.getPersonById(req, res, next);
    console.log("aa", person1);

} catch (error) {
    console.log(error);
}
    //     person.favoriteFoods.push(req.body.food);
    // Person.updateOne({_id:person._id}, person).then(persons => {
    //     res.send(persons);
    // }).catch(err => {
    //     console.log('ERROR', err)
    //     res.status(401).json({
    //         error: err
    //     });
    // })  
    
  
  };

  exports.addFood = (req, res, next) => {
    console.log(req.body);
    Person.findById(req.params.id).then(p => {
    var person = new Person();
    person = p;
        person.favoriteFoods.push(req.body.food);
        console.log('im updating', person);
        Person.updateOne({ _id: person._id }, person).then((newperson) => {
          res.status(202).json({ newperson });
        });
   
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  }

  exports.updatePersonName = (req, res, next) => {
    const filter = { name: req.body.name };
    const update = { age: 20 };  
    Person.findOneAndUpdate(filter,update).then(p => {
        res.send(p); 
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  }

  exports.removePersonById = (req, res, next) => {
    Person.findOneAndRemove(req.params.id).then(p => {
        res.send(p); 
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  }

  exports.removeMany = (req, res, next) => {
    Person.deleteMany({"name":{ $regex: req.params.name, $options:'i'}}).then(p => {
        res.send(p); 
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  }

  exports.getChainPersons = (req, res, next) => {
    var foodToSearch = req.params.food;
    Person.find({favoriteFoods:foodToSearch}).sort({name : "desc"}).limit(2).select("-age").then(p => {
        res.send(p); 
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  };